# Use the official Node.js image as the base image
FROM node:20.14-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS app
RUN npm run build

# Use a smaller Node.js image for the final build
FROM node:20.14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy built application and dependencies from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose the port that NestJS will run on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Run the NestJS application
CMD ["node", "dist/main.js"]
