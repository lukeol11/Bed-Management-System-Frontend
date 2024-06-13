# Stage 1: Build the Vue.js application
FROM node:18 AS build-stage

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Set up the Node.js backend and serve the built files
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the backend package.json and package-lock.json files
COPY build/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the backend code and the built frontend files
COPY build .
COPY --from=build-stage /app/build/dist ./dist

# Expose the port the app runs on
EXPOSE 8080

# Start the backend server
CMD ["node", "server.js"]
