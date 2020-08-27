FROM node


WORKDIR /hapi

COPY package.json .
RUN yarn config set registry https://registry.npm.taobao.org/ &&  yarn install

COPY . .
RUN yarn build

EXPOSE 3000

CMD node dist/index.js

