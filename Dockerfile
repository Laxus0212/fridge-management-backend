# Use the official Node.js 18 Alpine image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy the rest of the application files
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the necessary port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]