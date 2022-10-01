FROM node:16

WORKDIR /app

COPY package.json ./
COPY .env ./

COPY ./ /app/

RUN npm install

CMD [ "node", "./index.js" ]
