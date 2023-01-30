FROM node:18.12.1
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3087
CMD [ "node", "./src/server.js" ]

FROM mysql:5.7
COPY ./database/ /docker-entrypoint-initdb.d/