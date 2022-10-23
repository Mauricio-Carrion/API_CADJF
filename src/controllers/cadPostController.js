//const { json } = require('body-parser');
const cadPostModel = require('../models/cadPostModel');
const cadGetController = require('./cadGetController');
//const { param } = require('../routes');

module.exports = {
  /**********POST************/

  /////////////Post usuario\\\\\\\\\\\\\\
  postUser: async (req, res) => {

    //Adiciona parametros da requisição em um array
    const reqParams = [
      usuario = req.body.usuario.toUpperCase(),
      senha = req.body.senha,
      nome = req.body.nome,
      sobre = req.body.sobrenome,
      adm = req.body.adm
    ];

    //Retorna apenas parametros preenchidos
    const params = reqParams.filter(e => {
      if (e) {
        return e;
      }
    });

    //Verifica quantidade de campos preenchidos
    if (params.length < 5) {

      res.status(422).json({ msg: 'Estão faltando campos.' });

      //Verificar se o Usuario já possui cadastro
    } else if (await cadGetController.getUserName(params[0])) {

      res.status(404).json({ msg: 'O nome de usuário já possui cadastro.' });

      //Valida Usuario
    } else if (params[0].length > 15) {

      res.status(422).json({ msg: 'Use até 15 caracteres para o usuario.' });

      //Valida Senha
    } else if (params[1].length > 64) {

      res.status(422).json({ msg: 'Use uma senha de até 64 caracteres' });

      //Valida Nome
    } else if (params[2].length > 30) {

      res.status(422).json({ msg: 'Use até 30 caracteres para o nome.' });

      //Valida Sobrenome
    } else if (params[3].length > 30) {

      res.status(422).json({ msg: 'Use até 30 caracteres para o sobrenome.' });

      //Valida Adm
    } else if (!(params[4] === 'true') && !(params[4] === 'false')) {

      res.status(422).json({ msg: 'Use apenas booleano no campo adm.' });

      //Grava no banco se todos os testes foram false
    } else {
      let userCode = await cadPostModel.postUserQuery(params);
      res.status(200).json({
        codigo: userCode.insertId,
        usuario: params[0],
        nome: params[2],
        sobrenome: params[3],
        adm: params[4],
      });
    }
  },

  /////////////Post cliente\\\\\\\\\\\\\\
  postClient: async (req, res) => {

    //Adiciona parametros da requisição em um array
    const reqParams = [
      usuario = req.body.usuario,
      nome = req.body.nome,
      razcli = req.body.razao,
      cnpj = req.body.cnpj,
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
    if (params.length < 6) {

      res.status(422).json({ msg: 'Estão faltando campos.' });

      //Verifica verifica se o cnpj é um numero
    } else if (!parseInt(params[3])) {

      res.status(422).json({ msg: 'Insira um CNPJ válido.' });

      //Verificar se o cliente já possui cadastro
    } else if (await cadGetController.getClientCNPJ(params[3])) {

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

      //Valida Observação
    } else if (params[4].length > 150) {

      res.status(422).json({ msg: 'Use até 150 caracteres para observação.' });

      //Valida Status
    } else if (params[5].length > 15) {

      res.status(422).json({ msg: 'Use até 15 caracteres para o status.' });

      //Grava no banco se todos os testes foram false
    } else {
      let userCode = await cadPostModel.postClientQuery(params);
      res.status(200).json({
        codigo: userCode.insertId,
        nome: params[1],
        razao: params[2],
        cnpj: params[3],
        obs: params[4],
        status: params[5],
      });
    }
  },

  /////////////POST visitas\\\\\\\\\\\\\\\

  postVisits: async (req, res) => {
    //Adiciona parametros da requisição em um array
    const reqParams = [
      cliente = req.body.cliente,
      data = req.body.data,
      desc = req.body.descricao,
      obs = req.body.obs
    ];
    //Filtra parametros preenchidos
    const params = reqParams.filter(e => {
      if (e) {
        return e
      }
    });
    //valida quantidade de parametros preenchidos
    if (params.length < 4) {

      res.status(422).json({ msg: 'Estão faltando campos.' });

      //Verifica se o código do cliente é um numero
    } else if (!parseInt(params[0])) {

      res.status(422).json({ msg: 'Apenas números no campo cliente' });

      //Verifica se o numero tem até 11 digitos
    } else if (params[0].length > 11) {

      res.status(422).json({ msg: 'Insira até 11 dígitos no campo cliente' });

      //Verica se existe um cliente com o codigo informado
    } else if (await cadGetController.getClientId(params[0])) {

      res.status(404).json({ msg: 'Cliente não encontrado' });

      //Verifica se a data está valida
    } else if (new Date(params[1]) == 'Invalid Date') {

      res.status(422).json({ msg: 'Insira uma data válida' });

      //verifica descrição
    } else if (params[2].length > 50) {

      res.status(422).json({ msg: 'Use até 50 caracteres para descrição.' });

      //Verifica observação
    } else if (params[3].length > 50) {

      res.status(422).json({ msg: 'Use até 150 caracteres para descrição.' });

      //Grava no banco se todos os testes foram false
    } else {
      let visitCode = await cadPostModel.postVisitQuery(params);
      res.status(200).json({
        codigo: visitCode.insertId,
        cliente: params[1],
        data: params[2],
        descricao: params[3],
        obsevacao: params[4],
      });
    }
  }

};