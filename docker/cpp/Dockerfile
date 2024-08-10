# Use a single-stage build for development purposes
FROM alpine:latest

# Install the required build tools
RUN apk add --no-cache g++ make

# Set the working directory
WORKDIR /app

# Add a non-root user for security purposes
RUN adduser -D app_user

# Compile as root and then switch to non-root user to execute
CMD ["sh", "-c", "g++ -o /app/solutions /app/solutions.cpp && chown app_user:app_user /app/solutions && su app_user -c '/app/solutions'"]
