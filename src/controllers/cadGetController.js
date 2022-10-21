const { getClientQuery } = require('../models/cadGetModel');
const cadModel = require('../models/cadGetModel');
const { param } = require('../routes');

module.exports = {
  /**********GET************/

  //Busca um cliente
  getClient: async (req, res) => {
    let cnpj = parseInt(req.params.cnpj);
    if (cnpj) {
      let client = await cadModel.getClientQuery(cnpj);

      if (client) {
        res.status(200).json(client);
      } else {
        res.status(404).json({ msg: 'cliente não encontrado' });
      }

    } else {
      res.status(422).json({ msg: 'insira um código válido' });
    }
  },

  //Busca todos clientes
  getAllClients: async (req, res) => {
    let result = [];

    let clients = await cadModel.getAllClientsQuery();

    for (let i in clients) {
      result.push({
        codigo: clients[i].id_cli,
        nome: clients[i].nomfan,
        razaoSocial: clients[i].razcli,
        cnpj: clients[i].cnpj,
        endereco: clients[i].endcli,
        numero: clients[i].numend,
        cidade: clients[i].cidend,
        bairro: clients[i].baiend,
        obs: clients[i].obscli,
        status: clients[i].stacli
      });
    }
    res.json(result);
  },

  // Busca uma visita
  getVisit: async (req, res) => {
    let visitCode = parseInt(req.params.codigo);

    if (visitCode) {
      let visit = await cadModel.getVisitQuery(visitCode);

      if (visit) {
        res.status(200).json(visit);
      } else {
        res.status(404).json({ msg: 'visita não encontrada' });
      }
    } else {
      res.status(422).json({ msg: 'insira um código válido' });
    }
  },

  // Busca todas visitas
  getAllVisits: async (req, res) => {
    let result = [];

    let visits = await cadModel.getAllVisitsQuery();

    for (let i in visits) {
      result.push({
        codigo: visits[i].id_vis,
        data: visits[i].datvis,
        descricao: visits[i].obsvis
      });
    }
    res.json(result);
  },

  //Busca um usuario
  getUser: async (req, res) => {
    let result = {}

    let userCode = req.params.codigo;
    let user = await cadModel.getUserQuery(userCode);

    if (user) {
      result = user;
    }
    res.json(result);
  },

  //Busca todos os usuarios
  getAllUsers: async (req, res) => {
    let result = [];

    let users = await cadModel.getAllUsersQuery();

    for (let i in users) {
      result.push({
        codigo: users[i].id_usu,
        login: users[i].usuario,
        senha: users[i].senha,
        nome: users[i].nomusu,
        sobrenome: users[i].sobusu,
        administador: users[i].adm
      });
    }
    res.json(result);
  },

  // Busca visitas por cliente
  getVisitsByClient: async (req, res) => {
    let result = [];

    let clientCode = req.params.codigo;
    let visits = await cadModel.getVisitsByClientQuery(clientCode);
    if (visits) {
      for (let i in visits) {
        result.push({
          codigo: visits[i].id_vis,
          data: visits[i].datvis,
          descricao: visits[i].obsvis
        });
      }
    }
    res.json(result);
  },

  // Busca clientes por usuario
  getClientsByUser: async (req, res) => {
    let result = [];

    let userCode = req.params.codigo;
    let clients = await cadModel.getClientsByUserQuery(userCode);

    if (clients) {
      for (let i in clients) {
        result.push({
          codigo: clients[i].id_cli,
          nome: clients[i].nomfan,
          razaoSocial: clients[i].razcli,
          cnpj: clients[i].cnpj,
          endereco: clients[i].endcli,
          numero: clients[i].numend,
          cidade: clients[i].cidend,
          bairro: clients[i].baiend,
          obs: clients[i].obscli,
          status: clients[i].stacli
        });
      }
    }
    res.json(result);
  }
};