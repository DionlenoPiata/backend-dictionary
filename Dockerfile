FROM node:18.16.1

WORKDIR /usr/app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 3000