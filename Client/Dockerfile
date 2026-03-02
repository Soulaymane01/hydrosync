FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm ci || npm install

# Copy application source
COPY . .

# Build application
# RUN npm run build

# Expose port and start application
EXPOSE 3000
CMD ["npm", "run", "dev"]
