FROM node:14.17.0

RUN mkdir ~/.npm-global
RUN npm config set unsafe-perm true
RUN npm config set prefix '~/.npm-global'
RUN export PATH=~/.npm-global/bin:$PATH  
ENV NPM_CONFIG_PREFIX=~/.npm-global

WORKDIR /app

COPY ./myexample ./myexample
WORKDIR /app/myexample
RUN npm install

CMD ["npm", "start"]
