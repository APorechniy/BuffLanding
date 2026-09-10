FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY apps/shared/package.json ./apps/shared/
COPY apps/web/package.json ./apps/web/

RUN yarn install

COPY apps/shared ./apps/shared
COPY apps/web ./apps/web

WORKDIR /app/apps/shared
RUN yarn build || true

WORKDIR /app/apps/web
RUN yarn build

FROM nginx:alpine AS runner
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]