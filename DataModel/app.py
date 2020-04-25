import json
import sys
from kafka import KafkaConsumer, KafkaProducer
import pickle
import nexradaws

try:
    conn = nexradaws.NexradAwsInterface()
    consumer = KafkaConsumer('data-model', bootstrap_servers=['kafka-service:9092'], group_id="datamodel")
    producer = KafkaProducer(bootstrap_servers=['kafka-service:9092'])
    print("Connection established with NEXRAD and Kafka")
except Exception as e:
    print("Failed to connect with Nexrad API or Kafka Broker ---- exiting microservice with error -> ", str(e))
    sys.exit()



def on_success(metadata):
    print("Kafka Producer ->", metadata.topic, " : success")

def on_error(err):
    log.error('Producer error', exc_info=err)

def model_exec():
    for messages in consumer:
        print("Inside the kafka consumer for data model")
        print("Message topic:", messages.topic)
        print("Message key:", messages.key)
        print("Message payload:", pickle.loads(messages.value))
        print('\n')
        values = pickle.loads(messages.value)
        try:
            availData = conn.get_avail_scans(values['year'], values['month'], values['day'], values['radar'])
            values['availData'] = availData[0]
            files = pickle.dumps(values)
            producer.send('data-post', key=b'foo', value=files).add_callback(on_success).add_errback(on_error)
        except Exception as e:
            print("error was thrown", str(e))

if __name__ == "__main__":
    model_exec()    
