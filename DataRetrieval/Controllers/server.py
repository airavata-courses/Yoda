from flask import Flask, render_template, request, url_for, redirect, flash, jsonify
import datetime
from geopy.geocoders import Nominatim
import nexradaws
import urllib.request
import json
import sys
from kafka.admin import KafkaAdminClient, NewTopic
from kafka import KafkaClient
from kafka import KafkaProducer
import pickle

conn = nexradaws.NexradAwsInterface()
client = KafkaClient(hosts=['localhost:9092'])
serve = client.topic_partitions

app = Flask(__name__)
created_topics = ['data-model', 'data-post', 'data-session']
server_topics = list(serve.keys())

topics = []
topics.append(NewTopic(name="data-model", num_partitions=1, replication_factor=1))
topics.append(NewTopic(name="data-post", num_partitions=1, replication_factor=1))
topics.append(NewTopic(name="data-session", num_partitions=1, replication_factor=1))
admin = KafkaAdminClient(bootstrap_servers=['localhost:9092'], client_id='test')
producer = KafkaProducer(bootstrap_servers=['localhost:9092'], api_version=(0, 10))

# Check if topics already exist in kafka
flag = 0
val = True
for t in created_topics:
    flag = 0
    for a in server_topics:
        if t == a:
            flag = 1
            break
    if flag == 0:
        val = False
    

@app.route('/')
def test():
    try:
        if request.method == 'GET':
            if not val: 
                admin.create_topics(new_topics=topics, validate_only=False)
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
            payload = {}
            payload['availData'] = availData[0]
            pickleData = pickle.dumps(payload)
            producer.send('data-model', key=b'foo', value=pickleData)
            return 'hi'

    except Exception as e:
        return jsonify(e), 500

if __name__ == "__main__":
    app.secret_key = 'secret'
    app.run(host='0.0.0.0', port=3500, debug=True)