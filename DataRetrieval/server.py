from flask import Flask, render_template, request, url_for, redirect, flash, jsonify
import nexradaws
import datetime
from geopy.geocoders import Nominatim
import urllib.request
import json
from ast import literal_eval

conn = nexradaws.NexradAwsInterface()

app = Flask(__name__)

@app.route('/')
def homePage():
    date = datetime.datetime.now()
    day = date.day
    month = date.month
    year = date.year

    geolocator = Nominatim(user_agent='WeatherDashboard')
    location = geolocator.geocode("Fort Wayne")
    print(location)
    lat = location.latitude
    lon = location.longitude
    url = "https://api.weather.gov/points/"
    url = url + str(lat) + "," + str(lon)
    data = urllib.request.urlopen(url).read()
    
    jsonData = json.loads(data)
    # jsonData = json.dumps(jsonData)
    print(type(jsonData))
    radar = jsonData['properties']['radarStation']

    radarData = conn.get_avail_scans(year, month, day, radar)
    print(radarData)

    downloads = conn.download(radarData[0], './data')
    [print("{} volume scan time {}".format(scan.radar_id,scan.scan_time)) for scan in downloads.iter_success()]

    return jsonData


if __name__ == "__main__":
    app.secret_key = 'secret'
    app.debug = True
    app.run(host='0.0.0.0', port=3200)



