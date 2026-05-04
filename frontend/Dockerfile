FROM node:25

WORKDIR /app
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Run the application
CMD ["npm", "run", "dev"]