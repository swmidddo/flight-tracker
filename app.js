/**
 * AeroTrack Pro - Client Application Controller (Version 2)
 * Orchestrates Leaflet Radar Map, Flight telemetry drawer, predictive search, and live FR24 integrations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Configuration
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const isLightInitial = savedTheme === 'light';
    if (isLightInitial) {
        document.body.classList.add('light-mode');
        const themeBtn = document.getElementById('btn-theme-toggle');
        if (themeBtn) themeBtn.textContent = '☀️';
    }

    const googleTileUrl = 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en';

    // 2. Map Initialization
    const map = L.map('map', {
        center: [-27.0, 133.0],
        zoom: 4,
        zoomControl: false,
        attributionControl: false
    });

    // Top right zoom controls
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Google Maps base tiles
    const baseTileLayer = L.tileLayer(googleTileUrl, {
        maxZoom: 20,
        minZoom: 3,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
    }).addTo(map);

    // 2. Global State Variables
    let selectedFlightId = null;
    let selectedAirportCode = null;
    let searchFilter = '';
    let airlineFilter = 'all';
    let statusFilter = 'all';
    let stateFilter = 'all';
    let typeFilter = 'all';
    let hideInternational = false;
    let mobileOptimized = false;

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
        if (mobileOptimized) return;
        
        const zoom = map.getZoom();
        // Dynamic zoom threshold: on mobile (screens <= 900px), show all airports at zoom >= 6.
        // On desktop/PC, show all airports at zoom >= 7 (since wider displays show a much larger region at lower zoom levels).
        const threshold = (window.innerWidth <= 900) ? 6 : 7;
        
        Object.keys(airportMarkers).forEach(code => {
            const marker = airportMarkers[code];
            const airport = window.AIRPORTS[code];
            const isMajor = isMajorAirport(code, airport);
            
            // Show all airports if zoomed in past threshold, otherwise show only capital city ones (or the selected airport)
            const shouldBeVisible = (zoom >= threshold) || isMajor || (code === selectedAirportCode);
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
            iconSize: [8, 8],
            iconAnchor: [4, 4]
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
    function createPlaneIcon(heading, color, isSelected) {
        const size = isSelected ? 32 : 22;
        const glowSize = isSelected ? '12px' : '4px';
        const pulseClass = isSelected ? 'plane-pulse' : '';

        return L.divIcon({
            className: `plane-icon-div ${pulseClass}`,
            html: `
                <div style="width: ${size}px; height: ${size}px; transform: rotate(${heading}deg); transition: transform 0.25s linear;">
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
            }

            if (stateFilter !== 'all') {
                const originState = f.origin ? f.origin.state : null;
                const destState = f.dest ? f.dest.state : null;
                if (originState !== stateFilter && destState !== stateFilter) return false;
            }

            if (selectedAirportCode && f.origin.code !== selectedAirportCode) return false;

            if (searchFilter) {
                const query = searchFilter.toLowerCase().trim();
                const flightNo = (f.flightNo || '').toLowerCase();
                const callsign = (f.callsign || '').toLowerCase();
                const airline = (f.airline || '').toLowerCase();
                const airlineCode = (f.airlineCode || '').toLowerCase();
                const registration = (f.registration || '').toLowerCase();
                const aircraftType = (f.aircraftType || '').toLowerCase();

                const matchesNo = flightNo.includes(query) || callsign.includes(query) || registration.includes(query);
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
            if (flight.status === 'Scheduled' || flight.status === 'Boarding') {
                if (planeMarkers[flight.id]) {
                    map.removeLayer(planeMarkers[flight.id]);
                    delete planeMarkers[flight.id];
                }
                return;
            }

            visibleIds.add(flight.id);
            const isSelected = flight.id === selectedFlightId;
            const latlng = [flight.currentLat, flight.currentLon];

            if (!planeMarkers[flight.id]) {
                const marker = L.marker(latlng, {
                    icon: createPlaneIcon(flight.currentHeading, flight.airlineColor, isSelected),
                    zIndexOffset: isSelected ? 2000 : 500
                }).addTo(map);

                marker.bindTooltip(flight.flightNo, {
                    direction: 'top',
                    offset: [0, -10],
                    className: 'plane-tooltip'
                });

                marker.on('click', () => selectFlight(flight.id));
                planeMarkers[flight.id] = marker;
            } else {
                planeMarkers[flight.id].setLatLng(latlng);
                planeMarkers[flight.id].setIcon(createPlaneIcon(flight.currentHeading, flight.airlineColor, isSelected));
                planeMarkers[flight.id].setZIndexOffset(isSelected ? 2000 : 500);
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
                dashArray: '5, 8',
                opacity: 0.35
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
            document.getElementById('lbl-airport-code').textContent = selectedAirportCode;
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
                const depTime = new Date(f.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const arrTime = new Date(f.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                let delayText = '';
                if (f.delayMinutes > 0) {
                    delayText = `<span style="color: var(--amber); font-weight: 700; margin-left: 5px;">(+${f.delayMinutes}m)</span>`;
                }

                cardsHtml += `
                    <div class="flight-card ${isSelected ? 'selected' : ''}" style="--airline-color: ${f.airlineColor}" data-id="${f.id}">
                        <div class="card-top">
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
                        ${['En Route', 'Climbing', 'Descending', 'Delayed'].includes(f.status) ? `
                            <div class="progress-mini" style="width: ${Math.round(f.progress * 100)}%"></div>
                        ` : ''}
                    </div>
                `;
            });
        }
        board.innerHTML = cardsHtml;

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

        document.getElementById('count-active').textContent = airborne;
        document.getElementById('count-delayed').textContent = delayed;
        document.getElementById('count-landed').textContent = landed;
        
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

        const depTime = new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const arrTime = new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
        return [...userFlights, ...liveFlights];
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
                if (f.origin.lat !== null && f.dest.lat !== null) {
                    const bounds = L.latLngBounds(
                        [f.origin.lat, f.origin.lon],
                        [f.dest.lat, f.dest.lon]
                    );
                    map.fitBounds(bounds, { padding: [100, 100], maxZoom: 6 });
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
                iconSize: [8, 8],
                iconAnchor: [4, 4]
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
                sidebar.classList.remove('sidebar-open');
                toggleBtn.classList.remove('sidebar-open');
                toggleBtn.innerHTML = '📋';
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
            if (f.origin.code === selectedAirportCode) {
                destinations.add(f.dest.code);
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
    // selectAirline is already defined at the top
    const selectType = document.getElementById('select-type');
    const selectState = document.getElementById('select-state');
    const selectStatus = document.getElementById('select-status');

    searchInput.addEventListener('input', (e) => {
        searchFilter = e.target.value;
        updateDashboard(getActiveRouteList());
        renderSearchSuggestions();
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
                    searchInput.value = id;
                    searchFilter = id;
                    selectAirport(id);
                } else if (type === 'airline') {
                    selectAirline.value = id;
                    airlineFilter = id;
                    searchInput.value = item.dataset.label;
                    searchFilter = '';
                    updateSidebar(getActiveRouteList());
                }

                suggestionsDiv.style.display = 'none';
                suggestionsDiv.innerHTML = '';
            });
        });
    }

    selectAirline.addEventListener('change', (e) => {
         airlineFilter = e.target.value;
         updateDashboard(getActiveRouteList());
     });
 
     selectType.addEventListener('change', (e) => {
         typeFilter = e.target.value;
         updateDashboard(getActiveRouteList());
     });
 
     selectState.addEventListener('change', (e) => {
         stateFilter = e.target.value;
         updateDashboard(getActiveRouteList());
     });

    selectStatus.addEventListener('change', (e) => {
        statusFilter = e.target.value;
        updateDashboard(getActiveRouteList());
    });

    // Counter Badge Clicks
    function updateCounterFilterBadgeHighlight() {
        const activeCard = document.getElementById('filter-active-card');
        const delayedCard = document.getElementById('filter-delayed-card');
        const landedCard = document.getElementById('filter-landed-card');

        if (activeCard) activeCard.classList.remove('active-filter');
        if (delayedCard) delayedCard.classList.remove('active-filter');
        if (landedCard) landedCard.classList.remove('active-filter');

        if (statusFilter === 'airborne' && activeCard) activeCard.classList.add('active-filter');
        else if (statusFilter === 'delayed' && delayedCard) delayedCard.classList.add('active-filter');
        else if (statusFilter === 'landed' && landedCard) landedCard.classList.add('active-filter');
    }

    function toggleBadgeFilter(target) {
        statusFilter = statusFilter === target ? 'all' : target;
        selectStatus.value = statusFilter;
        updateDashboard(getActiveRouteList());
    }

    document.getElementById('filter-active-card').addEventListener('click', () => toggleBadgeFilter('airborne'));
    document.getElementById('filter-delayed-card').addEventListener('click', () => toggleBadgeFilter('delayed'));
    document.getElementById('filter-landed-card').addEventListener('click', () => toggleBadgeFilter('landed'));

    document.getElementById('btn-close-drawer').addEventListener('click', () => {
        selectedFlightId = null;
        updateDashboard(getActiveRouteList());
    });

    document.getElementById('btn-clear-airport-filter').addEventListener('click', () => {
        selectedAirportCode = null;
        selectAirport(null);
    });

    document.getElementById('btn-toggle-intl').addEventListener('click', () => {
        hideInternational = !hideInternational;
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

    function parseFR24RawFeed(raw) {
        if (!raw) return [];
        const flights = [];
        const now = Date.now();

        Object.keys(raw).forEach(key => {
            if (key === 'full_count' || key === 'version' || key === 'stats') return;
            const fArr = raw[key];
            if (!Array.isArray(fArr) || fArr.length < 18) return;

            const callsign = (fArr[16] || '').trim();
            const flightNo = (fArr[13] || '').trim() || callsign;
            if (!flightNo) return;

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

            if (origin.lat !== null && dest.lat !== null) {
                distanceKm = simulator.getGreatCircleDistance(origin.lat, origin.lon, dest.lat, dest.lon);
                const distFromOrigin = simulator.getGreatCircleDistance(origin.lat, origin.lon, lat, lon);
                progress = distanceKm > 0 ? distFromOrigin / distanceKm : 0.5;
                if (progress > 1) progress = 0.99;
                if (progress < 0) progress = 0.01;

                const speedKmh = (fArr[5] || 400) * 1.852;
                const remainingDist = simulator.getGreatCircleDistance(lat, lon, dest.lat, dest.lon);
                const remainingMs = speedKmh > 50 ? (remainingDist / speedKmh) * 3600 * 1000 : 30 * 60 * 1000;
                departureTime = new Date(now - (progress * remainingMs));
                arrivalTime = new Date(now + remainingMs);
            }

            const altFt = fArr[4] || 0;
            const onGround = !!fArr[14] || altFt < 200;
            const vrate = fArr[15] || 0;

            let status = "En Route";
            if (onGround) {
                status = "Landed";
                progress = 1;
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
                delayMinutes: 0,
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
        return flights;
    }

    function activateSimulationFallback(errMessage) {
        console.warn(`Connection to live feed server lost. Reason: ${errMessage}`);
        const indicator = document.getElementById('live-indicator');
        indicator.className = "live-badge";
        indicator.style.borderColor = "var(--rose)";
        indicator.style.color = "var(--rose)";
        indicator.style.background = "rgba(244, 63, 94, 0.1)";
        indicator.textContent = "Offline / Retrying";

        const warningBanner = document.getElementById('warning-banner');
        if (warningBanner) {
            document.getElementById('warn-title').textContent = "Network Interruption";
            document.getElementById('warn-desc').textContent = "Live flight data feed offline. Retrying connections...";
            warningBanner.style.display = 'flex';
        }
    }

    function fetchLiveFlights() {
        if (isFetchingLive) return;
        isFetchingLive = true;

        const bounds = '-10,-45,110,155';
        const fr24Url = `https://data-cloud.flightradar24.com/zones/fcgi/feed.js?bounds=${bounds}&faa=1&satellite=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=14400&gliders=1&stats=1`;

        fetch('/api/live-flights')
            .then(res => res.json())
            .then(data => {
                if (data.success && !data.fallback) {
                    processFetchedData(data.flights);
                } else {
                    throw new Error("Local fallback trigger");
                }
            })
            .catch(() => {
                fetch(`https://corsproxy.io/?url=${encodeURIComponent(fr24Url)}`)
                    .then(res => res.json())
                    .then(data => {
                        const parsed = parseFR24RawFeed(data);
                        processFetchedData(parsed);
                    })
                    .catch(() => {
                        fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(fr24Url)}`)
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
        lastLiveFetch = Date.now();

        const indicator = document.getElementById('live-indicator');
        indicator.className = "live-badge";
        indicator.style.borderColor = "";
        indicator.style.color = "";
        indicator.style.background = "";
        indicator.textContent = "Live Radar";

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
        const combined = [...userFlights, ...liveFlights];
        updateDashboard(combined);
    }

    // 15. Setup Event Intervals
    setInterval(() => {
        const now = Date.now();
        if (now - lastLiveFetch >= 10000) {
            fetchLiveFlights();
        } else {
            tickUserFlights();
            updateDashboard([...userFlights, ...liveFlights]);
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

    fetchLiveFlights();
});
