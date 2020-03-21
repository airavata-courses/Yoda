source ../automate/bin/activate
pip install python-openstackclient
source ../openrc.sh

echo enter security group name
read secG

echo enter ssh filename
read sshU

echo enter network name
read netid

echo enter master name
read master
openstack server create $master --flavor m1.quad --image JS-API-Featured-Ubuntu18-Feb-14-2020 --key-name $sshU --security-group $secG --nic net-id=$netid 
ipvar1=$(bash ./ip.sh |  grep -m 1 -E -o "([0-9]{1,3}[\.]){3}[0-9]{1,3}")
openstack server add floating ip $master $ipvar1

echo enter worker1 name
read worker1
openstack server create $worker1 --flavor m1.quad --image JS-API-Featured-Ubuntu18-Feb-14-2020 --key-name $sshU --security-group $secG --nic net-id=$netid 
ipvar2=$(bash ./ip.sh |  grep -m 1 -E -o "([0-9]{1,3}[\.]){3}[0-9]{1,3}")
openstack server add floating ip $worker1 $ipvar2

echo enter worker2 name
read worker2
openstack server create $worker2 --flavor m1.quad --image JS-API-Featured-Ubuntu18-Feb-14-2020 --key-name $sshU --security-group $secG --nic net-id=$netid 
ipvar3=$(bash ./ip.sh |  grep -m 1 -E -o "([0-9]{1,3}[\.]){3}[0-9]{1,3}")
openstack server add floating ip $worker2 $ipvar3

echo master1 ip is $ipvar1
echo worker1 ip is $ipvar2
echo worker2 ip is $ipvar3
