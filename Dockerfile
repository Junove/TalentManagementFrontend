FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json /app

RUN npm install --force

COPY . /app

EXPOSE 3000

ENTRYPOINT ["npm", "start"]