# /docker/java/Dockerfile
FROM openjdk:21-jdk-slim

WORKDIR /usr/src/app

COPY . .

RUN javac solutions.java

CMD ["java", "submitted_code"]

