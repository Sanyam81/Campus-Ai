from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

locations = {

    "main gate": {
        "time": "0 minutes",
        "route": "You are at the Main Gate.",
        "description": "Welcome to IIT Jammu.",
        "lat": 32.8034781,
        "lng": 74.8961987,
        "image": "main_gate.jpg"
    },
    
    "canary hostel": {
        "time": "1 minute",
        "route": "From the Main Gate go left about 50 metres.",
        "description": "Boys Hostel.",
        "lat": 32.8017511,
        "lng": 74.8944965,
        "image": "canary_Hostel.jpg"
    },

    "electric stand": {
    "time": "2 minutes",
    "route": "From the Main Gate go left about 50 metres. The Electric Stand is on the right.",
    "description": "Electric Stand of IIT Jammu.",
    "lat": 32.8019542,
    "lng": 74.8964468,
    "image": "electric_stand.jpg"
    },

    "staff and faculty house": {
        "time": "3 minute",
        "route": "From the main Gate go left about 50 metres wait for Electric "
        "or continue more about 50 metres.",
        "description": "staff and faculty house",
        "lat": 32.8015316,
        "lng": 74.8961311,
        "image": "staff_faculty_house.jpg"
    },

    "sports complex": {
            "time": "4 minutes",
            "route": "Walk towards .",
            "description": "Sports Complex of IIT Jammu.",
            "lat": 32.801400,
            "lng": 74.893900,
            "image": "sports.jpg"
    },

    "pushkar": {
        "time": "3 minutes",
        "route": "Take left from the Main Gate for about 50 metres to get a Electric"
        "or continue a walk for 500 metres(Take a left from Main Gate and Walk straigh about 150 metres till you reach Faculty House take a right from there and go straight for 300 metre).",
        "description": "Engineering Block Pushkar. Most classes and laboratories are here.",
        "lat": 32.800744,
        "lng": 74.8913876,
        "image": "pushkar.jpg"
    },

    "Chinar sports complex": {
       "time": "4 minutes",
       "route": "Walk towards Egret Hostel.",
       "description": "Sports Complex of IIT Jammu.",
       "lat": 32.8002392,
       "lng": 74.8846624,
       "image": "sports.jpg"
    },
    
    "mansar": {
        "time": "4 minutes",
        "route": "Take left from the Main Gate for about 50 metres to get a Electric"
        "or continue a walk for 550 metres(Take a left from Main Gate and Walk straigh about 150 metres till you reach Faculty House take a right from there and go straight for 350 metre).",
        "description": "Mansar Academic Block.",
        "lat": 32.8014702,
        "lng": 74.8890497,
        "image": "mansar.jpg"
    },

    "library": {
        "time": "4 minutes",
        "route": "Go to Mansar Block and take the lift to the second floor.",
        "description": "Central Library inside Mansar Block.",
        "lat": 32.8014702,
        "lng": 74.8890497,
        "image": "library.jpg"
    },

    "auditorium": {
        "time": "5 minutes",
        "route": "Go to the third floor of Mansar Block.",
        "description": "Main Auditorium inside Mansar Block.",
        "lat": 32.8014702,
        "lng": 74.8890497,
        "image": "auditorium.jpg"
    },

    "canteen": {
        "time": "5 minutes",
        "route": "Go to the third floor of Mansar Block.",
        "description": "Campus Canteen inside Mansar.",
        "lat": 32.8014702,
        "lng": 74.8890497,
        "image": "canteen.jpg"
    },

    "fulgar": {
        "time": "7 minutes",
        "route": "Go straight about 50 metre from Mansar,cross the bridge,fulgar is on ypur left .",
        "description": "Fulgar Boys Hostel.",
        "lat": 32.803300,
        "lng": 74.8856833,
        "image": "fulgar.jpg"
    },

    "annapurna": {
        "time": "7 minutes",
        "route": "Go straight about 50 metre from Mansar,cross the bridge,annapurna is on your right.",
        "description": "Boys Mess.",
        "lat": 32.8032242,
        "lng": 74.8856833,
        "image": "annapurna.jpg"
    }

}
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/navigate", methods=["POST"])
def navigate():
    data = request.get_json()
    destination = data["destination"].lower()

    if destination in locations:
        return jsonify(locations[destination])

    return jsonify({
        "time": "",
        "route": "",
        "description": "Location not found.",
        "lat": 32.801531,
        "lng": 74.891824,
        "image": ""
    })

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT",5000))
    app.run(host="0.0.0.0",port=port)

