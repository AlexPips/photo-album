# Use an official Node runtime as a parent image
FROM node:20.14-alpine3.20

# Set the working directory
WORKDIR /app

# Add the project files
COPY . /app

# Install
RUN npm install
# Build the React app
RUN npm run build

# Serve the app
CMD ["npm", "start"]
