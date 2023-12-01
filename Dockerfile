# File: Dockerfile.apollo

# Use the official Node.js image as base
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app will run on
EXPOSE 4000

# Command to run the application
CMD ["npm", "start"]

# File: Dockerfile.react-native

# Use the official Node.js image with additional tools for React Native
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose necessary ports for React Native development
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# Command to run the application
CMD ["npm", "start"]

# File: Dockerfile.postgres

# Use the official PostgreSQL image as base
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_USER your_db_user
ENV POSTGRES_PASSWORD your_db_password
ENV POSTGRES_DB your_db_name

# Copy SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/
