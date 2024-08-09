# Use a lightweight C image with GCC compiler
FROM gcc:13.1.0-alpine3.18

WORKDIR /usr/src/app

COPY . .

RUN gcc -o solutions solutions.c

# Command to run the compiled C program
CMD ["./solutions"]
