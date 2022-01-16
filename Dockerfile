FROM node:alpine
EXPOSE 3000
ARG APP_ROOT=/srv
RUN npm install --global pm2
COPY . ${APP_ROOT}
RUN chmod -R a+w ${APP_ROOT}
USER node
WORKDIR ${APP_ROOT}
RUN npm install -D
RUN npm run build
WORKDIR ${APP_ROOT}
CMD [ "pm2-runtime", "npm", "--", "start" ]
