import datetime
from geopy.geocoders import Nominatim
import urllib.request
import json

'''
    Function to convert bytes to json type.
'''
def bytesToJSON(data):
    my_json = data.decode('utf8').replace("'", '"')
    return json.loads(my_json)

'''
    Function to convert python dictionary to usable JSON
'''
def dictToJSON(data):
    return json.loads(json.dumps(data))

'''
    Function to fetch the forecast details from API.
'''
def forecast(forecastURL):
    data = urllib.request.urlopen(forecastURL).read()
    json_data = bytesToJSON(data)
    return json_data

'''
    Function to generate the payload for user consumption.
'''
def create_payload(data):
    json_data = bytesToJSON(data)
    payload = { }
    payload['forecast'] = forecast(json_data['properties']['forecast'])
    payload['data'] = {}
    
    datetim = datetime.datetime.now()
    periods = payload['forecast']['properties']['periods']
    for period in periods:
        hour = int(period['startTime'].split('T')[1].split(':')[0])
        nowHour = datetim.hour
        if hour == nowHour:
            payload['data']['forecast'] = period
    return dictToJSON(payload)