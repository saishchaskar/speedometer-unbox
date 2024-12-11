# Use official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Install 'serve' globally to serve the built React app
RUN npm install -g serve

# Expose port 3000 for the app
EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "build", "-l", "3000"]
