kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/zookeeper.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-deploy.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-service.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/RealTimeAPI/RealTime/kubernetes_dev.yml
kubectl set image deployment/"$1"   "$1"=teamyoda/"$1":"$2"