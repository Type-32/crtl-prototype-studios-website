# Use a Node base image
FROM node:lts-alpine

# Create an app directory and set it as the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./
# Uncomment the line below if you are using yarn
# COPY yarn.lock ./

# Install dependencies
RUN npm install
# Uncomment the line below if you are using yarn
# RUN yarn install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build
# Uncomment the line below if you are using yarn
# RUN yarn build

# This will serve the app using an http-server module
# No need to use an nginx in the same container
RUN npm install -g http-server

# Expose any port you would like, this will be overridden by the docker-compose .env
EXPOSE 8000

# Serve the application using http-server
CMD ["http-server", "dist"]