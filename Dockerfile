FROM node:lts-slim AS base

WORKDIR /app

RUN apt update && \
    npm i -g npm@9.1.2

FROM base AS dev

RUN apt install -y git
