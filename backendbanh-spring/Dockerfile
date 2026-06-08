# Use Eclipse Temurin Java 17 JRE (runtime only)
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy pre-built jar from Maven build
COPY target/backendbanh-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]
