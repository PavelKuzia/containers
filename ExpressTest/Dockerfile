FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm ci --only=production

CMD SET DEBUG=expresstest:* & npm start