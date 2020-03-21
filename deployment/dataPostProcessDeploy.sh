kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/zookeeper.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-deploy.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/Kafka/Kafka/kafka-service.yml
kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/DataPostProcessorAPI/DataPostProcess/kubernetes_dev.yml
kubectl set image deployment/data-post-process-dev   data-post-process-dev=teamyoda/datapostprocess:"$1"
kubectl autoscale deployment/data-post-process-dev  --cpu-percent=50 --min=1 --max=10




