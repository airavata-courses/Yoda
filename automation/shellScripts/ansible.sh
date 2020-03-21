source ../automate/bin/activate
source ../openrc.sh
pip install --user ansible
pip install --user paramiko
ansible-playbook -i ../kubernetes/hosts ../kubernetes/initial.yml
ansible-playbook -i ../kubernetes/hosts ../kubernetes/kube-dependencies.yml
ansible-playbook -i ../kubernetes/hosts ../kubernetes/master.yml
ansible-playbook -i ../kubernetes/hosts ../kubernetes/workers.yml
