FROM node:14.17.0

WORKDIR /app

COPY ./app/package*.json .
RUN mkdir node_modules
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

COPY ./app .

CMD ["node", "server.js"]
