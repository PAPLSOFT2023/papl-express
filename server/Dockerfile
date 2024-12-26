# Use the official Node.js image
FROM node:22.3.0

# Set a working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --production

# Bundle app source
COPY . .

# Build bcrypt (if necessary, you might need build tools for this step)
RUN npm rebuild bcrypt --build-from-source

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
