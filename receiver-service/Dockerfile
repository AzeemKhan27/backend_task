FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from the root directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy service-specific files
COPY . .

# Expose the necessary port (modify based on your service)
EXPOSE 3000

# Start the service
CMD ["node", "index.js"]
