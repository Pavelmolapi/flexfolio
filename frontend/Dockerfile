# Development-friendly frontend container using CRA dev server
FROM node:20-alpine
WORKDIR /app

# Install deps first for better caching
COPY package.json package-lock.json* ./
RUN npm ci || npm i

# Copy source
COPY . .

# Environment defaults (can be overridden in docker-compose)
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
