# FROM openjdk:8

# ADD target/session_manage.jar session_manage.jar
# EXPOSE 3400
# CMD ["java","-jar","/session_manage.jar"]

FROM maven:3.6.3-jdk-13

ADD . /
# WORKDIR /KafkaConsumer
RUN mvn clean install

CMD ["java","-jar","./target/session_manage.jar"]