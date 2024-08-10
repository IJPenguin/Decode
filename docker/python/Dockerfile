# Base image
FROM python:3.11.7-alpine3.18

# Set the working directory
WORKDIR /app

# Add a non-root user for security purposes
RUN adduser -D app_user

# Change to the non-root user
USER app_user

# Command to run the Python file
CMD ["python", "solutions.py"]
