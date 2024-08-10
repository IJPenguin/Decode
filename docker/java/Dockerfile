# Stage 1: Build the Java application
FROM alpine:latest as packager

# Install OpenJDK 11 and jmods
RUN apk --no-cache add openjdk11-jdk openjdk11-jmods

# Set environment variables
ENV JAVA_MINIMAL="/opt/java-minimal"

# Create a minimal JRE using jlink
RUN /usr/lib/jvm/java-11-openjdk/bin/jlink \
    --verbose \
    --add-modules java.base,java.sql,java.naming,java.desktop,java.management,java.security.jgss,java.instrument \
    --compress 2 --strip-debug --no-header-files --no-man-pages \
    --release-info="add:IMPLEMENTOR=radistao:IMPLEMENTOR_VERSION=radistao_JRE" \
    --output "$JAVA_MINIMAL"

# Set the working directory
WORKDIR /workspace

# Copy the source code into the container
COPY ./src/solutions/solutions.java .

# Compile the Java file
RUN /usr/lib/jvm/java-11-openjdk/bin/javac solutions.java

# Stage 2: Create a minimal runtime image
FROM alpine:latest

# Set environment variables
ENV JAVA_HOME=/opt/java-minimal
ENV PATH="$PATH:$JAVA_HOME/bin"

# Copy the minimal JRE from the builder stage
COPY --from=packager "$JAVA_HOME" "$JAVA_HOME"

# Set the working directory for the runtime
WORKDIR /app

# Add a non-root user for security purposes
RUN adduser -D app_user

# Copy the compiled .class file from the builder stage
COPY --from=packager /workspace/solutions.class .

# Change to the non-root user
USER app_user

# Set the command to run the compiled Java class
CMD ["java", "solutions"]
