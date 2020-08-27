FROM node:alpine as build

WORKDIR /build

COPY package.json .

# 国内用户推荐使用该命令修改registry
# RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn install

COPY . .
RUN yarn build


FROM node:alpine as prod

WORKDIR /prod

COPY --from=0 /build/package.json .

# 国内用户推荐使用该命令修改registry
# RUN yarn config set registry https://registry.npm.taobao.org/
RUN  yarn install --prod
COPY --from=0 /build/dist/ .

EXPOSE 3000

CMD MONGO_HOST=mongodb node index.js
