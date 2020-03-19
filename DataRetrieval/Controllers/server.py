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
import uuid
import os

conn = nexradaws.NexradAwsInterface()
# client = KafkaClient(hosts=['localhost:9092'])
# serve = client.topic_partitions

app = Flask(__name__)
# created_topics = ['data-model', 'data-post', 'data-session']
# server_topics = list(serve.keys())

topics = []
topics.append(NewTopic(name="data-model", num_partitions=1, replication_factor=1))
topics.append(NewTopic(name="data-post", num_partitions=1, replication_factor=1))
topics.append(NewTopic(name="data-session", num_partitions=1, replication_factor=1))
# admin = KafkaAdminClient(bootstrap_servers=['localhost:9092'])
# producer = KafkaProducer(security_protocol='PLAINTEXT', bootstrap_servers=os.environ.get('KAFKA_HOST', 'localhost:9092'))
producer = KafkaProducer(bootstrap_servers=['kafka-service:9092'])

# Check if topics already exist in kafka
    
def test():
    try:
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
        if not val:
            admin.delete_topics(topics=topics)
            admin.create_topics(new_topics=topics, validate_only=False)
            print("Topics have been created in kafka")
        # return jsonify('Server Running succesfully on port 3500'), 200
    except Exception as e:
        print(e)

'''
    Route to start the data processing pipeline.
    To retrieve data from NEXRAD.
'''
@app.route('/dataretrieval/<string:radar>/<int:day>/<int:month>/<int:year>/<string:user_id>', methods=['GET', 'POST'])
async def dataRetrieve(radar, day, month, year, user_id):
    # test()
    try:
        if request.method == 'GET':
            # print(int(session_id))
            print("Inside the data retrieval stub")
            print("Trying to get the avaiable scans from nexrad")
            availData = await conn.get_avail_scans(year, month, day, radar)
            print("Available scans are:", availData)
            session_id = str(uuid.uuid4())
            
            print("session_id:", session_id)
            payload = {}
            payload['availData'] = availData[0]
            payload['session_id'] = session_id
            payload['radar'] = radar
            payload['day'] = day
            payload['month'] = month
            payload['year'] = year
            payload['user_id'] = user_id
            pickleData = pickle.dumps(payload)
            print("Passed payload through kafka",payload)
            producer.send('data-model', key=b'foo', value=pickleData)
            response = {}
            response['sessionId'] = session_id
            print("sent message through kafka, returning session id")
            return jsonify(response)

    except Exception as e:
        return jsonify(e), 500

if __name__ == "__main__":
    app.secret_key = 'secret'
    # test()
    app.run(host='0.0.0.0', port=3300, debug=True)