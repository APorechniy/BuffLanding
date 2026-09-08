FROM node:20-alpine AS builder
WORKDIR /app

# Включаем Corepack и Yarn v4
RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY apps/api/package.json ./apps/api/

RUN yarn install

COPY apps/api ./apps/api
WORKDIR /app/apps/api

RUN yarn prisma generate
RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /app
RUN corepack enable

COPY --from=builder /app ./

WORKDIR /app/apps/api
EXPOSE 3000

CMD ["yarn", "start"]