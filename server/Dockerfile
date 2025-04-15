FROM node:20.18.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev && npm i -g knex

COPY . .

CMD knex migrate:latest && knex seed:run && npm run start

