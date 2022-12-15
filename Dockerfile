FROM node:latest
MAINTAINER Daniel Ram
ADD . /var/www
WORKDIR /var/www

RUN npm install
EXPOSE 3000
CMD ["npm", "start"]