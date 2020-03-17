FROM maven:3.6.3-jdk-13

ADD . /
# WORKDIR /KafkaConsumer
RUN mvn clean install

CMD ["java","-jar","./target/session_manage.jar"]