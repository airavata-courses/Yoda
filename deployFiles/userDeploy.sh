kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/zookeeper.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-deploy.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-service.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/UserAPI/User/kubernetes_dev.yml
kubectl set image deployment/user   user=teamyoda/userapi:"$1"
kubectl autoscale deployment/user  --cpu-percent=50 --min=1 --max=10