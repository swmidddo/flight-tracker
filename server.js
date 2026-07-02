const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = process.env.PORT || 8080;

// Load static databases (supported via module.exports in these files)
let AIRPORTS = null;
let AIRLINES = null;

try {
    AIRPORTS = require('./airports.js');
    AIRLINES = require('./airlines.js');
} catch (e) {
    console.log("Error loading static databases in server.js:", e.message);
}

// Cache flight radar requests to avoid rate limits
let fr24Cache = {
    data: null,
    timestamp: 0
};
const CACHE_TTL_MS = 5000; // 5 seconds cache

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Math utility to calculate Great-Circle distance
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Math utility to calculate bearing
function getBearing(lat1, lon1, lat2, lon2) {
    const rLat1 = lat1 * Math.PI / 180;
    const rLat2 = lat2 * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const y = Math.sin(dLon) * Math.cos(rLat2);
    const x = Math.cos(rLat1) * Math.sin(rLat2) -
              Math.sin(rLat1) * Math.cos(rLat2) * Math.cos(dLon);
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

// Fetch states from FlightRadar24
function fetchFlightRadar24Data() {
    return new Promise((resolve, reject) => {
        // Australian boundary: lamin=-45, lamax=-10, lomin=110, lomax=155
        const bounds = '-10,-45,110,155';
        const url = `https://data-cloud.flightradar24.com/zones/fcgi/feed.js?bounds=${bounds}&faa=1&satellite=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=14400&gliders=1&stats=1`;
        
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Origin': 'https://www.flightradar24.com',
                'Referer': 'https://www.flightradar24.com/'
            },
            timeout: 5000
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(new Error("Failed to parse FlightRadar24 JSON"));
                    }
                } else {
                    reject(new Error(`FlightRadar24 API returned status code ${res.statusCode}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

const BOOKED_TEMPLATES = [
    { flightNo: 'QF401', airlineCode: 'QFA', origin: 'SYD', dest: 'MEL' },
    { flightNo: 'QF415', airlineCode: 'QFA', origin: 'BNE', dest: 'SYD' },
    { flightNo: 'VA820', airlineCode: 'VOZ', origin: 'MEL', dest: 'SYD' },
    { flightNo: 'VA854', airlineCode: 'VOZ', origin: 'SYD', dest: 'BNE' },
    { flightNo: 'JQ502', airlineCode: 'JST', origin: 'MEL', dest: 'OOM' },
    { flightNo: 'JQ610', airlineCode: 'JST', origin: 'SYD', dest: 'OOL' },
    { flightNo: 'ZL210', airlineCode: 'RXA', origin: 'SYD', dest: 'WGA' },
    { flightNo: 'ZL342', airlineCode: 'RXA', origin: 'MEL', dest: 'ABX' },
    { flightNo: 'QF510', airlineCode: 'QFA', origin: 'SYD', dest: 'BNE' },
    { flightNo: 'QF612', airlineCode: 'QFA', origin: 'MEL', dest: 'BNE' },
    { flightNo: 'VA912', airlineCode: 'VOZ', origin: 'BNE', dest: 'MEL' },
    { flightNo: 'VA1420', airlineCode: 'VOZ', origin: 'ADL', dest: 'MEL' },
    { flightNo: 'JQ720', airlineCode: 'JST', origin: 'MEL', dest: 'HBA' },
    { flightNo: 'JQ812', airlineCode: 'JST', origin: 'SYD', dest: 'CNS' },
    { flightNo: 'QF742', airlineCode: 'QFA', origin: 'ADL', dest: 'SYD' },
    { flightNo: 'QF802', airlineCode: 'QFA', origin: 'CBR', dest: 'MEL' },
    { flightNo: 'VA212', airlineCode: 'VOZ', origin: 'SYD', dest: 'ADL' },
    { flightNo: 'VA315', airlineCode: 'VOZ', origin: 'MEL', dest: 'ADL' },
    { flightNo: 'ZL510', airlineCode: 'RXA', origin: 'ADL', dest: 'WGA' },
    { flightNo: 'JQ902', airlineCode: 'JST', origin: 'OOL', dest: 'SYD' }
];

function generateBookedScheduledFlights(now) {
    const flights = [];
    BOOKED_TEMPLATES.forEach((t, i) => {
        const hourEpoch = Math.floor(now / (60 * 60 * 1000));
        const seed = hourEpoch + i;
        const rand = Math.sin(seed) * 10000;
        const uRand = Math.abs(rand - Math.floor(rand));

        const departureTime = new Date(now + (i * 12 * 60 * 1000));
        
        let delayMinutes = 0;
        let status = "Scheduled";

        const timeToDepMins = i * 12;
        if (timeToDepMins < 30) {
            if (uRand < 0.20) {
                status = "Delayed";
                delayMinutes = Math.floor(uRand * 40) + 15;
            } else if (uRand < 0.50) {
                status = "Boarding";
            } else {
                status = "Scheduled";
            }
        } else {
            if (uRand < 0.15) {
                status = "Delayed";
                delayMinutes = Math.floor(uRand * 30) + 10;
            } else {
                status = "Scheduled";
            }
        }

        const originObj = AIRPORTS && AIRPORTS[t.origin] ? AIRPORTS[t.origin] : { lat: -33.946, lon: 151.177, name: `${t.origin} Airport`, city: t.origin, state: 'NSW' };
        const destObj = AIRPORTS && AIRPORTS[t.dest] ? AIRPORTS[t.dest] : { lat: -37.673, lon: 144.843, name: `${t.dest} Airport`, city: t.dest, state: 'VIC' };

        const lat = originObj.lat;
        const lon = originObj.lon;

        const distanceKm = getDistance(originObj.lat, originObj.lon, destObj.lat, destObj.lon);
        const durationMs = (distanceKm / 750) * 3600 * 1000;
        const arrivalTime = new Date(departureTime.getTime() + durationMs);

        let airlineName = "Charter / Cargo / General Aviation";
        let airlineColor = "#6b7280";
        let isLight = true;
        
        if (AIRLINES && AIRLINES[t.airlineCode]) {
            const al = AIRLINES[t.airlineCode];
            airlineName = al.name;
            airlineColor = al.color;
            isLight = al.textLight;
        }

        flights.push({
            id: `SCHED-${t.flightNo}-${hourEpoch}`,
            flightNo: t.flightNo,
            callsign: t.flightNo,
            airline: airlineName,
            airlineCode: t.airlineCode,
            airlineColor: airlineColor,
            airlineTextLight: isLight,
            aircraftType: 'Boeing 737-800',
            registration: `VH-VH${i}`,
            maxAltitude: 39000,
            maxSpeed: 450,
            origin: originObj,
            dest: destObj,
            distanceKm: Math.round(distanceKm),
            durationMs: Math.round(durationMs),
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            status: status,
            delayMinutes: delayMinutes,
            progress: 0,
            currentLat: lat,
            currentLon: lon,
            currentAlt: 0,
            currentSpeed: 0,
            currentHeading: 0,
            verticalRate: 0,
            history: [],
            isLive: true
        });
    });
    return flights;
}

// Map raw feed data to tracking flight model
function parseFlightRadar24Data(raw) {
    if (!raw) return [];
    
    const parsedFlights = [];
    const now = Date.now();

    // Iterate over keys, ignoring metadata fields
    Object.keys(raw).forEach(key => {
        if (key === 'full_count' || key === 'version' || key === 'stats') return;
        
        const flightArr = raw[key];
        if (!Array.isArray(flightArr) || flightArr.length < 18) return;

        const callsign = (flightArr[16] || '').trim();
        const flightNo = (flightArr[13] || '').trim() || callsign;
        if (!flightNo) return;

        const lat = flightArr[1];
        const lon = flightArr[2];
        if (lat === null || lon === null) return;

        // Resolve airline brand details
        const airlineCode = flightArr[18] || '';
        let airlineName = "Charter / Cargo / General Aviation";
        let airlineColor = "#6b7280"; // Gray default
        let isLight = true;

        if (AIRLINES) {
            let matchedKey = null;
            if (AIRLINES[airlineCode]) {
                matchedKey = airlineCode;
            } else {
                // Match by flight number prefix heuristic
                const airlineKeys = Object.keys(AIRLINES);
                for (const key of airlineKeys) {
                    if (flightNo.startsWith(AIRLINES[key].code) || callsign.startsWith(key)) {
                        matchedKey = key;
                        break;
                    }
                }
            }

            if (matchedKey && AIRLINES[matchedKey]) {
                const al = AIRLINES[matchedKey];
                airlineName = al.name;
                airlineColor = al.color;
                isLight = al.textLight;
            }
        }

        const altFt = flightArr[4] || 0;
        const speedKts = flightArr[5] || 0;
        const heading = flightArr[3] || 0;
        const registration = flightArr[9] || '';
        const aircraftType = flightArr[8] || 'Unknown';
        const originCode = flightArr[11] || '';
        const destCode = flightArr[12] || '';
        const onGround = !!flightArr[14] || altFt < 200;
        const verticalRate = flightArr[15] || 0;

        // Look up airport records
        let origin = AIRPORTS && AIRPORTS[originCode] ? AIRPORTS[originCode] : {
            code: originCode || 'UNK',
            name: originCode ? `${originCode} Airport` : 'Unknown Origin',
            city: originCode || 'Unknown',
            state: 'INTL',
            lat: null,
            lon: null
        };

        let dest = AIRPORTS && AIRPORTS[destCode] ? AIRPORTS[destCode] : {
            code: destCode || 'UNK',
            name: destCode ? `${destCode} Airport` : 'Unknown Destination',
            city: destCode || 'Unknown',
            state: 'INTL',
            lat: null,
            lon: null
        };

        // Estimate progress & ETA if coordinates exist
        let distanceKm = 0;
        let progress = 0.5;
        let departureTime = new Date(now - 30 * 60 * 1000);
        let arrivalTime = new Date(now + 30 * 60 * 1000);
        let delayMinutes = 0;

        if (origin.lat !== null && origin.lon !== null && dest.lat !== null && dest.lon !== null) {
            distanceKm = getDistance(origin.lat, origin.lon, dest.lat, dest.lon);
            const distFromOrigin = getDistance(origin.lat, origin.lon, lat, lon);
            progress = distanceKm > 0 ? distFromOrigin / distanceKm : 0.5;
            if (progress > 1) progress = 0.99;
            if (progress < 0) progress = 0.01;

            const speedKmh = speedKts * 1.852;
            const remainingDist = getDistance(lat, lon, dest.lat, dest.lon);
            const remainingMs = speedKmh > 50 ? (remainingDist / speedKmh) * 3600 * 1000 : 30 * 60 * 1000;
            const elapsedMs = remainingMs * (progress / (1 - progress));
            
            departureTime = new Date(now - elapsedMs);
            arrivalTime = new Date(now + remainingMs);
        }

        let status = "En Route";
        if (onGround) {
            let isAtOrigin = false;
            if (origin.lat !== null && origin.lon !== null) {
                const distFromOrigin = getDistance(origin.lat, origin.lon, lat, lon);
                if (distFromOrigin < 4) {
                    isAtOrigin = true;
                }
            }
            
            if (isAtOrigin) {
                progress = 0;
                // Generate a status: 15% delayed, 25% boarding, 60% scheduled
                const rand = Math.random();
                if (rand < 0.15) {
                    status = "Delayed";
                    delayMinutes = Math.floor(Math.random() * 40) + 10;
                } else if (rand < 0.40) {
                    status = "Boarding";
                } else {
                    status = "Scheduled";
                }
                
                // For scheduled/boarding flights, set simulated departure/arrival time estimates
                departureTime = new Date(now + (delayMinutes > 0 ? delayMinutes * 60 * 1000 : 10 * 60 * 1000));
                arrivalTime = new Date(departureTime.getTime() + (distanceKm > 0 ? (distanceKm / 750) * 3600 * 1000 : 60 * 60 * 1000));
            } else {
                status = "Landed";
                progress = 1;
            }
        } else if (verticalRate < -600 && progress > 0.88) {
            status = "Descending";
        } else if (verticalRate > 600 && progress < 0.15) {
            status = "Climbing";
        }

        parsedFlights.push({
            id: `LIVE-${flightNo}-${key}`,
            flightNo: flightNo,
            callsign: callsign,
            airline: airlineName,
            airlineCode: airlineCode,
            airlineColor: airlineColor,
            airlineTextLight: isLight,
            aircraftType: aircraftType,
            registration: registration,
            maxAltitude: 41000,
            maxSpeed: 520,
            origin: origin,
            dest: dest,
            distanceKm: Math.round(distanceKm),
            durationMs: Math.round(progress * 60 * 60 * 1000 + (1 - progress) * 60 * 60 * 1000), // estimated
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            status: status,
            delayMinutes: delayMinutes,
            progress: progress,
            currentLat: lat,
            currentLon: lon,
            currentAlt: altFt,
            currentSpeed: speedKts,
            currentHeading: heading,
            verticalRate: verticalRate,
            history: [],
            isLive: true
        });
    });

    return parsedFlights;
}

// Start HTTP Server
const server = http.createServer((req, res) => {
    let safeUrl = req.url.split('?')[0];
    if (safeUrl.includes('..')) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    // 1. API Route: Fetch Live Flights
    if (safeUrl === '/api/live-flights') {
        const now = Date.now();
        
        // Serve cached version if fresh
        if (fr24Cache.data && (now - fr24Cache.timestamp < CACHE_TTL_MS)) {
            res.writeHead(200, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            const bookedFlights = generateBookedScheduledFlights(now);
            const combinedFlights = [...fr24Cache.data, ...bookedFlights];
            res.end(JSON.stringify({ 
                success: true, 
                fallback: false,
                cached: true,
                flightsCount: combinedFlights.length,
                flights: combinedFlights 
            }));
            return;
        }

        fetchFlightRadar24Data()
            .then(data => {
                const flights = parseFlightRadar24Data(data);
                
                if (flights.length === 0 && fr24Cache.data && fr24Cache.data.length > 0) {
                    throw new Error("FlightRadar24 returned empty feed");
                }
                
                fr24Cache.data = flights;
                fr24Cache.timestamp = now;

                const bookedFlights = generateBookedScheduledFlights(now);
                const combinedFlights = [...flights, ...bookedFlights];

                res.writeHead(200, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*' 
                });
                res.end(JSON.stringify({ 
                    success: true, 
                    fallback: false,
                    cached: false,
                    flightsCount: combinedFlights.length,
                    flights: combinedFlights 
                }));
            })
            .catch(err => {
                console.log("FlightRadar24 fetch failed, using fallback metrics:", err.message);
                
                if (fr24Cache.data) {
                    res.writeHead(200, { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    });
                    res.end(JSON.stringify({ 
                        success: true, 
                        fallback: false,
                        cached: true,
                        stale: true,
                        flightsCount: fr24Cache.data.length,
                        flights: fr24Cache.data 
                    }));
                    return;
                }

                res.writeHead(200, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ 
                    success: false, 
                    fallback: true, 
                    error: err.message,
                    flights: [] 
                }));
            });
        return;
    }

    // 2. Static File Server
    let filePath = path.join(__dirname, safeUrl === '/' ? 'index.html' : safeUrl);
    const extname = path.extname(filePath);
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            const headers = { 'Content-Type': contentType };
            if (extname === '.html') {
                headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
                headers['Pragma'] = 'no-cache';
                headers['Expires'] = '0';
            }
            res.writeHead(200, headers);
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Australian Flight Tracker v2 backend active at http://localhost:${PORT}/`);
    console.log(`Live FR24 proxy route active at http://localhost:${PORT}/api/live-flights`);
});
