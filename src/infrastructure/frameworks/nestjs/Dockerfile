# Use the official Node.js image as the base
FROM node:latest

# Create and set the working directory
WORKDIR /home/node

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ../../../* .
WORKDIR /home/node/Infrastructure/Frameworks/backendExpress/
RUN echo "bienvenue dans backend express"
RUN npm install
# Expose the application port
EXPOSE 5003

# Set the default command to run the application
CMD ["npm", "run", "start:dev"]