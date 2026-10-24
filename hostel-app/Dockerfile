FROM node:22-bookworm-slim AS frontend
WORKDIR /build/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build
FROM maven:3.9.9-eclipse-temurin-17 AS backend
WORKDIR /build/backend
COPY backend/pom.xml ./
RUN mvn -B dependency:go-offline
COPY backend/src ./src
COPY --from=frontend /build/frontend/dist ./src/main/resources/static
RUN mvn -B package
FROM eclipse-temurin:17-jre-jammy
RUN useradd -m -u 10001 hostel
WORKDIR /app
COPY --from=backend /build/backend/target/hostel-1.0.0.jar app.jar
RUN mkdir /app/data && chown -R hostel:hostel /app
USER hostel
EXPOSE 8080
ENTRYPOINT ["java","-XX:MaxRAMPercentage=65","-Duser.timezone=Asia/Kolkata","-jar","app.jar"]
