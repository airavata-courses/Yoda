kubectl apply -f https://raw.githubusercontent.com/airavata-courses/Yoda/UserInterface/ui/kubernetes_dev.yml
kubectl set image deployment/"$1"   "$1"=teamyoda/"$1":"$2"









