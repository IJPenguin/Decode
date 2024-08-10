# Stage 1: Build the Rust application
FROM rust:alpine AS builder

# Set the working directory
WORKDIR /workspace

# Copy the source code into the container
COPY ./src/solutions.rs .

# Compile the Rust file
RUN rustc -o solutions solutions.rs

# Stage 2: Create a minimal runtime image
FROM alpine

# Set the working directory for the runtime
WORKDIR /app

# Add a non-root user for security purposes
RUN adduser -D app_user

# Copy the compiled binary from the builder stage
COPY --from=builder --chown=app_user:app_user /workspace/solutions .

# Change to the non-root user
USER app_user

# Set the command to run the compiled binary
CMD ["./solutions"]
