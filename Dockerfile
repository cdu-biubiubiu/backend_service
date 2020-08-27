FROM node:alpine as build

WORKDIR /build

COPY package.json .
RUN yarn install

COPY . .
RUN yarn build


FROM node:alpine as prod

WORKDIR /prod

COPY --from=0 /build/package.json .
RUN  yarn install --prod
COPY --from=0 /build/dist/ .

EXPOSE 3000

CMD MONGO_HOST=mongodb node index.js
