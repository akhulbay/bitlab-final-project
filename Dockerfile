FROM openjdk:17-oracle
ADD /build/libs/final-project-0.0.1-SNAPSHOT.jar backend.jar
ENTRYPOINT ["java", "-jar", "backend.jar"]