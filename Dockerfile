FROM mhart/alpine-node:12 AS builder

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-'production'}

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn --production=false

COPY . .

RUN yarn build
