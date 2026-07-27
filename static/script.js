// ===========================
// IIT Jammu Interactive Map
// ===========================

var map = L.map('map').setView([32.8014702, 74.8890497], 17);

var normal = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; OpenStreetMap'
    }
);

var satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
        attribution: '&copy; Esri'
    }
);

satellite.addTo(map);

L.control.layers(
    {
        "Street Map": normal,
        "Satellite": satellite
    }
).addTo(map);

// Main Gate Marker
L.marker([32.8034781, 74.8961987])
    .addTo(map)
    .bindTooltip("📍 You are here", {
        permanent: true,
        direction: "top",
        offset: [0, -15]
    })
    .openTooltip();
var destinationMarker = L.marker([32.8014702, 74.8890497]).addTo(map);
var routeControl = null;
var waypointMarkers = [];
const campusRoutes = {

    "pushkar": [
        [32.8034781, 74.8961987], // Main Gate
        [32.8009962, 74.8956154], // Staff & Faculty House
        [32.800744, 74.8913876]   // Pushkar
    ],

    "mansar": [
        [32.8034781, 74.8961987], // Main Gate
        [32.8009962, 74.8956154], // Staff & Faculty House
        [32.800744, 74.8913876],  // Pushkar
        [32.8014702, 74.8890497]  // Mansar
    ],

    "fulgar": [
        [32.8034781, 74.8961987], // Main Gate
        [32.8009962, 74.8956154], // Staff & Faculty House
        [32.800744, 74.8913876],  // Pushkar
        [32.8014702, 74.8890497], // Mansar
        [32.803300, 74.8856833]   // Fulgar
    ]

};
// ===========================
// Find Route Function
// ===========================

function findRoute() {

    const destination = document.getElementById("destination").value;

    fetch("/navigate", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            destination: destination
        })

    })

    .then(response => response.json())

    .then(data => {

    const placeImage = document.getElementById("placeImage");

    if (data.image) {
        placeImage.src = "/static/image/" + data.image;
        placeImage.style.display = "block";
    } else {
        placeImage.style.display = "none";
    }

    console.log(data);


        document.getElementById("result").innerHTML =
            "<h3>" + destination + "</h3>" +
            "<p><b>Time:</b> " + data.time + "</p>" +
            "<p><b>Route:</b> " + data.route + "</p>" +
            "<p>" + data.description + "</p>";
            console.log(data);
            destinationMarker.setLatLng([data.lat, data.lng]);
map.setView([data.lat, data.lng], 18);
destinationMarker.bindPopup(destination).openPopup();

if (routeControl) {
    map.removeControl(routeControl);
}

waypointMarkers.forEach(marker => map.removeLayer(marker));
waypointMarkers = [];

routeControl = L.Routing.control({
waypoints: (campusRoutes[destination.toLowerCase()] || [
    [32.8034781, 74.8961987],
    [data.lat, data.lng]
]).map(point => L.latLng(point[0], point[1])),    
    lineOptions: {
        styles: [
            { color: 'blue', opacity: 0.8, weight: 6 }
        ]
    },
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    show: false
}).addTo(map);
const routePoints = campusRoutes[destination.toLowerCase()];

if (routePoints) {
    const names = {
        "pushkar": ["📍 You are here", "📍 Staff & Faculty House", "📍 Pushkar"],
        "mansar": ["📍 You are here", "📍 Staff & Faculty House", "📍 Pushkar", "📍 Mansar"],
        "fulgar": ["📍 You are here", "📍 Staff & Faculty House", "📍 Pushkar", "📍 Mansar", "📍 Fulgar"]
    };

    routePoints.forEach((point, index) => {
        const marker = L.marker(point)
            .addTo(map)
        .bindTooltip(names[destination.toLowerCase()][index], {
    permanent: true,
    direction: "top",
    offset: [0, -15]
})
.openTooltip();   

        waypointMarkers.push(marker);
    });
}
        // Speak the directions
        const speech = new SpeechSynthesisUtterance(
            "Route to " +
            destination +
            ". " +
            data.route +
            ". " +
            data.description
        );

        speechSynthesis.cancel();
speech.lang = "en-US";
speech.rate = 1;
speech.pitch = 1;
speech.volume = 1;
speechSynthesis.speak(speech);

    })

    .catch(error => {

        console.log(error);

    });

}



// ===========================
// Voice Recognition
// ===========================

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert("Speech Recognition is not supported.");

        return;

    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.onstart = function () {

        alert("Listening...");

    };

    recognition.onresult = function (event) {

        const text = event.results[0][0].transcript;

        document.getElementById("destination").value = text;

        findRoute();

    };

    recognition.onerror = function (event) {

        alert(event.error);

    };

    recognition.start();

}