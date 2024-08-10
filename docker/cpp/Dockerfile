# Stage 1: Build the C++ application
FROM alpine:latest AS builder

# Install the required build tools
RUN apk add --no-cache g++ make

# Set the working directory
WORKDIR /workspace

# Copy the source code into the container
COPY ./src/solutions.cpp .

# Compile the C++ file
RUN g++ -o solutions solutions.cpp

# Stage 2: Create a minimal runtime image
FROM alpine:latest

# Install the necessary runtime libraries
RUN apk add --no-cache libstdc++

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
