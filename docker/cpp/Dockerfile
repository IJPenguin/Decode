# /docker/cpp/Dockerfile
FROM esolang/cpp-clang:latest

WORKDIR /usr/src/app

COPY . .

RUN g++ solutions.cpp -o code.out

CMD ["./code.out"]
