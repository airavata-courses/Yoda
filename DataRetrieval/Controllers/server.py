from flask import Flask, render_template, request, url_for, redirect, flash, jsonify
import datetime
from geopy.geocoders import Nominatim
import nexradaws
import urllib.request
import json
import sys

conn = nexradaws.NexradAwsInterface()

app = Flask(__name__)

@app.route('/')
def test():
    try:
        if request.method == 'GET':
            return jsonify('Server Running succesfully on port 3500'), 200
    except Exception as e:
        return jsonify(e), 500

'''
    Route to start the data processing pipeline.
    To retrieve data from NEXRAD.
'''
@app.route('/dataretrieval/<string:radar>/<int:day>/<int:month>/<int:year>', methods=['GET'])
def dataRetrieve(radar, day, month, year):
    try:
        if request.method == 'GET':
            availData = conn.get_avail_scans(year, month, day, radar)
            print(availData)
            payload = {}
            payload['availData'] = availData
            return json.dumps(json.loads(payload))
            
    except Exception as e:
        return jsonify(e), 500

if __name__ == "__main__":
    app.secret_key = 'secret'
    app.run(host='0.0.0.0', port=3500, debug=True)