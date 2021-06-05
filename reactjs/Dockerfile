FROM node:16.2
WORKDIR /app

ENV PATH /app/myexample/node_modules/.bin:$PATH

COPY ./myexample ./myexample
WORKDIR /app/myexample
RUN npm install

CMD ["npm", "start"]
