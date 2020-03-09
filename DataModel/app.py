import json
import sys
from kafka import KafkaConsumer, KafkaProducer
import pickle
import nexradaws

conn = nexradaws.NexradAwsInterface()

# from Controllers.utils import download_data

# consumer = KafkaConsumer("data-model", auto_offset_reset='earliest', group_id='kafkagroupid', enable_auto_commit=True,
# 						 bootstrap_servers=['localhost:9092'], api_version=(0, 10))
                         
consumer = KafkaConsumer('data-model', bootstrap_servers=['kafka:9092'])
producer = KafkaProducer(bootstrap_servers=['kafka:9092'])

for messages in consumer:
    print(messages.topic)
    print(messages.key)
    print(pickle.loads(messages.value))
    print('\n')
    files = messages.value
    # downloaded_data = conn.download(files, '/data')
    producer.send('data-post', key=b'foo', value=files)
    
