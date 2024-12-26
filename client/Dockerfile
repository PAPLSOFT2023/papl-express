



# Use the official Node.js image as the base image
FROM node:14-alpine

# Install serve globally
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the build output to the working directory
COPY dist/paplexpress /app

# Expose port 4200
EXPOSE 4200

# Start the application using serve
CMD ["serve", "-s", ".", "-l", "4200"]
