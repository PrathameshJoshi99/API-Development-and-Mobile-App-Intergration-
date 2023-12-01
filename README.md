# API-Development-and-Mobile-App-Intergration-

## Table of Contents

1. [Introduction](#introduction)
2. [Setup Instructions](#setup-instructions)
    - [Docker Setup](#docker-setup)
    - [Environment Variables](#environment-variables)

## 1. Introduction

This project involves the development of a GraphQL API using Apollo Server and its integration with a React Native mobile application. The API facilitates data manipulation within a PostgreSQL database, specifically focusing on the 'tournaments' table. Additionally, the project utilizes Docker for containerization, ensuring easy deployment and consistent testing environments.

## 2. Setup Instructions

### 2.1 Docker Setup

1. Build the Docker containers:

    ```bash
    docker-compose build
    ```

2. Run the Docker containers:

    ```bash
    docker-compose up
    ```

3. Access the API at [http://localhost:4000](http://localhost:4000)
4. Access the React Native app at [http://localhost:19002](http://localhost:19002) for Expo DevTools.

### 2.2 Environment Variables

- `POSTGRES_USER`: PostgreSQL username
- `POSTGRES_PASSWORD`: PostgreSQL password
- `POSTGRES_DB`: PostgreSQL database name

## 3. Testing

1. Install testing dependencies:

    ```bash
    docker-compose run apollo npm install --save-dev jest
    ```

2. Write tests for your Apollo Server and React Native app.

3. Run tests in the Docker environment:

    ```bash
    docker-compose run apollo npm test
    ```

4. Ensure local testing mirrors the production setup.

## 4. Project Structure
my-graphql-app
│ Dockerfile.apollo
│ Dockerfile.react-native
│ Dockerfile.postgres
│ docker-compose.yml
│ init.sql
│ README.md
│
└───apollo
│ │ server.js
│ │ package.json
│ │ ...
│
└───react-native
│ App.js
│ package.json
│ ...
