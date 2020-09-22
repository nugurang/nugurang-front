FROM node:alpine

ARG DEST=/usr/app

RUN npm install --global pm2

COPY ./ ${DEST}

WORKDIR ${DEST}
RUN npm install -D

RUN npm run build
EXPOSE 3000

USER node
CMD [ "pm2-runtime", "npm", "--", "start" ]
