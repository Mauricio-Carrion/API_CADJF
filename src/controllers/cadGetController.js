const cadGetModel = require('../models/cadGetModel');

module.exports = {
  /**********GET************/

  //Busca um usuario
  getUser: async (userName) => {
    let result = {}

    let user = JSON.parse(JSON.stringify(await cadGetModel.getUserQuery(userName)));

    if (user) {
      result = user;
      return result;
    }
  },

  //Verifica se o usuario já existe
  getUserName: async (username) => {
    let user = await cadGetModel.getUserNameQuery(username);
    return user;
  },

  getPassword: async (username) => {
    let password = await cadGetModel.getPasswordQuery(username);
    let passwordObject = JSON.parse(JSON.stringify(password));
    return passwordObject;
  },

  //Verifica se existe usuario
  getUserId: async (id) => {
    let user = await cadGetModel.getUserIdQuery(id);
    return user;
  },

  //Verifica se o usuario possui cliente
  getUserHasClient: async (codeUser) => {
    let client = await cadGetModel.getUserHasClientQuery(codeUser);
    return client;
  },

  //Busca todos os usuarios
  getAllUsers: async (req, res) => {
    let result = [];

    let users = await cadGetModel.getAllUsersQuery();

    for (let i in users) {
      result.push({
        codigo: users[i].id_usu,
        login: users[i].usuario,
        nome: users[i].nomusu,
        sobrenome: users[i].sobusu,
        administador: users[i].adm
      });
    }
    res.json(result);
  },

  //Busca um cliente
  getClient: async (req, res) => {
    let codigo = parseInt(req.params.codigo);
    if (codigo) {

      let client = await cadGetModel.getClientQuery(codigo);
      console.log(client)
      if (client) {

        res.status(200).json({
          codigo: `${client.id_cli}`,
          nomeFantasia: `${client.nomfan}`,
          razaoSocial: `${client.razcli}`,
          cnpj: client.cnpj,
          observacao: `${client.obscli}`,
          status: `${client.stacli}`
        });

      } else {

        res.status(404).json({ msg: 'cliente não encontrado' });

      }

    } else {
      res.status(422).json({ msg: 'insira um código válido' });
    }
  },

  //Verifica se o cliente já tem cadastro
  getClientCNPJ: async (cnpj) => {
    let clientCNPJ = await cadGetModel.getClientCNPJQuery(cnpj);
    return clientCNPJ;
  },

  //Verifica se existe um cliente com o código informado
  getClientId: async (id) => {
    let client = await cadGetModel.getClientIdQuery(id);
    return client;
  },

  //Verifica se o cliente tem visitas
  getClientHasVisit: async (codeClient) => {
    let visit = await cadGetModel.getClientHasVisitQuery(codeClient);
    return visit;
  },

  //Busca todos clientes
  getAllClients: async (req, res) => {
    let result = [];

    let clients = await cadGetModel.getAllClientsQuery();

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

      let visit = await cadGetModel.getVisitQuery(visitCode);

      if (visit) {

        res.status(200).json({
          data: `${visit.datvis}`,
          descricao: `${visit.desvis}`,
          observacao: `${visit.obsvis}`
        });

      } else {

        res.status(404).json({ msg: 'visita não encontrada' });

      }

    } else {

      res.status(422).json({ msg: 'insira um código válido' });

    }
  },

  //Verifica se existe visita
  getVisitId: async (id) => {
    let visit = await cadGetModel.getVisitIdQuery(id);
    return visit;
  },

  // Busca todas visitas
  getAllVisits: async (req, res) => {
    let result = [];

    let visits = await cadGetModel.getAllVisitsQuery();

    for (let i in visits) {
      result.push({
        codigo: visits[i].id_vis,
        data: visits[i].datvis,
        descricao: visits[i].desvis,
        observacao: visits[i].obsvis
      });
    }

    if (result.length > 0) {

      res.status(200).json(result);

    } else {

      res.status(404).json({ msg: 'Nenhuma visita encontrada.' });

    }
  },

  // Busca visitas por cliente
  getVisitsByClient: async (req, res) => {
    let result = [];

    let clientCode = req.params.codigo;

    if (!(await cadGetModel.getClientIdQuery(clientCode))) {

      return res.status(404).json({ msg: 'Cliente não tem cadastro.' });

    }

    let visits = await cadGetModel.getVisitsByClientQuery(clientCode);
    if (visits) {
      for (let i in visits) {
        result.push({
          codigo: visits[i].id_vis,
          data: visits[i].datvis,
          descricao: visits[i].desvis,
          observacao: visits[i].obsvis
        });
      }
    }

    if (result.length > 0) {

      return res.status(200).json(result);

    } else {

      return res.status(404).json({ msg: 'Cliente não possui visitas.' });

    }
  },

  // Busca clientes por usuario
  getClientsByUser: async (req, res) => {
    let result = [];

    let userCode = req.params.codigo;

    if (!(await cadGetModel.getUserIdQuery(userCode))) {

      return res.status(404).json({ msg: 'Cliente não tem cadastro.' });

    }

    let clients = await cadGetModel.getClientsByUserQuery(userCode);

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

    if (result.length > 0) {

      res.status(200).json(result);

    } else {

      res.status(404).json({ msg: 'Usuário não possui clientes.' });

    }
  }
};