# Development stage
# FROM node:22-bookworm-slim AS development
FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# RUN npm run build

CMD ["npm", "run", "dev"]

# Production stage
# FROM node:22-bookworm-slim AS production

# WORKDIR /app

# COPY package*.json ./

# RUN npm ci --only=production

# COPY --from=development /app/dist ./dist

# CMD ["node", "dist/server.js"]