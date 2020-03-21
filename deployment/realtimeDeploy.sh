kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/zookeeper.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-deploy.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-service.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/RealTimeAPI/RealTime/kubernetes_dev.yml
kubectl set image deployment/realtime-dev   realtime-dev=teamyoda/realtime:"$1"
kubectl autoscale deployment/realtime-dev  --cpu-percent=50 --min=1 --max=10