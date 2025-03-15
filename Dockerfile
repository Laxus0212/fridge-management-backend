# Use the official Node.js 18 Alpine image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install MySQL client (IMPORTANT!)
RUN apk add --no-cache mysql-client

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --include=dev

# Copy the rest of the application files
COPY . .

# Build the TypeScript code
RUN ls -lah && npm run build

# Expose the necessary port
EXPOSE 3000
EXPOSE 9229

# Command to run the application
CMD ["npm", "run", "start:prod"]