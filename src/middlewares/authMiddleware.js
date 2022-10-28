const jwt = require('jsonwebtoken');
const cadGetModel = require('../models/cadGetModel')

module.exports = {
  checkToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ msg: 'Acesso negado, necessário login.' });
    }

    try {
      const secret = process.env.SECRET;

      jwt.verify(token, secret);

      next();
    } catch (error) {

      res.status(400).json({ msg: 'Token inválido!' });

    }
  },

  checkAdmin: async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secret = process.env.SECRET;
    const tokenID = await jwt.verify(token, secret).id;
    const userName = await cadGetModel.getUserNameById(tokenID);
    const userAdmin = await cadGetModel.getUserQuery(userName[0].usuario);

    if (userAdmin.adm == 0) {

      res.status(422).json({ msg: 'Seu usuário não possui permissão.' });

    } else {

      next();

    }
  }
}