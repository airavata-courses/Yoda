import json
import sys
from kafka import KafkaConsumer, KafkaProducer
import pickle
import nexradaws
import numpy as np
import matplotlib.pyplot as plt
from metpy.cbook import get_test_data
from metpy.io import Level2File
from metpy.plots import add_timestamp, ctables
from mpl_toolkits.axes_grid1 import make_axes_locatable
from PIL import Image
import glob
from base64 import b64encode
import io

from nexradapi import payload_create

conn = nexradaws.NexradAwsInterface()

consumer = KafkaConsumer("data-post", bootstrap_servers=['kafka-service:9092'], group_id="post_process")
                         
producer = KafkaProducer(bootstrap_servers=['kafka-service:9092'])

for messages in consumer:
    if messages != None:
        print(messages.topic)
        print(messages.key)
        print(pickle.loads(messages.value))
        print('\n')
        files = pickle.loads(messages.value)
        payload = payload_create(files)
        print('Procured payload')
        producer.send(topic='data-session', key=b'foo', value=json.dumps(payload).encode('utf8'))
        
    
    
