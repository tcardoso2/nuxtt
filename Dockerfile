FROM node:15.11.0-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade

#needed to run make
RUN apk add --update alpine-sdk
RUN apk add python
RUN apk add git

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json /tmp/package.json
RUN cd /tmp && npm install --only=prod
RUN cp -a /tmp/node_modules /usr/src/nuxt-app/

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
# RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN cd /usr/src/nuxt-app
RUN echo "{}" > .mongodb.json

RUN npm run build
RUN npm install pm2

# expose 3000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
ENV HOST=0.0.0.0
# set app port
# ENV NUXT_PORT=5000

# start the app
CMD [ "npm", "start" ]
