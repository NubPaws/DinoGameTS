FROM node:20-slim

WORKDIR /usr/src/

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
COPY public ./public
COPY res ./public

RUN npx tsc

EXPOSE 8080

CMD [ "npx", "http-server", "public" ]
