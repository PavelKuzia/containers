FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install -g nodemon
RUN npm install

USER node

ENTRYPOINT ["nodemon", "/usr/src/app/bin/www.js"] 
CMD ["npm", "run", "dev"]