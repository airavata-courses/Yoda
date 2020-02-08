from flask import Flask, render_template, request, url_for, redirect, flash, jsonify
import datetime
from geopy.geocoders import Nominatim
import urllib.request
import json

app = Flask(__name__)

# Geolocator initalized with app name, to find the lat and long for each city.
geolocator = Nominatim(user_agent='WeatherDashboard')

# Base url of API for fetching all real time weather details.
url = "https://api.weather.gov/points/"

'''
    Function to convert bytes to json type.
'''
def bytesToJSON(data):
    my_json = data.decode('utf8').replace("'", '"')
    new_d = json.loads(my_json)
    return json.dumps(new_d)

'''
    Function to fetch the forecast details from API.
'''
# @app.route('/forecast/<data>', methods=['GET'])
def forecast(forecastURL):
    data = urllib.request.urlopen(forecastURL).read()
    json_data = bytesToJSON(data)
    return json_data

'''
    Function to generate the payload for user consumption.
'''
def create_payload(data):
    json_data = bytesToJSON(data)
    payload = {}
    payload['forecast'] = forecast(json_data.properties.forecast)
    return jsonify(payload)

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



