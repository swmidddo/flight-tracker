/**
 * Premium Flight Simulation Engine for Australian Airspace (Version 2)
 * Implements Great-Circle Navigation, flight physics profiles, and synthetic delay triggers.
 */

class FlightSimulator {
    constructor() {
        this.flights = [];
        this.simSpeed = 10; // Default: 10x real-time
        this.lastUpdate = Date.now();
        this.onFlightUpdate = null;
        this.systemLog = [];

        // Connect to shared databases
        this.airports = window.AIRPORTS;
        this.airlines = window.AIRLINES;

        this.EARTH_RADIUS_KM = 6371;
        this.KNOTS_TO_KMH = 1.852;

        this.initSimulation();
    }

    log(message) {
        const time = new Date().toLocaleTimeString();
        this.systemLog.unshift({ time, message });
        if (this.systemLog.length > 40) this.systemLog.pop();
    }

    // Degrees to Radians
    degToRad(deg) {
        return deg * Math.PI / 180;
    }

    // Radians to Degrees
    radToDeg(rad) {
        return rad * 180 / Math.PI;
    }

    // Great-circle distance in kilometers
    getGreatCircleDistance(lat1, lon1, lat2, lon2) {
        const dLat = this.degToRad(lat2 - lat1);
        const dLon = this.degToRad(lon2 - lon1);
        const rLat1 = this.degToRad(lat1);
        const rLat2 = this.degToRad(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return this.EARTH_RADIUS_KM * c;
    }

    // Bearing (heading) between two coordinates in degrees (0-360)
    getBearing(lat1, lon1, lat2, lon2) {
        const rLat1 = this.degToRad(lat1);
        const rLat2 = this.degToRad(lat2);
        const dLon = this.degToRad(lon2 - lon1);

        const y = Math.sin(dLon) * Math.cos(rLat2);
        const x = Math.cos(rLat1) * Math.sin(rLat2) -
                  Math.sin(rLat1) * Math.cos(rLat2) * Math.cos(dLon);
        const bearing = Math.atan2(y, x);
        return (this.radToDeg(bearing) + 360) % 360;
    }

    // Great-circle coordinate interpolation
    interpolatePosition(lat1, lon1, lat2, lon2, fraction) {
        if (fraction <= 0) return { lat: lat1, lon: lon1 };
        if (fraction >= 1) return { lat: lat2, lon: lon2 };

        const rLat1 = this.degToRad(lat1);
        const rLon1 = this.degToRad(lon1);
        const rLat2 = this.degToRad(lat2);
        const rLon2 = this.degToRad(lon2);

        const d = 2 * Math.asin(Math.sqrt(
            Math.sin((rLat1 - rLat2) / 2) ** 2 +
            Math.cos(rLat1) * Math.cos(rLat2) * Math.sin((rLon1 - rLon2) / 2) ** 2
        ));

        if (d === 0) return { lat: lat1, lon: lon1 };

        const A = Math.sin((1 - fraction) * d) / Math.sin(d);
        const B = Math.sin(fraction * d) / Math.sin(d);

        const x = A * Math.cos(rLat1) * Math.cos(rLon1) + B * Math.cos(rLat2) * Math.cos(rLon2);
        const y = A * Math.cos(rLat1) * Math.sin(rLon1) + B * Math.cos(rLat2) * Math.sin(rLon2);
        const z = A * Math.sin(rLat1) + B * Math.sin(rLat2);

        const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
        const lon = Math.atan2(y, x);

        return {
            lat: this.radToDeg(lat),
            lon: this.radToDeg(lon)
        };
    }

    setSimSpeed(speed) {
        this.simSpeed = speed;
        this.log(`Simulation warp speed set to ${speed}x`);
    }

    initSimulation() {
        this.log("Configuring simulation matrices...");
        const now = Date.now();

        // Generate 45 flights running concurrently
        for (let i = 0; i < 45; i++) {
            const flight = this.generateRandomFlight(now - (Math.random() * 4 * 3600 * 1000));
            this.flights.push(flight);
        }
        this.log(`Simulation initialized with ${this.flights.length} active routes.`);
    }

    generateRandomFlight(referenceTime) {
        const airportKeys = Object.keys(this.airports).filter(k => this.airports[k].state !== 'INTL'); // Domestic departures only
        const airlineKeys = Object.keys(this.airlines);

        // Select origin and dest
        const originCode = airportKeys[Math.floor(Math.random() * airportKeys.length)];
        let destCode = airportKeys[Math.floor(Math.random() * airportKeys.length)];
        while (destCode === originCode) {
            destCode = airportKeys[Math.floor(Math.random() * airportKeys.length)];
        }

        const origin = this.airports[originCode];
        const dest = this.airports[destCode];

        const airlineKey = airlineKeys[Math.floor(Math.random() * airlineKeys.length)];
        const airline = this.airlines[airlineKey];
        const aircraft = airline.aircraft[Math.floor(Math.random() * airline.aircraft.length)];

        const distanceKm = this.getGreatCircleDistance(origin.lat, origin.lon, dest.lat, dest.lon);
        const speedKmh = aircraft.speedKnots * this.KNOTS_TO_KMH;
        const durationMs = ((distanceKm / speedKmh) * 3600 * 1000) + (15 * 60 * 1000); // add 15 mins taxi overhead

        const departureTime = new Date(referenceTime);
        const arrivalTime = new Date(departureTime.getTime() + durationMs);

        // Create registration
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const regSuffix = chars[Math.floor(Math.random() * 26)] + chars[Math.floor(Math.random() * 26)] + chars[Math.floor(Math.random() * 26)];
        const registration = `VH-${regSuffix}`;

        // Create flight number
        const flightNo = (airlineKey === 'GAV') ? registration : (airline.code + Math.floor(100 + Math.random() * 800));

        let delayMinutes = 0;
        let status = "Scheduled";
        if (Math.random() < 0.12) {
            delayMinutes = Math.floor(Math.random() * 35) + 5;
            status = "Delayed";
        }

        return {
            id: `${flightNo}-${departureTime.getTime()}`,
            flightNo: flightNo,
            airline: airline.name,
            airlineCode: airlineKey,
            airlineColor: airline.color,
            aircraftType: aircraft.type,
            registration: registration,
            flightType: airline.type || "passenger",
            maxAltitude: aircraft.cruiseAltFt,
            maxSpeed: aircraft.speedKnots,
            origin: origin,
            dest: dest,
            distanceKm: Math.round(distanceKm),
            durationMs: durationMs,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            status: status,
            delayMinutes: delayMinutes,
            progress: 0,
            currentLat: origin.lat,
            currentLon: origin.lon,
            currentAlt: 0,
            currentSpeed: 0,
            currentHeading: 0,
            history: []
        };
    }

    tick() {
        const now = Date.now();
        const deltaMs = (now - this.lastUpdate) * this.simSpeed;
        this.lastUpdate = now;

        this.flights.forEach(flight => {
            const adjustedDepTime = flight.departureTime.getTime() + (flight.delayMinutes * 60 * 1000);
            const adjustedArrTime = flight.arrivalTime.getTime() + (flight.delayMinutes * 60 * 1000);
            const totalDuration = adjustedArrTime - adjustedDepTime;

            let flightTimeElapsed = now - adjustedDepTime;

            if (now < adjustedDepTime) {
                // Scheduled or Boarding
                flight.progress = 0;
                flight.currentLat = flight.origin.lat;
                flight.currentLon = flight.origin.lon;
                flight.currentAlt = 0;
                flight.currentSpeed = 0;
                flight.currentHeading = this.getBearing(flight.origin.lat, flight.origin.lon, flight.dest.lat, flight.dest.lon);

                const msToDep = adjustedDepTime - now;
                if (msToDep < 12 * 60 * 1000 && flight.status !== "Delayed") {
                    flight.status = "Boarding";
                } else if (flight.status !== "Delayed") {
                    flight.status = "Scheduled";
                }
            } else if (now >= adjustedDepTime && now < adjustedArrTime) {
                // Active
                flight.progress = flightTimeElapsed / totalDuration;
                flight.status = "En Route";

                const pos = this.interpolatePosition(
                    flight.origin.lat, flight.origin.lon,
                    flight.dest.lat, flight.dest.lon,
                    flight.progress
                );

                const bearing = this.getBearing(flight.currentLat, flight.currentLon, pos.lat, pos.lon);
                if (bearing !== 0) flight.currentHeading = bearing;

                flight.currentLat = pos.lat;
                flight.currentLon = pos.lon;

                this.simulatePhysics(flight);

                // Save breadcrumb trails
                if (flight.history.length === 0 ||
                    this.getGreatCircleDistance(flight.currentLat, flight.currentLon, flight.history[flight.history.length - 1][0], flight.history[flight.history.length - 1][1]) > 30) {
                    flight.history.push([flight.currentLat, flight.currentLon]);
                    if (flight.history.length > 50) flight.history.shift();
                }
            } else {
                // Landed
                flight.progress = 1;
                flight.currentLat = flight.dest.lat;
                flight.currentLon = flight.dest.lon;
                flight.currentAlt = 0;
                flight.currentSpeed = 0;
                flight.status = "Landed";
            }
        });

        this.maintainFlightCount(now);

        if (this.onFlightUpdate) {
            this.onFlightUpdate(this.flights);
        }
    }

    simulatePhysics(flight) {
        const p = flight.progress;
        if (p < 0.12) {
            // Climb
            const f = p / 0.12;
            flight.currentAlt = Math.round(flight.maxAltitude * f);
            flight.currentSpeed = Math.round(160 + (flight.maxSpeed - 160) * f);
        } else if (p >= 0.12 && p < 0.88) {
            // Cruise
            flight.currentAlt = flight.maxAltitude;
            flight.currentSpeed = flight.maxSpeed + Math.round(Math.sin(p * 200) * 6); // small oscillation
        } else if (p >= 0.88 && p < 0.98) {
            // Descent
            const f = (p - 0.88) / 0.10;
            flight.currentAlt = Math.round(flight.maxAltitude * (1 - f) + 1500 * f);
            flight.currentSpeed = Math.round(flight.maxSpeed * (1 - f) + 175 * f);
        } else {
            // Approach/Landing
            const f = (p - 0.98) / 0.02;
            flight.currentAlt = Math.round(1500 * (1 - f));
            flight.currentSpeed = Math.round(175 * (1 - f));
        }
    }

    maintainFlightCount(now) {
        const cleanupTime = 30 * 60 * 1000; // Remove landed flights after 30 mins
        this.flights = this.flights.filter(f => {
            if (f.status === "Landed") {
                const landTime = f.arrivalTime.getTime() + (f.delayMinutes * 60 * 1000);
                return (now - landTime) < cleanupTime;
            }
            return true;
        });

        while (this.flights.length < 45) {
            const offset = (Math.random() * 3 * 3600 * 1000) - (0.5 * 3600 * 1000);
            const newFlight = this.generateRandomFlight(now + offset);
            this.flights.push(newFlight);
        }
    }

    triggerRandomEvent() {
        const events = [
            { type: "weather", title: "Low Visibility at Melbourne (MEL)", desc: "Heavy morning fog causing separation flow delays. Flights to MEL delayed by 10-25m." },
            { type: "weather", title: "Severe Storm front near Brisbane (BNE)", desc: "Severe cell activity slowing arrivals from northern sectors. Hold patterns active." },
            { type: "ATC", title: "Sydney Flow Restriction", desc: "Airservices implementing single-runway operation in SYD. Intermittent holds." },
            { type: "sys", title: "Qantas Fleet Maintenance Hold", desc: "Technical system update delays boarding on selected regional sectors." }
        ];

        const selected = events[Math.floor(Math.random() * events.length)];
        this.log(`Emergency: ${selected.title}`);

        let count = 0;
        this.flights.forEach(f => {
            if (f.status !== "Landed" && Math.random() < 0.20) {
                const delay = Math.floor(Math.random() * 15) + 10;
                f.delayMinutes += delay;
                f.status = "Delayed";
                count++;
            }
        });
        
        return { ...selected, affectedCount: count };
    }

    addCustomFlight(data) {
        const origin = this.airports[data.originCode];
        const dest = this.airports[data.destCode];
        const airline = this.airlines[data.airlineKey];
        const aircraft = airline.aircraft.find(a => a.type === data.aircraftType) || airline.aircraft[0];

        const distanceKm = this.getGreatCircleDistance(origin.lat, origin.lon, dest.lat, dest.lon);
        const speedKmh = aircraft.speedKnots * this.KNOTS_TO_KMH;
        const durationMs = ((distanceKm / speedKmh) * 3600 * 1000) + (12 * 60 * 1000);

        const departureTime = new Date();
        const arrivalTime = new Date(departureTime.getTime() + durationMs);

        const newFlight = {
            id: `${data.flightNo.toUpperCase()}-${departureTime.getTime()}`,
            flightNo: data.flightNo.toUpperCase(),
            airline: airline.name,
            airlineCode: airline.code,
            airlineColor: airline.color,
            aircraftType: aircraft.type,
            maxAltitude: aircraft.cruiseAltFt,
            maxSpeed: aircraft.speedKnots,
            origin: origin,
            dest: dest,
            distanceKm: Math.round(distanceKm),
            durationMs: durationMs,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            status: "Scheduled",
            delayMinutes: 0,
            progress: 0,
            currentLat: origin.lat,
            currentLon: origin.lon,
            currentAlt: 0,
            currentSpeed: 0,
            currentHeading: this.getBearing(origin.lat, origin.lon, dest.lat, dest.lon),
            history: [],
            isUserFlight: true
        };

        this.flights.unshift(newFlight);
        this.log(`Custom track initialized for ${newFlight.flightNo}`);
        
        if (this.onFlightUpdate) {
            this.onFlightUpdate(this.flights);
        }

        return newFlight;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FlightSimulator;
} else {
    window.FlightSimulator = FlightSimulator;
}
