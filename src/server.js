require('dotenv').config({ path: '.env' });
const os = require('os');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const server = express();

// const network = os.networkInterfaces
// const interface = network.lo[0].address

server.use(cors());
server.use(bodyParser.json({ limit: '10mb' }));
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem vindo ao CadJF!' })
});

server.use('/service', routes);

server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando no endereco:http://localhost:${process.env.PORT}`);
  //console.log(interface);
});