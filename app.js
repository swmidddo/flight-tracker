/**
 * AeroTrack Pro - Client Application Controller (Version 2)
 * Orchestrates Leaflet Radar Map, Flight telemetry drawer, predictive search, and live FR24 integrations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Safe Storage helper to avoid security exceptions (e.g. Incognito/corporate policy)
    const safeStorage = {
        getItem(key, fallback = null) {
            try {
                return localStorage.getItem(key) || fallback;
            } catch (e) {
                return fallback;
            }
        },
        setItem(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (e) {
                // ignore
            }
        }
    };

    // Client-side fetch timeout helper (using AbortController)
    function fetchWithTimeout(url, options = {}, timeout = 5000) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        return fetch(url, { ...options, signal: controller.signal })
            .then(res => {
                clearTimeout(id);
                return res;
            })
            .catch(err => {
                clearTimeout(id);
                throw err;
            });
    }

    // 1. Theme Configuration
    const savedTheme = safeStorage.getItem('theme', 'dark');
    const isLightInitial = savedTheme === 'light';
    if (isLightInitial) {
        document.body.classList.add('light-mode');
        const themeBtn = document.getElementById('btn-theme-toggle');
        if (themeBtn) themeBtn.textContent = '☀️';
    }

    // 2. Map Initialization
    const map = L.map('map', {
        center: [-27.0, 133.0],
        zoom: 4,
        zoomControl: false,
        attributionControl: false
    });

    // Top right zoom controls
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Bottom right scale indicator
    L.control.scale({ position: 'bottomright', imperial: false }).addTo(map);

    const roadmapTile = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en', {
        maxZoom: 20,
        minZoom: 3,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
    });

    const darkTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        minZoom: 3,
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    });

    const satelliteTile = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        minZoom: 3,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    const basemaps = {
        roadmap: roadmapTile,
        dark: darkTile,
        satellite: satelliteTile
    };

    let activeMapTheme = safeStorage.getItem('pref_mapTheme', 'roadmap');
    if (!basemaps[activeMapTheme]) {
        activeMapTheme = 'roadmap';
    }

    let activeTileLayer = basemaps[activeMapTheme];
    activeTileLayer.addTo(map);

    function changeMapTheme(theme) {
        if (theme === activeMapTheme) return;
        
        map.removeLayer(activeTileLayer);
        activeTileLayer = basemaps[theme];
        activeTileLayer.addTo(map);
        
        activeMapTheme = theme;
        safeStorage.setItem('pref_mapTheme', theme);
        
        // Sync active class on buttons
        const btnRoad = document.getElementById('btn-theme-roadmap');
        const btnDark = document.getElementById('btn-theme-dark');
        const btnSat = document.getElementById('btn-theme-satellite');
        
        if (btnRoad && btnDark && btnSat) {
            btnRoad.classList.remove('active');
            btnDark.classList.remove('active');
            btnSat.classList.remove('active');
            
            if (theme === 'roadmap') btnRoad.classList.add('active');
            else if (theme === 'dark') btnDark.classList.add('active');
            else if (theme === 'satellite') btnSat.classList.add('active');
        }
    }

    // 2. Global State Variables
    let selectedFlightId = null;
    let selectedAirportCode = null;
    let selectedAirportFidsTab = 'departures';

    // Load persisted preferences safely
    let searchFilter = safeStorage.getItem('pref_searchFilter', '');
    let airlineFilter = safeStorage.getItem('pref_airlineFilter', 'all');
    let statusFilter = safeStorage.getItem('pref_statusFilter', 'all');
    let stateFilter = safeStorage.getItem('pref_stateFilter', 'all');
    let typeFilter = safeStorage.getItem('pref_typeFilter', 'all');
    let hideInternational = safeStorage.getItem('pref_hideInternational', 'false') === 'true';
    let mobileOptimized = safeStorage.getItem('pref_mobileOptimized', 'false') === 'true';
    let weatherRadarActive = safeStorage.getItem('pref_weatherRadarActive', 'false') === 'true';
    let weatherRadarLayer = null;
    let fetchFailCount = 0;

    let liveFlights = [];
    let userFlights = [];
    let isFetchingLive = false;
    let lastLiveFetch = 0;

    const planeMarkers = {};
    const airportMarkers = {};
    let routeSolidLine = null;
    let routeDashedLine = null;
    let airportConnectionLines = [];

    // Initialize Flight Simulator Engine
    const simulator = new window.FlightSimulator();

    // 3. Populate Filter Dropdowns Dynamically
    const selectAirline = document.getElementById('select-airline');

    const sortedAirlines = Object.entries(window.AIRLINES)
        .map(([key, value]) => ({ key, ...value }))
        .sort((a, b) => a.name.localeCompare(b.name));

    let selectAirlineHtml = '<option value="all">All Airlines</option>';
    sortedAirlines.forEach(al => {
        selectAirlineHtml += `<option value="${al.key}">${al.name}</option>`;
    });
    selectAirline.innerHTML = selectAirlineHtml;

    // 4. Major Airports Classification and Rendering
    const MAJOR_AU_AIRPORTS = new Set([
        'SYD', 'MEL', 'BNE', 'PER', 'ADL', 'CBR', 'DRW', 'HBA' // Capital Cities
    ]);

    function isMajorAirport(code, airport) {
        if (!airport) return false;
        return MAJOR_AU_AIRPORTS.has(code);
    }

    function updateAirportMarkersVisibility() {
        const zoom = map.getZoom();
        const isMobile = window.innerWidth <= 900;
        const mediumThreshold = isMobile ? 6 : 5;
        const smallThreshold = isMobile ? 9 : 8;
        
        // Tiered Level-of-Detail Classification
        const MEDIUM_REGIONAL = new Set([
            'OOL', 'CNS', 'TSV', 'MKY', 'ROK', 'NTL', 'LST', 'ASP', 'BME', 'PHE', 'KTA', 'AVV', 'MCY', 'HBA', 'CBR', 'DRW', 'ADL', 'PER', 'BNE', 'MEL', 'SYD'
        ]);

        Object.keys(airportMarkers).forEach(code => {
            const marker = airportMarkers[code];
            const airport = window.AIRPORTS[code];
            const isMajor = isMajorAirport(code, airport);
            const isMedium = MEDIUM_REGIONAL.has(code) || (airport && airport.state === 'INTL');

            let shouldBeVisible = false;
            if (code === selectedAirportCode) {
                shouldBeVisible = true;
            } else if (isMajor) {
                shouldBeVisible = true; // Always show capitals
            } else if (!mobileOptimized) {
                if (isMedium) {
                    shouldBeVisible = (zoom >= mediumThreshold); // Show medium/international hubs at zoom 5+ (6+ on mobile)
                } else {
                    shouldBeVisible = (zoom >= smallThreshold); // Show small regional strips only at zoom 8+ (9+ on mobile)
                }
            }
            
            const isCurrentlyOnMap = map.hasLayer(marker);
            
            if (shouldBeVisible && !isCurrentlyOnMap) {
                marker.addTo(map);
            } else if (!shouldBeVisible && isCurrentlyOnMap) {
                map.removeLayer(marker);
            }
        });
    }

    // Update visibility on map zoom
    map.on('zoomend', updateAirportMarkersVisibility);

    Object.values(window.AIRPORTS).forEach(airport => {
        const customIcon = L.divIcon({
            className: `airport-marker`,
            html: `
                <div class="airport-marker-dot"></div>
                <div class="airport-label">${airport.code}</div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        const marker = L.marker([airport.lat, airport.lon], { icon: customIcon })
            .bindPopup(`<b>${airport.name}</b><br>${airport.city}, ${airport.state}`);

        marker.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            selectAirport(airport.code);
        });

        airportMarkers[airport.code] = marker;
    });

    // Run initial zoom visibility filter
    updateAirportMarkersVisibility();

    // 5. Plane Marker Icon Factory
    function createPlaneIcon(heading, color, isSelected, isScheduled) {
        const size = isSelected ? 32 : 22;
        const glowSize = isSelected ? '12px' : '4px';
        const pulseClass = isSelected ? 'plane-pulse' : '';
        const opacity = isScheduled ? 0.6 : 1.0;

        return L.divIcon({
            className: `plane-icon-div ${pulseClass}`,
            html: `
                <div style="width: ${size}px; height: ${size}px; transform: rotate(${heading}deg); transition: transform 0.25s linear; opacity: ${opacity};">
                    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="${color}" style="filter: drop-shadow(0 0 ${glowSize} ${color}); display: block;">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                    </svg>
                </div>
            `,
            iconSize: [size, size],
            iconAnchor: [size/2, size/2]
        });
    }

    function getFlightType(f) {
        if (f.flightType) return f.flightType; // Pre-classified by simulator
        
        const airline = window.AIRLINES[f.airlineCode];
        if (airline) {
            return airline.type || 'passenger';
        }
        
        const flightNo = (f.flightNo || '').toUpperCase();
        if (flightNo.startsWith('VH-') || !f.airlineCode || f.airlineCode === 'all' || f.airlineCode === 'GA') {
            return 'private';
        }
        
        return 'passenger';
    }

    // 6. Map Renderer Loop & Filter Helper
    function getFilteredFlights(flights) {
        return flights.filter(f => {
            // If there is an active search filter, check if it matches flight identifier or registration
            let matchesFlightSearchDirectly = false;
            if (searchFilter) {
                let query = searchFilter.toLowerCase().trim();
                let cleanQuery = query.replace(/\s+/g, '');
                
                // Normalize cleanQuery to IATA format if it is in ICAO format
                const icaoMatch = cleanQuery.match(/^([a-z]{3})(\d{1,4}[a-z]?)$/i);
                if (icaoMatch && window.AIRLINES) {
                    const icaoPrefix = icaoMatch[1].toUpperCase();
                    const numPart = icaoMatch[2];
                    if (window.AIRLINES[icaoPrefix]) {
                        cleanQuery = (window.AIRLINES[icaoPrefix].code + numPart).toLowerCase();
                    }
                }

                if (cleanQuery.length >= 3) {
                    const flightNo = (f.flightNo || '').toLowerCase().replace(/\s+/g, '');
                    const callsign = (f.callsign || '').toLowerCase().replace(/\s+/g, '');
                    const reg = (f.registration || '').toLowerCase();
                    if (flightNo.includes(cleanQuery) || callsign.includes(cleanQuery) || reg.includes(cleanQuery)) {
                        matchesFlightSearchDirectly = true;
                    }
                }
            }

            // If it directly matches the searched flight/registration, bypass other filters so it's always found
            if (matchesFlightSearchDirectly) {
                return true;
            }

            if (hideInternational && (f.origin.state === 'INTL' || f.dest.state === 'INTL')) return false;

            if (typeFilter !== 'all') {
                const fType = getFlightType(f);
                if (fType !== typeFilter) return false;
            }

            if (airlineFilter !== 'all' && f.airlineCode !== airlineFilter) return false;

            if (statusFilter !== 'all') {
                if (statusFilter === 'delayed' && f.status !== 'Delayed') return false;
                if (statusFilter === 'landed' && f.status !== 'Landed') return false;
                if (statusFilter === 'airborne' && !['En Route', 'Climbing', 'Descending'].includes(f.status)) return false;
                if (statusFilter === 'scheduled' && !['Scheduled', 'Boarding'].includes(f.status)) return false;
                if (statusFilter === 'booked' && !['Scheduled', 'Boarding', 'Delayed'].includes(f.status)) return false;
            }

            if (stateFilter !== 'all') {
                const originState = f.origin ? f.origin.state : null;
                const destState = f.dest ? f.dest.state : null;
                if (originState !== stateFilter && destState !== stateFilter) return false;
            }

            if (selectedAirportCode) {
                if (selectedAirportFidsTab === 'departures' && f.origin.code !== selectedAirportCode) return false;
                if (selectedAirportFidsTab === 'arrivals' && f.dest.code !== selectedAirportCode) return false;
            }

            if (searchFilter) {
                const query = searchFilter.toLowerCase().trim();
                let cleanQuery = query.replace(/\s+/g, '');
                
                // Normalize cleanQuery to IATA format if it is in ICAO format
                const icaoMatch = cleanQuery.match(/^([a-z]{3})(\d{1,4}[a-z]?)$/i);
                if (icaoMatch && window.AIRLINES) {
                    const icaoPrefix = icaoMatch[1].toUpperCase();
                    const numPart = icaoMatch[2];
                    if (window.AIRLINES[icaoPrefix]) {
                        cleanQuery = (window.AIRLINES[icaoPrefix].code + numPart).toLowerCase();
                    }
                }

                const flightNo = (f.flightNo || '').toLowerCase().replace(/\s+/g, '');
                const callsign = (f.callsign || '').toLowerCase().replace(/\s+/g, '');
                const airline = (f.airline || '').toLowerCase();
                const airlineCode = (f.airlineCode || '').toLowerCase();
                const registration = (f.registration || '').toLowerCase();
                const aircraftType = (f.aircraftType || '').toLowerCase();

                const matchesNo = flightNo.includes(cleanQuery) || callsign.includes(cleanQuery) || registration.includes(cleanQuery) || flightNo.includes(query) || callsign.includes(query) || registration.includes(query);
                const matchesAirline = airline.includes(query) || airlineCode.includes(query);
                const matchesAircraft = aircraftType.includes(query);

                const originCode = (f.origin.code || '').toLowerCase();
                const originCity = (f.origin.city || '').toLowerCase();
                const originName = (f.origin.name || '').toLowerCase();
                const matchesOrigin = originCode.includes(query) || originCity.includes(query) || originName.includes(query);

                const destCode = (f.dest.code || '').toLowerCase();
                const destCity = (f.dest.city || '').toLowerCase();
                const destName = (f.dest.name || '').toLowerCase();
                const matchesDest = destCode.includes(query) || destCity.includes(query) || destName.includes(query);
                
                if (!matchesNo && !matchesAirline && !matchesAircraft && !matchesOrigin && !matchesDest) return false;
            }

            return true;
        });
    }

    function updateMapLayers(flights) {
        const filtered = getFilteredFlights(flights);
        const visibleIds = new Set();

        // Clear selected flight if it gets filtered out
        if (selectedFlightId && !filtered.some(f => f.id === selectedFlightId)) {
            selectedFlightId = null;
        }

        filtered.forEach(flight => {
            visibleIds.add(flight.id);
            const isSelected = flight.id === selectedFlightId;
            const latlng = [flight.currentLat, flight.currentLon];
            const isScheduled = ['Scheduled', 'Boarding', 'Delayed'].includes(flight.status);

            if (!planeMarkers[flight.id]) {
                const marker = L.marker(latlng, {
                    icon: createPlaneIcon(flight.currentHeading, flight.airlineColor, isSelected, isScheduled),
                    zIndexOffset: isSelected ? 2000 : 500
                }).addTo(map);

                marker.bindTooltip(flight.flightNo, {
                    direction: 'top',
                    offset: [0, -10],
                    className: 'plane-tooltip'
                });

                marker.on('click', () => selectFlight(flight.id));
                
                // Cache state values on marker to prevent unnecessary redraws
                marker._lastHeading = flight.currentHeading;
                marker._lastColor = flight.airlineColor;
                marker._lastSelected = isSelected;
                marker._lastScheduled = isScheduled;

                planeMarkers[flight.id] = marker;
            } else {
                const marker = planeMarkers[flight.id];
                const currentLatLng = marker.getLatLng();
                if (currentLatLng.lat !== latlng[0] || currentLatLng.lng !== latlng[1]) {
                    marker.setLatLng(latlng);
                }
                
                // Only call setIcon if the icon properties changed (highly optimized)
                if (marker._lastHeading !== flight.currentHeading || 
                    marker._lastColor !== flight.airlineColor || 
                    marker._lastSelected !== isSelected ||
                    marker._lastScheduled !== isScheduled) {
                    
                    marker.setIcon(createPlaneIcon(flight.currentHeading, flight.airlineColor, isSelected, isScheduled));
                    marker._lastHeading = flight.currentHeading;
                    marker._lastColor = flight.airlineColor;
                    marker._lastSelected = isSelected;
                    marker._lastScheduled = isScheduled;
                }
                marker.setZIndexOffset(isSelected ? 2000 : 500);
            }
        });

        // Prune old plane markers
        Object.keys(planeMarkers).forEach(id => {
            if (!visibleIds.has(id)) {
                map.removeLayer(planeMarkers[id]);
                delete planeMarkers[id];
            }
        });

        // Redraw route lines
        renderFlightPathRoute(flights);
    }

    // Render route polylines
    function renderFlightPathRoute(flights) {
        if (routeSolidLine) map.removeLayer(routeSolidLine);
        if (routeDashedLine) map.removeLayer(routeDashedLine);
        routeSolidLine = null;
        routeDashedLine = null;

        if (!selectedFlightId) return;

        const flight = flights.find(f => f.id === selectedFlightId);
        if (!flight || flight.status === 'Landed') return;

        const currentLoc = [flight.currentLat, flight.currentLon];
        const hasOrigin = flight.origin.lat !== null && flight.origin.lon !== null;
        const hasDest = flight.dest.lat !== null && flight.dest.lon !== null;

        // Draw dashed line: if origin OR dest is available, draw from startLoc to endLoc.
        // If origin is missing, draw from currentLoc to destination.
        // If destination is missing, draw from origin to currentLoc.
        if ((hasOrigin || hasDest) && !mobileOptimized) {
            const startLoc = hasOrigin ? [flight.origin.lat, flight.origin.lon] : currentLoc;
            const endLoc = hasDest ? [flight.dest.lat, flight.dest.lon] : currentLoc;

            routeDashedLine = L.polyline([startLoc, endLoc], {
                color: flight.airlineColor,
                weight: 1.5,
                className: 'flowing-route-line',
                opacity: 0.45
            }).addTo(map);
        }

        let trackPoints = [];
        if (hasOrigin) {
            trackPoints.push([flight.origin.lat, flight.origin.lon]);
        }
        if (flight.history && flight.history.length > 0) {
            trackPoints = trackPoints.concat(flight.history);
        }
        trackPoints.push(currentLoc);

        // If the path contains only the current position (e.g. unknown origin and no real history points yet),
        // we project a short history vector backwards along the heading so a solid direction line is visible immediately.
        if (trackPoints.length < 2 || (trackPoints.length === 2 && trackPoints[0][0] === trackPoints[1][0] && trackPoints[0][1] === trackPoints[1][1])) {
            if (flight.currentSpeed > 20 && flight.currentHeading !== undefined) {
                const speedKmh = flight.currentSpeed * 1.852;
                const distanceProj = Math.min(speedKmh * 0.15, 50); // Project 9 mins flight path, max 50 km
                const headingRad = (flight.currentHeading - 180) * Math.PI / 180;
                const earthRadius = 6371;
                const lat1 = flight.currentLat * Math.PI / 180;
                const lon1 = flight.currentLon * Math.PI / 180;
                const dR = distanceProj / earthRadius;

                const lat2 = Math.asin(Math.sin(lat1) * Math.cos(dR) + Math.cos(lat1) * Math.sin(dR) * Math.cos(headingRad));
                const lon2 = lon1 + Math.atan2(Math.sin(headingRad) * Math.sin(dR) * Math.cos(lat1), Math.cos(dR) - Math.sin(lat1) * Math.sin(lat2));

                const projLoc = [lat2 * 180 / Math.PI, (lon2 * 180 / Math.PI + 540) % 360 - 180];
                trackPoints = [projLoc, currentLoc];
            }
        }

        if (trackPoints.length >= 2) {
            routeSolidLine = L.polyline(trackPoints, {
                color: flight.airlineColor,
                weight: 3.5,
                opacity: 0.85
            }).addTo(map);
        }
    }

    // 7. Sidebar dashboard updates
    function updateSidebar(flights) {
        const board = document.getElementById('flights-board');

        // Sync active highlighting
        updateCounterFilterBadgeHighlight();

        const banner = document.getElementById('airport-filter-header');
        if (selectedAirportCode) {
            const ap = window.AIRPORTS[selectedAirportCode];
            document.getElementById('lbl-airport-code').textContent = selectedAirportCode;
            document.getElementById('lbl-airport-name').textContent = ap ? ap.name : 'Selected Airport';
            banner.style.display = 'flex';
        } else {
            banner.style.display = 'none';
        }

        const filtered = getFilteredFlights(flights);

        filtered.sort((a, b) => {
            const order = { 'Climbing': 1, 'Descending': 1, 'En Route': 1, 'Delayed': 2, 'Boarding': 3, 'Scheduled': 4, 'Landed': 5 };
            return (order[a.status] || 9) - (order[b.status] || 9);
        });

        let cardsHtml = '';
        if (filtered.length === 0) {
            cardsHtml = `<div style="text-align: center; color: var(--text-muted); padding: 40px 10px; font-size: 0.85rem;">No flights match the current query.</div>`;
        } else {
            filtered.forEach(f => {
                const isSelected = f.id === selectedFlightId;
                const badgeClass = f.status.toLowerCase().replace(' ', '-');
                const today = new Date();
                const depDate = new Date(f.departureTime);
                const arrDate = new Date(f.arrivalTime);
                
                const isDepToday = depDate.getDate() === today.getDate() && depDate.getMonth() === today.getMonth() && depDate.getFullYear() === today.getFullYear();
                const isArrToday = arrDate.getDate() === today.getDate() && arrDate.getMonth() === today.getMonth() && arrDate.getFullYear() === today.getFullYear();
                
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const depPrefix = isDepToday ? '' : `${days[depDate.getDay()]} `;
                const arrPrefix = isArrToday ? '' : `${days[arrDate.getDay()]} `;
                
                const depTime = depPrefix + depDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const arrTime = arrPrefix + arrDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                let delayText = '';
                if (f.delayMinutes > 0) {
                    delayText = `<span style="color: var(--amber); font-weight: 700; margin-left: 5px;">(+${f.delayMinutes}m)</span>`;
                }

                const carrierCode = (f.flightNo || '??').substring(0, 2).toUpperCase();
                const knownCarriers = ['QF', 'VA', 'JQ', 'ZL'];
                const badgeStyleClass = knownCarriers.includes(carrierCode) ? carrierCode.toLowerCase() : 'other';

                let telemetryLine = '';
                if (['En Route', 'Climbing', 'Descending', 'Delayed'].includes(f.status) && f.currentAlt > 0) {
                    const altStr = f.currentAlt.toLocaleString();
                    const speedKmh = Math.round(f.currentSpeed * 1.852);
                    telemetryLine = `
                        <div class="card-telemetry-row">
                            <span>✈ Alt: <strong>${altStr} ft</strong></span>
                            <span>Speed: <strong>${f.currentSpeed} kts (${speedKmh} km/h)</strong></span>
                        </div>
                    `;
                }

                cardsHtml += `
                    <div class="flight-card ${isSelected ? 'selected' : ''}" style="--airline-color: ${f.airlineColor}" data-id="${f.id}">
                        <div class="card-top">
                            <span class="airline-logo-badge ${badgeStyleClass}">${carrierCode}</span>
                            <span class="flight-no">${f.flightNo}</span>
                            <span class="airline-name">${f.airline}</span>
                        </div>
                        <div class="card-middle">
                            <div class="node">
                                <span class="card-code">${f.origin.code}</span>
                                <span class="card-city">${f.origin.city}</span>
                            </div>
                            <div class="vector-line"></div>
                            <div class="node align-right">
                                <span class="card-code">${f.dest.code}</span>
                                <span class="card-city">${f.dest.city}</span>
                            </div>
                        </div>
                        <div class="card-bottom">
                            <span class="card-schedule">${depTime} ➔ ${arrTime}${delayText}</span>
                            <span class="status-tag ${badgeClass}">${f.status}</span>
                        </div>
                        ${telemetryLine}
                        ${['En Route', 'Climbing', 'Descending', 'Delayed'].includes(f.status) ? `
                            <div class="progress-mini" style="width: ${Math.round(f.progress * 100)}%"></div>
                        ` : ''}
                    </div>
                `;
            });
        }
        const scrollPos = board ? board.scrollTop : 0;
        if (board) board.innerHTML = cardsHtml;
        if (board) board.scrollTop = scrollPos;

        document.querySelectorAll('.flight-card').forEach(card => {
            card.addEventListener('click', () => {
                selectFlight(card.dataset.id);
            });
        });
    }

    // 8. General Stat Counters
    function updateSidebarCounters(flights) {
        const airborne = flights.filter(f => ['En Route', 'Climbing', 'Descending', 'Delayed'].includes(f.status)).length;
        const delayed = flights.filter(f => f.status === 'Delayed').length;
        const landed = flights.filter(f => f.status === 'Landed').length;
        const booked = flights.filter(f => f.id.startsWith('SCHED-') || f.id.startsWith('DYNAMIC-')).length;

        document.getElementById('count-active').textContent = airborne;
        document.getElementById('count-delayed').textContent = delayed;
        document.getElementById('count-landed').textContent = landed;
        
        const bookedEl = document.getElementById('count-booked');
        if (bookedEl) bookedEl.textContent = booked;
        
        document.getElementById('overlay-airborne-count').textContent = airborne;
        document.getElementById('overlay-ground-count').textContent = landed;
    }

    // 9. Telemetry sliding drawer detail
    function updateTelemetryDrawer(flights) {
        const drawer = document.getElementById('telemetry-drawer');
        if (!selectedFlightId) {
            drawer.classList.remove('active');
            return;
        }

        const flight = flights.find(f => f.id === selectedFlightId);
        if (!flight) {
            selectedFlightId = null;
            drawer.classList.remove('active');
            return;
        }

        drawer.classList.add('active');

        const carrierLogo = document.getElementById('telemetry-carrier-logo');
        carrierLogo.style.backgroundColor = flight.airlineColor;
        carrierLogo.textContent = flight.airlineCode || flight.flightNo.slice(0, 2);

        document.getElementById('telemetry-flight-no').textContent = flight.flightNo;
        document.getElementById('telemetry-reg').textContent = flight.registration || 'N/A';
        document.getElementById('telemetry-aircraft-model').textContent = flight.aircraftType;

        document.getElementById('telemetry-origin-code').textContent = flight.origin.code;
        document.getElementById('telemetry-origin-name').textContent = flight.origin.city;
        document.getElementById('telemetry-dest-code').textContent = flight.dest.code;
        document.getElementById('telemetry-dest-name').textContent = flight.dest.city;

        const today = new Date();
        const depDate = new Date(flight.departureTime);
        const arrDate = new Date(flight.arrivalTime);
        
        const isDepToday = depDate.getDate() === today.getDate() && depDate.getMonth() === today.getMonth() && depDate.getFullYear() === today.getFullYear();
        const isArrToday = arrDate.getDate() === today.getDate() && arrDate.getMonth() === today.getMonth() && arrDate.getFullYear() === today.getFullYear();
        
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const depPrefix = isDepToday ? '' : `${days[depDate.getDay()]} `;
        const arrPrefix = isArrToday ? '' : `${days[arrDate.getDay()]} `;
        
        const depTime = depPrefix + depDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const arrTime = arrPrefix + arrDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        document.getElementById('telemetry-dep-time').textContent = depTime;
        document.getElementById('telemetry-arr-time').textContent = arrTime;

        const percent = Math.round(flight.progress * 100);
        document.getElementById('telemetry-percent').textContent = `${percent}%`;
        document.getElementById('telemetry-progress-fill').style.width = `${percent}%`;

        document.getElementById('telemetry-altitude').textContent = flight.status === 'Landed' ? '0 ft' : `${flight.currentAlt.toLocaleString()} ft`;
        document.getElementById('telemetry-speed').textContent = flight.status === 'Landed' ? '0 kts' : `${flight.currentSpeed} kts`;
        document.getElementById('telemetry-heading').textContent = `${Math.round(flight.currentHeading)}°`;
        let distanceText = '--';
        if (flight.status === 'Landed') {
            distanceText = '0 km';
        } else if (flight.dest && flight.dest.lat !== null && flight.dest.lon !== null) {
            const distLeft = Math.round(simulator.getGreatCircleDistance(
                flight.currentLat,
                flight.currentLon,
                flight.dest.lat,
                flight.dest.lon
            ));
            distanceText = `${distLeft.toLocaleString()} km`;
        }
        document.getElementById('telemetry-distance').textContent = distanceText;

        const statusEl = document.getElementById('telemetry-status-text');
        statusEl.textContent = flight.status;
        statusEl.className = "status-val";
        if (flight.status === 'Landed') statusEl.classList.add('text-emerald');
        else if (flight.status === 'Delayed') statusEl.classList.add('text-amber');
        else statusEl.classList.add('text-cyan');

        const delayEl = document.getElementById('telemetry-delay-text');
        if (flight.status === 'Landed') {
            delayEl.textContent = 'Arrived';
            delayEl.className = "status-val text-emerald";
        } else if (flight.delayMinutes > 0) {
            delayEl.textContent = `Delayed +${flight.delayMinutes}m`;
            delayEl.className = "status-val text-amber";
        } else {
            delayEl.textContent = 'On Time';
            delayEl.className = "status-val text-emerald";
        }
    }

    function getActiveRouteList() {
        const list = [...userFlights, ...liveFlights];
        
        // If there's an active search query that looks like a flight number,
        // and it is not in the list, dynamically inject it as a scheduled flight!
        if (searchFilter) {
            let query = searchFilter.replace(/\s+/g, '').toUpperCase();
            
            // Normalize ICAO query to IATA query (e.g. QFA123 -> QF123)
            const icaoMatch = query.match(/^([A-Z]{3})(\d{1,4}[A-Z]?)$/);
            if (icaoMatch && window.AIRLINES) {
                const icaoPrefix = icaoMatch[1].toUpperCase();
                const numPart = icaoMatch[2];
                if (window.AIRLINES[icaoPrefix]) {
                    query = window.AIRLINES[icaoPrefix].code + numPart;
                }
            }
            
            if (/^[A-Z]{2,3}\d{1,4}$/.test(query)) {
                const exists = list.some(f => f.flightNo.toUpperCase() === query);
                if (!exists) {
                    // Extract airline code
                    const match = query.match(/^([A-Z]{2,3})(\d{1,4})$/);
                    let airlinePrefix = match[1];
                    let airlineCode = "QFA"; // Default
                    if (airlinePrefix === "QF") airlineCode = "QFA";
                    else if (airlinePrefix === "VA") airlineCode = "VOZ";
                    else if (airlinePrefix === "JQ") airlineCode = "JST";
                    else if (airlinePrefix === "ZL") airlineCode = "RXA";
                    else {
                        // Look up in window.AIRLINES if there's any airline starting with that prefix or having that code
                        const found = Object.keys(window.AIRLINES).find(key => window.AIRLINES[key].code === airlinePrefix);
                        if (found) airlineCode = found;
                    }
                    
                    // Generate flight details
                    const now = Date.now();
                    const hourEpoch = Math.floor(now / (60 * 60 * 1000));
                    
                    const KNOWN_FLIGHTS_SCHEDULE = {
                        'QQ4359': { origin: 'MOV', dest: 'BNE', aircraft: 'Fokker 100', daysOfWeek: [3, 4], timeStr: '15:25', durationMs: 86 * 60 * 1000 }, // Wed/Thu at 3:25 PM
                        'QF1929': { origin: 'EMD', dest: 'BNE', aircraft: 'Dash 8 Q400', registration: 'VH-QQA', isDaily: true } // Daily Emerald-Brisbane
                    };
                    
                    let originObj, destObj, departureTime, aircraftType, registration, customDurationMs = null;
                    
                    const normalizedQuery = query.toUpperCase();
                    if (KNOWN_FLIGHTS_SCHEDULE[normalizedQuery]) {
                        const sched = KNOWN_FLIGHTS_SCHEDULE[normalizedQuery];
                        originObj = window.AIRPORTS[sched.origin] || window.AIRPORTS['SYD'];
                        destObj = window.AIRPORTS[sched.dest] || window.AIRPORTS['MEL'];
                        aircraftType = sched.aircraft || 'Boeing 737-800';
                        registration = sched.registration || 'VH-QQA';
                        if (sched.durationMs) customDurationMs = sched.durationMs;
                        
                        if (sched.isDaily) {
                            departureTime = new Date(now + 150 * 60 * 1000); // 2.5 hours in future (today)
                        } else {
                            // Calculate next Wednesday (3) or Thursday (4)
                            const daysOfWeek = sched.daysOfWeek;
                            const [hours, minutes] = sched.timeStr.split(':').map(Number);
                            
                            let nextDate = null;
                            let minDiffMs = Infinity;
                            
                            daysOfWeek.forEach(targetDay => {
                                const tempDate = new Date(now);
                                const currentDay = tempDate.getDay();
                                let daysUntilTarget = (targetDay - currentDay + 7) % 7;
                                if (daysUntilTarget === 0 && (tempDate.getHours() > hours || (tempDate.getHours() === hours && tempDate.getMinutes() >= minutes))) {
                                    daysUntilTarget = 7;
                                }
                                tempDate.setDate(tempDate.getDate() + daysUntilTarget);
                                tempDate.setHours(hours, minutes, 0, 0);
                                
                                const diff = tempDate.getTime() - now;
                                if (diff < minDiffMs) {
                                    minDiffMs = diff;
                                    nextDate = tempDate;
                                }
                            });
                            departureTime = nextDate;
                        }
                    } else {
                        // Network & Fleet Heuristics Engine
                        const hubsCapitals = ['SYD', 'MEL', 'BNE', 'ADL', 'PER'];
                        const regionalSpokes = ['EMD', 'MOV', 'WGA', 'ABX', 'CBR', 'CNS', 'HBA', 'MQL', 'PQQ', 'DPO', 'LST', 'MKY', 'TSV'];
                        
                        // Seed hash from flight query to keep route consistent
                        let hash = 0;
                        for (let i = 0; i < normalizedQuery.length; i++) {
                            hash = normalizedQuery.charCodeAt(i) + ((hash << 5) - hash);
                        }
                        const seed = Math.abs(hash);
                        
                        // Parse flight number
                        const match = normalizedQuery.match(/^([A-Z]{2,3})(\d{1,4})$/);
                        const carrier = match ? match[1] : airlineCode;
                        const number = match ? parseInt(match[2], 10) : 100;
                        
                        if (carrier === 'QF' || carrier === 'QFA') {
                            if (number >= 1000 && number < 3000) {
                                // QantasLink regional turboprop
                                aircraftType = 'Dash 8 Q400';
                                registration = 'VH-QO' + String.fromCharCode(65 + (seed % 26)) + String.fromCharCode(65 + ((seed + 1) % 26));
                                
                                const spoke = regionalSpokes[seed % regionalSpokes.length];
                                const hub = hubsCapitals[(seed + 2) % hubsCapitals.length];
                                if (seed % 2 === 0) {
                                    originObj = window.AIRPORTS[spoke] || window.AIRPORTS['EMD'];
                                    destObj = window.AIRPORTS[hub] || window.AIRPORTS['BNE'];
                                } else {
                                    originObj = window.AIRPORTS[hub] || window.AIRPORTS['BNE'];
                                    destObj = window.AIRPORTS[spoke] || window.AIRPORTS['EMD'];
                                }
                            } else {
                                // Qantas Mainline jet
                                aircraftType = seed % 4 === 0 ? 'Airbus A330-200' : 'Boeing 737-800';
                                registration = aircraftType.startsWith('Airbus') ? 
                                    'VH-EB' + String.fromCharCode(65 + (seed % 26)) : 
                                    'VH-XZ' + String.fromCharCode(65 + (seed % 26));
                                    
                                const hub1 = hubsCapitals[seed % hubsCapitals.length];
                                let hub2 = hubsCapitals[(seed + 3) % hubsCapitals.length];
                                if (hub1 === hub2) hub2 = hubsCapitals[(seed + 1) % hubsCapitals.length];
                                
                                originObj = window.AIRPORTS[hub1];
                                destObj = window.AIRPORTS[hub2];
                            }
                        } else if (carrier === 'VA' || carrier === 'VOZ') {
                            // Virgin Australia trunk or minor holiday route
                            aircraftType = 'Boeing 737-800';
                            registration = 'VH-VU' + String.fromCharCode(65 + (seed % 26));
                            
                            const cities = [...hubsCapitals, 'OOL', 'CNS', 'HBA', 'TSV'];
                            const city1 = cities[seed % cities.length];
                            let city2 = cities[(seed + 4) % cities.length];
                            if (city1 === city2) city2 = cities[(seed + 1) % cities.length];
                            
                            originObj = window.AIRPORTS[city1];
                            destObj = window.AIRPORTS[city2];
                        } else if (carrier === 'JQ' || carrier === 'JST') {
                            // Jetstar budget holiday route
                            aircraftType = 'Airbus A320';
                            registration = 'VH-VQ' + String.fromCharCode(65 + (seed % 26));
                            
                            const leisureDest = ['SYD', 'MEL', 'BNE', 'OOL', 'CNS', 'HBA', 'MCY', 'TSV', 'AVV'];
                            const city1 = leisureDest[seed % leisureDest.length];
                            let city2 = leisureDest[(seed + 2) % leisureDest.length];
                            if (city1 === city2) city2 = leisureDest[(seed + 1) % leisureDest.length];
                            
                            originObj = window.AIRPORTS[city1];
                            destObj = window.AIRPORTS[city2];
                        } else if (carrier === 'ZL' || carrier === 'RXA') {
                            if (number < 1000) {
                                // Rex Regional SAAB turboprop
                                aircraftType = 'Saab 340B';
                                registration = 'VH-ZX' + String.fromCharCode(65 + (seed % 26));
                                
                                const spoke = regionalSpokes[seed % regionalSpokes.length];
                                const hub = hubsCapitals[(seed + 1) % hubsCapitals.length];
                                if (seed % 2 === 0) {
                                    originObj = window.AIRPORTS[spoke] || window.AIRPORTS['WGA'];
                                    destObj = window.AIRPORTS[hub] || window.AIRPORTS['SYD'];
                                } else {
                                    originObj = window.AIRPORTS[hub] || window.AIRPORTS['SYD'];
                                    destObj = window.AIRPORTS[spoke] || window.AIRPORTS['WGA'];
                                }
                            } else {
                                // Rex mainline Jet
                                aircraftType = 'Boeing 737-800';
                                registration = 'VH-8RP';
                                
                                const jetHubs = ['SYD', 'MEL', 'BNE', 'OOL', 'ADL'];
                                const city1 = jetHubs[seed % jetHubs.length];
                                let city2 = jetHubs[(seed + 2) % jetHubs.length];
                                if (city1 === city2) city2 = jetHubs[(seed + 1) % jetHubs.length];
                                
                                originObj = window.AIRPORTS[city1];
                                destObj = window.AIRPORTS[city2];
                            }
                        } else if (carrier === 'QQ' || carrier === 'UTY') {
                            // Alliance FIFO / Mining Charter
                            aircraftType = seed % 2 === 0 ? 'Fokker 100' : 'Embraer E190';
                            registration = aircraftType === 'Fokker 100' ? 
                                'VH-FK' + String.fromCharCode(65 + (seed % 26)) : 
                                'VH-XQ' + String.fromCharCode(65 + (seed % 26));
                                
                            const miningSpokes = ['MOV', 'ISA', 'EMD', 'MKY', 'TSV'];
                            const hub = 'BNE'; // Alliance's main FIFO hub
                            
                            if (seed % 2 === 0) {
                                originObj = window.AIRPORTS[miningSpokes[seed % miningSpokes.length]] || window.AIRPORTS['MOV'];
                                destObj = window.AIRPORTS[hub];
                            } else {
                                originObj = window.AIRPORTS[hub];
                                destObj = window.AIRPORTS[miningSpokes[seed % miningSpokes.length]] || window.AIRPORTS['MOV'];
                            }
                        } else {
                            // Generic fallback
                            const airportKeys = Object.keys(window.AIRPORTS).filter(k => window.AIRPORTS[k].state !== 'INTL');
                            const originKey = airportKeys[seed % airportKeys.length];
                            let destKey = airportKeys[(seed + 3) % airportKeys.length];
                            if (destKey === originKey) destKey = airportKeys[(seed + 1) % airportKeys.length];
                            
                            originObj = window.AIRPORTS[originKey];
                            destObj = window.AIRPORTS[destKey];
                            aircraftType = 'Boeing 737-800';
                            registration = 'VH-VHD';
                        }
                        
                        departureTime = new Date(now + 150 * 60 * 1000); // 2.5 hours in future
                    }
                    
                    let airlineName = "Charter / Cargo / General Aviation";
                    let airlineColor = "#6b7280";
                    let isLight = true;
                    if (window.AIRLINES[airlineCode]) {
                        const al = window.AIRLINES[airlineCode];
                        airlineName = al.name;
                        airlineColor = al.color;
                        isLight = al.textLight;
                    }
                    
                    const distKm = Math.round(simulator.getGreatCircleDistance(originObj.lat, originObj.lon, destObj.lat, destObj.lon));
                    // Cruise speed around 800 km/h
                    const durationMs = customDurationMs || (Math.round((distKm / 800) * 3600 * 1000) + (15 * 60 * 1000)); // +15 min taxi

                    list.push({
                        id: `DYNAMIC-${query}-${hourEpoch}`,
                        flightNo: query,
                        callsign: query,
                        airline: airlineName,
                        airlineCode: airlineCode,
                        airlineColor: airlineColor,
                        airlineTextLight: isLight,
                        aircraftType: aircraftType,
                        registration: registration,
                        maxAltitude: 39000,
                        maxSpeed: 450,
                        origin: originObj,
                        dest: destObj,
                        distanceKm: distKm,
                        durationMs: durationMs,
                        departureTime: departureTime,
                        arrivalTime: new Date(departureTime.getTime() + durationMs),
                        status: 'Scheduled',
                        delayMinutes: 0,
                        progress: 0,
                        currentLat: originObj.lat,
                        currentLon: originObj.lon,
                        currentAlt: 0,
                        currentSpeed: 0,
                        currentHeading: 0,
                        verticalRate: 0,
                        history: [],
                        isLive: true
                    });
                }
            }
        }
        
        return list;
    }

    // 10. Selection Orchestrator
    function selectFlight(id) {
        const list = getActiveRouteList();
        if (selectedFlightId === id) {
            selectedFlightId = null;
        } else {
            selectedFlightId = id;
            const f = list.find(flight => flight.id === id);
            if (f) {
                const points = [[f.currentLat, f.currentLon]];
                if (f.origin && f.origin.lat !== null && f.origin.lon !== null) {
                    points.push([f.origin.lat, f.origin.lon]);
                }
                if (f.dest && f.dest.lat !== null && f.dest.lon !== null) {
                    points.push([f.dest.lat, f.dest.lon]);
                }
                
                if (points.length > 1) {
                    const bounds = L.latLngBounds(points);
                    map.fitBounds(bounds, { padding: [80, 80], maxZoom: 7 });
                } else {
                    map.setView([f.currentLat, f.currentLon], 6);
                }
            }
        }
        updateDashboard(list);

        if (window.innerWidth <= 900 && id) {
            const sidebar = document.querySelector('.dashboard-sidebar');
            const toggleBtn = document.getElementById('btn-sidebar-toggle');
            if (sidebar && toggleBtn) {
                sidebar.classList.remove('sidebar-open');
                toggleBtn.classList.remove('sidebar-open');
                toggleBtn.innerHTML = '📋';
            }
        }
    }

    function selectAirport(code) {
        if (selectedAirportCode === code) {
            selectedAirportCode = null;
        } else {
            selectedAirportCode = code;
            selectedFlightId = null;
            const ap = window.AIRPORTS[code];
            if (ap) {
                map.panTo([ap.lat, ap.lon]);
            }
        }

        if (!selectedAirportCode) {
            selectedAirportFidsTab = 'departures';
            const btnFidsDeps = document.getElementById('btn-fids-departures');
            const btnFidsArrs = document.getElementById('btn-fids-arrivals');
            if (btnFidsDeps && btnFidsArrs) {
                btnFidsDeps.classList.add('active');
                btnFidsArrs.classList.remove('active');
            }
        }

        Object.keys(airportMarkers).forEach(c => {
            const m = airportMarkers[c];
            const ap = window.AIRPORTS[c];
            const isSel = c === selectedAirportCode;
            
            m.setIcon(L.divIcon({
                className: `airport-marker ${isSel ? 'selected' : ''}`,
                html: `
                    <div class="airport-marker-dot"></div>
                    <div class="airport-label">${ap.code}</div>
                `,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            }));
        });

        const list = getActiveRouteList();
        updateAirportMarkersVisibility();
        updateDashboard(list);
        drawAirportDestinationConnections();

        if (window.innerWidth <= 900 && code) {
            const sidebar = document.querySelector('.dashboard-sidebar');
            const toggleBtn = document.getElementById('btn-sidebar-toggle');
            if (sidebar && toggleBtn) {
                sidebar.classList.add('sidebar-open');
                toggleBtn.classList.add('sidebar-open');
                toggleBtn.innerHTML = '✕';
            }
        }
    }

    function drawAirportDestinationConnections() {
        airportConnectionLines.forEach(line => map.removeLayer(line));
        airportConnectionLines = [];

        if (!selectedAirportCode || mobileOptimized) return;

        const ap = window.AIRPORTS[selectedAirportCode];
        if (!ap) return;

        const list = getActiveRouteList();
        const destinations = new Set();

        list.forEach(f => {
            if (f.status === 'Landed') return;
            if (selectedAirportFidsTab === 'departures' && f.origin.code === selectedAirportCode) {
                destinations.add(f.dest.code);
            } else if (selectedAirportFidsTab === 'arrivals' && f.dest.code === selectedAirportCode) {
                destinations.add(f.origin.code);
            }
        });

        destinations.forEach(code => {
            const other = window.AIRPORTS[code];
            if (other && other.lat !== null) {
                const line = L.polyline([[ap.lat, ap.lon], [other.lat, other.lon]], {
                    color: '#06b6d4',
                    weight: 1.5,
                    dashArray: '3, 5',
                    opacity: 0.5
                }).addTo(map);
                airportConnectionLines.push(line);
            }
        });
    }

    // 11. Unified UI Binder
    function updateDashboard(flights) {
        updateSidebar(flights);
        updateMapLayers(flights);
        updateSidebarCounters(flights);
        updateTelemetryDrawer(flights);
    }

    // 12. Input Event Handlers & Autocomplete Suggestions
    const searchInput = document.getElementById('search-input');
    const suggestionsDiv = document.getElementById('search-suggestions');
    const btnClearSearch = document.getElementById('btn-clear-search');
    // selectAirline is already defined at the top
    const selectType = document.getElementById('select-type');
    const selectState = document.getElementById('select-state');
    const selectStatus = document.getElementById('select-status');

    function toggleClearSearchButton() {
        if (!btnClearSearch || !searchInput) return;
        btnClearSearch.style.display = searchInput.value ? 'block' : 'none';
    }

    if (btnClearSearch) {
        btnClearSearch.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                searchFilter = '';
                
                selectedFlightId = null;
                selectedAirportCode = null;
                
                if (selectAirline) {
                    selectAirline.value = 'all';
                    airlineFilter = 'all';
                }
                if (selectType) {
                    selectType.value = 'all';
                    typeFilter = 'all';
                }
                if (selectState) {
                    selectState.value = 'all';
                    stateFilter = 'all';
                }
                if (selectStatus) {
                    selectStatus.value = 'all';
                    statusFilter = 'all';
                }
                
                savePreferences();
                updateDashboard(getActiveRouteList());
                renderSearchSuggestions();
                toggleClearSearchButton();
                searchInput.focus();
            }
        });
    }

    searchInput.addEventListener('input', (e) => {
        searchFilter = e.target.value;
        savePreferences();
        updateDashboard(getActiveRouteList());
        renderSearchSuggestions();
        toggleClearSearchButton();
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            suggestionsDiv.style.display = 'none';
        }
    });

    function renderSearchSuggestions() {
        const query = searchFilter.toLowerCase().trim();
        if (!query) {
            suggestionsDiv.style.display = 'none';
            suggestionsDiv.innerHTML = '';
            return;
        }

        const flights = getActiveRouteList();
        const suggestions = [];

        // 1. Matches Flight Numbers
        const matchFlights = flights.filter(f => {
            const flightNo = (f.flightNo || '').toLowerCase();
            const callsign = (f.callsign || '').toLowerCase();
            const registration = (f.registration || '').toLowerCase();
            const aircraftType = (f.aircraftType || '').toLowerCase();
            return flightNo.includes(query) || callsign.includes(query) || registration.includes(query) || aircraftType.includes(query);
        }).slice(0, 4);

        matchFlights.forEach(f => {
            suggestions.push({
                type: 'flight',
                id: f.id,
                label: `${f.flightNo} (${f.origin.code} ➔ ${f.dest.code})`,
                sub: `${f.airline} | ${f.aircraftType}`
            });
        });

        // 2. Matches Airports
        const matchAirports = Object.values(window.AIRPORTS).filter(ap => {
            const code = (ap.code || '').toLowerCase();
            const city = (ap.city || '').toLowerCase();
            const name = (ap.name || '').toLowerCase();
            return code.includes(query) || city.includes(query) || name.includes(query);
        }).slice(0, 3);

        matchAirports.forEach(ap => {
            suggestions.push({
                type: 'airport',
                id: ap.code,
                label: `${ap.city} Airport (${ap.code})`,
                sub: ap.name
            });
        });

        // 3. Matches Airlines
        const matchAirlines = Object.entries(window.AIRLINES).filter(([key, al]) => {
            const name = (al.name || '').toLowerCase();
            const code = (al.code || '').toLowerCase();
            const callsign = (al.callsign || '').toLowerCase();
            return name.includes(query) || code.includes(query) || callsign.includes(query);
        }).slice(0, 2);

        matchAirlines.forEach(([key, al]) => {
            suggestions.push({
                type: 'airline',
                id: key,
                label: al.name,
                sub: `${al.callsign} Flights`
            });
        });

        if (suggestions.length === 0) {
            suggestionsDiv.style.display = 'none';
            suggestionsDiv.innerHTML = '';
            return;
        }

        suggestionsDiv.style.display = 'flex';
        suggestionsDiv.innerHTML = suggestions.map(s => `
            <div class="suggestion-item" data-type="${s.type}" data-id="${s.id}" data-label="${s.label}">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 600;">${s.label}</span>
                    <span style="font-size: 0.72rem; color: var(--text-muted);">${s.sub}</span>
                </div>
                <span class="type-badge ${s.type}">${s.type}</span>
            </div>
        `).join('');

        suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const type = item.dataset.type;
                const id = item.dataset.id;
                
                if (type === 'flight') {
                    const f = flights.find(fl => fl.id === id);
                    if (f) {
                        searchInput.value = f.flightNo;
                        searchFilter = f.flightNo;
                    }
                    selectFlight(id);
                } else if (type === 'airport') {
                    searchInput.value = '';
                    searchFilter = '';
                    selectAirport(id);
                } else if (type === 'airline') {
                    selectAirline.value = id;
                    airlineFilter = id;
                    searchInput.value = item.dataset.label;
                    searchFilter = '';
                    updateSidebar(getActiveRouteList());
                }

                savePreferences();
                suggestionsDiv.style.display = 'none';
                suggestionsDiv.innerHTML = '';
                toggleClearSearchButton();
            });
        });
    }

    selectAirline.addEventListener('change', (e) => {
         airlineFilter = e.target.value;
         savePreferences();
         updateDashboard(getActiveRouteList());
     });
 
     selectType.addEventListener('change', (e) => {
         typeFilter = e.target.value;
         savePreferences();
         updateDashboard(getActiveRouteList());
     });
 
     selectState.addEventListener('change', (e) => {
         stateFilter = e.target.value;
         savePreferences();
         updateDashboard(getActiveRouteList());
     });

    selectStatus.addEventListener('change', (e) => {
        statusFilter = e.target.value;
        savePreferences();
        updateDashboard(getActiveRouteList());
    });

    // Counter Badge Clicks
    function updateCounterFilterBadgeHighlight() {
        const activeCard = document.getElementById('filter-active-card');
        const delayedCard = document.getElementById('filter-delayed-card');
        const landedCard = document.getElementById('filter-landed-card');
        const bookedCard = document.getElementById('filter-booked-card');

        if (activeCard) activeCard.classList.remove('active-filter');
        if (delayedCard) delayedCard.classList.remove('active-filter');
        if (landedCard) landedCard.classList.remove('active-filter');
        if (bookedCard) bookedCard.classList.remove('active-filter');

        if (statusFilter === 'airborne' && activeCard) activeCard.classList.add('active-filter');
        else if (statusFilter === 'delayed' && delayedCard) delayedCard.classList.add('active-filter');
        else if (statusFilter === 'landed' && landedCard) landedCard.classList.add('active-filter');
        else if (statusFilter === 'booked' && bookedCard) bookedCard.classList.add('active-filter');
    }

    function savePreferences() {
        localStorage.setItem('pref_searchFilter', searchFilter);
        localStorage.setItem('pref_airlineFilter', airlineFilter);
        localStorage.setItem('pref_statusFilter', statusFilter);
        localStorage.setItem('pref_stateFilter', stateFilter);
        localStorage.setItem('pref_typeFilter', typeFilter);
        localStorage.setItem('pref_hideInternational', hideInternational);
        localStorage.setItem('pref_mobileOptimized', mobileOptimized);
        localStorage.setItem('pref_weatherRadarActive', weatherRadarLayer !== null);
    }

    function setWeatherRadarState(active) {
        const toggleBtn = document.getElementById('btn-toggle-weather');
        if (!toggleBtn) return;
        
        if (!active) {
            if (weatherRadarLayer) {
                map.removeLayer(weatherRadarLayer);
                weatherRadarLayer = null;
            }
            toggleBtn.classList.remove('active');
            savePreferences();
        } else {
            toggleBtn.classList.add('active');
            fetch('https://api.rainviewer.com/public/weather-maps.json')
                .then(res => {
                    if (!res.ok) throw new Error('RainViewer API error');
                    return res.json();
                })
                .then(data => {
                    if (!toggleBtn.classList.contains('active')) {
                        // User disabled it while fetching
                        return;
                    }
                    let latestFrame = null;
                    if (data.radar && data.radar.nowcast && data.radar.nowcast.length > 0) {
                        latestFrame = data.radar.nowcast[0].path;
                    } else if (data.radar && data.radar.past && data.radar.past.length > 0) {
                        latestFrame = data.radar.past[data.radar.past.length - 1].path;
                    }
                    
                    if (!latestFrame) {
                        console.error('No radar frame path found in RainViewer API response');
                        toggleBtn.classList.remove('active');
                        savePreferences();
                        return;
                    }

                    const tileUrl = `https://tilecache.rainviewer.com${latestFrame}/256/{z}/{x}/{y}/2/1_1.png`;
                    
                    if (weatherRadarLayer) {
                        map.removeLayer(weatherRadarLayer);
                    }
                    
                    weatherRadarLayer = L.tileLayer(tileUrl, {
                        attribution: 'Radar data &copy; <a href="https://www.rainviewer.com/">RainViewer</a>',
                        opacity: 0.55,
                        zIndex: 100,
                        maxNativeZoom: 7
                    }).addTo(map);
                    
                    savePreferences();
                })
                .catch(err => {
                    console.error('Failed to load weather radar:', err);
                    toggleBtn.classList.remove('active');
                    savePreferences();
                    
                    // Show warning banner
                    const warningBanner = document.getElementById('warning-banner');
                    if (warningBanner) {
                        document.getElementById('warn-title').textContent = "Weather Feed Error";
                        document.getElementById('warn-desc').textContent = "Unable to fetch live weather radar data. Please retry.";
                        warningBanner.style.display = 'flex';
                    }
                });
        }
    }

    function toggleBadgeFilter(target) {
        statusFilter = statusFilter === target ? 'all' : target;
        selectStatus.value = statusFilter;
        savePreferences();
        updateDashboard(getActiveRouteList());
    }

    document.getElementById('filter-active-card').addEventListener('click', () => toggleBadgeFilter('airborne'));
    document.getElementById('filter-delayed-card').addEventListener('click', () => toggleBadgeFilter('delayed'));
    document.getElementById('filter-landed-card').addEventListener('click', () => toggleBadgeFilter('landed'));
    
    const bookedBtn = document.getElementById('filter-booked-card');
    if (bookedBtn) {
        bookedBtn.addEventListener('click', () => toggleBadgeFilter('booked'));
    }

    const btnShareTelemetry = document.getElementById('btn-share-telemetry');
    if (btnShareTelemetry) {
        btnShareTelemetry.addEventListener('click', () => {
            if (!selectedFlightId) return;
            const flights = getActiveRouteList();
            const flight = flights.find(f => f.id === selectedFlightId);
            if (!flight) return;
            
            const speedKmh = Math.round(flight.currentSpeed * 1.852);
            let altSection = '';
            let speedSection = '';
            
            if (flight.currentAlt > 0) {
                altSection = `\nAltitude: ${flight.currentAlt.toLocaleString()} ft`;
            }
            if (flight.currentSpeed > 0) {
                speedSection = ` | Speed: ${flight.currentSpeed} kts (${speedKmh} km/h)`;
            }
            
            const text = `✈️ ${flight.flightNo} (${flight.origin.code} ➔ ${flight.dest.code}) | ${flight.airline}\nStatus: ${flight.status}${altSection}${speedSection}\nTracked live on AeroTrack Pro.`;
            
            navigator.clipboard.writeText(text).then(() => {
                const originalText = btnShareTelemetry.innerHTML;
                btnShareTelemetry.innerHTML = '✔ Copied!';
                btnShareTelemetry.style.color = 'var(--emerald)';
                btnShareTelemetry.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                btnShareTelemetry.style.background = 'rgba(16, 185, 129, 0.1)';
                
                setTimeout(() => {
                    btnShareTelemetry.innerHTML = originalText;
                    btnShareTelemetry.style.color = '';
                    btnShareTelemetry.style.borderColor = '';
                    btnShareTelemetry.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    document.getElementById('btn-close-drawer').addEventListener('click', () => {
        selectedFlightId = null;
        updateDashboard(getActiveRouteList());
    });

    document.getElementById('btn-clear-airport-filter').addEventListener('click', () => {
        selectedAirportCode = null;
        selectAirport(null);
    });

    const btnFidsDeps = document.getElementById('btn-fids-departures');
    const btnFidsArrs = document.getElementById('btn-fids-arrivals');

    if (btnFidsDeps && btnFidsArrs) {
        btnFidsDeps.addEventListener('click', () => {
            if (selectedAirportFidsTab === 'departures') return;
            selectedAirportFidsTab = 'departures';
            btnFidsDeps.classList.add('active');
            btnFidsArrs.classList.remove('active');
            updateDashboard(getActiveRouteList());
            drawAirportDestinationConnections();
        });

        btnFidsArrs.addEventListener('click', () => {
            if (selectedAirportFidsTab === 'arrivals') return;
            selectedAirportFidsTab = 'arrivals';
            btnFidsArrs.classList.add('active');
            btnFidsDeps.classList.remove('active');
            updateDashboard(getActiveRouteList());
            drawAirportDestinationConnections();
        });
    }

    document.getElementById('btn-toggle-intl').addEventListener('click', () => {
        hideInternational = !hideInternational;
        savePreferences();
        const toggleBtn = document.getElementById('btn-toggle-intl');
        if (hideInternational) {
            toggleBtn.classList.add('active');
            toggleBtn.innerHTML = '<span>🌏 Show Intl</span>';
        } else {
            toggleBtn.classList.remove('active');
            toggleBtn.innerHTML = '<span>🌏 Hide Intl</span>';
        }
        updateDashboard(getActiveRouteList());
    });

    document.getElementById('btn-toggle-optimize').addEventListener('click', () => {
        mobileOptimized = !mobileOptimized;
        savePreferences();
        const toggleBtn = document.getElementById('btn-toggle-optimize');
        if (mobileOptimized) {
            toggleBtn.classList.add('active');
            document.body.classList.add('mobile-optimized');
            // Performance: remove heavy SVG airport markers from mobile map view
            Object.keys(airportMarkers).forEach(c => {
                map.removeLayer(airportMarkers[c]);
            });
        } else {
            toggleBtn.classList.remove('active');
            document.body.classList.remove('mobile-optimized');
            // Restore airport markers (respecting zoom visibility constraints)
            updateAirportMarkersVisibility();
        }
        updateDashboard(getActiveRouteList());
        drawAirportDestinationConnections();
    });

    document.getElementById('btn-toggle-weather').addEventListener('click', () => {
        setWeatherRadarState(!weatherRadarLayer);
    });

    // 13. System Warnings & Theme Toggles
    const warningBanner = document.getElementById('warning-banner');
    document.getElementById('btn-close-warning').addEventListener('click', () => {
        warningBanner.style.display = 'none';
    });

    // Theme Toggle Handler
    const themeBtn = document.getElementById('btn-theme-toggle');
    themeBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        themeBtn.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // 14. Live Radar Network requests
    function tickUserFlights() {
        const now = Date.now();
        userFlights.forEach(f => {
            const adjustedDepTime = f.departureTime.getTime() + (f.delayMinutes * 60 * 1000);
            const adjustedArrTime = f.arrivalTime.getTime() + (f.delayMinutes * 60 * 1000);
            const totalDuration = adjustedArrTime - adjustedDepTime;

            let flightTimeElapsed = now - adjustedDepTime;

            if (now >= adjustedDepTime && now < adjustedArrTime) {
                f.progress = flightTimeElapsed / totalDuration;
                f.status = "En Route";

                const pos = simulator.interpolatePosition(
                    f.origin.lat, f.origin.lon,
                    f.dest.lat, f.dest.lon,
                    f.progress
                );

                const bearing = simulator.getBearing(f.currentLat, f.currentLon, pos.lat, pos.lon);
                if (bearing !== 0) f.currentHeading = bearing;

                f.currentLat = pos.lat;
                f.currentLon = pos.lon;
                simulator.simulatePhysics(f);

                if (f.history.length === 0 ||
                    simulator.getGreatCircleDistance(f.currentLat, f.currentLon, f.history[f.history.length - 1][0], f.history[f.history.length - 1][1]) > 30) {
                    f.history.push([f.currentLat, f.currentLon]);
                    if (f.history.length > 50) f.history.shift();
                }
            } else if (now >= adjustedArrTime) {
                f.progress = 1;
                f.currentLat = f.dest.lat;
                f.currentLon = f.dest.lon;
                f.currentAlt = 0;
                f.currentSpeed = 0;
                f.status = "Landed";
            }
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
        { flightNo: 'JQ902', airlineCode: 'JST', origin: 'OOL', dest: 'SYD' },
        { flightNo: 'VA946', airlineCode: 'VOZ', origin: 'BNE', dest: 'SYD' }
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

            const originObj = window.AIRPORTS[t.origin] ? window.AIRPORTS[t.origin] : { lat: -33.946, lon: 151.177, name: `${t.origin} Airport`, city: t.origin, state: 'NSW' };
            const destObj = window.AIRPORTS[t.dest] ? window.AIRPORTS[t.dest] : { lat: -37.673, lon: 144.843, name: `${t.dest} Airport`, city: t.dest, state: 'VIC' };

            const lat = originObj.lat;
            const lon = originObj.lon;

            const distanceKm = simulator.getGreatCircleDistance(originObj.lat, originObj.lon, destObj.lat, destObj.lon);
            const durationMs = (distanceKm / 750) * 3600 * 1000;
            const arrivalTime = new Date(departureTime.getTime() + durationMs);

            let airlineName = "Charter / Cargo / General Aviation";
            let airlineColor = "#6b7280";
            let isLight = true;
            
            if (window.AIRLINES[t.airlineCode]) {
                const al = window.AIRLINES[t.airlineCode];
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

    function parseFR24RawFeed(raw) {
        if (!raw) return [];
        const flights = [];
        const now = Date.now();

        Object.keys(raw).forEach(key => {
            if (key === 'full_count' || key === 'version' || key === 'stats') return;
            const fArr = raw[key];
            if (!Array.isArray(fArr) || fArr.length < 18) return;

            const callsign = (fArr[16] || '').trim();
            let flightNo = (fArr[13] || '').trim() || callsign;
            if (!flightNo) return;

            // Convert to IATA format if it is ICAO
            if (window.AIRLINES) {
                const match = flightNo.match(/^([A-Z]{3})(\d{1,4}[A-Z]?)$/i);
                if (match) {
                    const icaoPrefix = match[1].toUpperCase();
                    const numPart = match[2];
                    if (window.AIRLINES[icaoPrefix]) {
                        flightNo = window.AIRLINES[icaoPrefix].code + numPart;
                    }
                }
            }

            const lat = fArr[1];
            const lon = fArr[2];
            if (lat === null || lon === null) return;

            const airlineCode = fArr[18] || '';
            let airlineName = "Charter / Cargo / General Aviation";
            let airlineColor = "#6b7280";
            let isLight = true;

            let matchedKey = null;
            if (window.AIRLINES[airlineCode]) {
                matchedKey = airlineCode;
            } else {
                const keys = Object.keys(window.AIRLINES);
                for (const k of keys) {
                    if (flightNo.startsWith(window.AIRLINES[k].code) || callsign.startsWith(k)) {
                        matchedKey = k;
                        break;
                    }
                }
            }
            if (matchedKey && window.AIRLINES[matchedKey]) {
                const al = window.AIRLINES[matchedKey];
                airlineName = al.name;
                airlineColor = al.color;
                isLight = al.textLight;
            }

            const originCode = fArr[11] || '';
            const destCode = fArr[12] || '';

            let origin = window.AIRPORTS[originCode] ? window.AIRPORTS[originCode] : {
                code: originCode || 'UNK',
                name: originCode ? `${originCode} Airport` : 'Unknown Origin',
                city: originCode || 'Unknown',
                state: 'INTL',
                lat: null,
                lon: null
            };

            let dest = window.AIRPORTS[destCode] ? window.AIRPORTS[destCode] : {
                code: destCode || 'UNK',
                name: destCode ? `${destCode} Airport` : 'Unknown Destination',
                city: destCode || 'Unknown',
                state: 'INTL',
                lat: null,
                lon: null
            };

            let distanceKm = 0;
            let progress = 0.5;
            let departureTime = new Date(now - 30 * 60 * 1000);
            let arrivalTime = new Date(now + 30 * 60 * 1000);
            let delayMinutes = 0;

            if (origin.lat !== null && dest.lat !== null) {
                distanceKm = simulator.getGreatCircleDistance(origin.lat, origin.lon, dest.lat, dest.lon);
                const distFromOrigin = simulator.getGreatCircleDistance(origin.lat, origin.lon, lat, lon);
                progress = distanceKm > 0 ? distFromOrigin / distanceKm : 0.5;
                if (progress > 1) progress = 0.99;
                if (progress < 0) progress = 0.01;

                const speedKmh = (fArr[5] || 400) * 1.852;
                const remainingDist = simulator.getGreatCircleDistance(lat, lon, dest.lat, dest.lon);
                const remainingMs = speedKmh > 50 ? (remainingDist / speedKmh) * 3600 * 1000 : 30 * 60 * 1000;
                const elapsedMs = remainingMs * (progress / (1 - progress));
                departureTime = new Date(now - elapsedMs);
                arrivalTime = new Date(now + remainingMs);
            }

            const altFt = fArr[4] || 0;
            const onGround = !!fArr[14] || altFt < 200;
            const vrate = fArr[15] || 0;

            let status = "En Route";
            if (onGround) {
                let isAtOrigin = false;
                if (origin.lat !== null && origin.lon !== null) {
                    const distFromOrigin = simulator.getGreatCircleDistance(origin.lat, origin.lon, lat, lon);
                    if (distFromOrigin < 4) {
                        isAtOrigin = true;
                    }
                }
                
                if (isAtOrigin) {
                    progress = 0;
                    const rand = Math.random();
                    if (rand < 0.15) {
                        status = "Delayed";
                        delayMinutes = Math.floor(Math.random() * 40) + 10;
                    } else if (rand < 0.40) {
                        status = "Boarding";
                    } else {
                        status = "Scheduled";
                    }
                    
                    departureTime = new Date(now + (delayMinutes > 0 ? delayMinutes * 60 * 1000 : 10 * 60 * 1000));
                    arrivalTime = new Date(departureTime.getTime() + (distanceKm > 0 ? (distanceKm / 750) * 3600 * 1000 : 60 * 60 * 1000));
                } else {
                    status = "Landed";
                    progress = 1;
                }
            } else if (vrate < -600 && progress > 0.88) {
                status = "Descending";
            } else if (vrate > 600 && progress < 0.15) {
                status = "Climbing";
            }

            flights.push({
                id: `LIVE-${flightNo}-${key}`,
                flightNo: flightNo,
                callsign: callsign,
                airline: airlineName,
                airlineCode: airlineCode,
                airlineColor: airlineColor,
                airlineTextLight: isLight,
                aircraftType: fArr[8] || 'Unknown',
                registration: fArr[9] || '',
                maxAltitude: 41000,
                maxSpeed: 520,
                origin: origin,
                dest: dest,
                distanceKm: Math.round(distanceKm),
                durationMs: Math.round(progress * 60 * 60 * 1000 + (1 - progress) * 60 * 60 * 1000),
                departureTime: departureTime,
                arrivalTime: arrivalTime,
                status: status,
                delayMinutes: delayMinutes,
                progress: progress,
                currentLat: lat,
                currentLon: lon,
                currentAlt: altFt,
                currentSpeed: fArr[5] || 0,
                currentHeading: fArr[3] || 0,
                verticalRate: vrate,
                history: [],
                isLive: true
            });
        });
        
        const bookedFlights = generateBookedScheduledFlights(now);
        return [...flights, ...bookedFlights];
    }

    function updateLiveIndicator(text, type) {
        const indicator = document.getElementById('live-indicator');
        if (!indicator) return;
        
        let dotColor = 'var(--cyan)';
        let badgeBorder = 'rgba(6, 182, 212, 0.3)';
        let badgeBg = 'rgba(6, 182, 212, 0.05)';
        let textColor = 'var(--cyan)';
        let isFetchingClass = '';
        
        if (type === 'error') {
            dotColor = 'var(--rose)';
            badgeBorder = 'rgba(244, 63, 94, 0.3)';
            badgeBg = 'rgba(244, 63, 94, 0.1)';
            textColor = 'var(--rose)';
        } else if (type === 'offline') {
            dotColor = 'var(--text-muted)';
            badgeBorder = 'rgba(148, 163, 184, 0.2)';
            badgeBg = 'rgba(148, 163, 184, 0.05)';
            textColor = 'var(--text-muted)';
        } else if (type === 'connecting') {
            dotColor = 'var(--amber)';
            badgeBorder = 'rgba(245, 158, 11, 0.3)';
            badgeBg = 'rgba(245, 158, 11, 0.1)';
            textColor = 'var(--amber)';
            isFetchingClass = 'fetching';
        }
        
        indicator.innerHTML = `
            <span class="live-dot ${isFetchingClass}" style="background: ${dotColor}"></span>
            <span style="color: ${textColor}; font-weight: 700;">${text}</span>
        `;
        indicator.style.borderColor = badgeBorder;
        indicator.style.background = badgeBg;
    }

    function activateSimulationFallback(errMessage) {
        console.warn(`Connection to live feed server lost. Reason: ${errMessage}`);
        fetchFailCount++;
        
        if (lastLiveFetch === 0) {
            updateLiveIndicator("Connecting...", "connecting");
        } else {
            updateLiveIndicator("Offline / Retrying", "error");
        }

        const warningBanner = document.getElementById('warning-banner');
        if (warningBanner) {
            if (lastLiveFetch > 0) {
                document.getElementById('warn-title').textContent = "Network Interruption";
                document.getElementById('warn-desc').textContent = "Live flight data feed offline. Retrying connections...";
                warningBanner.style.display = 'flex';
            } else if (fetchFailCount >= 3) {
                document.getElementById('warn-title').textContent = "Server Cold Start";
                document.getElementById('warn-desc').textContent = "Waking up server backend (takes up to 50 seconds on cold start). Retrying...";
                warningBanner.style.display = 'flex';
            }
        }
    }

    function fetchLiveFlights() {
        if (isFetchingLive) return;
        isFetchingLive = true;

        const bounds = '-10,-45,110,155';
        const fr24Url = `https://data-cloud.flightradar24.com/zones/fcgi/feed.js?bounds=${bounds}&faa=1&satellite=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=14400&gliders=1&stats=1`;

        if (lastLiveFetch === 0) {
            updateLiveIndicator(fetchFailCount > 0 ? "Waking up..." : "Connecting...", "connecting");
        }

        fetchWithTimeout('/api/live-flights', {}, 20000)
            .then(res => res.json())
            .then(data => {
                if (data.success && !data.fallback) {
                    processFetchedData(data.flights);
                } else {
                    throw new Error("Local fallback trigger");
                }
            })
            .catch(() => {
                fetchWithTimeout(`https://corsproxy.io/?url=${encodeURIComponent(fr24Url)}`, {}, 8000)
                    .then(res => res.json())
                    .then(data => {
                        const parsed = parseFR24RawFeed(data);
                        processFetchedData(parsed);
                    })
                    .catch(() => {
                        fetchWithTimeout(`https://api.allorigins.win/raw?url=${encodeURIComponent(fr24Url)}`, {}, 8000)
                            .then(res => res.json())
                            .then(data => {
                                const parsed = parseFR24RawFeed(data);
                                processFetchedData(parsed);
                            })
                            .catch(err => {
                                isFetchingLive = false;
                                activateSimulationFallback(err.message);
                            });
                    });
            });
    }

    function processFetchedData(flights) {
        isFetchingLive = false;
        
        if (!flights || flights.length === 0) {
            console.warn("Received empty flight list. Retaining existing flight markers.");
            activateSimulationFallback("Empty flight list received from proxy.");
            return;
        }

        fetchFailCount = 0;
        const warningBanner = document.getElementById('warning-banner');
        if (warningBanner) {
            warningBanner.style.display = 'none';
        }

        lastLiveFetch = Date.now();

        updateLiveIndicator("Live Radar", "success");

        // Accumulate history for live flights from the previous liveFlights array
        const prevLiveMap = {};
        liveFlights.forEach(f => {
            prevLiveMap[f.id] = f;
        });

        flights.forEach(f => {
            const prev = prevLiveMap[f.id];
            if (prev) {
                f.history = prev.history || [];
                const lastPos = f.history[f.history.length - 1];
                if (!lastPos || simulator.getGreatCircleDistance(f.currentLat, f.currentLon, lastPos[0], lastPos[1]) > 5) {
                    f.history.push([f.currentLat, f.currentLon]);
                    if (f.history.length > 80) f.history.shift();
                }
            } else {
                f.history = [[f.currentLat, f.currentLon]];
            }
        });

        const activeLiveIds = new Set(flights.map(f => f.flightNo));
        userFlights = userFlights.filter(uf => !activeLiveIds.has(uf.flightNo));

        liveFlights = flights;

        tickUserFlights();
        updateDashboard(getActiveRouteList());
    }

    // 15. Setup Event Intervals
    setInterval(() => {
        const now = Date.now();
        if (now - lastLiveFetch >= 10000) {
            fetchLiveFlights();
        } else {
            tickUserFlights();
            updateDashboard(getActiveRouteList());
        }
    }, 1000);

    // 16. Mobile Sidebar Toggle listeners
    const sidebar = document.querySelector('.dashboard-sidebar');
    const sidebarToggleBtn = document.getElementById('btn-sidebar-toggle');

    if (sidebarToggleBtn && sidebar) {
        sidebarToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = sidebar.classList.toggle('sidebar-open');
            sidebarToggleBtn.classList.toggle('sidebar-open');
            sidebarToggleBtn.innerHTML = isOpen ? '✕' : '📋';
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 900 && sidebar.classList.contains('sidebar-open')) {
                if (!e.target.closest('.dashboard-sidebar') && !e.target.closest('#btn-sidebar-toggle')) {
                    sidebar.classList.remove('sidebar-open');
                    sidebarToggleBtn.classList.remove('sidebar-open');
                    sidebarToggleBtn.innerHTML = '📋';
                }
            }
        });
    }

    // 17. Load and Apply Persisted Preferences
    if (searchInput) {
        searchInput.value = searchFilter;
        toggleClearSearchButton();
    }
    if (selectAirline) selectAirline.value = airlineFilter;
    if (selectType) selectType.value = typeFilter;
    if (selectState) selectState.value = stateFilter;
    if (selectStatus) selectStatus.value = statusFilter;

    if (hideInternational) {
        const toggleBtn = document.getElementById('btn-toggle-intl');
        if (toggleBtn) {
            toggleBtn.classList.add('active');
            toggleBtn.innerHTML = '<span>🌏 Show Intl</span>';
        }
    }
    if (mobileOptimized) {
        const toggleBtn = document.getElementById('btn-toggle-optimize');
        if (toggleBtn) {
            toggleBtn.classList.add('active');
            document.body.classList.add('mobile-optimized');
        }
    }
    // Set active map theme button
    const btnRoad = document.getElementById('btn-theme-roadmap');
    const btnDark = document.getElementById('btn-theme-dark');
    const btnSat = document.getElementById('btn-theme-satellite');
    
    if (btnRoad && btnDark && btnSat) {
        btnRoad.classList.remove('active');
        btnDark.classList.remove('active');
        btnSat.classList.remove('active');
        
        if (activeMapTheme === 'roadmap') btnRoad.classList.add('active');
        else if (activeMapTheme === 'dark') btnDark.classList.add('active');
        else if (activeMapTheme === 'satellite') btnSat.classList.add('active');

        btnRoad.addEventListener('click', () => changeMapTheme('roadmap'));
        btnDark.addEventListener('click', () => changeMapTheme('dark'));
        btnSat.addEventListener('click', () => changeMapTheme('satellite'));
    }

    if (weatherRadarActive) {
        setWeatherRadarState(true);
    }

    fetchLiveFlights();
});
