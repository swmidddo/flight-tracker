const AIRLINES = {
    "QFA": {
        code: "QF",
        name: "Qantas",
        color: "#E60000",
        textLight: true,
        logoText: "QANTAS",
        callsign: "QANTAS",
        aircraft: [
            { type: "Boeing 737-800", capacity: 174, speedKnots: 450, cruiseAltFt: 36000 },
            { type: "Airbus A330-300", capacity: 297, speedKnots: 470, cruiseAltFt: 38000 },
            { type: "Boeing 787-9", capacity: 236, speedKnots: 490, cruiseAltFt: 40000 },
            { type: "Airbus A380-800", capacity: 485, speedKnots: 500, cruiseAltFt: 39000 }
        ]
    },
    "QLK": {
        code: "QF",
        name: "QantasLink",
        color: "#B30000",
        textLight: true,
        logoText: "QantasLink",
        callsign: "QANTASLINK",
        aircraft: [
            { type: "Dash 8 Q400", capacity: 74, speedKnots: 360, cruiseAltFt: 24000 },
            { type: "Airbus A220-300", capacity: 137, speedKnots: 440, cruiseAltFt: 35000 },
            { type: "Fokker 100", capacity: 97, speedKnots: 420, cruiseAltFt: 31000 }
        ]
    },
    "VOZ": {
        code: "VA",
        name: "Virgin Australia",
        color: "#E10A1A",
        textLight: true,
        logoText: "Virgin",
        callsign: "VELOCITY",
        aircraft: [
            { type: "Boeing 737-800", capacity: 176, speedKnots: 450, cruiseAltFt: 36000 },
            { type: "Boeing 737 MAX 8", capacity: 182, speedKnots: 455, cruiseAltFt: 37000 }
        ]
    },
    "JST": {
        code: "JQ",
        name: "Jetstar",
        color: "#FF5F00",
        textLight: true,
        logoText: "Jetstar",
        callsign: "JETSTAR",
        aircraft: [
            { type: "Airbus A320-200", capacity: 180, speedKnots: 440, cruiseAltFt: 35000 },
            { type: "Airbus A321neo", capacity: 232, speedKnots: 445, cruiseAltFt: 37000 },
            { type: "Boeing 787-8", capacity: 335, speedKnots: 485, cruiseAltFt: 39000 }
        ]
    },
    "RXA": {
        code: "ZL",
        name: "Rex Airlines",
        color: "#002B49",
        textLight: true,
        logoText: "Rex",
        callsign: "REX",
        aircraft: [
            { type: "Saab 340B", capacity: 34, speedKnots: 260, cruiseAltFt: 18000 },
            { type: "Boeing 737-800", capacity: 176, speedKnots: 450, cruiseAltFt: 36000 }
        ]
    },
    "UTY": {
        code: "QQ",
        name: "Alliance Airlines",
        color: "#FFC72C",
        textLight: false,
        logoText: "Alliance",
        callsign: "UNITY",
        aircraft: [
            { type: "Fokker 100", capacity: 100, speedKnots: 410, cruiseAltFt: 32000 },
            { type: "Embraer E190", capacity: 100, speedKnots: 440, cruiseAltFt: 37000 }
        ]
    },
    "ANZ": {
        code: "NZ",
        name: "Air New Zealand",
        color: "#090909",
        textLight: true,
        logoText: "Air NZ",
        callsign: "NEW ZEALAND",
        aircraft: [
            { type: "Airbus A321neo", capacity: 214, speedKnots: 445, cruiseAltFt: 37000 },
            { type: "Boeing 787-9", capacity: 302, speedKnots: 490, cruiseAltFt: 40000 }
        ]
    },
    "SIA": {
        code: "SQ",
        name: "Singapore Airlines",
        color: "#00266B",
        textLight: true,
        logoText: "Singapore",
        callsign: "SINGAPORE",
        aircraft: [
            { type: "Airbus A350-900", capacity: 253, speedKnots: 488, cruiseAltFt: 39000 },
            { type: "Boeing 777-300ER", capacity: 264, speedKnots: 490, cruiseAltFt: 38000 }
        ]
    },
    "UAE": {
        code: "EK",
        name: "Emirates",
        color: "#D71A21",
        textLight: true,
        logoText: "Emirates",
        callsign: "EMIRATES",
        aircraft: [
            { type: "Airbus A380-800", capacity: 517, speedKnots: 500, cruiseAltFt: 39000 },
            { type: "Boeing 777-300ER", capacity: 354, speedKnots: 490, cruiseAltFt: 38000 }
        ]
    },
    "CPA": {
        code: "CX",
        name: "Cathay Pacific",
        color: "#006560",
        textLight: true,
        logoText: "Cathay",
        callsign: "CATHAY",
        aircraft: [
            { type: "Airbus A350-1000", capacity: 334, speedKnots: 488, cruiseAltFt: 41000 },
            { type: "Boeing 777-300ER", capacity: 368, speedKnots: 490, cruiseAltFt: 38000 }
        ]
    },
    "UAL": {
        code: "UA",
        name: "United Airlines",
        color: "#005DAA",
        textLight: true,
        logoText: "United",
        callsign: "UNITED",
        aircraft: [
            { type: "Boeing 787-9", capacity: 290, speedKnots: 490, cruiseAltFt: 40000 },
            { type: "Boeing 777-300ER", capacity: 350, speedKnots: 480, cruiseAltFt: 38000 }
        ]
    },
    "LNK": {
        code: "FC",
        name: "Link Airways",
        color: "#007A87",
        textLight: true,
        logoText: "Link",
        callsign: "LINK",
        aircraft: [
            { type: "Saab 340B", capacity: 34, speedKnots: 260, cruiseAltFt: 18000 }
        ]
    },
    "CES": {
        code: "MU",
        name: "China Eastern Airlines",
        color: "#002F6C",
        textLight: true,
        logoText: "China Eastern",
        callsign: "CHINA EASTERN",
        aircraft: [{ type: "Boeing 787-9", capacity: 285, speedKnots: 488, cruiseAltFt: 39000 }]
    },
    "CSH": {
        code: "FM",
        name: "Shanghai Airlines",
        color: "#E81A23",
        textLight: true,
        logoText: "Shanghai Air",
        callsign: "SHANGHAI AIR",
        aircraft: [{ type: "Boeing 787-9", capacity: 285, speedKnots: 488, cruiseAltFt: 39000 }]
    },
    "CSN": {
        code: "CZ",
        name: "China Southern Airlines",
        color: "#0057B8",
        textLight: true,
        logoText: "China Southern",
        callsign: "CHINA SOUTHERN",
        aircraft: [{ type: "Airbus A350-900", capacity: 300, speedKnots: 488, cruiseAltFt: 39000 }]
    },
    "HVN": {
        code: "VN",
        name: "Vietnam Airlines",
        color: "#0F4C5C",
        textLight: true,
        logoText: "Vietnam Air",
        callsign: "VIETNAM",
        aircraft: [{ type: "Boeing 787-9", capacity: 300, speedKnots: 490, cruiseAltFt: 38000 }]
    },
    "MAS": {
        code: "MH",
        name: "Malaysia Airlines",
        color: "#00266B",
        textLight: true,
        logoText: "Malaysia",
        callsign: "MALAYSIAN",
        aircraft: [{ type: "Airbus A350-900", capacity: 286, speedKnots: 488, cruiseAltFt: 39000 }]
    },
    "THA": {
        code: "TG",
        name: "Thai Airways",
        color: "#4A154B",
        textLight: true,
        logoText: "Thai",
        callsign: "THAI",
        aircraft: [{ type: "Boeing 787-9", capacity: 298, speedKnots: 488, cruiseAltFt: 39000 }]
    },
    "PAL": {
        code: "PR",
        name: "Philippine Airlines",
        color: "#0038A8",
        textLight: true,
        logoText: "Philippine",
        callsign: "PHILIPPINE",
        aircraft: [{ type: "Airbus A350-900", capacity: 295, speedKnots: 488, cruiseAltFt: 39000 }]
    },
    "CCA": {
        code: "CA",
        name: "Air China",
        color: "#E51937",
        textLight: true,
        logoText: "Air China",
        callsign: "AIR CHINA",
        aircraft: [{ type: "Boeing 787-9", capacity: 293, speedKnots: 488, cruiseAltFt: 39000 }]
    },
    "CAL": {
        code: "CI",
        name: "China Airlines",
        color: "#1E3A8A",
        textLight: true,
        logoText: "China Air",
        callsign: "DYNASTY",
        aircraft: [{ type: "Airbus A350-900", capacity: 306, speedKnots: 488, cruiseAltFt: 39000 }]
    },
    "KAL": {
        code: "KE",
        name: "Korean Air",
        color: "#0093D0",
        textLight: true,
        logoText: "Korean Air",
        callsign: "KOREAN AIR",
        aircraft: [{ type: "Boeing 787-9", capacity: 269, speedKnots: 490, cruiseAltFt: 40000 }]
    },
    "AAR": {
        code: "OZ",
        name: "Asiana Airlines",
        color: "#374151",
        textLight: true,
        logoText: "Asiana",
        callsign: "ASIANA",
        aircraft: [{ type: "Airbus A350-900", capacity: 311, speedKnots: 488, cruiseAltFt: 39000 }]
    },
    "GIA": {
        code: "GA",
        name: "Garuda Indonesia",
        color: "#0B3C5D",
        textLight: true,
        logoText: "Garuda",
        callsign: "INDONESIA",
        aircraft: [{ type: "Airbus A330-300", capacity: 287, speedKnots: 470, cruiseAltFt: 38000 }]
    },
    "FJI": {
        code: "FJ",
        name: "Fiji Airways",
        color: "#5C3D2E",
        textLight: true,
        logoText: "Fiji Airways",
        callsign: "FIJI",
        aircraft: [{ type: "Airbus A350-900", capacity: 334, speedKnots: 488, cruiseAltFt: 39000 }]
    },
    "QTR": {
        code: "QR",
        name: "Qatar Airways",
        color: "#5A0028",
        textLight: true,
        logoText: "Qatar",
        callsign: "QATARI",
        aircraft: [{ type: "Airbus A350-1000", capacity: 327, speedKnots: 488, cruiseAltFt: 41000 }]
    },
    "ETD": {
        code: "EY",
        name: "Etihad Airways",
        color: "#C29B38",
        textLight: true,
        logoText: "Etihad",
        callsign: "ETIHAD",
        aircraft: [{ type: "Boeing 787-9", capacity: 290, speedKnots: 490, cruiseAltFt: 40000 }]
    },
    "ANA": {
        code: "NH",
        name: "All Nippon Airways",
        color: "#00479A",
        textLight: true,
        logoText: "ANA",
        callsign: "ALL NIPPON",
        aircraft: [{ type: "Boeing 787-9", capacity: 246, speedKnots: 488, cruiseAltFt: 39000 }]
    },
    "JAL": {
        code: "JL",
        name: "Japan Airlines",
        color: "#D91A1A",
        textLight: true,
        logoText: "JAL",
        callsign: "JAPANAIR",
        aircraft: [{ type: "Boeing 787-9", capacity: 203, speedKnots: 488, cruiseAltFt: 39000 }]
    },
    "PEL": {
        code: "FP",
        name: "FlyPelican",
        color: "#f59e0b",
        textLight: false,
        logoText: "Pelican",
        callsign: "PELICAN",
        aircraft: [{ type: "Jetstream 32", capacity: 19, speedKnots: 230, cruiseAltFt: 15000 }]
    },
    "SHQ": {
        code: "SH",
        name: "Sharp Airlines",
        color: "#1d4ed8",
        textLight: true,
        logoText: "Sharp",
        callsign: "SHARP",
        aircraft: [{ type: "Fairchild Metroliner", capacity: 19, speedKnots: 250, cruiseAltFt: 16000 }]
    },
    "SKP": {
        code: "QN",
        name: "Skytrans",
        color: "#e11d48",
        textLight: true,
        logoText: "Skytrans",
        callsign: "SKYTRANS",
        aircraft: [{ type: "Dash 8 Q100", capacity: 36, speedKnots: 270, cruiseAltFt: 20000 }]
    },
    "FJS": {
        code: "HK",
        name: "Skippers Aviation",
        color: "#0d9488",
        textLight: true,
        logoText: "Skippers",
        callsign: "SKIPPERS",
        aircraft: [{ type: "Embraer Brasilia", capacity: 30, speedKnots: 290, cruiseAltFt: 22000 }]
    },
    "VBH": {
        code: "VA",
        name: "Virgin Australia Regional",
        color: "#be123c",
        textLight: true,
        logoText: "Virgin Regional",
        callsign: "VELOCITY",
        aircraft: [{ type: "Fokker 100", capacity: 100, speedKnots: 420, cruiseAltFt: 31000 }]
    },
    "ADA": {
        code: "YG",
        name: "Airservices Australia",
        color: "#4f46e5",
        textLight: true,
        logoText: "Airservices",
        callsign: "CORAL",
        aircraft: [{ type: "Hawker 800XP", capacity: 8, speedKnots: 430, cruiseAltFt: 37000 }]
    },
    "GAV": {
        code: "GA",
        name: "General Aviation (Private)",
        color: "#64748b",
        textLight: true,
        logoText: "PRIVATE",
        callsign: "SPARK",
        type: "private",
        aircraft: [
            { type: "Cessna 172 Skyhawk", capacity: 4, speedKnots: 120, cruiseAltFt: 8500 },
            { type: "Piper PA-28 Archer", capacity: 4, speedKnots: 130, cruiseAltFt: 9000 },
            { type: "Beechcraft Bonanza", capacity: 6, speedKnots: 175, cruiseAltFt: 12000 },
            { type: "Cirrus SR22", capacity: 5, speedKnots: 185, cruiseAltFt: 14000 },
            { type: "Cessna 208 Caravan", capacity: 12, speedKnots: 180, cruiseAltFt: 10000 },
            { type: "Robinson R44 (Helicopter)", capacity: 4, speedKnots: 110, cruiseAltFt: 4000 }
        ]
    },
    "TOL": {
        code: "TL",
        name: "Toll Aviation (Cargo)",
        color: "#0f172a",
        textLight: true,
        logoText: "TOLL",
        callsign: "TOLL",
        type: "cargo",
        aircraft: [
            { type: "ATR 42-300F", capacity: 0, speedKnots: 250, cruiseAltFt: 18000 },
            { type: "Fairchild Metro III", capacity: 0, speedKnots: 240, cruiseAltFt: 16000 }
        ]
    },
    "TJS": {
        code: "HJ",
        name: "Tasman Cargo Airlines",
        color: "#e11d48",
        textLight: true,
        logoText: "TASMAN",
        callsign: "TASMAN",
        type: "cargo",
        aircraft: [
            { type: "Boeing 767-300F", capacity: 0, speedKnots: 450, cruiseAltFt: 35000 }
        ]
    },
    "FDX": {
        code: "FX",
        name: "FedEx Express",
        color: "#4f46e5",
        textLight: true,
        logoText: "FEDEX",
        callsign: "FEDEX",
        type: "cargo",
        aircraft: [
            { type: "Boeing 777F", capacity: 0, speedKnots: 490, cruiseAltFt: 38000 }
        ]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIRLINES;
} else {
    window.AIRLINES = AIRLINES;
}
