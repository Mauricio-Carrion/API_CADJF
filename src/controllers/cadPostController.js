//const { json } = require('body-parser');
const { getClientCNPJQuery } = require('../models/cadGetModel');
const cadPostModel = require('../models/cadPostModel');
const { param } = require('../routes');

module.exports = {
  /**********POST************/
  //Post client
  postClient: async (req, res) => {
    const reqParams = [
      usuario = req.body.usuario,
      nome = req.body.nome,
      razcli = req.body.razao,
      cnpj = req.body.cnpj,
      endcli = req.body.endereco,
      numend = req.body.numero,
      cidend = req.body.cidade,
      baiend = req.body.bairro,
      obscli = req.body.obs,
      stacli = req.body.status
    ];

    const params = reqParams.filter(e => {
      if (e) {
        return e;
      }
    });

    if (params.length < 10) {

      res.status(422).json({ msg: 'Estão faltando campos.' });

    } else if (
      params[3] == JSON.parse(
        JSON.stringify(
          await getClientCNPJQuery(params[3])
        )
      ).cnpj) {

      res.status(422).json({ msg: 'Cliente já possui cadastro.' });

    } else if (params[3].length < 14 || params[3].length > 14) {

      res.status(422).json({ msg: 'Insira um CNPJ válido.' });

    } else {
      let userCode = await cadPostModel.postClientQuery(params);
      res.status(200).json({
        codigo: userCode.insertId,
        nome: params[1],
        razao: params[2],
        cnpj: params[3],
        endereco: params[4],
        numero: params[5],
        cidade: params[6],
        bairro: params[7],
        obs: params[8],
        status: params[9],
      });
    }
  }
};