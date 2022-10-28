const cadDeleteModel = require('../models/cadDeleteModel');
const cadGetController = require('./cadGetController');
const cadPostController = require('./cadPostController');
const jwt = require('jsonwebtoken');

module.exports = {
  //Deleta Usuario
  deleteUser: async (req, res) => {
    let code = req.params.codigo;

    if (!(await cadGetController.getUserId(code))) {

      return res.status(404).json({ msg: 'Usuario não encontrado.' });

    }

    if (await cadGetController.getUserHasClient(code)) {

      return res.status(422).json({ msg: 'Usuário não pode ser excluido, possui clientes vinculados.' });

    }

    try {

      await cadDeleteModel.deleteUserQuery(code);
      res.status(200).json({ msg: 'Usuário excluido com sucesso!' });

    } catch (error) {

      console.log(error);
      res.status(500).json({ msg: 'Ocorreu um problema no servidor, tente mais tarde.' });

    }
  },

  //Deleta Cliente
  deleteClient: async (req, res) => {
    let code = req.params.codigo;

    if (!(await cadGetController.getClientId(code))) {

      return res.status(404).json({ msg: 'Cliente não encontrado.' });

    }

    if (await cadGetController.getClientHasVisit(code)) {

      return res.status(422).json({ msg: 'Cliente não pode ser excluido, possui visitas vinculadas.' });

    }

    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const secret = process.env.SECRET;
      const tokenID = await jwt.verify(token, secret).id;

      await cadPostController.postLog('Delete', tokenID);
      await cadDeleteModel.deleteClientQuery(code);
      res.status(200).json({ msg: 'Cliente excluido com sucesso!' });

    } catch (error) {

      console.log(error);
      res.status(500).json({ msg: 'Ocorreu um problema no servidor, tente mais tarde.' });

    }
  },

  //Deleta visita
  deleteVisit: async (req, res) => {
    let code = req.params.codigo;

    if (!(await cadGetController.getVisitId(code))) {

      return res.status(404).json({ msg: 'Visita não encontrada.' });

    }

    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const secret = process.env.SECRET;
      const tokenID = await jwt.verify(token, secret).id;

      await cadPostController.postLog('Delete', tokenID);
      await cadDeleteModel.deleteVisitQuery(code);
      res.status(200).json({ msg: 'Visita excluida com sucesso!' });

    } catch (error) {

      console.log(error);
      res.status(500).json({ msg: 'Ocorreu um problema no servidor, tente mais tarde.' });

    }
  }
}