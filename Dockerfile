FROM node:18
WORKDIR /usr/src/API_CAFJF
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3087
CMD [ "node", "./src/server.js" ]