FROM node:alpine

ARG dst=/usr/app

RUN npm install --global pm2

COPY ./ ${dst}

WORKDIR ${dst}
RUN npm install -D

RUN npm run build
EXPOSE 3000

USER node
CMD [ "pm2-runtime", "npm", "--", "start" ]
