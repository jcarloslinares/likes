FROM node:7-alpine

RUN mkdir  /src

WORKDIR /src

ADD package.json /src/package.json

RUN npm install


COPY . /src

EXPOSE 1337


CMD ["npm", "start"]

