FROM node:22-alpine AS build
WORKDIR /app

RUN apk add --no-cache --virtual .build-deps libc6-compat python3 make g++

COPY package.json package-lock.json* ./

ENV SHARP_IGNORE_GLOBAL_LIBVIPS=1
ENV npm_config_arch=x64
ENV npm_config_platform=linux
ENV npm_config_libc=musl

RUN npm install --no-audit --no-fund --no-package-lock

COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.29-alpine AS runtime

USER root
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html
USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
