// Comprehensive Australian and International Connection Airports Database
const AIRPORTS = {
    "POM": {
        "code": "POM",
        "name": "Port Moresby Jacksons International Airport",
        "city": "Port Moresby",
        "state": "INTL",
        "lat": -9.4433803558,
        "lon": 147.2200012207,
        "timezone": "Pacific/Port_Moresby"
    },
    "YVR": {
        "code": "YVR",
        "name": "Vancouver International Airport",
        "city": "Vancouver",
        "state": "INTL",
        "lat": 49.193901062,
        "lon": -123.1839981079,
        "timezone": "America/Vancouver"
    },
    "FRA": {
        "code": "FRA",
        "name": "Frankfurt am Main International Airport",
        "city": "Frankfurt-am-Main",
        "state": "INTL",
        "lat": 50.0264015198,
        "lon": 8.543129921,
        "timezone": "Europe/Berlin"
    },
    "MUC": {
        "code": "MUC",
        "name": "Munich International Airport",
        "city": "Munich",
        "state": "INTL",
        "lat": 48.3538017273,
        "lon": 11.7861003876,
        "timezone": "Europe/Berlin"
    },
    "LHR": {
        "code": "LHR",
        "name": "London Heathrow Airport",
        "city": "London",
        "state": "INTL",
        "lat": 51.4706001282,
        "lon": -0.4619410038,
        "timezone": "Europe/London"
    },
    "AMS": {
        "code": "AMS",
        "name": "Amsterdam Airport Schiphol",
        "city": "Amsterdam",
        "state": "INTL",
        "lat": 52.3086013794,
        "lon": 4.7638897896,
        "timezone": "Europe/Amsterdam"
    },
    "CPH": {
        "code": "CPH",
        "name": "Copenhagen Kastrup Airport",
        "city": "Copenhagen",
        "state": "INTL",
        "lat": 55.6179008484,
        "lon": 12.6560001373,
        "timezone": "Europe/Copenhagen"
    },
    "ATL": {
        "code": "ATL",
        "name": "Hartsfield Jackson Atlanta International Airport",
        "city": "Atlanta",
        "state": "INTL",
        "lat": 33.6366996765,
        "lon": -84.4281005859,
        "timezone": "America/New_York"
    },
    "DFW": {
        "code": "DFW",
        "name": "Dallas Fort Worth International Airport",
        "city": "Dallas-Fort Worth",
        "state": "INTL",
        "lat": 32.8968009949,
        "lon": -97.0380020142,
        "timezone": "America/Chicago"
    },
    "JFK": {
        "code": "JFK",
        "name": "John F Kennedy International Airport",
        "city": "New York",
        "state": "INTL",
        "lat": 40.63980103,
        "lon": -73.77890015,
        "timezone": "America/New_York"
    },
    "LAX": {
        "code": "LAX",
        "name": "Los Angeles International Airport",
        "city": "Los Angeles",
        "state": "INTL",
        "lat": 33.94250107,
        "lon": -118.4079971,
        "timezone": "America/Los_Angeles"
    },
    "ORD": {
        "code": "ORD",
        "name": "Chicago O'Hare International Airport",
        "city": "Chicago",
        "state": "INTL",
        "lat": 41.97859955,
        "lon": -87.90480042,
        "timezone": "America/Chicago"
    },
    "SEA": {
        "code": "SEA",
        "name": "Seattle Tacoma International Airport",
        "city": "Seattle",
        "state": "INTL",
        "lat": 47.4490013123,
        "lon": -122.3089981079,
        "timezone": "America/Los_Angeles"
    },
    "SFO": {
        "code": "SFO",
        "name": "San Francisco International Airport",
        "city": "San Francisco",
        "state": "INTL",
        "lat": 37.6189994812,
        "lon": -122.375,
        "timezone": "America/Los_Angeles"
    },
    "BCN": {
        "code": "BCN",
        "name": "Barcelona International Airport",
        "city": "Barcelona",
        "state": "INTL",
        "lat": 41.2971000671,
        "lon": 2.0784599781,
        "timezone": "Europe/Madrid"
    },
    "MAD": {
        "code": "MAD",
        "name": "Madrid Barajas International Airport",
        "city": "Madrid",
        "state": "INTL",
        "lat": 40.4936,
        "lon": -3.56676,
        "timezone": "Europe/Madrid"
    },
    "CDG": {
        "code": "CDG",
        "name": "Charles de Gaulle International Airport",
        "city": "Paris",
        "state": "INTL",
        "lat": 49.0127983093,
        "lon": 2.5499999523,
        "timezone": "Europe/Paris"
    },
    "FCO": {
        "code": "FCO",
        "name": "Leonardo Da Vinci (Fiumicino) International Airport",
        "city": "Rome",
        "state": "INTL",
        "lat": 41.8045005798,
        "lon": 12.2508001328,
        "timezone": "Europe/Rome"
    },
    "ZRH": {
        "code": "ZRH",
        "name": "Zurich Airport",
        "city": "Zurich",
        "state": "INTL",
        "lat": 47.4646987915,
        "lon": 8.5491695404,
        "timezone": "Europe/Zurich"
    },
    "RAR": {
        "code": "RAR",
        "name": "Rarotonga International Airport",
        "city": "Avarua",
        "state": "INTL",
        "lat": -21.2026996613,
        "lon": -159.8059997559,
        "timezone": "Pacific/Rarotonga"
    },
    "NAN": {
        "code": "NAN",
        "name": "Nadi International Airport",
        "city": "Nadi",
        "state": "INTL",
        "lat": -17.755399704,
        "lon": 177.4429931641,
        "timezone": "Pacific/Fiji"
    },
    "TBU": {
        "code": "TBU",
        "name": "Fua'amotu International Airport",
        "city": "Nuku'alofa",
        "state": "INTL",
        "lat": -21.2411994934,
        "lon": -175.1499938965,
        "timezone": "Pacific/Tongatapu"
    },
    "APW": {
        "code": "APW",
        "name": "Faleolo International Airport",
        "city": "Apia",
        "state": "INTL",
        "lat": -13.8299999237,
        "lon": -172.0079956055,
        "timezone": "Pacific/Apia"
    },
    "PPT": {
        "code": "PPT",
        "name": "Faa'a International Airport",
        "city": "Papeete",
        "state": "INTL",
        "lat": -17.5536994934,
        "lon": -149.606994629,
        "timezone": "Pacific/Tahiti"
    },
    "VLI": {
        "code": "VLI",
        "name": "Port Vila Bauerfield Airport",
        "city": "Port Vila",
        "state": "INTL",
        "lat": -17.699300766,
        "lon": 168.3200073242,
        "timezone": "Pacific/Efate"
    },
    "NOU": {
        "code": "NOU",
        "name": "La Tontouta International Airport",
        "city": "Noumea",
        "state": "INTL",
        "lat": -22.0146007538,
        "lon": 166.2129974365,
        "timezone": "Pacific/Noumea"
    },
    "AKL": {
        "code": "AKL",
        "name": "Auckland International Airport",
        "city": "Auckland",
        "state": "INTL",
        "lat": -37.0080986023,
        "lon": 174.7920074463,
        "timezone": "Pacific/Auckland"
    },
    "CHC": {
        "code": "CHC",
        "name": "Christchurch International Airport",
        "city": "Christchurch",
        "state": "INTL",
        "lat": -43.4893989563,
        "lon": 172.5319976807,
        "timezone": "Pacific/Auckland"
    },
    "DUD": {
        "code": "DUD",
        "name": "Dunedin Airport",
        "city": "Dunedin",
        "state": "INTL",
        "lat": -45.9281005859,
        "lon": 170.1979980469,
        "timezone": "Pacific/Auckland"
    },
    "HLZ": {
        "code": "HLZ",
        "name": "Hamilton International Airport",
        "city": "Hamilton",
        "state": "INTL",
        "lat": -37.8666992188,
        "lon": 175.332000732,
        "timezone": "Pacific/Auckland"
    },
    "NPE": {
        "code": "NPE",
        "name": "Napier Airport",
        "city": "Napier",
        "state": "INTL",
        "lat": -39.465801239,
        "lon": 176.8699951172,
        "timezone": "Pacific/Auckland"
    },
    "NSN": {
        "code": "NSN",
        "name": "Nelson Airport",
        "city": "Nelson",
        "state": "INTL",
        "lat": -41.2983016968,
        "lon": 173.220993042,
        "timezone": "Pacific/Auckland"
    },
    "PMR": {
        "code": "PMR",
        "name": "Palmerston North Airport",
        "city": "Palmerston North",
        "state": "INTL",
        "lat": -40.3205986023,
        "lon": 175.6170043945,
        "timezone": "Pacific/Auckland"
    },
    "ZQN": {
        "code": "ZQN",
        "name": "Queenstown International Airport",
        "city": "Queenstown",
        "state": "INTL",
        "lat": -45.0210990906,
        "lon": 168.738998413,
        "timezone": "Pacific/Auckland"
    },
    "ROT": {
        "code": "ROT",
        "name": "Rotorua Regional Airport",
        "city": "Rotorua",
        "state": "INTL",
        "lat": -38.1091995239,
        "lon": 176.3170013428,
        "timezone": "Pacific/Auckland"
    },
    "WLG": {
        "code": "WLG",
        "name": "Wellington International Airport",
        "city": "Wellington",
        "state": "INTL",
        "lat": -41.3272018433,
        "lon": 174.804992676,
        "timezone": "Pacific/Auckland"
    },
    "DXB": {
        "code": "DXB",
        "name": "Dubai International Airport",
        "city": "Dubai",
        "state": "INTL",
        "lat": 25.2527999878,
        "lon": 55.3643989563,
        "timezone": "Asia/Dubai"
    },
    "DOH": {
        "code": "DOH",
        "name": "Hamad International Airport",
        "city": "Doha",
        "state": "INTL",
        "lat": 25.2605946,
        "lon": 51.6137665,
        "timezone": "Asia/Qatar"
    },
    "GUM": {
        "code": "GUM",
        "name": "Antonio B. Won Pat International Airport",
        "city": "Hagatna",
        "state": "INTL",
        "lat": 13.4834003448,
        "lon": 144.796005249,
        "timezone": "Pacific/Guam"
    },
    "HNL": {
        "code": "HNL",
        "name": "Honolulu International Airport",
        "city": "Honolulu",
        "state": "INTL",
        "lat": 21.3187007904,
        "lon": -157.9219970703,
        "timezone": "Pacific/Honolulu"
    },
    "TPE": {
        "code": "TPE",
        "name": "Taiwan Taoyuan International Airport",
        "city": "Taipei",
        "state": "INTL",
        "lat": 25.0776996613,
        "lon": 121.233001709,
        "timezone": "Asia/Taipei"
    },
    "NRT": {
        "code": "NRT",
        "name": "Narita International Airport",
        "city": "Tokyo",
        "state": "INTL",
        "lat": 35.7647018433,
        "lon": 140.3860015869,
        "timezone": "Asia/Tokyo"
    },
    "KIX": {
        "code": "KIX",
        "name": "Kansai International Airport",
        "city": "Osaka",
        "state": "INTL",
        "lat": 34.4272994995,
        "lon": 135.2440032959,
        "timezone": "Asia/Tokyo"
    },
    "HND": {
        "code": "HND",
        "name": "Tokyo International Airport",
        "city": "Tokyo",
        "state": "INTL",
        "lat": 35.5522994995,
        "lon": 139.7799987793,
        "timezone": "Asia/Tokyo"
    },
    "ICN": {
        "code": "ICN",
        "name": "Incheon International Airport",
        "city": "Seoul",
        "state": "INTL",
        "lat": 37.4691009521,
        "lon": 126.4509963989,
        "timezone": "Asia/Seoul"
    },
    "MNL": {
        "code": "MNL",
        "name": "Ninoy Aquino International Airport",
        "city": "Manila",
        "state": "INTL",
        "lat": 14.508600235,
        "lon": 121.019996643,
        "timezone": "Asia/Manila"
    },
    "SCL": {
        "code": "SCL",
        "name": "Comodoro Arturo Merino Benitez International Airport",
        "city": "Santiago",
        "state": "INTL",
        "lat": -33.3930015564,
        "lon": -70.7857971191,
        "timezone": "America/Santiago"
    },
    "BOM": {
        "code": "BOM",
        "name": "Chhatrapati Shivaji International Airport",
        "city": "Mumbai",
        "state": "INTL",
        "lat": 19.0886993408,
        "lon": 72.8678970337,
        "timezone": "Asia/Kolkata"
    },
    "HKG": {
        "code": "HKG",
        "name": "Chek Lap Kok International Airport",
        "city": "Hong Kong",
        "state": "INTL",
        "lat": 22.3089008331,
        "lon": 113.915000916,
        "timezone": "Asia/Hong_Kong"
    },
    "DEL": {
        "code": "DEL",
        "name": "Indira Gandhi International Airport",
        "city": "New Delhi",
        "state": "INTL",
        "lat": 28.5664997101,
        "lon": 77.1031036377,
        "timezone": "Asia/Kolkata"
    },
    "BKK": {
        "code": "BKK",
        "name": "Suvarnabhumi Airport",
        "city": "Bangkok",
        "state": "INTL",
        "lat": 13.6810998917,
        "lon": 100.7470016479,
        "timezone": "Asia/Bangkok"
    },
    "HKT": {
        "code": "HKT",
        "name": "Phuket International Airport",
        "city": "Phuket",
        "state": "INTL",
        "lat": 8.1132001877,
        "lon": 98.3169021606,
        "timezone": "Asia/Bangkok"
    },
    "SGN": {
        "code": "SGN",
        "name": "Tan Son Nhat International Airport",
        "city": "Ho Chi Minh City",
        "state": "INTL",
        "lat": 10.8187999725,
        "lon": 106.652000427,
        "timezone": "Asia/Ho_Chi_Minh"
    },
    "DPS": {
        "code": "DPS",
        "name": "Ngurah Rai (Bali) International Airport",
        "city": "Denpasar-Bali Island",
        "state": "INTL",
        "lat": -8.748169899,
        "lon": 115.1669998169,
        "timezone": "Asia/Makassar"
    },
    "JOG": {
        "code": "JOG",
        "name": "Adi Sutjipto International Airport",
        "city": "Yogyakarta-Java Island",
        "state": "INTL",
        "lat": -7.7881798744,
        "lon": 110.4319992065,
        "timezone": "Asia/Jakarta"
    },
    "SUB": {
        "code": "SUB",
        "name": "Juanda International Airport",
        "city": "Surabaya",
        "state": "INTL",
        "lat": -7.3798298836,
        "lon": 112.7870025635,
        "timezone": "Asia/Jakarta"
    },
    "CGK": {
        "code": "CGK",
        "name": "Soekarno-Hatta International Airport",
        "city": "Jakarta",
        "state": "INTL",
        "lat": -6.1255698204,
        "lon": 106.65599823,
        "timezone": "Asia/Jakarta"
    },
    "KUL": {
        "code": "KUL",
        "name": "Kuala Lumpur International Airport",
        "city": "Kuala Lumpur",
        "state": "INTL",
        "lat": 2.745579958,
        "lon": 101.7099990845,
        "timezone": "Asia/Kuala_Lumpur"
    },
    "SIN": {
        "code": "SIN",
        "name": "Singapore Changi International Airport",
        "city": "Singapore",
        "state": "INTL",
        "lat": 1.3501900434,
        "lon": 103.9940032959,
        "timezone": "Asia/Singapore"
    },
    "ALH": {
        "code": "ALH",
        "name": "Albany Airport",
        "city": "Albany",
        "state": "Western Australia",
        "lat": -34.9432983398,
        "lon": 117.8089981079,
        "timezone": "Australia/Perth"
    },
    "ABG": {
        "code": "ABG",
        "name": "Abingdon Downs Airport",
        "city": "Abingdon Downs",
        "state": "Queensland",
        "lat": -17.6166992188,
        "lon": 143.167007446,
        "timezone": "Australia/Brisbane"
    },
    "AWN": {
        "code": "AWN",
        "name": "Alton Downs Airport",
        "city": "Alton Downs",
        "state": "South Australia",
        "lat": -26.5333003998,
        "lon": 139.266998291,
        "timezone": "Australia/Adelaide"
    },
    "AUD": {
        "code": "AUD",
        "name": "Augustus Downs Airport",
        "city": "Augustus Downs",
        "state": "Queensland",
        "lat": -18.5149993896,
        "lon": 139.8780059814,
        "timezone": "Australia/Brisbane"
    },
    "MRP": {
        "code": "MRP",
        "name": "Marla Airport",
        "city": "Marla",
        "state": "South Australia",
        "lat": -27.3332996368,
        "lon": 133.6269989014,
        "timezone": "Australia/Adelaide"
    },
    "AXL": {
        "code": "AXL",
        "name": "Alexandria Homestead Airport",
        "city": "Alexandria Homestead",
        "state": "Northern-Territory",
        "lat": -19.0601997375,
        "lon": 136.7100067139,
        "timezone": "Australia/Darwin"
    },
    "AXC": {
        "code": "AXC",
        "name": "Aramac Airport",
        "city": "Aramac",
        "state": "Queensland",
        "lat": -22.9666996002,
        "lon": 145.2420043945,
        "timezone": "Australia/Brisbane"
    },
    "ADO": {
        "code": "ADO",
        "name": "Andamooka Airport",
        "city": "Andamooka",
        "state": "South Australia",
        "lat": -30.4382991791,
        "lon": 137.1369934082,
        "timezone": "Australia/Adelaide"
    },
    "AMX": {
        "code": "AMX",
        "name": "Ammaroo Airport",
        "city": "Ammaroo",
        "state": "Northern-Territory",
        "lat": -21.7383003235,
        "lon": 135.2420043945,
        "timezone": "Australia/Darwin"
    },
    "AMT": {
        "code": "AMT",
        "name": "Amata Airport",
        "city": "Amata",
        "state": "South Australia",
        "lat": -26.1082992554,
        "lon": 131.2070007324,
        "timezone": "Australia/Adelaide"
    },
    "WLP": {
        "code": "WLP",
        "name": "West Angelas Airport",
        "city": "West Angelas",
        "state": "Western Australia",
        "lat": -23.1355555556,
        "lon": 118.706975,
        "timezone": "Australia/Perth"
    },
    "AYL": {
        "code": "AYL",
        "name": "Anthony Lagoon Airport",
        "city": "Anthony Lagoon",
        "state": "Northern-Territory",
        "lat": -18.018079031,
        "lon": 135.535068512,
        "timezone": "Australia/Darwin"
    },
    "ABH": {
        "code": "ABH",
        "name": "Alpha Airport",
        "city": "Alpha",
        "state": "Queensland",
        "lat": -23.6460990906,
        "lon": 146.5839996338,
        "timezone": "Australia/Brisbane"
    },
    "ARY": {
        "code": "ARY",
        "name": "Ararat Airport",
        "city": "Ararat",
        "state": "Victoria",
        "lat": -37.3093986511,
        "lon": 142.9889984131,
        "timezone": "Australia/Melbourne"
    },
    "GYL": {
        "code": "GYL",
        "name": "Argyle Airport",
        "city": "Argyle",
        "state": "Western Australia",
        "lat": -16.6368999481,
        "lon": 128.4510040283,
        "timezone": "Australia/Perth"
    },
    "ARM": {
        "code": "ARM",
        "name": "Armidale Airport",
        "city": "Armidale",
        "state": "New South Wales",
        "lat": -30.5280990601,
        "lon": 151.617004395,
        "timezone": "Australia/Sydney"
    },
    "AAB": {
        "code": "AAB",
        "name": "Arrabury Airport",
        "city": "Arrabury",
        "state": "Queensland",
        "lat": -26.7000007629,
        "lon": 141.0500030518,
        "timezone": "Australia/Brisbane"
    },
    "AUU": {
        "code": "AUU",
        "name": "Aurukun Airport",
        "city": "Aurukun",
        "state": "Queensland",
        "lat": -13.3538999557,
        "lon": 141.720993042,
        "timezone": "Australia/Brisbane"
    },
    "AWP": {
        "code": "AWP",
        "name": "Austral Downs Airport",
        "city": "Austral Downs",
        "state": "Northern-Territory",
        "lat": -20.5,
        "lon": 137.75,
        "timezone": "Australia/Darwin"
    },
    "AVG": {
        "code": "AVG",
        "name": "Auvergne Airport",
        "city": "Auvergne",
        "state": "Northern-Territory",
        "lat": -15.6999998093,
        "lon": 130,
        "timezone": "Australia/Darwin"
    },
    "AYQ": {
        "code": "AYQ",
        "name": "Ayers Rock Connellan Airport",
        "city": "Ayers Rock",
        "state": "Northern-Territory",
        "lat": -25.1861000061,
        "lon": 130.9759979248,
        "timezone": "Australia/Darwin"
    },
    "AYR": {
        "code": "AYR",
        "name": "Ayr Airport",
        "city": "Ayr",
        "state": "Queensland",
        "lat": -19.584400177,
        "lon": 147.328994751,
        "timezone": "Australia/Brisbane"
    },
    "ABM": {
        "code": "ABM",
        "name": "Bamaga Injinoo Airport",
        "city": "Bamaga Injinoo",
        "state": "Queensland",
        "lat": -10.950799942,
        "lon": 142.4589996338,
        "timezone": "Australia/Brisbane"
    },
    "BCI": {
        "code": "BCI",
        "name": "Barcaldine Airport",
        "city": "Barcaldine",
        "state": "Queensland",
        "lat": -23.5652999878,
        "lon": 145.307006836,
        "timezone": "Australia/Brisbane"
    },
    "ASP": {
        "code": "ASP",
        "name": "Alice Springs Airport",
        "city": "Alice Springs",
        "state": "Northern-Territory",
        "lat": -23.8066997528,
        "lon": 133.9019927979,
        "timezone": "Australia/Darwin"
    },
    "BDD": {
        "code": "BDD",
        "name": "Badu Island Airport",
        "city": "Badu Island",
        "state": "Queensland",
        "lat": -10.1499996185,
        "lon": 142.1734,
        "timezone": "Australia/Brisbane"
    },
    "BKP": {
        "code": "BKP",
        "name": "Barkly Downs Airport",
        "city": "Barkly Downs",
        "state": "Queensland",
        "lat": -20.4958333333,
        "lon": 138.474722222,
        "timezone": "Australia/Brisbane"
    },
    "BBE": {
        "code": "BBE",
        "name": "Big Bell Airport",
        "city": "Big Bell",
        "state": "Western Australia",
        "lat": -27.3285999298,
        "lon": 117.672996521,
        "timezone": "Australia/Perth"
    },
    "BNE": {
        "code": "BNE",
        "name": "Brisbane International Airport",
        "city": "Brisbane",
        "state": "Queensland",
        "lat": -27.3841991425,
        "lon": 153.1170043945,
        "timezone": "Australia/Brisbane"
    },
    "OOL": {
        "code": "OOL",
        "name": "Gold Coast Airport",
        "city": "Gold Coast",
        "state": "Queensland",
        "lat": -28.1644001007,
        "lon": 153.505004883,
        "timezone": "Australia/Brisbane"
    },
    "BKQ": {
        "code": "BKQ",
        "name": "Blackall Airport",
        "city": "Blackall",
        "state": "Queensland",
        "lat": -24.4277992249,
        "lon": 145.429000854,
        "timezone": "Australia/Brisbane"
    },
    "CNS": {
        "code": "CNS",
        "name": "Cairns International Airport",
        "city": "Cairns",
        "state": "Queensland",
        "lat": -16.885799408,
        "lon": 145.755004883,
        "timezone": "Australia/Brisbane"
    },
    "CTL": {
        "code": "CTL",
        "name": "Charleville Airport",
        "city": "Charleville",
        "state": "Queensland",
        "lat": -26.4132995605,
        "lon": 146.261993408,
        "timezone": "Australia/Brisbane"
    },
    "BDW": {
        "code": "BDW",
        "name": "Bedford Downs Airport",
        "city": "Bedford Downs",
        "state": "Western Australia",
        "lat": -17.286699295,
        "lon": 127.462997437,
        "timezone": "Australia/Perth"
    },
    "BXG": {
        "code": "BXG",
        "name": "Bendigo Airport",
        "city": "Bendigo",
        "state": "Victoria",
        "lat": -36.7393989563,
        "lon": 144.330001831,
        "timezone": "Australia/Melbourne"
    },
    "BVI": {
        "code": "BVI",
        "name": "Birdsville Airport",
        "city": "Birdsville",
        "state": "Queensland",
        "lat": -25.8974990845,
        "lon": 139.3480072021,
        "timezone": "Australia/Brisbane"
    },
    "BXF": {
        "code": "BXF",
        "name": "Pumululu National Park",
        "city": "Bellburn",
        "state": "Western Australia",
        "lat": -17.545,
        "lon": 128.305,
        "timezone": "Australia/Perth"
    },
    "BTX": {
        "code": "BTX",
        "name": "Betoota Airport",
        "city": "Betoota",
        "state": "Queensland",
        "lat": -25.6417007446,
        "lon": 140.7830047607,
        "timezone": "Australia/Brisbane"
    },
    "OCM": {
        "code": "OCM",
        "name": "Boolgeeda Airport",
        "city": "Boolgeeda",
        "state": "Western Australia",
        "lat": -22.54,
        "lon": 117.275,
        "timezone": "Australia/Perth"
    },
    "BQW": {
        "code": "BQW",
        "name": "Balgo Hill Airport",
        "city": "Balgo Hill",
        "state": "Western Australia",
        "lat": -20.1483001709,
        "lon": 127.9729995728,
        "timezone": "Australia/Perth"
    },
    "BHQ": {
        "code": "BHQ",
        "name": "Broken Hill Airport",
        "city": "Broken Hill",
        "state": "New South Wales",
        "lat": -32.0013999939,
        "lon": 141.472000122,
        "timezone": "Australia/Broken_Hill"
    },
    "HTI": {
        "code": "HTI",
        "name": "Hamilton Island Airport",
        "city": "Hamilton Island",
        "state": "Queensland",
        "lat": -20.3581008911,
        "lon": 148.95199585,
        "timezone": "Australia/Lindeman"
    },
    "BEU": {
        "code": "BEU",
        "name": "Bedourie Airport",
        "city": "Bedourie",
        "state": "Queensland",
        "lat": -24.3460998535,
        "lon": 139.4600067139,
        "timezone": "Australia/Brisbane"
    },
    "BIW": {
        "code": "BIW",
        "name": "Billiluna Airport",
        "city": "Billiluna",
        "state": "Western Australia",
        "lat": -19.5666999817,
        "lon": 127.666999817,
        "timezone": "Australia/Perth"
    },
    "BZP": {
        "code": "BZP",
        "name": "Bizant Airport",
        "city": "Lakefield National Park",
        "state": "Queensland",
        "lat": -14.7402777778,
        "lon": 144.119444444,
        "timezone": "Australia/Brisbane"
    },
    "BRK": {
        "code": "BRK",
        "name": "Bourke Airport",
        "city": "Bourke",
        "state": "New South Wales",
        "lat": -30.0391998291,
        "lon": 145.9519958496,
        "timezone": "Australia/Sydney"
    },
    "BUC": {
        "code": "BUC",
        "name": "Burketown Airport",
        "city": "Burketown",
        "state": "Queensland",
        "lat": -17.7486000061,
        "lon": 139.533996582,
        "timezone": "Australia/Brisbane"
    },
    "BLN": {
        "code": "BLN",
        "name": "Benalla Airport",
        "city": "Benalla",
        "state": "Victoria",
        "lat": -36.5518989563,
        "lon": 146.0070037842,
        "timezone": "Australia/Melbourne"
    },
    "LCN": {
        "code": "LCN",
        "name": "Balcanoona Airport",
        "city": "Balcanoona",
        "state": "South Australia",
        "lat": -30.5349998474,
        "lon": 139.3370056152,
        "timezone": "Australia/Adelaide"
    },
    "BLS": {
        "code": "BLS",
        "name": "Bollon Airport",
        "city": "Bollon",
        "state": "Queensland",
        "lat": -28.0583000183,
        "lon": 147.483001709,
        "timezone": "Australia/Brisbane"
    },
    "BQB": {
        "code": "BQB",
        "name": "Busselton Regional Airport",
        "city": "Busselton",
        "state": "Western Australia",
        "lat": -33.6884231567,
        "lon": 115.401596069,
        "timezone": "Australia/Perth"
    },
    "ISA": {
        "code": "ISA",
        "name": "Mount Isa Airport",
        "city": "Mount Isa",
        "state": "Queensland",
        "lat": -20.6639003754,
        "lon": 139.488998413,
        "timezone": "Australia/Brisbane"
    },
    "MCY": {
        "code": "MCY",
        "name": "Sunshine Coast Airport",
        "city": "Maroochydore",
        "state": "Queensland",
        "lat": -26.6033000946,
        "lon": 153.091003418,
        "timezone": "Australia/Brisbane"
    },
    "MKY": {
        "code": "MKY",
        "name": "Mackay Airport",
        "city": "Mackay",
        "state": "Queensland",
        "lat": -21.1716995239,
        "lon": 149.179992676,
        "timezone": "Australia/Brisbane"
    },
    "BNK": {
        "code": "BNK",
        "name": "Ballina Byron Gateway Airport",
        "city": "Ballina",
        "state": "New South Wales",
        "lat": -28.8339004517,
        "lon": 153.56199646,
        "timezone": "Australia/Sydney"
    },
    "BSJ": {
        "code": "BSJ",
        "name": "Bairnsdale Airport",
        "city": "Bairnsdale",
        "state": "Victoria",
        "lat": -37.8875007629,
        "lon": 147.5679931641,
        "timezone": "Australia/Melbourne"
    },
    "GIC": {
        "code": "GIC",
        "name": "Boigu Airport",
        "city": "Boigu",
        "state": "Queensland",
        "lat": -9.2327804565,
        "lon": 142.218002319,
        "timezone": "Australia/Brisbane"
    },
    "OKY": {
        "code": "OKY",
        "name": "Oakey Airport",
        "city": "Oakey",
        "state": "Queensland",
        "lat": -27.4113998413,
        "lon": 151.7350006104,
        "timezone": "Australia/Brisbane"
    },
    "BQL": {
        "code": "BQL",
        "name": "Boulia Airport",
        "city": "Boulia",
        "state": "Queensland",
        "lat": -22.9132995605,
        "lon": 139.8999938965,
        "timezone": "Australia/Brisbane"
    },
    "BMP": {
        "code": "BMP",
        "name": "Brampton Island Airport",
        "city": "Brampton Island",
        "state": "Queensland",
        "lat": -20.8033008575,
        "lon": 149.2700042725,
        "timezone": "Australia/Brisbane"
    },
    "PPP": {
        "code": "PPP",
        "name": "Proserpine Whitsunday Coast Airport",
        "city": "Proserpine",
        "state": "Queensland",
        "lat": -20.4950008392,
        "lon": 148.552001953,
        "timezone": "Australia/Brisbane"
    },
    "ROK": {
        "code": "ROK",
        "name": "Rockhampton Airport",
        "city": "Rockhampton",
        "state": "Queensland",
        "lat": -23.3819007874,
        "lon": 150.475006104,
        "timezone": "Australia/Brisbane"
    },
    "BOX": {
        "code": "BOX",
        "name": "Borroloola Airport",
        "city": "Borroloola",
        "state": "Northern-Territory",
        "lat": -16.0753002167,
        "lon": 136.3020019531,
        "timezone": "Australia/Darwin"
    },
    "BME": {
        "code": "BME",
        "name": "Broome International Airport",
        "city": "Broome",
        "state": "Western Australia",
        "lat": -17.9447002411,
        "lon": 122.2320022583,
        "timezone": "Australia/Perth"
    },
    "BZD": {
        "code": "BZD",
        "name": "Balranald Airport",
        "city": "Balranald",
        "state": "New South Wales",
        "lat": -34.6236000061,
        "lon": 143.5780029297,
        "timezone": "Australia/Sydney"
    },
    "BTD": {
        "code": "BTD",
        "name": "Brunette Downs Airport",
        "city": "Brunette Downs",
        "state": "Northern-Territory",
        "lat": -18.6399993896,
        "lon": 135.93800354,
        "timezone": "Australia/Darwin"
    },
    "BWQ": {
        "code": "BWQ",
        "name": "Brewarrina Airport",
        "city": "Brewarrina",
        "state": "New South Wales",
        "lat": -29.9738998413,
        "lon": 146.8170013428,
        "timezone": "Australia/Sydney"
    },
    "BYP": {
        "code": "BYP",
        "name": "Barimunya Airport",
        "city": "Barimunya",
        "state": "Western Australia",
        "lat": -22.6739006042,
        "lon": 119.1660003662,
        "timezone": "Australia/Perth"
    },
    "BHS": {
        "code": "BHS",
        "name": "Bathurst Airport",
        "city": "Bathurst",
        "state": "New South Wales",
        "lat": -33.4094009399,
        "lon": 149.651992798,
        "timezone": "Australia/Sydney"
    },
    "BRT": {
        "code": "BRT",
        "name": "Bathurst Island Airport",
        "city": "Bathurst Island",
        "state": "Northern-Territory",
        "lat": -11.769200325,
        "lon": 130.6199951172,
        "timezone": "Australia/Darwin"
    },
    "TSV": {
        "code": "TSV",
        "name": "Townsville Airport",
        "city": "Townsville",
        "state": "Queensland",
        "lat": -19.2525005341,
        "lon": 146.7649993896,
        "timezone": "Australia/Brisbane"
    },
    "BLT": {
        "code": "BLT",
        "name": "Blackwater Airport",
        "city": "Blackwater",
        "state": "Queensland",
        "lat": -23.603099823,
        "lon": 148.8070068359,
        "timezone": "Australia/Brisbane"
    },
    "BDB": {
        "code": "BDB",
        "name": "Bundaberg Airport",
        "city": "Bundaberg",
        "state": "Queensland",
        "lat": -24.9039001465,
        "lon": 152.319000244,
        "timezone": "Australia/Brisbane"
    },
    "BUY": {
        "code": "BUY",
        "name": "Bunbury Airport",
        "city": "Bunbury",
        "state": "Western Australia",
        "lat": -33.3782997131,
        "lon": 115.6770019531,
        "timezone": "Australia/Perth"
    },
    "BIP": {
        "code": "BIP",
        "name": "Bulimba Airport",
        "city": "Bulimba",
        "state": "Queensland",
        "lat": -16.8808002472,
        "lon": 143.479003906,
        "timezone": "Australia/Brisbane"
    },
    "ZBO": {
        "code": "ZBO",
        "name": "Bowen Airport",
        "city": "Bowen",
        "state": "Queensland",
        "lat": -20.0182991028,
        "lon": 148.2149963379,
        "timezone": "Australia/Brisbane"
    },
    "WEI": {
        "code": "WEI",
        "name": "Weipa Airport",
        "city": "Weipa",
        "state": "Queensland",
        "lat": -12.6786003113,
        "lon": 141.925003052,
        "timezone": "Australia/Brisbane"
    },
    "WTB": {
        "code": "WTB",
        "name": "Toowoomba Wellcamp Airport",
        "city": "Wellcamp",
        "state": "Queensland",
        "lat": -27.558333,
        "lon": 151.793333,
        "timezone": "Australia/Brisbane"
    },
    "BWB": {
        "code": "BWB",
        "name": "Barrow Island Airport",
        "city": "Barrow Island",
        "state": "Western Australia",
        "lat": -20.8644008636,
        "lon": 115.40599823,
        "timezone": "Australia/Perth"
    },
    "BVZ": {
        "code": "BVZ",
        "name": "Beverley Springs Airport",
        "city": "Beverley Springs",
        "state": "Western Australia",
        "lat": -16.7332992554,
        "lon": 125.4329986572,
        "timezone": "Australia/Perth"
    },
    "CGV": {
        "code": "CGV",
        "name": "Caiguna Airport",
        "city": "Caiguna",
        "state": "Western Australia",
        "lat": -32.2649993896,
        "lon": 125.4929962158,
        "timezone": "Australia/Eucla"
    },
    "CLH": {
        "code": "CLH",
        "name": "Coolah Airport",
        "city": "Coolah",
        "state": "New South Wales",
        "lat": -31.7733001709,
        "lon": 149.6100006104,
        "timezone": "Australia/Sydney"
    },
    "CVQ": {
        "code": "CVQ",
        "name": "Carnarvon Airport",
        "city": "Carnarvon",
        "state": "Western Australia",
        "lat": -24.8805999756,
        "lon": 113.6719970703,
        "timezone": "Australia/Perth"
    },
    "CSI": {
        "code": "CSI",
        "name": "Casino Airport",
        "city": "Casino",
        "state": "New South Wales",
        "lat": -28.8827991486,
        "lon": 153.0670013428,
        "timezone": "Australia/Sydney"
    },
    "CAZ": {
        "code": "CAZ",
        "name": "Cobar Airport",
        "city": "Cobar",
        "state": "New South Wales",
        "lat": -31.5382995605,
        "lon": 145.7940063477,
        "timezone": "Australia/Sydney"
    },
    "COJ": {
        "code": "COJ",
        "name": "Coonabarabran Airport",
        "city": "Coonabarabran",
        "state": "New South Wales",
        "lat": -31.3325004578,
        "lon": 149.266998291,
        "timezone": "Australia/Sydney"
    },
    "CBY": {
        "code": "CBY",
        "name": "Canobie Airport",
        "city": "Canobie",
        "state": "Queensland",
        "lat": -19.4794006348,
        "lon": 140.927001953,
        "timezone": "Australia/Brisbane"
    },
    "CBI": {
        "code": "CBI",
        "name": "Cape Barren Island Airport",
        "city": "Cape Barren Island",
        "state": "Tasmania",
        "lat": -40.3917007446,
        "lon": 148.016998291,
        "timezone": "Australia/Hobart"
    },
    "CPD": {
        "code": "CPD",
        "name": "Coober Pedy Airport",
        "city": "Coober Pedy",
        "state": "South Australia",
        "lat": -29.0400009155,
        "lon": 134.720993042,
        "timezone": "Australia/Adelaide"
    },
    "CRB": {
        "code": "CRB",
        "name": "Collarenebri Airport",
        "city": "Collarenebri",
        "state": "New South Wales",
        "lat": -29.5216999054,
        "lon": 148.5820007324,
        "timezone": "Australia/Sydney"
    },
    "CCL": {
        "code": "CCL",
        "name": "Chinchilla Airport",
        "city": "Chinchilla",
        "state": "Queensland",
        "lat": -26.7749996185,
        "lon": 150.6170043945,
        "timezone": "Australia/Brisbane"
    },
    "CNC": {
        "code": "CNC",
        "name": "Coconut Island Airport",
        "city": "Coconut Island",
        "state": "Queensland",
        "lat": -10.0500001907,
        "lon": 143.0700073242,
        "timezone": "Australia/Brisbane"
    },
    "CNJ": {
        "code": "CNJ",
        "name": "Cloncurry Airport",
        "city": "Cloncurry",
        "state": "Queensland",
        "lat": -20.6686000824,
        "lon": 140.503997803,
        "timezone": "Australia/Brisbane"
    },
    "CBX": {
        "code": "CBX",
        "name": "Condobolin Airport",
        "city": "Condobolin",
        "state": "New South Wales",
        "lat": -33.0643997192,
        "lon": 147.2089996338,
        "timezone": "Australia/Sydney"
    },
    "CUD": {
        "code": "CUD",
        "name": "Caloundra Airport",
        "city": "Caloundra",
        "state": "Queensland",
        "lat": -26.7999992371,
        "lon": 153.1000061035,
        "timezone": "Australia/Brisbane"
    },
    "CED": {
        "code": "CED",
        "name": "Ceduna Airport",
        "city": "Ceduna",
        "state": "South Australia",
        "lat": -32.1305999756,
        "lon": 133.7100067139,
        "timezone": "Australia/Adelaide"
    },
    "CVC": {
        "code": "CVC",
        "name": "Cleve Airport",
        "city": "Cleve",
        "state": "South Australia",
        "lat": -33.7097015381,
        "lon": 136.5050048828,
        "timezone": "Australia/Adelaide"
    },
    "CFI": {
        "code": "CFI",
        "name": "Camfield Airport",
        "city": "Camfield",
        "state": "Northern-Territory",
        "lat": -17.0216999054,
        "lon": 131.3269958496,
        "timezone": "Australia/Darwin"
    },
    "CFH": {
        "code": "CFH",
        "name": "Clifton Hills Landing Strip",
        "city": "Clifton Hills Station",
        "state": "South Australia",
        "lat": -27.015879,
        "lon": 138.89275,
        "timezone": "Australia/Adelaide"
    },
    "LLG": {
        "code": "LLG",
        "name": "Chillagoe Airport",
        "city": "Chillagoe",
        "state": "Queensland",
        "lat": -17.1427993774,
        "lon": 144.529006958,
        "timezone": "Australia/Brisbane"
    },
    "CKW": {
        "code": "CKW",
        "name": "Graeme Rowley Aerodrome",
        "city": "Christmas Creek mine",
        "state": "Western Australia",
        "lat": -22.355556,
        "lon": 119.652222,
        "timezone": "Australia/Perth"
    },
    "CXT": {
        "code": "CXT",
        "name": "Charters Towers Airport",
        "city": "Charters Towers",
        "state": "Queensland",
        "lat": -20.0431003571,
        "lon": 146.2729949951,
        "timezone": "Australia/Brisbane"
    },
    "DCN": {
        "code": "DCN",
        "name": "RAAF Base Curtin",
        "city": "RAAF Base Curtin",
        "state": "Western Australia",
        "lat": -17.5813999176,
        "lon": 123.82800293,
        "timezone": "Australia/Perth"
    },
    "CKI": {
        "code": "CKI",
        "name": "Croker Island Airport",
        "city": "Croker Island",
        "state": "Northern-Territory",
        "lat": -11.1649999619,
        "lon": 132.483001709,
        "timezone": "Australia/Darwin"
    },
    "CTN": {
        "code": "CTN",
        "name": "Cooktown Airport",
        "city": "Cooktown",
        "state": "Queensland",
        "lat": -15.4447002411,
        "lon": 145.1840057373,
        "timezone": "Australia/Brisbane"
    },
    "CMQ": {
        "code": "CMQ",
        "name": "Clermont Airport",
        "city": "Clermont",
        "state": "Queensland",
        "lat": -22.7730998993,
        "lon": 147.6210021973,
        "timezone": "Australia/Brisbane"
    },
    "CMA": {
        "code": "CMA",
        "name": "Cunnamulla Airport",
        "city": "Cunnamulla",
        "state": "Queensland",
        "lat": -28.0300006866,
        "lon": 145.6219940186,
        "timezone": "Australia/Brisbane"
    },
    "CML": {
        "code": "CML",
        "name": "Camooweal Airport",
        "city": "Camooweal",
        "state": "Queensland",
        "lat": -19.911699295,
        "lon": 138.125,
        "timezone": "Australia/Brisbane"
    },
    "NIF": {
        "code": "NIF",
        "name": "Camp Nifty Airport",
        "city": "Camp Nifty",
        "state": "Western Australia",
        "lat": -21.6716995239,
        "lon": 121.5869979858,
        "timezone": "Australia/Perth"
    },
    "CES": {
        "code": "CES",
        "name": "Cessnock Airport",
        "city": "Cessnock",
        "state": "New South Wales",
        "lat": -32.7874984741,
        "lon": 151.3419952393,
        "timezone": "Australia/Sydney"
    },
    "CNB": {
        "code": "CNB",
        "name": "Coonamble Airport",
        "city": "Coonamble",
        "state": "New South Wales",
        "lat": -30.9832992554,
        "lon": 148.3760070801,
        "timezone": "Australia/Sydney"
    },
    "ODL": {
        "code": "ODL",
        "name": "Cordillo Downs Airport",
        "city": "Cordillo Downs",
        "state": "South Australia",
        "lat": -26.745300293,
        "lon": 140.6380004883,
        "timezone": "Australia/Adelaide"
    },
    "CUQ": {
        "code": "CUQ",
        "name": "Coen Airport",
        "city": "Coen",
        "state": "Queensland",
        "lat": -13.7608003616,
        "lon": 143.1139984131,
        "timezone": "Australia/Brisbane"
    },
    "CIE": {
        "code": "CIE",
        "name": "Collie Airport",
        "city": "Collie",
        "state": "Western Australia",
        "lat": -33.3666992188,
        "lon": 116.2170028687,
        "timezone": "Australia/Perth"
    },
    "OOM": {
        "code": "OOM",
        "name": "Cooma Snowy Mountains Airport",
        "city": "Cooma",
        "state": "New South Wales",
        "lat": -36.3005981445,
        "lon": 148.973999023,
        "timezone": "Australia/Sydney"
    },
    "CDA": {
        "code": "CDA",
        "name": "Cooinda Airport",
        "city": "Cooinda",
        "state": "Northern-Territory",
        "lat": -12.9033002853,
        "lon": 132.5319976807,
        "timezone": "Australia/Darwin"
    },
    "CWW": {
        "code": "CWW",
        "name": "Corowa Airport",
        "city": "Corowa",
        "state": "New South Wales",
        "lat": -35.9947013855,
        "lon": 146.3569946289,
        "timezone": "Australia/Melbourne"
    },
    "CYG": {
        "code": "CYG",
        "name": "Corryong Airport",
        "city": "Corryong",
        "state": "Victoria",
        "lat": -36.182800293,
        "lon": 147.8880004883,
        "timezone": "Australia/Melbourne"
    },
    "CXQ": {
        "code": "CXQ",
        "name": "Christmas Creek Station Airport",
        "city": "Christmas Creek Station",
        "state": "Western Australia",
        "lat": -18.8833007813,
        "lon": 125.9169998169,
        "timezone": "Australia/Perth"
    },
    "CDQ": {
        "code": "CDQ",
        "name": "Croydon Airport",
        "city": "Croydon",
        "state": "Queensland",
        "lat": -18.2250003815,
        "lon": 142.2579956055,
        "timezone": "Australia/Brisbane"
    },
    "KCE": {
        "code": "KCE",
        "name": "Collinsville Airport",
        "city": "Collinsville",
        "state": "Queensland",
        "lat": -20.5967006683,
        "lon": 147.8600006104,
        "timezone": "Australia/Brisbane"
    },
    "CMD": {
        "code": "CMD",
        "name": "Cootamundra Airport",
        "city": "Cootamundra",
        "state": "New South Wales",
        "lat": -34.6239013672,
        "lon": 148.0279998779,
        "timezone": "Australia/Sydney"
    },
    "CUG": {
        "code": "CUG",
        "name": "Cudal Airport",
        "city": "Cudal",
        "state": "New South Wales",
        "lat": -33.278301239,
        "lon": 148.7630004883,
        "timezone": "Australia/Sydney"
    },
    "CUY": {
        "code": "CUY",
        "name": "Cue Airport",
        "city": "Cue",
        "state": "Western Australia",
        "lat": -27.4466991425,
        "lon": 117.9179992676,
        "timezone": "Australia/Perth"
    },
    "CJF": {
        "code": "CJF",
        "name": "Coondewanna Wa Airport",
        "city": "Coondewanna Wa",
        "state": "Western Australia",
        "lat": -22.966667,
        "lon": 118.802222,
        "timezone": "Australia/Perth"
    },
    "CWR": {
        "code": "CWR",
        "name": "Cowarie Airport",
        "city": "Cowarie",
        "state": "South Australia",
        "lat": -27.7117004395,
        "lon": 138.3280029297,
        "timezone": "Australia/Adelaide"
    },
    "CCW": {
        "code": "CCW",
        "name": "Cowell Airport",
        "city": "Cowell",
        "state": "South Australia",
        "lat": -33.6666984558,
        "lon": 136.891998291,
        "timezone": "Australia/Adelaide"
    },
    "CWT": {
        "code": "CWT",
        "name": "Cowra Airport",
        "city": "Cowra",
        "state": "New South Wales",
        "lat": -33.8446998596,
        "lon": 148.6490020752,
        "timezone": "Australia/Sydney"
    },
    "COY": {
        "code": "COY",
        "name": "Coolawanyah Airport",
        "city": "Coolawanyah",
        "state": "Western Australia",
        "lat": -21.7833003998,
        "lon": 117.8000030518,
        "timezone": "Australia/Perth"
    },
    "DJR": {
        "code": "DJR",
        "name": "Dajarra Airport",
        "city": "Dajarra",
        "state": "Queensland",
        "lat": -21.7082996368,
        "lon": 139.5330047607,
        "timezone": "Australia/Brisbane"
    },
    "DBY": {
        "code": "DBY",
        "name": "Dalby Airport",
        "city": "Dalby",
        "state": "Queensland",
        "lat": -27.1553001404,
        "lon": 151.266998291,
        "timezone": "Australia/Brisbane"
    },
    "DRN": {
        "code": "DRN",
        "name": "Dirranbandi Airport",
        "city": "Dirranbandi",
        "state": "Queensland",
        "lat": -28.5916996002,
        "lon": 148.2169952393,
        "timezone": "Australia/Brisbane"
    },
    "DNB": {
        "code": "DNB",
        "name": "Dunbar Airport",
        "city": "Dunbar",
        "state": "Queensland",
        "lat": -16.0499992371,
        "lon": 142.3999938965,
        "timezone": "Australia/Brisbane"
    },
    "DRB": {
        "code": "DRB",
        "name": "Derby Airport",
        "city": "Derby",
        "state": "Western Australia",
        "lat": -17.3700008392,
        "lon": 123.6610031128,
        "timezone": "Australia/Perth"
    },
    "DFP": {
        "code": "DFP",
        "name": "Drumduff Airport",
        "city": "Drumduff",
        "state": "Queensland",
        "lat": -16.0529994965,
        "lon": 143.011993408,
        "timezone": "Australia/Brisbane"
    },
    "DGD": {
        "code": "DGD",
        "name": "Dalgaranga Gold Mine Airport",
        "city": "Dalgaranga Gold Mine",
        "state": "Western Australia",
        "lat": -27.8302777778,
        "lon": 117.316388889,
        "timezone": "Australia/Perth"
    },
    "DXD": {
        "code": "DXD",
        "name": "Dixie Airport",
        "city": "New Dixie",
        "state": "Queensland",
        "lat": -15.1174944348,
        "lon": 143.316049576,
        "timezone": "Australia/Brisbane"
    },
    "DKI": {
        "code": "DKI",
        "name": "Dunk Island Airport",
        "city": "Dunk Island",
        "state": "Queensland",
        "lat": -17.9416999817,
        "lon": 146.1399993896,
        "timezone": "Australia/Brisbane"
    },
    "DLK": {
        "code": "DLK",
        "name": "Dulkaninna Airport",
        "city": "Dulkaninna",
        "state": "South Australia",
        "lat": -29.013299942,
        "lon": 138.4810028076,
        "timezone": "Australia/Adelaide"
    },
    "DNQ": {
        "code": "DNQ",
        "name": "Deniliquin Airport",
        "city": "Deniliquin",
        "state": "New South Wales",
        "lat": -35.5593986511,
        "lon": 144.945999146,
        "timezone": "Australia/Sydney"
    },
    "DDN": {
        "code": "DDN",
        "name": "Delta Downs Airport",
        "city": "Delta Downs",
        "state": "Queensland",
        "lat": -16.9916992188,
        "lon": 141.3170013428,
        "timezone": "Australia/Brisbane"
    },
    "DLV": {
        "code": "DLV",
        "name": "Delissaville Airport",
        "city": "Delissaville",
        "state": "Northern-Territory",
        "lat": -12.5500001907,
        "lon": 130.6849975586,
        "timezone": "Australia/Darwin"
    },
    "DYW": {
        "code": "DYW",
        "name": "Daly Waters Airport",
        "city": "Daly Waters",
        "state": "Northern-Territory",
        "lat": -16.2646950664,
        "lon": 133.383378983,
        "timezone": "Australia/Darwin"
    },
    "DMD": {
        "code": "DMD",
        "name": "Doomadgee Airport",
        "city": "Doomadgee",
        "state": "Queensland",
        "lat": -17.9402999878,
        "lon": 138.8220062256,
        "timezone": "Australia/Brisbane"
    },
    "DVR": {
        "code": "DVR",
        "name": "Daly River Airport",
        "city": "Daly River",
        "state": "Northern-Territory",
        "lat": -13.7498064041,
        "lon": 130.6938781738,
        "timezone": "Australia/Darwin"
    },
    "NLF": {
        "code": "NLF",
        "name": "Darnley Island Airport",
        "city": "Darnley Island",
        "state": "Queensland",
        "lat": -9.5833301544,
        "lon": 143.766998291,
        "timezone": "Australia/Brisbane"
    },
    "DRD": {
        "code": "DRD",
        "name": "Dorunda Airport",
        "city": "Dorunda",
        "state": "Queensland",
        "lat": -16.5583000183,
        "lon": 141.8079986572,
        "timezone": "Australia/Brisbane"
    },
    "DVP": {
        "code": "DVP",
        "name": "Davenport Downs Airport",
        "city": "Davenport Downs",
        "state": "Queensland",
        "lat": -24.1499996185,
        "lon": 141.108001709,
        "timezone": "Australia/Brisbane"
    },
    "DPO": {
        "code": "DPO",
        "name": "Devonport Airport",
        "city": "Devonport",
        "state": "Tasmania",
        "lat": -41.1697006226,
        "lon": 146.429992676,
        "timezone": "Australia/Hobart"
    },
    "DOX": {
        "code": "DOX",
        "name": "Dongara Airport",
        "city": "Dongara",
        "state": "Western Australia",
        "lat": -29.2999992371,
        "lon": 114.932998657,
        "timezone": "Australia/Perth"
    },
    "DRY": {
        "code": "DRY",
        "name": "Drysdale River Airport",
        "city": "Drysdale River",
        "state": "Western Australia",
        "lat": -15.7135703992,
        "lon": 126.38109684,
        "timezone": "Australia/Perth"
    },
    "DHD": {
        "code": "DHD",
        "name": "Durham Downs Airport",
        "city": "Durham Downs",
        "state": "Queensland",
        "lat": -27.0750007629,
        "lon": 141.8999938965,
        "timezone": "Australia/Brisbane"
    },
    "DRR": {
        "code": "DRR",
        "name": "Durrie Airport",
        "city": "Durrie",
        "state": "Queensland",
        "lat": -25.6849994659,
        "lon": 140.2279968262,
        "timezone": "Australia/Brisbane"
    },
    "DKV": {
        "code": "DKV",
        "name": "Docker River Airport",
        "city": "Docker River",
        "state": "Northern-Territory",
        "lat": -24.8600006104,
        "lon": 129.0700073242,
        "timezone": "Australia/Darwin"
    },
    "DYA": {
        "code": "DYA",
        "name": "Dysart Airport",
        "city": "Dysart",
        "state": "Queensland",
        "lat": -22.6222000122,
        "lon": 148.3639984131,
        "timezone": "Australia/Brisbane"
    },
    "ECH": {
        "code": "ECH",
        "name": "Echuca Airport",
        "city": "Echuca",
        "state": "Victoria",
        "lat": -36.1571998596,
        "lon": 144.7619934082,
        "timezone": "Australia/Melbourne"
    },
    "EUC": {
        "code": "EUC",
        "name": "Eucla Airport",
        "city": "Eucla",
        "state": "Western Australia",
        "lat": -31.7000007629,
        "lon": 128.8829956055,
        "timezone": "Australia/Eucla"
    },
    "ETD": {
        "code": "ETD",
        "name": "Etadunna Airport",
        "city": "Etadunna",
        "state": "South Australia",
        "lat": -28.7408008575,
        "lon": 138.5890045166,
        "timezone": "Australia/Adelaide"
    },
    "ENB": {
        "code": "ENB",
        "name": "Eneabba Airport",
        "city": "Eneabba",
        "state": "Western Australia",
        "lat": -29.8325004578,
        "lon": 115.2460021973,
        "timezone": "Australia/Perth"
    },
    "EIH": {
        "code": "EIH",
        "name": "Einasleigh Airport",
        "city": "Einasleigh",
        "state": "Queensland",
        "lat": -18.5032997131,
        "lon": 144.093994141,
        "timezone": "Australia/Brisbane"
    },
    "ELC": {
        "code": "ELC",
        "name": "Elcho Island Airport",
        "city": "Elcho Island",
        "state": "Northern-Territory",
        "lat": -12.0193996429,
        "lon": 135.570999146,
        "timezone": "Australia/Darwin"
    },
    "EMD": {
        "code": "EMD",
        "name": "Emerald Airport",
        "city": "Emerald",
        "state": "Queensland",
        "lat": -23.5674991608,
        "lon": 148.179000854,
        "timezone": "Australia/Brisbane"
    },
    "ERB": {
        "code": "ERB",
        "name": "Ernabella Airport",
        "city": "Ernabella",
        "state": "South Australia",
        "lat": -26.263299942,
        "lon": 132.1820068359,
        "timezone": "Australia/Adelaide"
    },
    "EPR": {
        "code": "EPR",
        "name": "Esperance Airport",
        "city": "Esperance",
        "state": "Western Australia",
        "lat": -33.6843986511,
        "lon": 121.8229980469,
        "timezone": "Australia/Perth"
    },
    "EVD": {
        "code": "EVD",
        "name": "Eva Downs Airport",
        "city": "Eva Downs",
        "state": "Northern-Territory",
        "lat": -18.0009994507,
        "lon": 134.863006592,
        "timezone": "Australia/Darwin"
    },
    "EVH": {
        "code": "EVH",
        "name": "Evans Head Aerodrome",
        "city": "Evans Head",
        "state": "New South Wales",
        "lat": -29.0932998657,
        "lon": 153.4199981689,
        "timezone": "Australia/Sydney"
    },
    "EXM": {
        "code": "EXM",
        "name": "Exmouth Airport",
        "city": "Exmouth",
        "state": "Western Australia",
        "lat": -22.0333003998,
        "lon": 114.0999984741,
        "timezone": "Australia/Perth"
    },
    "FRB": {
        "code": "FRB",
        "name": "Forbes Airport",
        "city": "Forbes",
        "state": "New South Wales",
        "lat": -33.3636016846,
        "lon": 147.934997559,
        "timezone": "Australia/Sydney"
    },
    "KFE": {
        "code": "KFE",
        "name": "Fortescue - Dave Forrest Aerodrome",
        "city": "Cloudbreak Village",
        "state": "Western Australia",
        "lat": -22.291944,
        "lon": 119.437222,
        "timezone": "Australia/Perth"
    },
    "FLY": {
        "code": "FLY",
        "name": "Finley Airport",
        "city": "Finley",
        "state": "New South Wales",
        "lat": -35.6666984558,
        "lon": 145.550003052,
        "timezone": "Australia/Sydney"
    },
    "FLS": {
        "code": "FLS",
        "name": "Flinders Island Airport",
        "city": "Flinders Island",
        "state": "Tasmania",
        "lat": -40.0917015076,
        "lon": 147.9929962158,
        "timezone": "Australia/Hobart"
    },
    "FVL": {
        "code": "FVL",
        "name": "Flora Valley Airport",
        "city": "Flora Valley",
        "state": "Western Australia",
        "lat": -18.2833003998,
        "lon": 128.417007446,
        "timezone": "Australia/Perth"
    },
    "FIK": {
        "code": "FIK",
        "name": "Finke Airport",
        "city": "Finke",
        "state": "Northern-Territory",
        "lat": -25.5946998596,
        "lon": 134.582992554,
        "timezone": "Australia/Darwin"
    },
    "FOS": {
        "code": "FOS",
        "name": "Forrest Airport",
        "city": "Forrest",
        "state": "Western Australia",
        "lat": -30.8381004333,
        "lon": 128.1150054932,
        "timezone": "Australia/Perth"
    },
    "FOT": {
        "code": "FOT",
        "name": "Forster (Wallis Is) Airport",
        "city": "Forster (Wallis Is)",
        "state": "New South Wales",
        "lat": -32.2042007446,
        "lon": 152.4790039063,
        "timezone": "Australia/Sydney"
    },
    "FIZ": {
        "code": "FIZ",
        "name": "Fitzroy Crossing Airport",
        "city": "Fitzroy Crossing",
        "state": "Western Australia",
        "lat": -18.1819000244,
        "lon": 125.5589981079,
        "timezone": "Australia/Perth"
    },
    "GBP": {
        "code": "GBP",
        "name": "Gamboola Airport",
        "city": "Gamboola",
        "state": "Queensland",
        "lat": -16.5499992371,
        "lon": 143.6670074463,
        "timezone": "Australia/Brisbane"
    },
    "GAH": {
        "code": "GAH",
        "name": "Gayndah Airport",
        "city": "Gayndah",
        "state": "Queensland",
        "lat": -25.6144008636,
        "lon": 151.6190032959,
        "timezone": "Australia/Brisbane"
    },
    "GBL": {
        "code": "GBL",
        "name": "South Goulburn Is Airport",
        "city": "South Goulburn Is",
        "state": "Northern-Territory",
        "lat": -11.6499996185,
        "lon": 133.3820037842,
        "timezone": "Australia/Darwin"
    },
    "GUH": {
        "code": "GUH",
        "name": "Gunnedah Airport",
        "city": "Gunnedah",
        "state": "New South Wales",
        "lat": -30.9610996246,
        "lon": 150.2510070801,
        "timezone": "Australia/Sydney"
    },
    "GOO": {
        "code": "GOO",
        "name": "Goondiwindi Airport",
        "city": "Goondiwindi",
        "state": "Queensland",
        "lat": -28.5214004517,
        "lon": 150.3200073242,
        "timezone": "Australia/Brisbane"
    },
    "GDD": {
        "code": "GDD",
        "name": "Gordon Downs Airport",
        "city": "Gordon Downs",
        "state": "Western Australia",
        "lat": -18.6781005859,
        "lon": 128.5919952393,
        "timezone": "Australia/Perth"
    },
    "GGD": {
        "code": "GGD",
        "name": "Gregory Downs Airport",
        "city": "Gregory Downs",
        "state": "Queensland",
        "lat": -18.625,
        "lon": 139.233001709,
        "timezone": "Australia/Brisbane"
    },
    "GET": {
        "code": "GET",
        "name": "Geraldton Airport",
        "city": "Geraldton",
        "state": "Western Australia",
        "lat": -28.7961006165,
        "lon": 114.7070007324,
        "timezone": "Australia/Perth"
    },
    "GFN": {
        "code": "GFN",
        "name": "Grafton Airport",
        "city": "Grafton",
        "state": "New South Wales",
        "lat": -29.7593994141,
        "lon": 153.0299987793,
        "timezone": "Australia/Sydney"
    },
    "GBW": {
        "code": "GBW",
        "name": "Ginbata",
        "city": "Ginbata",
        "state": "Western Australia",
        "lat": -22.578666,
        "lon": 120.039409,
        "timezone": "Australia/Perth"
    },
    "GBV": {
        "code": "GBV",
        "name": "Gibb River Airport",
        "city": "Gibb River",
        "state": "Western Australia",
        "lat": -16.4232997894,
        "lon": 126.4449996948,
        "timezone": "Australia/Perth"
    },
    "GKL": {
        "code": "GKL",
        "name": "Great Keppel Is Airport",
        "city": "Great Keppel Is",
        "state": "Queensland",
        "lat": -23.1833000183,
        "lon": 150.9420013428,
        "timezone": "Australia/Brisbane"
    },
    "GLT": {
        "code": "GLT",
        "name": "Gladstone Airport",
        "city": "Gladstone",
        "state": "Queensland",
        "lat": -23.8696994781,
        "lon": 151.223007202,
        "timezone": "Australia/Brisbane"
    },
    "GUL": {
        "code": "GUL",
        "name": "Goulburn Airport",
        "city": "Goulburn",
        "state": "New South Wales",
        "lat": -34.8102989197,
        "lon": 149.7259979248,
        "timezone": "Australia/Sydney"
    },
    "GLG": {
        "code": "GLG",
        "name": "Glengyle Airport",
        "city": "Glengyle",
        "state": "Queensland",
        "lat": -24.8083000183,
        "lon": 139.6000061035,
        "timezone": "Australia/Brisbane"
    },
    "GEX": {
        "code": "GEX",
        "name": "Geelong Airport",
        "city": "Geelong",
        "state": "Victoria",
        "lat": -38.2249984741,
        "lon": 144.3329925537,
        "timezone": "Australia/Melbourne"
    },
    "GLI": {
        "code": "GLI",
        "name": "Glen Innes Airport",
        "city": "Glen Innes",
        "state": "New South Wales",
        "lat": -29.6749992371,
        "lon": 151.6889953613,
        "timezone": "Australia/Sydney"
    },
    "GLM": {
        "code": "GLM",
        "name": "Glenormiston Airport",
        "city": "Glenormiston",
        "state": "Queensland",
        "lat": -22.888299942,
        "lon": 138.8249969482,
        "timezone": "Australia/Brisbane"
    },
    "GVP": {
        "code": "GVP",
        "name": "Greenvale Airport",
        "city": "Greenvale",
        "state": "Queensland",
        "lat": -18.9832992554,
        "lon": 145.1170043945,
        "timezone": "Australia/Brisbane"
    },
    "GPN": {
        "code": "GPN",
        "name": "Garden Point Airport",
        "city": "Garden Point",
        "state": "Northern-Territory",
        "lat": -11.4025001526,
        "lon": 130.4219970703,
        "timezone": "Australia/Darwin"
    },
    "GYZ": {
        "code": "GYZ",
        "name": "Gruyere Mine Airport",
        "city": "Gruyere",
        "state": "Western Australia",
        "lat": -28.0339912,
        "lon": 123.8140464,
        "timezone": "Australia/Perth"
    },
    "GSC": {
        "code": "GSC",
        "name": "Gascoyne Junction Airport",
        "city": "Gascoyne Junction",
        "state": "Western Australia",
        "lat": -25.0499992371,
        "lon": 115.1999969482,
        "timezone": "Australia/Perth"
    },
    "GTE": {
        "code": "GTE",
        "name": "Groote Eylandt Airport",
        "city": "Groote Eylandt",
        "state": "Northern-Territory",
        "lat": -13.9750003815,
        "lon": 136.460006714,
        "timezone": "Australia/Darwin"
    },
    "GFF": {
        "code": "GFF",
        "name": "Griffith Airport",
        "city": "Griffith",
        "state": "New South Wales",
        "lat": -34.2508010864,
        "lon": 146.067001343,
        "timezone": "Australia/Sydney"
    },
    "GTT": {
        "code": "GTT",
        "name": "Georgetown Airport",
        "city": "Georgetown",
        "state": "Queensland",
        "lat": -18.3050003052,
        "lon": 143.5299987793,
        "timezone": "Australia/Brisbane"
    },
    "GEE": {
        "code": "GEE",
        "name": "Georgetown (Tas) Airport",
        "city": "Georgetown (Tas)",
        "state": "Tasmania",
        "lat": -41.0800018311,
        "lon": 146.8399963379,
        "timezone": "Australia/Hobart"
    },
    "GYP": {
        "code": "GYP",
        "name": "Gympie Airport",
        "city": "Gympie",
        "state": "Queensland",
        "lat": -26.2828006744,
        "lon": 152.7019958496,
        "timezone": "Australia/Brisbane"
    },
    "HWK": {
        "code": "HWK",
        "name": "Wilpena Pound Airport",
        "city": "Hawker",
        "state": "South Australia",
        "lat": -31.8559074402,
        "lon": 138.4680786133,
        "timezone": "Australia/Adelaide"
    },
    "HXX": {
        "code": "HXX",
        "name": "Hay Airport",
        "city": "Hay",
        "state": "New South Wales",
        "lat": -34.5313987732,
        "lon": 144.8300018311,
        "timezone": "Australia/Sydney"
    },
    "HVB": {
        "code": "HVB",
        "name": "Hervey Bay Airport",
        "city": "Hervey Bay",
        "state": "Queensland",
        "lat": -25.3188991547,
        "lon": 152.880004883,
        "timezone": "Australia/Brisbane"
    },
    "HUB": {
        "code": "HUB",
        "name": "Humbert River Airport",
        "city": "Humbert River",
        "state": "Northern-Territory",
        "lat": -16.4896697998,
        "lon": 130.630279541,
        "timezone": "Australia/Darwin"
    },
    "HRY": {
        "code": "HRY",
        "name": "Henbury Airport",
        "city": "Henbury",
        "state": "Northern-Territory",
        "lat": -24.5499992371,
        "lon": 133.2169952393,
        "timezone": "Australia/Darwin"
    },
    "HIP": {
        "code": "HIP",
        "name": "Headingly Airport",
        "city": "Headingly",
        "state": "Queensland",
        "lat": -21.3332996368,
        "lon": 138.2830047607,
        "timezone": "Australia/Brisbane"
    },
    "HIG": {
        "code": "HIG",
        "name": "Highbury Airport",
        "city": "Highbury",
        "state": "Queensland",
        "lat": -16.4333000183,
        "lon": 143.1499938965,
        "timezone": "Australia/Brisbane"
    },
    "HID": {
        "code": "HID",
        "name": "Horn Island Airport",
        "city": "Horn Island",
        "state": "Queensland",
        "lat": -10.586400032,
        "lon": 142.289993286,
        "timezone": "Australia/Brisbane"
    },
    "HLL": {
        "code": "HLL",
        "name": "Hillside Airport",
        "city": "Hillside",
        "state": "Western Australia",
        "lat": -21.75,
        "lon": 119.4169998169,
        "timezone": "Australia/Perth"
    },
    "HCQ": {
        "code": "HCQ",
        "name": "Halls Creek Airport",
        "city": "Halls Creek",
        "state": "Western Australia",
        "lat": -18.2339000702,
        "lon": 127.6699981689,
        "timezone": "Australia/Perth"
    },
    "HMG": {
        "code": "HMG",
        "name": "Hermannsburg Airport",
        "city": "Hermannsburg",
        "state": "Northern-Territory",
        "lat": -23.9300003052,
        "lon": 132.8049926758,
        "timezone": "Australia/Darwin"
    },
    "HLT": {
        "code": "HLT",
        "name": "Hamilton Airport",
        "city": "Hamilton",
        "state": "Victoria",
        "lat": -37.6488990784,
        "lon": 142.0650024414,
        "timezone": "Australia/Melbourne"
    },
    "HOK": {
        "code": "HOK",
        "name": "Hooker Creek Airport",
        "city": "Hooker Creek",
        "state": "Northern-Territory",
        "lat": -18.3367004395,
        "lon": 130.6380004883,
        "timezone": "Australia/Darwin"
    },
    "MHU": {
        "code": "MHU",
        "name": "Mount Hotham Airport",
        "city": "Mount Hotham",
        "state": "Victoria",
        "lat": -37.0475006104,
        "lon": 147.333999634,
        "timezone": "Australia/Melbourne"
    },
    "HTU": {
        "code": "HTU",
        "name": "Hopetoun Airport",
        "city": "Hopetoun",
        "state": "Victoria",
        "lat": -35.7153015137,
        "lon": 142.3600006104,
        "timezone": "Australia/Melbourne"
    },
    "HSM": {
        "code": "HSM",
        "name": "Horsham Airport",
        "city": "Horsham",
        "state": "Victoria",
        "lat": -36.6697006226,
        "lon": 142.1730041504,
        "timezone": "Australia/Melbourne"
    },
    "HAT": {
        "code": "HAT",
        "name": "Heathlands Airport",
        "city": "Heathlands",
        "state": "Queensland",
        "lat": -11.75,
        "lon": 142.5829925537,
        "timezone": "Australia/Brisbane"
    },
    "HGD": {
        "code": "HGD",
        "name": "Hughenden Airport",
        "city": "Hughenden",
        "state": "Queensland",
        "lat": -20.8150005341,
        "lon": 144.2250061035,
        "timezone": "Australia/Brisbane"
    },
    "IDK": {
        "code": "IDK",
        "name": "Indulkana Airport",
        "city": "Indulkana",
        "state": "South Australia",
        "lat": -26.9666996002,
        "lon": 133.3249969482,
        "timezone": "Australia/Adelaide"
    },
    "IFL": {
        "code": "IFL",
        "name": "Innisfail Airport",
        "city": "Innisfail",
        "state": "Queensland",
        "lat": -17.5594005585,
        "lon": 146.0119934082,
        "timezone": "Australia/Brisbane"
    },
    "IFF": {
        "code": "IFF",
        "name": "Iffley Airport",
        "city": "Iffley",
        "state": "Queensland",
        "lat": -18.8999996185,
        "lon": 141.2169952393,
        "timezone": "Australia/Brisbane"
    },
    "IGH": {
        "code": "IGH",
        "name": "Ingham Airport",
        "city": "Ingham",
        "state": "Queensland",
        "lat": -18.6606006622,
        "lon": 146.1519927979,
        "timezone": "Australia/Brisbane"
    },
    "IKP": {
        "code": "IKP",
        "name": "Inkerman Airport",
        "city": "Inkerman",
        "state": "Queensland",
        "lat": -16.2749996185,
        "lon": 141.4420013428,
        "timezone": "Australia/Brisbane"
    },
    "INJ": {
        "code": "INJ",
        "name": "Injune Airport",
        "city": "Injune",
        "state": "Queensland",
        "lat": -25.8500003815,
        "lon": 148.5330047607,
        "timezone": "Australia/Brisbane"
    },
    "INM": {
        "code": "INM",
        "name": "Innamincka Airport",
        "city": "Innamincka",
        "state": "South Australia",
        "lat": -27.7000007629,
        "lon": 140.733001709,
        "timezone": "Australia/Adelaide"
    },
    "IVW": {
        "code": "IVW",
        "name": "Inverway Airport",
        "city": "Inverway",
        "state": "Northern-Territory",
        "lat": -17.8411006927,
        "lon": 129.643005371,
        "timezone": "Australia/Darwin"
    },
    "ISI": {
        "code": "ISI",
        "name": "Isisford Airport",
        "city": "Isisford",
        "state": "Queensland",
        "lat": -24.2583007813,
        "lon": 144.4250030518,
        "timezone": "Australia/Brisbane"
    },
    "IVR": {
        "code": "IVR",
        "name": "Inverell Airport",
        "city": "Inverell",
        "state": "New South Wales",
        "lat": -29.888299942,
        "lon": 151.1439971924,
        "timezone": "Australia/Sydney"
    },
    "JAB": {
        "code": "JAB",
        "name": "Jabiru Airport",
        "city": "Jabiru",
        "state": "Northern-Territory",
        "lat": -12.6583003998,
        "lon": 132.8930053711,
        "timezone": "Australia/Darwin"
    },
    "JUN": {
        "code": "JUN",
        "name": "Jundah Airport",
        "city": "Jundah",
        "state": "Queensland",
        "lat": -24.8416996002,
        "lon": 143.0579986572,
        "timezone": "Australia/Brisbane"
    },
    "QJD": {
        "code": "QJD",
        "name": "Jindabyne Airport",
        "city": "Jindabyne",
        "state": "New South Wales",
        "lat": -36.426700592,
        "lon": 148.6020050049,
        "timezone": "Australia/Sydney"
    },
    "JCK": {
        "code": "JCK",
        "name": "Julia Creek Airport",
        "city": "Julia Creek",
        "state": "Queensland",
        "lat": -20.6683006287,
        "lon": 141.7230072021,
        "timezone": "Australia/Brisbane"
    },
    "JUR": {
        "code": "JUR",
        "name": "Jurien Bay Airport",
        "city": "Jurien Bay",
        "state": "Western Australia",
        "lat": -30.2999992371,
        "lon": 115.0329971313,
        "timezone": "Australia/Perth"
    },
    "UBU": {
        "code": "UBU",
        "name": "Kalumburu Airport",
        "city": "Kalumburu",
        "state": "Western Australia",
        "lat": -14.2882995605,
        "lon": 126.6320037842,
        "timezone": "Australia/Perth"
    },
    "KDB": {
        "code": "KDB",
        "name": "Kambalda Airport",
        "city": "Kambalda",
        "state": "Western Australia",
        "lat": -31.1833000183,
        "lon": 121.5999984741,
        "timezone": "Australia/Perth"
    },
    "KAX": {
        "code": "KAX",
        "name": "Kalbarri Airport",
        "city": "Kalbarri",
        "state": "Western Australia",
        "lat": -27.6900005341,
        "lon": 114.2620010376,
        "timezone": "Australia/Perth"
    },
    "KBY": {
        "code": "KBY",
        "name": "Streaky Bay Airport",
        "city": "Streaky Bay",
        "state": "South Australia",
        "lat": -32.8358001709,
        "lon": 134.2929992676,
        "timezone": "Australia/Adelaide"
    },
    "KBJ": {
        "code": "KBJ",
        "name": "Kings Canyon Airport",
        "city": "Kings Canyon",
        "state": "Northern-Territory",
        "lat": -24.2600002289,
        "lon": 131.4900054932,
        "timezone": "Australia/Darwin"
    },
    "KCS": {
        "code": "KCS",
        "name": "Kings Creek Airport",
        "city": "Kings Creek",
        "state": "Northern-Territory",
        "lat": -24.4232997894,
        "lon": 131.8350067139,
        "timezone": "Australia/Darwin"
    },
    "OOD": {
        "code": "OOD",
        "name": "Gudai-Darri Airstrip",
        "city": "Newman",
        "state": "Western Australia",
        "lat": -22.503574253549,
        "lon": 119.07625111164,
        "timezone": "Australia/Perth"
    },
    "KRA": {
        "code": "KRA",
        "name": "Kerang Airport",
        "city": "Kerang",
        "state": "Victoria",
        "lat": -35.7513999939,
        "lon": 143.9389953613,
        "timezone": "Australia/Melbourne"
    },
    "KNS": {
        "code": "KNS",
        "name": "King Island Airport",
        "city": "King Island",
        "state": "Tasmania",
        "lat": -39.8774986267,
        "lon": 143.8780059814,
        "timezone": "Australia/Hobart"
    },
    "KBB": {
        "code": "KBB",
        "name": "Kirkimbie Station Airport",
        "city": "Kirkimbie",
        "state": "Northern-Territory",
        "lat": -17.7791996002,
        "lon": 129.210006714,
        "timezone": "Australia/Darwin"
    },
    "KFG": {
        "code": "KFG",
        "name": "Kalkgurung Airport",
        "city": "Kalkgurung",
        "state": "Northern-Territory",
        "lat": -17.4319000244,
        "lon": 130.8079986572,
        "timezone": "Australia/Darwin"
    },
    "KOH": {
        "code": "KOH",
        "name": "Koolatah Airport",
        "city": "Koolatah",
        "state": "Queensland",
        "lat": -15.9167003632,
        "lon": 142.4499969482,
        "timezone": "Australia/Brisbane"
    },
    "KKP": {
        "code": "KKP",
        "name": "Koolburra Airport",
        "city": "Koolburra",
        "state": "Queensland",
        "lat": -15.3189001083,
        "lon": 143.9550018311,
        "timezone": "Australia/Brisbane"
    },
    "KRB": {
        "code": "KRB",
        "name": "Karumba Airport",
        "city": "Karumba",
        "state": "Queensland",
        "lat": -17.4566993713,
        "lon": 140.8300018311,
        "timezone": "Australia/Brisbane"
    },
    "KML": {
        "code": "KML",
        "name": "Kamileroi Airport",
        "city": "Kamileroi",
        "state": "Queensland",
        "lat": -19.375,
        "lon": 140.0570068359,
        "timezone": "Australia/Brisbane"
    },
    "KPS": {
        "code": "KPS",
        "name": "Kempsey Airport",
        "city": "Kempsey",
        "state": "New South Wales",
        "lat": -31.0743999481,
        "lon": 152.7700042725,
        "timezone": "Australia/Sydney"
    },
    "KNI": {
        "code": "KNI",
        "name": "Katanning Airport",
        "city": "Katanning",
        "state": "Western Australia",
        "lat": -33.7167015076,
        "lon": 117.6330032349,
        "timezone": "Australia/Perth"
    },
    "KWM": {
        "code": "KWM",
        "name": "Kowanyama Airport",
        "city": "Kowanyama",
        "state": "Queensland",
        "lat": -15.4856004715,
        "lon": 141.7510070801,
        "timezone": "Australia/Brisbane"
    },
    "KPP": {
        "code": "KPP",
        "name": "Kalpowar Airport",
        "city": "Kalpowar",
        "state": "Queensland",
        "lat": -14.8999996185,
        "lon": 144.1999969482,
        "timezone": "Australia/Brisbane"
    },
    "KGY": {
        "code": "KGY",
        "name": "Kingaroy Airport",
        "city": "Kingaroy",
        "state": "Queensland",
        "lat": -26.5807991028,
        "lon": 151.841003418,
        "timezone": "Australia/Brisbane"
    },
    "KGC": {
        "code": "KGC",
        "name": "Kingscote Airport",
        "city": "Kingscote",
        "state": "South Australia",
        "lat": -35.7139015198,
        "lon": 137.5209960938,
        "timezone": "Australia/Adelaide"
    },
    "KUG": {
        "code": "KUG",
        "name": "Kubin Airport",
        "city": "Kubin",
        "state": "Queensland",
        "lat": -10.2250003815,
        "lon": 142.2180023193,
        "timezone": "Australia/Brisbane"
    },
    "LWH": {
        "code": "LWH",
        "name": "Lawn Hill Airport",
        "city": "Lawn Hill",
        "state": "Queensland",
        "lat": -18.5683002472,
        "lon": 138.6349945068,
        "timezone": "Australia/Brisbane"
    },
    "LGH": {
        "code": "LGH",
        "name": "Leigh Creek Airport",
        "city": "Leigh Creek",
        "state": "South Australia",
        "lat": -30.5983009338,
        "lon": 138.425994873,
        "timezone": "Australia/Adelaide"
    },
    "LNO": {
        "code": "LNO",
        "name": "Leonora Airport",
        "city": "Leonora",
        "state": "Western Australia",
        "lat": -28.8780994415,
        "lon": 121.3150024414,
        "timezone": "Australia/Perth"
    },
    "LEL": {
        "code": "LEL",
        "name": "Lake Evella Airport",
        "city": "Lake Evella",
        "state": "Northern-Territory",
        "lat": -12.4989004135,
        "lon": 135.8059997559,
        "timezone": "Australia/Darwin"
    },
    "LFP": {
        "code": "LFP",
        "name": "Lakefield Airport",
        "city": "Lakefield",
        "state": "Queensland",
        "lat": -14.9333000183,
        "lon": 144.1999969482,
        "timezone": "Australia/Brisbane"
    },
    "LDH": {
        "code": "LDH",
        "name": "Lord Howe Island Airport",
        "city": "Lord Howe Island",
        "state": "New South Wales",
        "lat": -31.5382995605,
        "lon": 159.07699585,
        "timezone": "Australia/Lord_Howe"
    },
    "IRG": {
        "code": "IRG",
        "name": "Lockhart River Airport",
        "city": "Lockhart River",
        "state": "Queensland",
        "lat": -12.7868995667,
        "lon": 143.3049926758,
        "timezone": "Australia/Brisbane"
    },
    "LTP": {
        "code": "LTP",
        "name": "Lyndhurst Airport",
        "city": "Lyndhurst",
        "state": "Queensland",
        "lat": -19.1958007812,
        "lon": 144.371002197,
        "timezone": "Australia/Brisbane"
    },
    "LDC": {
        "code": "LDC",
        "name": "Lindeman Island Airport",
        "city": "Lindeman Island",
        "state": "Queensland",
        "lat": -20.4535999298,
        "lon": 149.039993286,
        "timezone": "Australia/Lindeman"
    },
    "LSY": {
        "code": "LSY",
        "name": "Lismore Airport",
        "city": "Lismore",
        "state": "New South Wales",
        "lat": -28.8302993774,
        "lon": 153.259994507,
        "timezone": "Australia/Sydney"
    },
    "LNH": {
        "code": "LNH",
        "name": "Lake Nash Airport",
        "city": "Lake Nash",
        "state": "Northern-Territory",
        "lat": -20.9666996002,
        "lon": 137.9170074463,
        "timezone": "Australia/Darwin"
    },
    "BBL": {
        "code": "BBL",
        "name": "Ballera Airport",
        "city": "Ballera",
        "state": "Queensland",
        "lat": -27.4083003998,
        "lon": 141.8079986572,
        "timezone": "Australia/Brisbane"
    },
    "LKD": {
        "code": "LKD",
        "name": "Lakeland Airport",
        "city": "Lakeland",
        "state": "Queensland",
        "lat": -15.8332996368,
        "lon": 144.8500061035,
        "timezone": "Australia/Brisbane"
    },
    "LOC": {
        "code": "LOC",
        "name": "Lock Airport",
        "city": "Lock",
        "state": "South Australia",
        "lat": -33.5442008972,
        "lon": 135.6929931641,
        "timezone": "Australia/Adelaide"
    },
    "LOA": {
        "code": "LOA",
        "name": "Lorraine Airport",
        "city": "Lorraine",
        "state": "Queensland",
        "lat": -18.9932994843,
        "lon": 139.9069976807,
        "timezone": "Australia/Brisbane"
    },
    "LTV": {
        "code": "LTV",
        "name": "Lotus Vale Airport",
        "city": "Lotus Vale",
        "state": "Queensland",
        "lat": -17.0482997894,
        "lon": 141.37600708,
        "timezone": "Australia/Brisbane"
    },
    "LUU": {
        "code": "LUU",
        "name": "Laura Airport",
        "city": "Laura",
        "state": "Queensland",
        "lat": -15.5500001907,
        "lon": 144.4499969482,
        "timezone": "Australia/Brisbane"
    },
    "LHG": {
        "code": "LHG",
        "name": "Lightning Ridge Airport",
        "city": "Lightning Ridge",
        "state": "New South Wales",
        "lat": -29.4566993713,
        "lon": 147.9839935303,
        "timezone": "Australia/Sydney"
    },
    "LRE": {
        "code": "LRE",
        "name": "Longreach Airport",
        "city": "Longreach",
        "state": "Queensland",
        "lat": -23.4342002869,
        "lon": 144.279998779,
        "timezone": "Australia/Brisbane"
    },
    "LUT": {
        "code": "LUT",
        "name": "New Laura Airport",
        "city": "New Laura",
        "state": "Queensland",
        "lat": -15.1833000183,
        "lon": 144.3670043945,
        "timezone": "Australia/Brisbane"
    },
    "LER": {
        "code": "LER",
        "name": "Leinster Airport",
        "city": "Leinster",
        "state": "Western Australia",
        "lat": -27.8432998657,
        "lon": 120.7030029297,
        "timezone": "Australia/Perth"
    },
    "LVO": {
        "code": "LVO",
        "name": "Laverton Airport",
        "city": "Laverton",
        "state": "Western Australia",
        "lat": -28.6135997772,
        "lon": 122.4240036011,
        "timezone": "Australia/Perth"
    },
    "TGN": {
        "code": "TGN",
        "name": "Latrobe Valley Airport",
        "city": "Latrobe Valley",
        "state": "Victoria",
        "lat": -38.2071990967,
        "lon": 146.470001221,
        "timezone": "Australia/Melbourne"
    },
    "LZR": {
        "code": "LZR",
        "name": "Lizard Island Airport",
        "city": "Lizard Island",
        "state": "Queensland",
        "lat": -14.6667003632,
        "lon": 145.4499969482,
        "timezone": "Australia/Brisbane"
    },
    "UBB": {
        "code": "UBB",
        "name": "Mabuiag Island Airport",
        "city": "Mabuiag Island",
        "state": "Queensland",
        "lat": -9.9499998093,
        "lon": 142.1829986572,
        "timezone": "Australia/Brisbane"
    },
    "AVV": {
        "code": "AVV",
        "name": "Avalon Airport",
        "city": "Melbourne",
        "state": "Victoria",
        "lat": -38.0393981934,
        "lon": 144.468994141,
        "timezone": "Australia/Melbourne"
    },
    "ABX": {
        "code": "ABX",
        "name": "Albury Airport",
        "city": "Albury",
        "state": "New South Wales",
        "lat": -36.0677986145,
        "lon": 146.9579925537,
        "timezone": "Australia/Melbourne"
    },
    "MRG": {
        "code": "MRG",
        "name": "Mareeba Airport",
        "city": "Mareeba",
        "state": "Queensland",
        "lat": -17.0692005157,
        "lon": 145.4190063477,
        "timezone": "Australia/Brisbane"
    },
    "MBB": {
        "code": "MBB",
        "name": "Marble Bar Airport",
        "city": "Marble Bar",
        "state": "Western Australia",
        "lat": -21.1632995605,
        "lon": 119.8330001831,
        "timezone": "Australia/Perth"
    },
    "XMC": {
        "code": "XMC",
        "name": "Mallacoota Airport",
        "city": "Mallacoota",
        "state": "Victoria",
        "lat": -37.5983009338,
        "lon": 149.7200012207,
        "timezone": "Australia/Melbourne"
    },
    "MFP": {
        "code": "MFP",
        "name": "Manners Creek Airport",
        "city": "Manners Creek",
        "state": "Northern-Territory",
        "lat": -22.1000003815,
        "lon": 137.983001709,
        "timezone": "Australia/Darwin"
    },
    "MLR": {
        "code": "MLR",
        "name": "Millicent Airport",
        "city": "Millicent",
        "state": "South Australia",
        "lat": -37.5835990906,
        "lon": 140.3659973145,
        "timezone": "Australia/Adelaide"
    },
    "DGE": {
        "code": "DGE",
        "name": "Mudgee Airport",
        "city": "Mudgee",
        "state": "New South Wales",
        "lat": -32.5625,
        "lon": 149.610992432,
        "timezone": "Australia/Sydney"
    },
    "MQA": {
        "code": "MQA",
        "name": "Mandora Airport",
        "city": "Mandora",
        "state": "Western Australia",
        "lat": -19.7383003235,
        "lon": 120.837997437,
        "timezone": "Australia/Perth"
    },
    "MNW": {
        "code": "MNW",
        "name": "Macdonald Downs Airport",
        "city": "Macdonald Downs",
        "state": "Northern-Territory",
        "lat": -22.4666996002,
        "lon": 135.233001709,
        "timezone": "Australia/Darwin"
    },
    "MKR": {
        "code": "MKR",
        "name": "Meekatharra Airport",
        "city": "Meekatharra",
        "state": "Western Australia",
        "lat": -26.611700058,
        "lon": 118.547996521,
        "timezone": "Australia/Perth"
    },
    "MEB": {
        "code": "MEB",
        "name": "Melbourne Essendon Airport",
        "city": "Melbourne Essendon",
        "state": "Victoria",
        "lat": -37.728099823,
        "lon": 144.9019927979,
        "timezone": "Australia/Melbourne"
    },
    "MIM": {
        "code": "MIM",
        "name": "Merimbula Airport",
        "city": "Merimbula",
        "state": "New South Wales",
        "lat": -36.9085998535,
        "lon": 149.901000977,
        "timezone": "Australia/Sydney"
    },
    "MLV": {
        "code": "MLV",
        "name": "Merluna Airport",
        "city": "Merluna",
        "state": "Queensland",
        "lat": -13.0500001907,
        "lon": 142.483001709,
        "timezone": "Australia/Brisbane"
    },
    "MGT": {
        "code": "MGT",
        "name": "Milingimbi Airport",
        "city": "Milingimbi Island",
        "state": "Northern-Territory",
        "lat": -12.0944004059,
        "lon": 134.893997192,
        "timezone": "Australia/Darwin"
    },
    "MNG": {
        "code": "MNG",
        "name": "Maningrida Airport",
        "city": "Maningrida",
        "state": "Northern-Territory",
        "lat": -12.0560998917,
        "lon": 134.23399353,
        "timezone": "Australia/Darwin"
    },
    "GSN": {
        "code": "GSN",
        "name": "Mount Gunson Airport",
        "city": "Mount Gunson",
        "state": "South Australia",
        "lat": -31.4596996307,
        "lon": 137.1739959717,
        "timezone": "Australia/Adelaide"
    },
    "MGV": {
        "code": "MGV",
        "name": "Margaret River (Station) Airport",
        "city": "Margaret River (Station)",
        "state": "Western Australia",
        "lat": -18.6217002869,
        "lon": 126.883003235,
        "timezone": "Australia/Perth"
    },
    "MQZ": {
        "code": "MQZ",
        "name": "Margaret River Airport",
        "city": "Margaret River",
        "state": "Western Australia",
        "lat": -33.9305992126,
        "lon": 115.099998474,
        "timezone": "Australia/Perth"
    },
    "MVU": {
        "code": "MVU",
        "name": "Musgrave Airport",
        "city": "Musgrave",
        "state": "Queensland",
        "lat": -14.7833003998,
        "lon": 143.5,
        "timezone": "Australia/Brisbane"
    },
    "HBA": {
        "code": "HBA",
        "name": "Hobart International Airport",
        "city": "Hobart",
        "state": "Tasmania",
        "lat": -42.836101532,
        "lon": 147.509994507,
        "timezone": "Australia/Hobart"
    },
    "MHO": {
        "code": "MHO",
        "name": "Mount House Airport",
        "city": "Mount House",
        "state": "Western Australia",
        "lat": -17.0550003052,
        "lon": 125.7099990845,
        "timezone": "Australia/Perth"
    },
    "MCV": {
        "code": "MCV",
        "name": "McArthur River Mine Airport",
        "city": "McArthur River Mine",
        "state": "Northern-Territory",
        "lat": -16.4424991608,
        "lon": 136.083999634,
        "timezone": "Australia/Darwin"
    },
    "MQL": {
        "code": "MQL",
        "name": "Mildura Airport",
        "city": "Mildura",
        "state": "Victoria",
        "lat": -34.2291984558,
        "lon": 142.085998535,
        "timezone": "Australia/Melbourne"
    },
    "XML": {
        "code": "XML",
        "name": "Minlaton Airport",
        "city": "Minlaton",
        "state": "South Australia",
        "lat": -34.75,
        "lon": 137.5330047607,
        "timezone": "Australia/Adelaide"
    },
    "MIH": {
        "code": "MIH",
        "name": "Mitchell Plateau Airport",
        "city": "Mitchell Plateau",
        "state": "Western Australia",
        "lat": -14.7913999557,
        "lon": 125.8239974976,
        "timezone": "Australia/Perth"
    },
    "MWY": {
        "code": "MWY",
        "name": "Miralwyn Airport",
        "city": "Miralwyn",
        "state": "New South Wales",
        "lat": -30.1499996185,
        "lon": 147.3350067139,
        "timezone": "Australia/Sydney"
    },
    "MTQ": {
        "code": "MTQ",
        "name": "Mitchell Airport",
        "city": "Mitchell",
        "state": "Queensland",
        "lat": -26.4832992554,
        "lon": 147.93699646,
        "timezone": "Australia/Brisbane"
    },
    "MJP": {
        "code": "MJP",
        "name": "Manjimup Airport",
        "city": "Manjimup",
        "state": "Western Australia",
        "lat": -34.2653007507,
        "lon": 116.1399993896,
        "timezone": "Australia/Perth"
    },
    "WLE": {
        "code": "WLE",
        "name": "Miles Airport",
        "city": "Miles",
        "state": "Queensland",
        "lat": -26.8083000183,
        "lon": 150.1750030518,
        "timezone": "Australia/Brisbane"
    },
    "LST": {
        "code": "LST",
        "name": "Launceston Airport",
        "city": "Launceston",
        "state": "Tasmania",
        "lat": -41.54529953,
        "lon": 147.214004517,
        "timezone": "Australia/Hobart"
    },
    "MBW": {
        "code": "MBW",
        "name": "Melbourne Moorabbin Airport",
        "city": "Melbourne",
        "state": "Victoria",
        "lat": -37.9757995605,
        "lon": 145.1020050049,
        "timezone": "Australia/Melbourne"
    },
    "WUI": {
        "code": "WUI",
        "name": "Murrin Murrin Airport",
        "city": "Murrin Murrin",
        "state": "Western Australia",
        "lat": -28.7052993774,
        "lon": 121.8909988403,
        "timezone": "Australia/Perth"
    },
    "MEL": {
        "code": "MEL",
        "name": "Melbourne International Airport",
        "city": "Melbourne",
        "state": "Victoria",
        "lat": -37.6733016968,
        "lon": 144.8430023193,
        "timezone": "Australia/Melbourne"
    },
    "MMM": {
        "code": "MMM",
        "name": "Middlemount Airport",
        "city": "Middlemount",
        "state": "Queensland",
        "lat": -22.8024997711,
        "lon": 148.7050018311,
        "timezone": "Australia/Brisbane"
    },
    "MTL": {
        "code": "MTL",
        "name": "Maitland Airport",
        "city": "Maitland",
        "state": "New South Wales",
        "lat": -32.7033004761,
        "lon": 151.488006592,
        "timezone": "Australia/Sydney"
    },
    "WME": {
        "code": "WME",
        "name": "Mount Keith Airport",
        "city": "Mount Keith",
        "state": "Western Australia",
        "lat": -27.2863998413,
        "lon": 120.5550003052,
        "timezone": "Australia/Perth"
    },
    "ONR": {
        "code": "ONR",
        "name": "Monkira Airport",
        "city": "Monkira",
        "state": "Queensland",
        "lat": -24.8166999817,
        "lon": 140.5330047607,
        "timezone": "Australia/Brisbane"
    },
    "MSF": {
        "code": "MSF",
        "name": "Mount Swan Airport",
        "city": "Mount Swan",
        "state": "Northern-Territory",
        "lat": -22.6000003815,
        "lon": 135.016998291,
        "timezone": "Australia/Darwin"
    },
    "OXY": {
        "code": "OXY",
        "name": "Morney Airport",
        "city": "Morney",
        "state": "Queensland",
        "lat": -25.3582992554,
        "lon": 141.4329986572,
        "timezone": "Australia/Brisbane"
    },
    "MMG": {
        "code": "MMG",
        "name": "Mount Magnet Airport",
        "city": "Mount Magnet",
        "state": "Western Australia",
        "lat": -28.1161003113,
        "lon": 117.8420028687,
        "timezone": "Australia/Perth"
    },
    "OOR": {
        "code": "OOR",
        "name": "Mooraberree Airport",
        "city": "Mooraberree",
        "state": "Queensland",
        "lat": -25.25,
        "lon": 140.983001709,
        "timezone": "Australia/Brisbane"
    },
    "MRZ": {
        "code": "MRZ",
        "name": "Moree Airport",
        "city": "Moree",
        "state": "New South Wales",
        "lat": -29.4988994598,
        "lon": 149.845001221,
        "timezone": "Australia/Sydney"
    },
    "MET": {
        "code": "MET",
        "name": "Moreton Airport",
        "city": "Moreton",
        "state": "Queensland",
        "lat": -12.4441995621,
        "lon": 142.638000488,
        "timezone": "Australia/Brisbane"
    },
    "MIN": {
        "code": "MIN",
        "name": "Minnipa Airport",
        "city": "Minnipa",
        "state": "South Australia",
        "lat": -32.8432998657,
        "lon": 135.1450042725,
        "timezone": "Australia/Adelaide"
    },
    "MQE": {
        "code": "MQE",
        "name": "Marqua Airport",
        "city": "Marqua",
        "state": "Northern-Territory",
        "lat": -22.8057994843,
        "lon": 137.2510070801,
        "timezone": "Australia/Darwin"
    },
    "MOV": {
        "code": "MOV",
        "name": "Moranbah Airport",
        "city": "Moranbah",
        "state": "Queensland",
        "lat": -22.057800293,
        "lon": 148.07699585,
        "timezone": "Australia/Brisbane"
    },
    "RRE": {
        "code": "RRE",
        "name": "Marree Airport",
        "city": "Marree",
        "state": "South Australia",
        "lat": -29.6632995605,
        "lon": 138.0650024414,
        "timezone": "Australia/Adelaide"
    },
    "MWB": {
        "code": "MWB",
        "name": "Morawa Airport",
        "city": "Morawa",
        "state": "Western Australia",
        "lat": -29.2017002106,
        "lon": 116.0220031738,
        "timezone": "Australia/Perth"
    },
    "MYA": {
        "code": "MYA",
        "name": "Moruya Airport",
        "city": "Moruya",
        "state": "New South Wales",
        "lat": -35.8978004456,
        "lon": 150.143997192,
        "timezone": "Australia/Sydney"
    },
    "MTD": {
        "code": "MTD",
        "name": "Mount Sanford Station Airport",
        "city": "Mount Sanford Station",
        "state": "Northern-Territory",
        "lat": -16.9783000946,
        "lon": 130.5549926758,
        "timezone": "Australia/Darwin"
    },
    "UTB": {
        "code": "UTB",
        "name": "Muttaburra Airport",
        "city": "Muttaburra",
        "state": "Queensland",
        "lat": -22.5832996368,
        "lon": 144.5330047607,
        "timezone": "Australia/Brisbane"
    },
    "MGB": {
        "code": "MGB",
        "name": "Mount Gambier Airport",
        "city": "Mount Gambier",
        "state": "South Australia",
        "lat": -37.7456016541,
        "lon": 140.7850036621,
        "timezone": "Australia/Adelaide"
    },
    "ONG": {
        "code": "ONG",
        "name": "Mornington Island Airport",
        "city": "Mornington Island",
        "state": "Queensland",
        "lat": -16.6625003815,
        "lon": 139.1779937744,
        "timezone": "Australia/Brisbane"
    },
    "MNQ": {
        "code": "MNQ",
        "name": "Monto Airport",
        "city": "Monto",
        "state": "Queensland",
        "lat": -24.885799408,
        "lon": 151.1000061035,
        "timezone": "Australia/Brisbane"
    },
    "MUQ": {
        "code": "MUQ",
        "name": "Muccan Station Airport",
        "city": "Muccan Station",
        "state": "Western Australia",
        "lat": -20.6588993073,
        "lon": 120.0670013428,
        "timezone": "Australia/Perth"
    },
    "MNE": {
        "code": "MNE",
        "name": "Mungeranie Airport",
        "city": "Mungeranie",
        "state": "South Australia",
        "lat": -28.0091991425,
        "lon": 138.6569976807,
        "timezone": "Australia/Adelaide"
    },
    "MYI": {
        "code": "MYI",
        "name": "Murray Island Airport",
        "city": "Murray Island",
        "state": "Queensland",
        "lat": -9.9166698456,
        "lon": 144.0549926758,
        "timezone": "Australia/Brisbane"
    },
    "MVK": {
        "code": "MVK",
        "name": "Mulka Airport",
        "city": "Mulka",
        "state": "South Australia",
        "lat": -28.3477993011,
        "lon": 138.6499938965,
        "timezone": "Australia/Adelaide"
    },
    "MUP": {
        "code": "MUP",
        "name": "Mulga Park Airport",
        "city": "Mulga Park",
        "state": "Northern-Territory",
        "lat": -25.8999996185,
        "lon": 131.6670074463,
        "timezone": "Australia/Darwin"
    },
    "MKV": {
        "code": "MKV",
        "name": "Mount Cavenagh Airport",
        "city": "Mount Cavenagh",
        "state": "Northern-Territory",
        "lat": -25.9666996002,
        "lon": 133.1999969482,
        "timezone": "Australia/Darwin"
    },
    "MXU": {
        "code": "MXU",
        "name": "Mullewa Airport",
        "city": "Mullewa",
        "state": "Western Australia",
        "lat": -28.4750003815,
        "lon": 115.516998291,
        "timezone": "Australia/Perth"
    },
    "MWT": {
        "code": "MWT",
        "name": "Moolawatana Airport",
        "city": "Moolawatana",
        "state": "South Australia",
        "lat": -29.9167003632,
        "lon": 139.75,
        "timezone": "Australia/Adelaide"
    },
    "MXD": {
        "code": "MXD",
        "name": "Marion Downs Airport",
        "city": "Marion Downs",
        "state": "Queensland",
        "lat": -23.3666992188,
        "lon": 139.6670074463,
        "timezone": "Australia/Brisbane"
    },
    "MBH": {
        "code": "MBH",
        "name": "Maryborough Airport",
        "city": "Maryborough",
        "state": "Queensland",
        "lat": -25.513299942,
        "lon": 152.7149963379,
        "timezone": "Australia/Brisbane"
    },
    "MYO": {
        "code": "MYO",
        "name": "Myroodan Station Airport",
        "city": "Myroodan Station",
        "state": "Western Australia",
        "lat": -18.1166992188,
        "lon": 124.266998291,
        "timezone": "Australia/Perth"
    },
    "RTY": {
        "code": "RTY",
        "name": "Merty Merty Airport",
        "city": "Merty Merty",
        "state": "South Australia",
        "lat": -28.5832996368,
        "lon": 140.3170013428,
        "timezone": "Australia/Adelaide"
    },
    "NMR": {
        "code": "NMR",
        "name": "Nappa Merrie Airport",
        "city": "Nappa Merrie",
        "state": "Queensland",
        "lat": -27.5583000183,
        "lon": 141.1329956055,
        "timezone": "Australia/Brisbane"
    },
    "NRA": {
        "code": "NRA",
        "name": "Narrandera Airport",
        "city": "Narrandera",
        "state": "New South Wales",
        "lat": -34.7022018433,
        "lon": 146.511993408,
        "timezone": "Australia/Sydney"
    },
    "NAA": {
        "code": "NAA",
        "name": "Narrabri Airport",
        "city": "Narrabri",
        "state": "New South Wales",
        "lat": -30.3192005157,
        "lon": 149.82699585,
        "timezone": "Australia/Sydney"
    },
    "RPM": {
        "code": "RPM",
        "name": "Ngukurr Airport",
        "city": "Ngukurr",
        "state": "Northern-Territory",
        "lat": -14.7228002548,
        "lon": 134.7469940186,
        "timezone": "Australia/Darwin"
    },
    "NBH": {
        "code": "NBH",
        "name": "Nambucca Heads Airport",
        "city": "Nambucca Heads",
        "state": "New South Wales",
        "lat": -30.6499996185,
        "lon": 153,
        "timezone": "Australia/Sydney"
    },
    "NLS": {
        "code": "NLS",
        "name": "Nicholson Airport",
        "city": "Nicholson",
        "state": "Western Australia",
        "lat": -18.0499992371,
        "lon": 128.8999938965,
        "timezone": "Australia/Perth"
    },
    "NAC": {
        "code": "NAC",
        "name": "Naracoorte Airport",
        "city": "Naracoorte",
        "state": "South Australia",
        "lat": -36.9852981567,
        "lon": 140.7250061035,
        "timezone": "Australia/Adelaide"
    },
    "NRG": {
        "code": "NRG",
        "name": "Narrogin Airport",
        "city": "Narrogin",
        "state": "Western Australia",
        "lat": -32.9300003052,
        "lon": 117.0800018311,
        "timezone": "Australia/Perth"
    },
    "QRM": {
        "code": "QRM",
        "name": "Narromine Airport",
        "city": "Narromine",
        "state": "New South Wales",
        "lat": -32.2146987915,
        "lon": 148.2250061035,
        "timezone": "Australia/Sydney"
    },
    "RVT": {
        "code": "RVT",
        "name": "Ravensthorpe Airport",
        "city": "Ravensthorpe",
        "state": "Western Australia",
        "lat": -33.7971992493,
        "lon": 120.208000183,
        "timezone": "Australia/Perth"
    },
    "NSV": {
        "code": "NSV",
        "name": "Noosa Airport",
        "city": "Noosa",
        "state": "Queensland",
        "lat": -26.4232997894,
        "lon": 153.06300354,
        "timezone": "Australia/Brisbane"
    },
    "NSM": {
        "code": "NSM",
        "name": "Norseman Airport",
        "city": "Norseman",
        "state": "Western Australia",
        "lat": -32.2099990845,
        "lon": 121.7549972534,
        "timezone": "Australia/Perth"
    },
    "NTN": {
        "code": "NTN",
        "name": "Normanton Airport",
        "city": "Normanton",
        "state": "Queensland",
        "lat": -17.683599472,
        "lon": 141.0700073242,
        "timezone": "Australia/Brisbane"
    },
    "NUR": {
        "code": "NUR",
        "name": "Nullabor Motel Airport",
        "city": "Nullabor Motel",
        "state": "South Australia",
        "lat": -31.4416999817,
        "lon": 130.9019927979,
        "timezone": "Australia/Adelaide"
    },
    "NLL": {
        "code": "NLL",
        "name": "Nullagine Airport",
        "city": "Nullagine",
        "state": "Western Australia",
        "lat": -21.9132995605,
        "lon": 120.1979980469,
        "timezone": "Australia/Perth"
    },
    "NUB": {
        "code": "NUB",
        "name": "Numbulwar Airport",
        "city": "Numbulwar",
        "state": "Northern-Territory",
        "lat": -14.2716999054,
        "lon": 135.7169952393,
        "timezone": "Australia/Darwin"
    },
    "ZNE": {
        "code": "ZNE",
        "name": "Newman Airport",
        "city": "Newman",
        "state": "Western Australia",
        "lat": -23.4178009033,
        "lon": 119.803001404,
        "timezone": "Australia/Perth"
    },
    "NYN": {
        "code": "NYN",
        "name": "Nyngan Airport",
        "city": "Nyngan",
        "state": "New South Wales",
        "lat": -31.5510997772,
        "lon": 147.2030029297,
        "timezone": "Australia/Sydney"
    },
    "OPI": {
        "code": "OPI",
        "name": "Oenpelli Airport",
        "city": "Oenpelli",
        "state": "Northern-Territory",
        "lat": -12.3249998093,
        "lon": 133.0059967041,
        "timezone": "Australia/Darwin"
    },
    "XCO": {
        "code": "XCO",
        "name": "Colac Airport",
        "city": "Colac",
        "state": "Victoria",
        "lat": -38.2867012024,
        "lon": 143.6799926758,
        "timezone": "Australia/Melbourne"
    },
    "OLP": {
        "code": "OLP",
        "name": "Olympic Dam Airport",
        "city": "Olympic Dam",
        "state": "South Australia",
        "lat": -30.4850006104,
        "lon": 136.876998901,
        "timezone": "Australia/Adelaide"
    },
    "ONS": {
        "code": "ONS",
        "name": "Onslow Airport",
        "city": "Onslow",
        "state": "Western Australia",
        "lat": -21.6683006287,
        "lon": 115.1129989624,
        "timezone": "Australia/Perth"
    },
    "ODD": {
        "code": "ODD",
        "name": "Oodnadatta Airport",
        "city": "Oodnadatta",
        "state": "South Australia",
        "lat": -27.5617008209,
        "lon": 135.4470062256,
        "timezone": "Australia/Adelaide"
    },
    "MOO": {
        "code": "MOO",
        "name": "Moomba Airport",
        "city": "Moomba",
        "state": "South Australia",
        "lat": -28.0993995667,
        "lon": 140.1970062256,
        "timezone": "Australia/Adelaide"
    },
    "RBS": {
        "code": "RBS",
        "name": "Orbost Airport",
        "city": "Orbost",
        "state": "Victoria",
        "lat": -37.7900009155,
        "lon": 148.6100006104,
        "timezone": "Australia/Melbourne"
    },
    "OAG": {
        "code": "OAG",
        "name": "Orange Airport",
        "city": "Orange",
        "state": "New South Wales",
        "lat": -33.3816986084,
        "lon": 149.132995605,
        "timezone": "Australia/Sydney"
    },
    "ODR": {
        "code": "ODR",
        "name": "Ord River Airport",
        "city": "Ord River",
        "state": "Western Australia",
        "lat": -17.3407993317,
        "lon": 128.9120025635,
        "timezone": "Australia/Perth"
    },
    "OSO": {
        "code": "OSO",
        "name": "Osborne Mine Airport",
        "city": "Osborne Mine",
        "state": "Queensland",
        "lat": -22.0816993713,
        "lon": 140.554992676,
        "timezone": "Australia/Brisbane"
    },
    "OYN": {
        "code": "OYN",
        "name": "Ouyen Airport",
        "city": "Ouyen",
        "state": "Victoria",
        "lat": -35.0890124268,
        "lon": 142.354488373,
        "timezone": "Australia/Melbourne"
    },
    "ADL": {
        "code": "ADL",
        "name": "Adelaide International Airport",
        "city": "Adelaide",
        "state": "South Australia",
        "lat": -34.9449996948,
        "lon": 138.5310058594,
        "timezone": "Australia/Adelaide"
    },
    "PUG": {
        "code": "PUG",
        "name": "Port Augusta Airport",
        "city": "Port Augusta",
        "state": "South Australia",
        "lat": -32.5069007874,
        "lon": 137.7169952393,
        "timezone": "Australia/Adelaide"
    },
    "PMK": {
        "code": "PMK",
        "name": "Palm Island Airport",
        "city": "Palm Island",
        "state": "Queensland",
        "lat": -18.7553005219,
        "lon": 146.5809936523,
        "timezone": "Australia/Brisbane"
    },
    "PBO": {
        "code": "PBO",
        "name": "Paraburdoo Airport",
        "city": "Paraburdoo",
        "state": "Western Australia",
        "lat": -23.1711006165,
        "lon": 117.745002747,
        "timezone": "Australia/Perth"
    },
    "PDN": {
        "code": "PDN",
        "name": "Parndana Airport",
        "city": "Parndana",
        "state": "South Australia",
        "lat": -35.807,
        "lon": 137.264,
        "timezone": "Australia/Adelaide"
    },
    "PDE": {
        "code": "PDE",
        "name": "Pandie Pandie Airport",
        "city": "Pandie Pandie",
        "state": "South Australia",
        "lat": -26.1166992188,
        "lon": 139.3999938965,
        "timezone": "Australia/Adelaide"
    },
    "DRW": {
        "code": "DRW",
        "name": "Darwin International Airport",
        "city": "Darwin",
        "state": "Northern-Territory",
        "lat": -12.4146995544,
        "lon": 130.8769989014,
        "timezone": "Australia/Darwin"
    },
    "PRD": {
        "code": "PRD",
        "name": "Pardoo Airport",
        "city": "Pardoo",
        "state": "Western Australia",
        "lat": -20.1175003052,
        "lon": 119.5899963379,
        "timezone": "Australia/Perth"
    },
    "BEO": {
        "code": "BEO",
        "name": "Aeropelican Airport",
        "city": "Aeropelican",
        "state": "New South Wales",
        "lat": -33.0666999817,
        "lon": 151.6479949951,
        "timezone": "Australia/Sydney"
    },
    "GOV": {
        "code": "GOV",
        "name": "Gove Airport",
        "city": "Nhulunbuy",
        "state": "Northern-Territory",
        "lat": -12.2693996429,
        "lon": 136.817993164,
        "timezone": "Australia/Darwin"
    },
    "PPI": {
        "code": "PPI",
        "name": "Port Pirie Airport",
        "city": "Port Pirie",
        "state": "South Australia",
        "lat": -33.238899231,
        "lon": 137.9949951172,
        "timezone": "Australia/Adelaide"
    },
    "JAD": {
        "code": "JAD",
        "name": "Perth Jandakot Airport",
        "city": "Perth",
        "state": "Western Australia",
        "lat": -32.0974998474,
        "lon": 115.8809967041,
        "timezone": "Australia/Perth"
    },
    "KTA": {
        "code": "KTA",
        "name": "Karratha Airport",
        "city": "Karratha",
        "state": "Western Australia",
        "lat": -20.7122001648,
        "lon": 116.773002625,
        "timezone": "Australia/Perth"
    },
    "KGI": {
        "code": "KGI",
        "name": "Kalgoorlie-Boulder Airport",
        "city": "Kalgoorlie",
        "state": "Western Australia",
        "lat": -30.789444,
        "lon": 121.461667,
        "timezone": "Australia/Perth"
    },
    "PKE": {
        "code": "PKE",
        "name": "Parkes Airport",
        "city": "Parkes",
        "state": "New South Wales",
        "lat": -33.131401062,
        "lon": 148.238998413,
        "timezone": "Australia/Sydney"
    },
    "PKT": {
        "code": "PKT",
        "name": "Port Keats Airport",
        "city": "Port Keats",
        "state": "Northern-Territory",
        "lat": -14.25,
        "lon": 129.529006958,
        "timezone": "Australia/Darwin"
    },
    "KNX": {
        "code": "KNX",
        "name": "Kununurra Airport",
        "city": "Kununurra",
        "state": "Western Australia",
        "lat": -15.7781000137,
        "lon": 128.707992554,
        "timezone": "Australia/Perth"
    },
    "PLO": {
        "code": "PLO",
        "name": "Port Lincoln Airport",
        "city": "Port Lincoln",
        "state": "South Australia",
        "lat": -34.6053009033,
        "lon": 135.880004883,
        "timezone": "Australia/Adelaide"
    },
    "LEA": {
        "code": "LEA",
        "name": "Learmonth Airport",
        "city": "Exmouth",
        "state": "Western Australia",
        "lat": -22.2355995178,
        "lon": 114.088996887,
        "timezone": "Australia/Perth"
    },
    "EDR": {
        "code": "EDR",
        "name": "Pormpuraaw Airport",
        "city": "Pormpuraaw",
        "state": "Queensland",
        "lat": -14.8966999054,
        "lon": 141.6089935303,
        "timezone": "Australia/Brisbane"
    },
    "PQQ": {
        "code": "PQQ",
        "name": "Port Macquarie Airport",
        "city": "Port Macquarie",
        "state": "New South Wales",
        "lat": -31.4358005524,
        "lon": 152.863006592,
        "timezone": "Australia/Sydney"
    },
    "PTJ": {
        "code": "PTJ",
        "name": "Portland Airport",
        "city": "Portland",
        "state": "Victoria",
        "lat": -38.3180999756,
        "lon": 141.470993042,
        "timezone": "Australia/Melbourne"
    },
    "MBF": {
        "code": "MBF",
        "name": "Porepunkah Airport",
        "city": "Porepunkah",
        "state": "Victoria",
        "lat": -36.7177307062,
        "lon": 146.890039444,
        "timezone": "Australia/Melbourne"
    },
    "PHE": {
        "code": "PHE",
        "name": "Port Hedland International Airport",
        "city": "Port Hedland",
        "state": "Western Australia",
        "lat": -20.3777999878,
        "lon": 118.625999451,
        "timezone": "Australia/Perth"
    },
    "PER": {
        "code": "PER",
        "name": "Perth International Airport",
        "city": "Perth",
        "state": "Western Australia",
        "lat": -31.9402999878,
        "lon": 115.9670028687,
        "timezone": "Australia/Perth"
    },
    "PEA": {
        "code": "PEA",
        "name": "Penneshaw Airport",
        "city": "Ironstone",
        "state": "South Australia",
        "lat": -35.7558462874,
        "lon": 137.962875366,
        "timezone": "Australia/Adelaide"
    },
    "KTR": {
        "code": "KTR",
        "name": "Tindal Airport",
        "city": "Tindal",
        "state": "Northern-Territory",
        "lat": -14.5211000443,
        "lon": 132.3780059814,
        "timezone": "Australia/Darwin"
    },
    "UMR": {
        "code": "UMR",
        "name": "Woomera Airfield",
        "city": "Woomera",
        "state": "South Australia",
        "lat": -31.1441993713,
        "lon": 136.8170013428,
        "timezone": "Australia/Adelaide"
    },
    "UIR": {
        "code": "UIR",
        "name": "Quirindi Airport",
        "city": "Quirindi",
        "state": "New South Wales",
        "lat": -31.4906005859,
        "lon": 150.5140075684,
        "timezone": "Australia/Sydney"
    },
    "ULP": {
        "code": "ULP",
        "name": "Quilpie Airport",
        "city": "Quilpie",
        "state": "Queensland",
        "lat": -26.6121997833,
        "lon": 144.2530059814,
        "timezone": "Australia/Brisbane"
    },
    "UEE": {
        "code": "UEE",
        "name": "Queenstown Airport",
        "city": "Queenstown",
        "state": "Tasmania",
        "lat": -42.0750007629,
        "lon": 145.5319976807,
        "timezone": "Australia/Hobart"
    },
    "RMK": {
        "code": "RMK",
        "name": "Renmark Airport",
        "city": "Renmark",
        "state": "South Australia",
        "lat": -34.1963996887,
        "lon": 140.6739959717,
        "timezone": "Australia/Adelaide"
    },
    "RCM": {
        "code": "RCM",
        "name": "Richmond Airport",
        "city": "Richmond",
        "state": "Queensland",
        "lat": -20.7019004822,
        "lon": 143.1150054932,
        "timezone": "Australia/Brisbane"
    },
    "RAM": {
        "code": "RAM",
        "name": "Ramingining Airport",
        "city": "Ramingining",
        "state": "Northern-Territory",
        "lat": -12.3563995361,
        "lon": 134.8979949951,
        "timezone": "Australia/Darwin"
    },
    "ROH": {
        "code": "ROH",
        "name": "Robinhood Airport",
        "city": "Robinhood",
        "state": "Queensland",
        "lat": -18.8449993134,
        "lon": 143.7100067139,
        "timezone": "Australia/Brisbane"
    },
    "RBU": {
        "code": "RBU",
        "name": "Roebourne Airport",
        "city": "Roebourne",
        "state": "Western Australia",
        "lat": -20.7616996765,
        "lon": 117.156997681,
        "timezone": "Australia/Perth"
    },
    "RBC": {
        "code": "RBC",
        "name": "Robinvale Airport",
        "city": "Robinvale",
        "state": "Victoria",
        "lat": -34.6500015259,
        "lon": 142.7830047607,
        "timezone": "Australia/Melbourne"
    },
    "RMA": {
        "code": "RMA",
        "name": "Roma Airport",
        "city": "Roma",
        "state": "Queensland",
        "lat": -26.5450000763,
        "lon": 148.774993896,
        "timezone": "Australia/Brisbane"
    },
    "RPB": {
        "code": "RPB",
        "name": "Roper Bar Airport",
        "city": "Roper Bar",
        "state": "Northern-Territory",
        "lat": -14.7383003235,
        "lon": 134.5180053711,
        "timezone": "Australia/Darwin"
    },
    "RSB": {
        "code": "RSB",
        "name": "Roseberth Airport",
        "city": "Roseberth",
        "state": "Queensland",
        "lat": -25.8332996368,
        "lon": 139.6499938965,
        "timezone": "Australia/Brisbane"
    },
    "RTS": {
        "code": "RTS",
        "name": "Rottnest Island Airport",
        "city": "Rottnest Island",
        "state": "Western Australia",
        "lat": -32.0066986084,
        "lon": 115.5400009155,
        "timezone": "Australia/Perth"
    },
    "RTP": {
        "code": "RTP",
        "name": "Rutland Plains Airport",
        "city": "Rutland Plains",
        "state": "Queensland",
        "lat": -15.6433000565,
        "lon": 141.8430023193,
        "timezone": "Australia/Brisbane"
    },
    "RHL": {
        "code": "RHL",
        "name": "Roy Hill Station Airport",
        "city": "Roy Hill Station",
        "state": "Western Australia",
        "lat": -22.625815891,
        "lon": 119.959030151,
        "timezone": "Australia/Perth"
    },
    "NDS": {
        "code": "NDS",
        "name": "Sandstone Airport",
        "city": "Sandstone",
        "state": "Western Australia",
        "lat": -27.9799995422,
        "lon": 119.2969970703,
        "timezone": "Australia/Perth"
    },
    "BWU": {
        "code": "BWU",
        "name": "Sydney Bankstown Airport",
        "city": "Sydney",
        "state": "New South Wales",
        "lat": -33.9244003296,
        "lon": 150.9880065918,
        "timezone": "Australia/Sydney"
    },
    "CBR": {
        "code": "CBR",
        "name": "Canberra International Airport",
        "city": "Canberra",
        "state": "ACT",
        "lat": -35.3069000244,
        "lon": 149.1950073242,
        "timezone": "Australia/Sydney"
    },
    "CFS": {
        "code": "CFS",
        "name": "Coffs Harbour Airport",
        "city": "Coffs Harbour",
        "state": "New South Wales",
        "lat": -30.3206005096,
        "lon": 153.115997314,
        "timezone": "Australia/Sydney"
    },
    "CDU": {
        "code": "CDU",
        "name": "Camden Airport",
        "city": "Camden",
        "state": "New South Wales",
        "lat": -34.0402984619,
        "lon": 150.68699646,
        "timezone": "Australia/Sydney"
    },
    "NSO": {
        "code": "NSO",
        "name": "Scone Airport",
        "city": "Scone",
        "state": "New South Wales",
        "lat": -32.0372009277,
        "lon": 150.8320007324,
        "timezone": "Australia/Sydney"
    },
    "SQC": {
        "code": "SQC",
        "name": "Southern Cross Airport",
        "city": "Southern Cross",
        "state": "Western Australia",
        "lat": -31.2399997711,
        "lon": 119.3600006104,
        "timezone": "Australia/Perth"
    },
    "DBO": {
        "code": "DBO",
        "name": "Dubbo City Regional Airport",
        "city": "Dubbo",
        "state": "New South Wales",
        "lat": -32.2167015076,
        "lon": 148.574996948,
        "timezone": "Australia/Sydney"
    },
    "SGO": {
        "code": "SGO",
        "name": "St George Airport",
        "city": "St George",
        "state": "Queensland",
        "lat": -28.0496997833,
        "lon": 148.5950012207,
        "timezone": "Australia/Brisbane"
    },
    "SIX": {
        "code": "SIX",
        "name": "Singleton Airport",
        "city": "Singleton",
        "state": "New South Wales",
        "lat": -32.600832,
        "lon": 151.193056,
        "timezone": "Australia/Sydney"
    },
    "ZGL": {
        "code": "ZGL",
        "name": "South Galway Airport",
        "city": "South Galway",
        "state": "Queensland",
        "lat": -25.6833000183,
        "lon": 142.108001709,
        "timezone": "Australia/Brisbane"
    },
    "SGP": {
        "code": "SGP",
        "name": "Shay Gap Airport",
        "city": "Shay Gap",
        "state": "Western Australia",
        "lat": -20.4246997833,
        "lon": 120.1409988403,
        "timezone": "Australia/Perth"
    },
    "MJK": {
        "code": "MJK",
        "name": "Shark Bay Airport",
        "city": "Monkey Mia",
        "state": "Western Australia",
        "lat": -25.8938999176,
        "lon": 113.577003479,
        "timezone": "Australia/Perth"
    },
    "JHQ": {
        "code": "JHQ",
        "name": "Shute Harbour Airport",
        "city": "Shute Harbour",
        "state": "Queensland",
        "lat": -20.2782993317,
        "lon": 148.7570037842,
        "timezone": "Australia/Brisbane"
    },
    "SHT": {
        "code": "SHT",
        "name": "Shepparton Airport",
        "city": "Shepparton",
        "state": "Victoria",
        "lat": -36.4289016724,
        "lon": 145.3930053711,
        "timezone": "Australia/Melbourne"
    },
    "SBR": {
        "code": "SBR",
        "name": "Saibai Island Airport",
        "city": "Saibai Island",
        "state": "Queensland",
        "lat": -9.3783302307,
        "lon": 142.625,
        "timezone": "Australia/Brisbane"
    },
    "SIO": {
        "code": "SIO",
        "name": "Smithton Airport",
        "city": "Smithton",
        "state": "Tasmania",
        "lat": -40.8349990845,
        "lon": 145.0839996338,
        "timezone": "Australia/Hobart"
    },
    "SHU": {
        "code": "SHU",
        "name": "Smith Point Airport",
        "city": "Smith Point",
        "state": "Northern-Territory",
        "lat": -11.1499996185,
        "lon": 132.149993896,
        "timezone": "Australia/Darwin"
    },
    "STH": {
        "code": "STH",
        "name": "Strathmore Airport",
        "city": "Strathmore",
        "state": "Queensland",
        "lat": -17.8500003815,
        "lon": 142.5670013428,
        "timezone": "Australia/Brisbane"
    },
    "SNB": {
        "code": "SNB",
        "name": "Snake Bay Airport",
        "city": "Snake Bay",
        "state": "Northern-Territory",
        "lat": -11.4228000641,
        "lon": 130.654006958,
        "timezone": "Australia/Darwin"
    },
    "NOA": {
        "code": "NOA",
        "name": "Nowra Airport",
        "city": "Nowra",
        "state": "New South Wales",
        "lat": -34.9488983154,
        "lon": 150.5370025635,
        "timezone": "Australia/Sydney"
    },
    "SLJ": {
        "code": "SLJ",
        "name": "Solomon Airport",
        "city": "Karijini National Park",
        "state": "Western Australia",
        "lat": -22.255278,
        "lon": 117.761944,
        "timezone": "Australia/Perth"
    },
    "SNH": {
        "code": "SNH",
        "name": "Stanthorpe Airport",
        "city": "Stanthorpe",
        "state": "Queensland",
        "lat": -28.620300293,
        "lon": 151.9909973145,
        "timezone": "Australia/Brisbane"
    },
    "SCG": {
        "code": "SCG",
        "name": "Spring Creek Airport",
        "city": "Spring Creek",
        "state": "Queensland",
        "lat": -18.6333007813,
        "lon": 144.5670013428,
        "timezone": "Australia/Brisbane"
    },
    "SHQ": {
        "code": "SHQ",
        "name": "Southport Airport",
        "city": "Southport",
        "state": "Queensland",
        "lat": -27.9150009155,
        "lon": 153.3730010986,
        "timezone": "Australia/Brisbane"
    },
    "KSV": {
        "code": "KSV",
        "name": "Springvale Airport",
        "city": "Springvale",
        "state": "Queensland",
        "lat": -23.5499992371,
        "lon": 140.6999969482,
        "timezone": "Australia/Brisbane"
    },
    "XRH": {
        "code": "XRH",
        "name": "RAAF Base Richmond",
        "city": "Richmond",
        "state": "New South Wales",
        "lat": -33.6006011963,
        "lon": 150.7810058594,
        "timezone": "Australia/Sydney"
    },
    "SRN": {
        "code": "SRN",
        "name": "Strahan Airport",
        "city": "Strahan",
        "state": "Tasmania",
        "lat": -42.1549987793,
        "lon": 145.2920074463,
        "timezone": "Australia/Hobart"
    },
    "SYD": {
        "code": "SYD",
        "name": "Sydney Kingsford Smith International Airport",
        "city": "Sydney",
        "state": "New South Wales",
        "lat": -33.9460983276,
        "lon": 151.1770019531,
        "timezone": "Australia/Sydney"
    },
    "HLS": {
        "code": "HLS",
        "name": "St Helens Airport",
        "city": "St Helens",
        "state": "Tasmania",
        "lat": -41.3367004395,
        "lon": 148.2819976807,
        "timezone": "Australia/Hobart"
    },
    "TMW": {
        "code": "TMW",
        "name": "Tamworth Airport",
        "city": "Tamworth",
        "state": "New South Wales",
        "lat": -31.0839004517,
        "lon": 150.847000122,
        "timezone": "Australia/Sydney"
    },
    "WGA": {
        "code": "WGA",
        "name": "Wagga Wagga City Airport",
        "city": "Wagga Wagga",
        "state": "New South Wales",
        "lat": -35.1652984619,
        "lon": 147.466003418,
        "timezone": "Australia/Sydney"
    },
    "SWH": {
        "code": "SWH",
        "name": "Swan Hill Airport",
        "city": "Swan Hill",
        "state": "Victoria",
        "lat": -35.3758010864,
        "lon": 143.5330047607,
        "timezone": "Australia/Melbourne"
    },
    "SWC": {
        "code": "SWC",
        "name": "Stawell Airport",
        "city": "Stawell",
        "state": "Victoria",
        "lat": -37.0717010498,
        "lon": 142.7409973145,
        "timezone": "Australia/Melbourne"
    },
    "XTR": {
        "code": "XTR",
        "name": "Tara Airport",
        "city": "Tara",
        "state": "Queensland",
        "lat": -27.1567001343,
        "lon": 150.4770050049,
        "timezone": "Australia/Brisbane"
    },
    "TBL": {
        "code": "TBL",
        "name": "Tableland Homestead Airport",
        "city": "Tableland Homestead",
        "state": "Western Australia",
        "lat": -17.2833003998,
        "lon": 126.900001526,
        "timezone": "Australia/Perth"
    },
    "XTO": {
        "code": "XTO",
        "name": "Taroom Airport",
        "city": "Taroom",
        "state": "Queensland",
        "lat": -25.801700592,
        "lon": 149.8999938965,
        "timezone": "Australia/Brisbane"
    },
    "TAQ": {
        "code": "TAQ",
        "name": "Tarcoola Airport",
        "city": "Tarcoola",
        "state": "South Australia",
        "lat": -30.7033004761,
        "lon": 134.583999634,
        "timezone": "Australia/Adelaide"
    },
    "TBK": {
        "code": "TBK",
        "name": "Timber Creek Airport",
        "city": "Timber Creek",
        "state": "Northern-Territory",
        "lat": -15.6199998856,
        "lon": 130.4450073242,
        "timezone": "Australia/Darwin"
    },
    "TDR": {
        "code": "TDR",
        "name": "Theodore Airport",
        "city": "Theodore",
        "state": "Queensland",
        "lat": -24.9932994843,
        "lon": 150.0930023193,
        "timezone": "Australia/Brisbane"
    },
    "TQP": {
        "code": "TQP",
        "name": "Trepell Airport",
        "city": "Trepell",
        "state": "Queensland",
        "lat": -21.8349990845,
        "lon": 140.8880004883,
        "timezone": "Australia/Brisbane"
    },
    "TEF": {
        "code": "TEF",
        "name": "Telfer Airport",
        "city": "Telfer",
        "state": "Western Australia",
        "lat": -21.7150001526,
        "lon": 122.2289962769,
        "timezone": "Australia/Perth"
    },
    "TEM": {
        "code": "TEM",
        "name": "Temora Airport",
        "city": "Temora",
        "state": "New South Wales",
        "lat": -34.4213981628,
        "lon": 147.5119934082,
        "timezone": "Australia/Sydney"
    },
    "TAN": {
        "code": "TAN",
        "name": "Tangalooma Airport",
        "city": "Tangalooma",
        "state": "Queensland",
        "lat": -27.1299991608,
        "lon": 153.363006592,
        "timezone": "Australia/Brisbane"
    },
    "XTG": {
        "code": "XTG",
        "name": "Thargomindah Airport",
        "city": "Thargomindah",
        "state": "Queensland",
        "lat": -27.9864006042,
        "lon": 143.8110046387,
        "timezone": "Australia/Brisbane"
    },
    "GTS": {
        "code": "GTS",
        "name": "The Granites Airport",
        "city": "The Granites",
        "state": "Northern-Territory",
        "lat": -20.5482997894,
        "lon": 130.3470001221,
        "timezone": "Australia/Darwin"
    },
    "TDN": {
        "code": "TDN",
        "name": "Theda Station Airport",
        "city": "Theda Station",
        "state": "Western Australia",
        "lat": -14.7881002426,
        "lon": 126.4960021973,
        "timezone": "Australia/Perth"
    },
    "TYG": {
        "code": "TYG",
        "name": "Thylungra Airport",
        "city": "Thylungra",
        "state": "Queensland",
        "lat": -26.0832996368,
        "lon": 143.4669952393,
        "timezone": "Australia/Brisbane"
    },
    "TYB": {
        "code": "TYB",
        "name": "Tibooburra Airport",
        "city": "Tibooburra",
        "state": "New South Wales",
        "lat": -29.4510993958,
        "lon": 142.0579986572,
        "timezone": "Australia/Sydney"
    },
    "TKY": {
        "code": "TKY",
        "name": "Turkey Creek Airport",
        "city": "Turkey Creek",
        "state": "Western Australia",
        "lat": -17.0408000946,
        "lon": 128.205993652,
        "timezone": "Australia/Perth"
    },
    "PHQ": {
        "code": "PHQ",
        "name": "The Monument Airport",
        "city": "The Monument",
        "state": "Queensland",
        "lat": -21.8111000061,
        "lon": 139.9239959717,
        "timezone": "Australia/Brisbane"
    },
    "TPR": {
        "code": "TPR",
        "name": "Tom Price Airport",
        "city": "Tom Price",
        "state": "Western Australia",
        "lat": -22.7460002899,
        "lon": 117.869003296,
        "timezone": "Australia/Perth"
    },
    "TUM": {
        "code": "TUM",
        "name": "Tumut Airport",
        "city": "Tumut",
        "state": "New South Wales",
        "lat": -35.2627983093,
        "lon": 148.2409973145,
        "timezone": "Australia/Sydney"
    },
    "TYP": {
        "code": "TYP",
        "name": "Tobermorey Airport",
        "city": "Tobermorey",
        "state": "Northern-Territory",
        "lat": -22.2558002472,
        "lon": 137.9530029297,
        "timezone": "Australia/Darwin"
    },
    "THG": {
        "code": "THG",
        "name": "Thangool Airport",
        "city": "Biloela",
        "state": "Queensland",
        "lat": -24.4939002991,
        "lon": 150.5760040283,
        "timezone": "Australia/Brisbane"
    },
    "TCA": {
        "code": "TCA",
        "name": "Tennant Creek Airport",
        "city": "Tennant Creek",
        "state": "Northern-Territory",
        "lat": -19.6343994141,
        "lon": 134.1829986572,
        "timezone": "Australia/Darwin"
    },
    "TCW": {
        "code": "TCW",
        "name": "Tocumwal Airport",
        "city": "Tocumwal",
        "state": "New South Wales",
        "lat": -35.8116989136,
        "lon": 145.608001709,
        "timezone": "Australia/Sydney"
    },
    "TRO": {
        "code": "TRO",
        "name": "Taree Airport",
        "city": "Taree",
        "state": "New South Wales",
        "lat": -31.8885993958,
        "lon": 152.514007568,
        "timezone": "Australia/Sydney"
    },
    "TTX": {
        "code": "TTX",
        "name": "Truscott Mungalalu Airport",
        "city": "Truscott Mungalalu",
        "state": "Western Australia",
        "lat": -14.0896997452,
        "lon": 126.3809967041,
        "timezone": "Australia/Perth"
    },
    "TWB": {
        "code": "TWB",
        "name": "Toowoomba Airport",
        "city": "Toowoomba",
        "state": "Queensland",
        "lat": -27.5428009033,
        "lon": 151.9160003662,
        "timezone": "Australia/Brisbane"
    },
    "UDA": {
        "code": "UDA",
        "name": "Undara Airport",
        "city": "Undara",
        "state": "Queensland",
        "lat": -18.2000007629,
        "lon": 144.6000061035,
        "timezone": "Australia/Brisbane"
    },
    "CZY": {
        "code": "CZY",
        "name": "Cluny Airport",
        "city": "Cluny",
        "state": "Queensland",
        "lat": -24.5167007446,
        "lon": 139.6170043945,
        "timezone": "Australia/Brisbane"
    },
    "USL": {
        "code": "USL",
        "name": "Useless Loop Airport",
        "city": "Useless Loop",
        "state": "Western Australia",
        "lat": -26.1667003632,
        "lon": 113.4000015259,
        "timezone": "Australia/Perth"
    },
    "VCD": {
        "code": "VCD",
        "name": "Victoria River Downs Airport",
        "city": "Victoria River Downs",
        "state": "Northern-Territory",
        "lat": -16.4021244049,
        "lon": 131.0049743652,
        "timezone": "Australia/Darwin"
    },
    "VNR": {
        "code": "VNR",
        "name": "Vanrook Station Airport",
        "city": "Vanrook Station",
        "state": "Queensland",
        "lat": -16.963300705,
        "lon": 141.9499969482,
        "timezone": "Australia/Brisbane"
    },
    "WLA": {
        "code": "WLA",
        "name": "Wallal Airport",
        "city": "Wallal",
        "state": "Western Australia",
        "lat": -19.7735996246,
        "lon": 120.649002075,
        "timezone": "Australia/Perth"
    },
    "WAV": {
        "code": "WAV",
        "name": "Wave Hill Airport",
        "city": "Wave Hill",
        "state": "Northern-Territory",
        "lat": -17.3932991028,
        "lon": 131.1179962158,
        "timezone": "Australia/Darwin"
    },
    "WMB": {
        "code": "WMB",
        "name": "Warrnambool Airport",
        "city": "Warrnambool",
        "state": "Victoria",
        "lat": -38.29529953,
        "lon": 142.4470062256,
        "timezone": "Australia/Melbourne"
    },
    "SYU": {
        "code": "SYU",
        "name": "Warraber Island Airport",
        "city": "Sue Islet",
        "state": "Queensland",
        "lat": -10.2082996368,
        "lon": 142.8249969482,
        "timezone": "Australia/Brisbane"
    },
    "WIO": {
        "code": "WIO",
        "name": "Wilcannia Airport",
        "city": "Wilcannia",
        "state": "New South Wales",
        "lat": -31.5263996124,
        "lon": 143.375,
        "timezone": "Australia/Sydney"
    },
    "WLC": {
        "code": "WLC",
        "name": "Walcha Airport",
        "city": "Walcha",
        "state": "New South Wales",
        "lat": -31,
        "lon": 151.5670013428,
        "timezone": "Australia/Sydney"
    },
    "WAZ": {
        "code": "WAZ",
        "name": "Warwick Airport",
        "city": "Warwick",
        "state": "Queensland",
        "lat": -28.1494007111,
        "lon": 151.9429931641,
        "timezone": "Australia/Brisbane"
    },
    "WND": {
        "code": "WND",
        "name": "Windarra Airport",
        "city": "Windarra",
        "state": "Western Australia",
        "lat": -28.4750003815,
        "lon": 122.241996765,
        "timezone": "Australia/Perth"
    },
    "WNR": {
        "code": "WNR",
        "name": "Windorah Airport",
        "city": "Windorah",
        "state": "Queensland",
        "lat": -25.4130992889,
        "lon": 142.6670074463,
        "timezone": "Australia/Brisbane"
    },
    "WON": {
        "code": "WON",
        "name": "Wondoola Airport",
        "city": "Wondoola",
        "state": "Queensland",
        "lat": -18.5750007629,
        "lon": 140.891998291,
        "timezone": "Australia/Brisbane"
    },
    "WGT": {
        "code": "WGT",
        "name": "Wangaratta Airport",
        "city": "Wangaratta",
        "state": "Victoria",
        "lat": -36.4157981873,
        "lon": 146.3070068359,
        "timezone": "Australia/Melbourne"
    },
    "WYA": {
        "code": "WYA",
        "name": "Whyalla Airport",
        "city": "Whyalla",
        "state": "South Australia",
        "lat": -33.0588989258,
        "lon": 137.5140075684,
        "timezone": "Australia/Adelaide"
    },
    "WSY": {
        "code": "WSY",
        "name": "Whitsunday Island Airport",
        "city": "Whitsunday Island",
        "state": "Queensland",
        "lat": -20.2667007446,
        "lon": 148.766998291,
        "timezone": "Australia/Brisbane"
    },
    "WIT": {
        "code": "WIT",
        "name": "Wittenoom Airport",
        "city": "Wittenoom",
        "state": "Western Australia",
        "lat": -22.2182998657,
        "lon": 118.3479995728,
        "timezone": "Australia/Perth"
    },
    "WKB": {
        "code": "WKB",
        "name": "Warracknabeal Airport",
        "city": "Warracknabeal",
        "state": "Victoria",
        "lat": -36.3210983276,
        "lon": 142.4190063477,
        "timezone": "Australia/Melbourne"
    },
    "WGE": {
        "code": "WGE",
        "name": "Walgett Airport",
        "city": "Walgett",
        "state": "New South Wales",
        "lat": -30.0328006744,
        "lon": 148.1260070801,
        "timezone": "Australia/Sydney"
    },
    "NTL": {
        "code": "NTL",
        "name": "Newcastle Airport",
        "city": "Williamtown",
        "state": "New South Wales",
        "lat": -32.7949981689,
        "lon": 151.8339996338,
        "timezone": "Australia/Sydney"
    },
    "WUN": {
        "code": "WUN",
        "name": "Wiluna Airport",
        "city": "Wiluna",
        "state": "Western Australia",
        "lat": -26.6291999817,
        "lon": 120.2210006714,
        "timezone": "Australia/Perth"
    },
    "WPK": {
        "code": "WPK",
        "name": "Wrotham Park Airport",
        "city": "Wrotham Park",
        "state": "Queensland",
        "lat": -16.6583003998,
        "lon": 144.0019989014,
        "timezone": "Australia/Brisbane"
    },
    "WDI": {
        "code": "WDI",
        "name": "Wondai Airport",
        "city": "Wondai",
        "state": "Queensland",
        "lat": -26.2833003998,
        "lon": 151.858001709,
        "timezone": "Australia/Brisbane"
    },
    "WOL": {
        "code": "WOL",
        "name": "Wollongong Airport",
        "city": "Wollongong",
        "state": "New South Wales",
        "lat": -34.5611000061,
        "lon": 150.7890014648,
        "timezone": "Australia/Sydney"
    },
    "WLL": {
        "code": "WLL",
        "name": "Wollogorang Airport",
        "city": "Wollogorang",
        "state": "Northern-Territory",
        "lat": -17.2199993134,
        "lon": 137.9230041504,
        "timezone": "Australia/Darwin"
    },
    "QRR": {
        "code": "QRR",
        "name": "Warren Airport",
        "city": "Warren",
        "state": "New South Wales",
        "lat": -31.7332992554,
        "lon": 147.8029937744,
        "timezone": "Australia/Sydney"
    },
    "SXE": {
        "code": "SXE",
        "name": "West Sale Airport",
        "city": "West Sale",
        "state": "Victoria",
        "lat": -38.0917015076,
        "lon": 146.964996338,
        "timezone": "Australia/Melbourne"
    },
    "WLO": {
        "code": "WLO",
        "name": "Waterloo Airport",
        "city": "Waterloo",
        "state": "Northern-Territory",
        "lat": -16.6299991608,
        "lon": 129.3200073242,
        "timezone": "Australia/Darwin"
    },
    "WIN": {
        "code": "WIN",
        "name": "Winton Airport",
        "city": "Winton",
        "state": "Queensland",
        "lat": -22.3635997772,
        "lon": 143.0859985352,
        "timezone": "Australia/Brisbane"
    },
    "WUD": {
        "code": "WUD",
        "name": "Wudinna Airport",
        "city": "Wudinna",
        "state": "South Australia",
        "lat": -33.0433006287,
        "lon": 135.4470062256,
        "timezone": "Australia/Adelaide"
    },
    "WEW": {
        "code": "WEW",
        "name": "Wee Waa Airport",
        "city": "Wee Waa",
        "state": "New South Wales",
        "lat": -30.2583007813,
        "lon": 149.4080047607,
        "timezone": "Australia/Sydney"
    },
    "WRW": {
        "code": "WRW",
        "name": "Warrawagine Airport",
        "city": "Warrawagine",
        "state": "Western Australia",
        "lat": -20.8464596515,
        "lon": 120.705327988,
        "timezone": "Australia/Perth"
    },
    "WWI": {
        "code": "WWI",
        "name": "Woodie Woodie Airport",
        "city": "Woodie Woodie",
        "state": "Western Australia",
        "lat": -21.6627998352,
        "lon": 121.2340011597,
        "timezone": "Australia/Perth"
    },
    "WWY": {
        "code": "WWY",
        "name": "West Wyalong Airport",
        "city": "West Wyalong",
        "state": "New South Wales",
        "lat": -33.9371986389,
        "lon": 147.190994263,
        "timezone": "Australia/Sydney"
    },
    "WYN": {
        "code": "WYN",
        "name": "Wyndham Airport",
        "city": "Wyndham",
        "state": "Western Australia",
        "lat": -15.5114002228,
        "lon": 128.1529998779,
        "timezone": "Australia/Perth"
    },
    "BWT": {
        "code": "BWT",
        "name": "Wynyard Airport",
        "city": "Burnie",
        "state": "Tasmania",
        "lat": -40.9989013672,
        "lon": 145.7310028076,
        "timezone": "Australia/Hobart"
    },
    "YLG": {
        "code": "YLG",
        "name": "Yalgoo Airport",
        "city": "Yalgoo",
        "state": "Western Australia",
        "lat": -28.3553009033,
        "lon": 116.683998108,
        "timezone": "Australia/Perth"
    },
    "OKR": {
        "code": "OKR",
        "name": "Yorke Island Airport",
        "city": "Yorke Island",
        "state": "Queensland",
        "lat": -9.7570295334,
        "lon": 143.4109954834,
        "timezone": "Australia/Brisbane"
    },
    "KYF": {
        "code": "KYF",
        "name": "Yeelirrie Airport",
        "city": "Yeelirrie",
        "state": "Western Australia",
        "lat": -27.2770600378,
        "lon": 120.095672607,
        "timezone": "Australia/Perth"
    },
    "XMY": {
        "code": "XMY",
        "name": "Yam Island Airport",
        "city": "Yam Island",
        "state": "Queensland",
        "lat": -9.9011096954,
        "lon": 142.7760009766,
        "timezone": "Australia/Brisbane"
    },
    "YUE": {
        "code": "YUE",
        "name": "Yuendumu Airport",
        "city": "Yuendumu",
        "state": "Northern-Territory",
        "lat": -22.2541999817,
        "lon": 131.7819976807,
        "timezone": "Australia/Darwin"
    },
    "NGA": {
        "code": "NGA",
        "name": "Young Airport",
        "city": "Young",
        "state": "New South Wales",
        "lat": -34.2555999756,
        "lon": 148.2480010986,
        "timezone": "Australia/Sydney"
    },
    "ORR": {
        "code": "ORR",
        "name": "Yorketown Airport",
        "city": "Yorketown",
        "state": "South Australia",
        "lat": -35,
        "lon": 137.6170043945,
        "timezone": "Australia/Adelaide"
    },
    "KYI": {
        "code": "KYI",
        "name": "Yalata Mission Airport",
        "city": "Yalata Mission",
        "state": "South Australia",
        "lat": -31.4706001282,
        "lon": 131.8249969482,
        "timezone": "Australia/Adelaide"
    },
    "PEK": {
        "code": "PEK",
        "name": "Beijing Capital International Airport",
        "city": "Beijing",
        "state": "INTL",
        "lat": 40.0801010132,
        "lon": 116.5849990845,
        "timezone": "Asia/Shanghai"
    },
    "CAN": {
        "code": "CAN",
        "name": "Guangzhou Baiyun International Airport",
        "city": "Guangzhou",
        "state": "INTL",
        "lat": 23.3924007416,
        "lon": 113.2990036011,
        "timezone": "Asia/Shanghai"
    },
    "SZX": {
        "code": "SZX",
        "name": "Shenzhen Bao'an International Airport",
        "city": "Shenzhen",
        "state": "INTL",
        "lat": 22.6392993927,
        "lon": 113.8109970093,
        "timezone": "Asia/Shanghai"
    },
    "XIY": {
        "code": "XIY",
        "name": "Xi'an Xianyang International Airport",
        "city": "Xianyang",
        "state": "INTL",
        "lat": 34.447101593,
        "lon": 108.7519989014,
        "timezone": "Asia/Shanghai"
    },
    "KMG": {
        "code": "KMG",
        "name": "Kunming Wujiaba International Airport",
        "city": "Kunming",
        "state": "INTL",
        "lat": 24.9923992157,
        "lon": 102.7440032959,
        "timezone": "Asia/Shanghai"
    },
    "HGH": {
        "code": "HGH",
        "name": "Hangzhou Xiaoshan International Airport",
        "city": "Hangzhou",
        "state": "INTL",
        "lat": 30.2294998169,
        "lon": 120.4339981079,
        "timezone": "Asia/Shanghai"
    },
    "PVG": {
        "code": "PVG",
        "name": "Shanghai Pudong International Airport",
        "city": "Shanghai",
        "state": "INTL",
        "lat": 31.1434001923,
        "lon": 121.8050003052,
        "timezone": "Asia/Shanghai"
    },
    "SHA": {
        "code": "SHA",
        "name": "Shanghai Hongqiao International Airport",
        "city": "Shanghai",
        "state": "INTL",
        "lat": 31.1979007721,
        "lon": 121.3359985352,
        "timezone": "Asia/Shanghai"
    },
    "CTU": {
        "code": "CTU",
        "name": "Chengdu Shuangliu International Airport",
        "city": "Chengdu",
        "state": "INTL",
        "lat": 30.5785007477,
        "lon": 103.9469985962,
        "timezone": "Asia/Shanghai"
    },
    "QBA": {
        "code": "QBA",
        "name": "Archerfield Airport",
        "city": "Brisbane",
        "state": "Queensland",
        "lat": -27.5703,
        "lon": 153.0080,
        "timezone": "Australia/Brisbane"
    },
    "QBP": {
        "code": "QBP",
        "name": "Parafield Airport",
        "city": "Adelaide",
        "state": "South Australia",
        "lat": -34.7933,
        "lon": 138.6333,
        "timezone": "Australia/Adelaide"
    },
    "QBR": {
        "code": "QBR",
        "name": "Redcliffe Airport",
        "city": "Redcliffe",
        "state": "Queensland",
        "lat": -27.2039,
        "lon": 153.0681,
        "timezone": "Australia/Brisbane"
    },
    "QBX": {
        "code": "QBX",
        "name": "Aldinga Airport",
        "city": "Aldinga",
        "state": "South Australia",
        "lat": -35.2958,
        "lon": 138.4917,
        "timezone": "Australia/Adelaide"
    },
    "PXH": {
        "code": "PXH",
        "name": "Prominent Hill Airport",
        "city": "Prominent Hill",
        "state": "South Australia",
        "lat": -29.7167,
        "lon": 135.5333,
        "timezone": "Australia/Adelaide"
    },
    "QLC": {
        "code": "QLC",
        "name": "William Creek Airport",
        "city": "William Creek",
        "state": "South Australia",
        "lat": -29.0433,
        "lon": 136.3383,
        "timezone": "Australia/Adelaide"
    },
    "XCH": {
        "code": "XCH",
        "name": "Christmas Island Airport",
        "city": "Christmas Island",
        "state": "WA",
        "lat": -10.4506,
        "lon": 105.6903,
        "timezone": "Indian/Christmas"
    },
    "JNB": {
        "code": "JNB",
        "name": "O. R. Tambo International Airport",
        "city": "Johannesburg",
        "state": "INTL",
        "lat": -26.1392,
        "lon": 28.246,
        "timezone": "Africa/Johannesburg"
    },
    "KOE": {
        "code": "KOE",
        "name": "El Tari Airport",
        "city": "Kupang",
        "state": "INTL",
        "lat": -10.1717,
        "lon": 123.6703,
        "timezone": "Asia/Makassar"
    },
    "BLR": {
        "code": "BLR",
        "name": "Kempegowda International Airport",
        "city": "Bengaluru",
        "state": "INTL",
        "lat": 13.1979,
        "lon": 77.7063,
        "timezone": "Asia/Kolkata"
    },
    "WUH": {
        "code": "WUH",
        "name": "Wuhan Tianhe International Airport",
        "city": "Wuhan",
        "state": "INTL",
        "lat": 30.7838,
        "lon": 114.2081,
        "timezone": "Asia/Shanghai"
    },
    "INU": {
        "code": "INU",
        "name": "Nauru International Airport",
        "city": "Nauru",
        "state": "INTL",
        "lat": -0.5472,
        "lon": 166.9189,
        "timezone": "Pacific/Nauru"
    },
    "ROR": {
        "code": "ROR",
        "name": "Roman Tmetuchl International Airport",
        "city": "Koror",
        "state": "INTL",
        "lat": 7.3672,
        "lon": 134.5442,
        "timezone": "Pacific/Palau"
    },
    "CMB": {
        "code": "CMB",
        "name": "Bandaranaike International Airport",
        "city": "Colombo",
        "state": "INTL",
        "lat": 7.1808,
        "lon": 79.8839,
        "timezone": "Asia/Colombo"
    },
    "TFU": {
        "code": "TFU",
        "name": "Chengdu Tianfu International Airport",
        "city": "Chengdu",
        "state": "INTL",
        "lat": 30.3128,
        "lon": 104.4442,
        "timezone": "Asia/Shanghai"
    },
    "HAK": {
        "code": "HAK",
        "name": "Haikou Meilan International Airport",
        "city": "Haikou",
        "state": "INTL",
        "lat": 19.9348,
        "lon": 110.4590,
        "timezone": "Asia/Shanghai"
    },
    "XMN": {
        "code": "XMN",
        "name": "Xiamen Gaoqi International Airport",
        "city": "Xiamen",
        "state": "INTL",
        "lat": 24.5440,
        "lon": 118.1278,
        "timezone": "Asia/Shanghai"
    },
    "HAN": {
        "code": "HAN",
        "name": "Noi Bai International Airport",
        "city": "Hanoi",
        "state": "INTL",
        "lat": 21.2212,
        "lon": 105.8072,
        "timezone": "Asia/Bangkok"
    }
};

// Export if in Node context (e.g. testing), otherwise bind to window for browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIRPORTS;
} else {
    window.AIRPORTS = AIRPORTS;
}
