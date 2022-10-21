//const { json } = require('body-parser');
const { getClientCNPJQuery } = require('../models/cadGetModel');
const cadPostModel = require('../models/cadPostModel');
const { param } = require('../routes');

module.exports = {
  /**********POST************/
  //Post client
  postClient: async (req, res) => {

    //Adiciona parametros da requisição em um array
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

    //Retorna apenas parametros preenchidos
    const params = reqParams.filter(e => {
      if (e) {
        return e;
      }
    });

    //Verifica quantidade de campos preenchidos
    if (params.length < 10) {

      res.status(422).json({ msg: 'Estão faltando campos.' });

      //Verificar se o cliente já possui cadastro
    } else if (
      params[3] == JSON.parse(
        JSON.stringify(
          await getClientCNPJQuery(params[3])
        )
      ).cnpj) {

      res.status(422).json({ msg: 'Cliente já possui cadastro.' });
      //Valida nome
    } else if (params[1].length > 50) {

      res.status(422).json({ msg: 'Use até 50 caracteres para o nome.' });

      //Valida Razao social
    } else if (params[2].length > 50) {

      res.status(422).json({ msg: 'Use até 50 caracteres para a razão social.' });

      //Valida CNPJ
    } else if (params[3].length < 14 || params[3].length > 14) {

      res.status(422).json({ msg: 'Insira um CNPJ válido.' });
      //Valida endereço
    } else if (params[4].length > 30) {

      res.status(422).json({ msg: 'Use até 30 caracteres para o endereço.' });

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