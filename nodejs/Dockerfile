FROM node:14.17.0

<<<<<<< HEAD
RUN mkdir ~/.npm-global
RUN npm config set unsafe-perm true
RUN npm config set prefix '~/.npm-global'
RUN export PATH=~/.npm-global/bin:$PATH  
ENV NPM_CONFIG_PREFIX=~/.npm-global

WORKDIR /app

COPY ./app/package.json .
=======
WORKDIR /app

COPY ./app/package*.json .
>>>>>>> a62583ab779dfd3a84dff6731a4afd4200cd2674
RUN mkdir node_modules
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

COPY ./app .

<<<<<<< HEAD
CMD ["npm", "run", "start:dev"]
=======
CMD ["node", "server.js"]
>>>>>>> a62583ab779dfd3a84dff6731a4afd4200cd2674
