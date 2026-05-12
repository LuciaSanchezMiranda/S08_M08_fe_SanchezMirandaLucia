# ========================
# ETAPA 1: Construcción (Build)
# ========================
FROM node:lts-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build -- --output-path=./dist/public --configuration production

# ========================
# ETAPA 2: Servir (Serve)
# ========================
FROM nginx:alpine

COPY --from=build /app/dist/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]