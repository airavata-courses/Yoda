kubectl appply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/zookeeper.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-deploy.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-service.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/GatewayServerAPI/GatewayServer/kubernetes_dev.yml
kubectl set image deployment/gatewayserver   gatewayserver=teamyoda/gatewayserver:"$1"
kubectl autoscale deployment/gatewayserver  --cpu-percent=50 --min=1 --max=10