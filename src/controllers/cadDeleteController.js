const cadDeleteModel = require('../models/cadDeleteModel');
const cadGetController = require('./cadGetController');

module.exports = {
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

  deleteClient: async (req, res) => {
    let code = req.params.codigo;

    if (!(await cadGetController.getClientId(code))) {

      res.status(404).json({ msg: 'Cliente não encontrado.' });

    } else {

      await cadDeleteModel.deleteClientQuery(code);
      res.status(200).json({ msg: 'Cliente excluido com sucesso!' })

    }
  }
}