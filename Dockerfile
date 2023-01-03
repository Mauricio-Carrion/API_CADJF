FROM node:18
WORKDIR /API_CAFJF
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "./src/server.js" ]