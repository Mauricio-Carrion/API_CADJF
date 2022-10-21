require('dotenv').config({ path: 'variables.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes')

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));

server.use('/service', routes);

server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando no endereco:http://localhost:${process.env.PORT}`);
});