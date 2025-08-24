FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json first (for caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --production

# Copy the rest of the files
COPY . .

# Default command
CMD ["node", "simple/index.js"]
