ARG NODE_VERSION=20.12.2

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN yarn

COPY . .

RUN yarn build

FROM node:${NODE_VERSION}-alpine

COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/package*.json ./
COPY --from=base /usr/src/app/yarn.lock ./
COPY --from=base /usr/src/app/dist ./dist
COPY --from=base /usr/src/app/prisma ./prisma