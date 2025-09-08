# Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build for production
COPY . .
RUN npm run build

# Production Stage
FROM node:18-alpine

WORKDIR /app

# Install 'serve' to serve static files
RUN npm install -g serve

# Copy built assets from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port for the static server
EXPOSE 3000

# Command to serve the static files
CMD ["serve", "-s", "dist", "-l", "3000"]
