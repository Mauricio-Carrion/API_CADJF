const cadDeleteModel = require('../models/cadDeleteModel');
const cadGetController = require('./cadGetController');

module.exports = {
  //Deleta Usuario
  deleteUser: async (req, res) => {
    let code = req.params.codigo;

    if (!(await cadGetController.getUserId(code))) {

      res.status(404).json({ msg: 'Usuario não encontrado.' });

    } else if (await cadGetController.getUserHasClient(code)) {

      res.status(422).json({ msg: 'Usuário não pode ser excluido, possui clientes vinculados.' });

    } else {

      await cadDeleteModel.deleteUserQuery(code);
      res.status(200).json({ msg: 'Usuário excluido com sucesso!' })

    }
  },

  //Deleta Cliente
  deleteClient: async (req, res) => {
    let code = req.params.codigo;

    if (!(await cadGetController.getClientId(code))) {

      res.status(404).json({ msg: 'Cliente não encontrado.' });

    } else if (await cadGetController.getClientHasVisit(code)) {

      res.status(422).json({ msg: 'Cliente não pode ser excluido, possui visitas vinculadas.' });

    } else {

      await cadDeleteModel.deleteClientQuery(code);
      res.status(200).json({ msg: 'Cliente excluido com sucesso!' })

    }
  },

  //Deleta visita
  deleteVisit: async (req, res) => {
    let code = req.params.codigo;

    if (!(await cadGetController.getVisitId(code))) {

      res.status(404).json({ msg: 'Visita não encontrada.' });

    } else {

      await cadDeleteModel.deleteVisitQuery(code);
      res.status(200).json({ msg: 'Visita excluida com sucesso!' })

    }
  }
}