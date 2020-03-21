kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/zookeeper.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-deploy.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-service.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/SessionManagement/Session/kubernetes_dev.yml
kubectl set image deployment/session-dev   session-dev=teamyoda/sessionmanagement:"$1"
kubectl autoscale deployment/session-dev  --cpu-percent=50 --min=1 --max=10