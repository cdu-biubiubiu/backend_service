FROM node:alpine as build

WORKDIR /build

COPY package.json .
RUN yarn config set registry https://registry.npm.taobao.org/ &&  yarn install

COPY . .
RUN yarn build


FROM node:alpine as prod

WORKDIR /prod

COPY --from=0 /build/package.json .
RUN yarn config set registry https://registry.npm.taobao.org/ &&  yarn install --prod
COPY --from=0 /build/dist/ .

EXPOSE 3000

CMD MONGO_HOST=mongodb node index.js
