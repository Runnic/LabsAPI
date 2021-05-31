FROM node:alpine

WORKDIR /usr/app

COPY package.json ./
RUN yarn

COPY . .

EXPOSE 7777

CMD ["yarn", "dev"]