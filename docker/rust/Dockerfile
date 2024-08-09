# Use the official Rust image
FROM rust:1.71.0-slim

# Set the working directory
WORKDIR /usr/src/app

COPY . .

# Compile the Rust code 
RUN rustc -o solutions solutions.rs

# Command to run the compiled Rust program
CMD ["./solutions"]
