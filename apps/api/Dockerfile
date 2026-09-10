FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache openssl libc6-compat
RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Копируем package.json всех воркспейсов
COPY apps/shared/package.json ./apps/shared/
COPY apps/api/package.json ./apps/api/

RUN yarn install

# Копируем исходники shared и api
COPY apps/shared ./apps/shared
COPY apps/api ./apps/api

WORKDIR /app/apps/api
RUN yarn prisma generate

EXPOSE 3000

CMD ["sh", "-c", "yarn prisma db push --accept-data-loss && yarn start"]