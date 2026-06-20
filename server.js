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
            status = "Landed";
            progress = 1;
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
            res.end(JSON.stringify({ 
                success: true, 
                fallback: false,
                cached: true,
                flightsCount: fr24Cache.data.length,
                flights: fr24Cache.data 
            }));
            return;
        }

        fetchFlightRadar24Data()
            .then(data => {
                const flights = parseFlightRadar24Data(data);
                
                fr24Cache.data = flights;
                fr24Cache.timestamp = now;

                res.writeHead(200, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*' 
                });
                res.end(JSON.stringify({ 
                    success: true, 
                    fallback: false,
                    cached: false,
                    flightsCount: flights.length,
                    flights: flights 
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
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Australian Flight Tracker v2 backend active at http://localhost:${PORT}/`);
    console.log(`Live FR24 proxy route active at http://localhost:${PORT}/api/live-flights`);
});
