FROM node:20-alpine
WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY apps/api/package.json ./apps/api/

RUN yarn install

COPY apps/api ./apps/api
WORKDIR /app/apps/api

RUN yarn prisma generate

EXPOSE 3000

CMD ["yarn", "start"]