# Development stage
# FROM node:22-bookworm-slim AS development
FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# ARG VITE_API_URL

# RUN VITE_API_URL=$VITE_API_URL npm run build

# Production stage
# FROM node:22-bookworm-slim AS production

# COPY Caddyfile /etc/caddy/Caddyfile

# COPY --from=development /app/dist /srv

# old
# FROM node:22-alpine

# WORKDIR /app

# COPY package*.json ./ 
# RUN npm install 

# COPY . . 

# RUN npm run build 

# ENV NODE_ENV=production
# ENV PORT=3000

# RUN npm install -g serve
# CMD ["serve", "-s", "dist", "-l", "3000"]
