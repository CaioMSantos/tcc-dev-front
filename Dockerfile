# Etapa de build
FROM node:14.15.1 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prod

# Etapa de produção com Nginx
FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/rev_web/ /usr/share/nginx/html

EXPOSE 80
