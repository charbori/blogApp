FROM node:14.17.0

RUN mkdir ~/.npm-global
RUN npm config set unsafe-perm true
RUN npm config set prefix '~/.npm-global'
RUN export PATH=~/.npm-global/bin:$PATH  
ENV NPM_CONFIG_PREFIX=~/.npm-global

WORKDIR /app

COPY ./app/package.json .
RUN mkdir node_modules
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

COPY ./app .

CMD ["npm", "run", "start"]
