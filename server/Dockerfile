FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN apt-get update \
    && apt-get install -y --no-install-recommends maven ffmpeg \
    && rm -rf /var/lib/apt/lists/*
RUN mvn clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/bilimly.backend-0.0.1-SNAPSHOT.jar"]
