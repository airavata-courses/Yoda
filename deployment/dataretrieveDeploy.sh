kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/zookeeper.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-deploy.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-service.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/DataRetrivalAPI/DataRetrieval/kubernetes_dev.yml
kubectl set image deployment/data-retrieval-dev   data-retrieval-dev=teamyoda/dataretrieval:"$1"
kubectl autoscale deployment/data-retrieval-dev  --cpu-percent=50 --min=1 --max=10