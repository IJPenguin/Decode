# Use a single-stage build for development purposes
FROM alpine:latest

# Install the required build tools
RUN apk add --no-cache gcc make musl-dev

# Set the working directory
WORKDIR /app

# Add a non-root user for security purposes
RUN adduser -D app_user

# Compile as root and then switch to non-root user to execute
CMD ["sh", "-c", "gcc -o /app/solutions /app/solutions.c && chown app_user:app_user /app/solutions && su app_user -c '/app/solutions'"]
