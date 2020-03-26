
FROM node:12-alpine

WORKDIR /application
EXPOSE 80

ADD artifact.tar.gz .
CMD node app.js
