FROM node:22-alpine

WORKDIR /app

COPY package*.json ./ 
RUN npm install 

COPY . . 

RUN npm run build 

ENV NODE_ENV=production
ENV PORT=3000

RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
