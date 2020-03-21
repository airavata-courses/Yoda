kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/UserInterface/ui/kubernetes_dev.yml
kubectl set image deployment/frontend-dev   frontend-dev=teamyoda/userinterface:"$1"
kubectl autoscale deployment/frontend-dev  --cpu-percent=50 --min=1 --max=10









