# Stage 1: Build the C application
FROM alpine:latest AS builder

# Install the required build tools and libraries
RUN apk add --no-cache gcc make musl-dev

# Set the working directory
WORKDIR /workspace

# Copy the source code into the container
COPY ./src/solutions.c .

# Compile the C file
RUN gcc -o solutions solutions.c

# Stage 2: Create a minimal runtime image
FROM alpine:latest

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
