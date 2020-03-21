kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/zookeeper.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-deploy.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-service.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/DataModelAPI/DataModel/kubernetes_dev.yml
kubectl set image deployment/data-model-dev   data-model-dev=teamyoda/datamodel:"$1"
kubectl autoscale deployment/data-model-dev  --cpu-percent=50 --min=1 --max=10