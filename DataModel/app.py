import json
import sys
from kafka import KafkaConsumer, KafkaProducer
import pickle
import nexradaws

conn = nexradaws.NexradAwsInterface()

# from Controllers.utils import download_data

# consumer = KafkaConsumer("data-model", auto_offset_reset='earliest', group_id='kafkagroupid', enable_auto_commit=True,
# 						 bootstrap_servers=['localhost:9092'], api_version=(0, 10))
                         
consumer = KafkaConsumer('data-model', bootstrap_servers=['kafka-service:9092'])
producer = KafkaProducer(bootstrap_servers=['kafka-service:9092'])
print("Connected kafka consumer")

for messages in consumer:
    print("Inside the kafka consumer for data model")
    print("Message topic:", messages.topic)
    print("Message key:", messages.key)
    print("Message payload:", pickle.loads(messages.value))
    values = pickle.loads(messages.value)
    availData = conn.get_avail_scans(values['year'], values['month'], values['day'], values['radar'])
    values['availData'] = availData[0]

    print('\n')
    files = pickle.dumps(values)
    # downloaded_data = conn.download(files, '/data')
    producer.send('data-post', key=b'foo', value=files)
    
