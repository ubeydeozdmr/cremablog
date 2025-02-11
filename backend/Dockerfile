FROM node:22-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app /app

COPY .env.production /app/.env

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

CMD ["node", "dist/server.js"]