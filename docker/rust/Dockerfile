# Use a single stage for both building and running
FROM rust:alpine

# Set the working directory
WORKDIR /usr/src/app

# Add a non-root user for security purposes
RUN adduser -D app_user

# Change ownership of the working directory to the non-root user
RUN chown -R app_user:app_user /usr/src/app

# Change to the non-root user
USER app_user

# Set the default command to compile and run the Rust code
CMD ["sh", "-c", "rustc -o solutions solutions.rs && ./solutions"]
