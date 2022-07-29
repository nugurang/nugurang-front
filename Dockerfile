FROM node:alpine
EXPOSE 3000
ARG APP_ROOT=/srv
RUN npm install --global yarn pm2
COPY . ${APP_ROOT}
RUN chmod -R a+w ${APP_ROOT}
USER node
WORKDIR ${APP_ROOT}
RUN yarn install -D
RUN yarn build
WORKDIR ${APP_ROOT}
CMD [ "pm2-runtime", "start" ]