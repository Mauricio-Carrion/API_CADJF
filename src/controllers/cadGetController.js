const cadGetModel = require('../models/cadGetModel');
const { unconvertImage, justDate } = require('../utils/utils')

module.exports = {
  /**********GET************/

  //Busca um usuario
  getUser: async (userName) => {
    let result = {}

    let user = await cadGetModel.getUserQuery(userName);

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

  //Verifica password
  getPassword: async (username) => {
    let password = await cadGetModel.getPasswordQuery(username);
    return password;
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

    if (users.length > 0) {

      for (let i in users) {
        result.push({
          codigo: users[i].id_usu,
          imagem: unconvertImage(users[i].image),
          login: users[i].usuario,
          nome: users[i].nomusu,
          sobrenome: users[i].sobusu,
          administador: users[i].adm
        });
      }

      return res.status(200).json(result);

    } else {

      return res.status(404).json({ msg: 'Ainda não há usuarios cadastrados.' });

    }
  },

  getUsersClient: async (req, res) => {
    let usersDB = await cadGetModel.getUsersClientQuery()

    let result = usersDB.map(status => {
      return {
        usuario: status.usuario,
        qtdClientes: status.qtdcli
      }
    })

    if (result) {

      res.status(200).json(result)

    } else {

      res.status(404).json({ msg: 'Não foram encontrados clientes' })

    }
  },

  //Busca um cliente
  getClient: async (req, res) => {

    let codigo = parseInt(req.params.codigo);

    if (codigo) {

      let client = await cadGetModel.getClientQuery(codigo);

      if (client) {

        res.status(200).json({
          tecnico: `${client.usu_id}`,
          codigo: `${client.id_cli}`,
          nomeFantasia: `${client.nomfan}`,
          razaoSocial: `${client.razcli}`,
          cnpj: client.cnpj,
          observacao: `${client.obscli}`,
          status: `${client.stacli}`
        });

      } else {

        res.status(404).json({ msg: 'Cliente não encontrado' });

      }

    } else {

      res.status(422).json({ msg: 'Insira um código válido' });

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

    if (clients.length > 0) {

      for (let i in clients) {
        result.push({
          codigo: clients[i].id_cli,
          tecnico: clients[i].nomusu,
          nome: clients[i].nomfan,
          razaoSocial: clients[i].razcli,
          cnpj: clients[i].cnpj,
          obs: clients[i].obscli,
          status: clients[i].stacli
        });
      }

      return res.status(200).json(result);

    } else {

      return res.status(404).json({ msg: 'Ainda não há clientes cadastrados.' });

    }
  },

  getStatusCard: async (req, res) => {

    let cardData = await cadGetModel.getStatusCardQuery();

    if (cardData) {
      let cardResultData = cardData.map(status => {
        return {
          usuarios: status.qtdUsuarios,
          clientes: status.qtdClientes,
          visitas: status.qtdVisitas
        }
      })

      return res.status(200).json(...cardResultData)
    }

    return res.status(404).json({ msg: 'Dados não encontrados' });
  },

  getClientsStatus: async (req, res) => {
    let statusDB = await cadGetModel.getClientStatusQuery()

    let result = statusDB.map(status => {
      return {
        status: status.stacli,
        qtd: status.valueStatus
      }
    })

    if (result.length == 1) {
      switch (result[0].status) {
        case 1:

          result.push({ status: 2, qtd: 0 })
          result.push({ status: 3, qtd: 0 })
          break

        case 2:

          result.unshift({ status: 1, qtd: 0 })
          result.push({ status: 3, qtd: 0 })
          break

        case 3:

          result.unshift({ status: 2, qtd: 0 })
          result.unshift({ status: 1, qtd: 0 })
          break

        default:
      }

      return res.status(200).json(result)

    } else if (result.length === 2) {

      if (result[0].status === 1 && result[1].status === 2) {

        result.push({ status: 3, qtd: 0 })

      } else if (result[0].status === 2 && result[1].status === 3) {

        result.unshift({ status: 1, qtd: 0 })

      }

      return res.status(200).json(result)

    }

    if (result.length === 3) {

      return res.status(200).json(result)

    } else {

      return res.status(404).json({ msg: 'Ainda não há clientes cadastrados' });

    }

  },

  // Busca uma visita
  getVisit: async (req, res) => {
    let visitCode = parseInt(req.params.codigo);

    if (visitCode) {

      let visit = await cadGetModel.getVisitQuery(visitCode);

      if (visit) {

        res.status(200).json({
          data: `${justDate(visit.datvis)}`,
          descricao: `${visit.desvis}`,
          observacao: `${visit.obsvis}`
        });

      } else {

        res.status(404).json({ msg: 'Visita não encontrada' });

      }

    } else {

      res.status(422).json({ msg: 'Insira um código válido' });

    }
  },

  //Verifica se existe visita
  getVisitId: async (id) => {
    let visit = await cadGetModel.getVisitIdQuery(id);
    return visit;
  },

  // Busca todas visitas
  getAllVisits: async (req, res) => {

    let visits = await cadGetModel.getAllVisitsQuery();

    let result = visits.map(visit => {
      return {
        codigo: visit.id_vis,
        data: justDate(visit.datvis),
        descricao: visit.desvis,
        observacao: visit.obsvis
      }
    });

    if (result.length > 0) {

      res.status(200).json(result);

    } else {

      res.status(404).json({ msg: 'Ainda não há visitas cadastradas.' });

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
          data: justDate(visits[i].datvis),
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

      return res.status(404).json({ msg: 'Usuario não tem cadastro.' });

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
  },

  getLogs: async (req, res) => {
    let result = [];

    let logs = await cadGetModel.getLogsQuery();

    for (let i in logs) {
      result.push({
        codigo: logs[i].id_log,
        tipo: logs[i].tiplog,
        descricao: logs[i].usulog,
        data: logs[i].datlog
      });
    }

    if (result.length > 0) {

      res.status(200).json(result);

    } else {

      res.status(404).json({ msg: 'Ainda não há logs' });

    }
  }
};