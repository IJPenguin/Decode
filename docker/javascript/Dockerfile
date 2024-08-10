# Use the official Node.js image as the base image
FROM node:alpine AS builder

# Set the working directory
WORKDIR /workspace

# Copy the JavaScript file into the container
COPY ./src/solutions.js .

# Stage 2: Create a minimal runtime image
FROM node:alpine

# Set the working directory for the runtime
WORKDIR /app

# Add a non-root user for security purposes
RUN adduser -D app_user

# Copy the JavaScript file from the builder stage
COPY --from=builder --chown=app_user:app_user /workspace/solutions.js .

# Change to the non-root user
USER app_user

# Command to run the JavaScript file with Node.js
CMD ["node", "solutions.js"]
