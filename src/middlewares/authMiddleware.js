const jwt = require('jsonwebtoken');
const cadGetController = require('../controllers/cadGetController');

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
    const tokenAdm = await jwt.verify(token, secret).adm;

    if (tokenAdm == 0) {

      res.status(422).json({ msg: 'Seu usuário não possui permissão.' });

    } else {

      next();

    }
  },

  checkUserToken: async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secret = process.env.SECRET;
    const tokenId = await jwt.verify(token, secret).id;

    if (!(await cadGetController.getUserId(tokenId))) {

      res.status(422).json({ msg: 'Token referente a um cliente inexistente, faça login com outro usuário' });

    } else {

      next();

    }
  }
}