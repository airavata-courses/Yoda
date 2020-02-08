from flask import Flask, render_template, request, url_for, redirect, flash, jsonify
import datetime
from geopy.geocoders import Nominatim
import urllib.request
import json
import sys

sys.path.append('../')

from Utils.utils import create_payload

app = Flask(__name__)

# Geolocator initalized with app name, to find the lat and long for each city.
geolocator = Nominatim(user_agent='WeatherDashboard')

# Base url of API for fetching all real time weather details.
url = "https://api.weather.gov/points/"

'''
    Route to get the weather forecast from the city name given by the user.
'''
@app.route('/realtime/<string:city>/<string:state>', methods=['GET'])
def realTime(city, state):
    try:
        if request.method == 'GET':
            city = city
            state = state
            search_query = city + " " +state
            location = geolocator.geocode(search_query)
            lat = location.latitude
            lon = location.longitude
            new_url = url + str(lat) + "," + str(lon)
            data = urllib.request.urlopen(new_url).read()
            payload = create_payload(data)
            return jsonify(payload)

    except Exception as e:
        return jsonify(e), 500

# Starting the server in port 3400.
if __name__ == "__main__":
    app.secret_key = 'secret'
    app.debug = True
    app.run(host='0.0.0.0', port=3400)



