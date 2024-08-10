# Use the official Node.js image as the base image
FROM node:alpine

# Set the working directory for the runtime
WORKDIR /app

# Add a non-root user for security purposes
RUN adduser -D app_user

# Change to the non-root user
USER app_user

# Command to run the JavaScript file with Node.js
CMD ["sh", "-c", "node solutions.js"]
