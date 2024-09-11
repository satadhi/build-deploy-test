# Use the official Node.js image as a base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the port that NestJS will run on
EXPOSE 3000

# Set environment variables to pick up during runtime
ENV NODE_ENV=production

# Command to run the app in production mode
CMD ["npm", "run", "start:prod"]
