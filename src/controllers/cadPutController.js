const cadPutModel = require('../models/cadPutModel');
const cadGetController = require('./cadGetController');
const bcrypt = require('bcrypt');
const { query } = require('express');
const cadGetModel = require('../models/cadGetModel');

module.exports = {
  ///////////PUT\\\\\\\\\\\

  //PUT Usuario
  putUser: async (req, res) => {
    let userCode = req.params.codigo;

    const reqParams = [
      usuario = req.body.usuario.toUpperCase(),
      senha = req.body.senha,
      nome = req.body.nome,
      sobre = req.body.sobrenome,
      adm = req.body.adm
    ];

    const params = reqParams.filter(e => {
      if (e) {
        return e;
      }
    })

    //Verifica se existe usuario com o codigo passado no parametro
    if (!(await cadGetController.getUserId(userCode))) {

      return res.status(404).json({ msg: 'Usuário não encontrado.' });

    }

    //Verifica quantidade de campos preenchidos
    if (params.length < 5) {

      return res.status(422).json({ msg: 'Estão faltando campos.' });

    }

    //Verificar se o Usuario já possui cadastro

    const idUsu = await cadGetController.getUser(params[0])

    if (await cadGetController.getUserName(params[0]) && idUsu.id_usu != userCode) {

      return res.status(404).json({ msg: 'O nome de usuário já está sendo usado.' });

    }

    //Valida Usuario
    if (params[0].length > 15) {

      return res.status(422).json({ msg: 'Use até 15 caracteres para o usuario.' });

    }

    //Valida Senha
    if (params[1].length > 64) {

      return res.status(422).json({ msg: 'Use uma senha de até 64 caracteres' });

    }

    //Valida Nome
    if (params[2].length > 30) {

      return res.status(422).json({ msg: 'Use até 30 caracteres para o nome.' });

    }

    //Valida Sobrenome
    if (params[3].length > 30) {

      return res.status(422).json({ msg: 'Use até 30 caracteres para o sobrenome.' });

    }

    //Valida Adm
    if (!(params[4] === 'true') && !(params[4] === 'false')) {

      return res.status(422).json({ msg: 'Use apenas booleano no campo adm.' });

    }

    try {
      //Grava no banco se todos os testes foram false
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(params[1], salt);
      params[1] = passwordHash;

      await cadPutModel.putUserQuery(userCode, params);
      res.status(200).json({
        codigo: userCode,
        usuario: params[0],
        nome: params[2],
        sobrenome: params[3],
        adm: params[4],
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente mais tarde.' })
    }
  },

  //PUT Cliente
  putClient: async (req, res) => {
    let clientCode = req.params.codigo

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

    //Verifica usuario informado
    if (!(await cadGetController.getClientId(clientCode))) {

      return res.status(404).json({ msg: 'Cliente não encontrado.' });

    }

    //Verifica quantidade de campos preenchidos
    if (params.length < 6) {

      return res.status(422).json({ msg: 'Estão faltando campos.' });

    }

    if (!(await cadGetController.getUserId(params[0]))) {

      return res.status(422).json({ msg: 'Usuário não encontrado' });

    }

    //Verifica verifica se o cnpj é um numero
    if (!parseInt(params[3])) {

      return res.status(422).json({ msg: 'Insira um CNPJ válido.' });

    }

    //Verificar se o cliente já possui cadastro

    const compCode = await cadGetModel.getClientQuery(clientCode)

    if (await cadGetController.getClientCNPJ(params[3]) && !(compCode.cnpj == params[3])) {

      return res.status(422).json({ msg: 'Cliente já possui cadastro.' });

    }

    //Valida nome
    if (params[1].length > 50) {

      return res.status(422).json({ msg: 'Use até 50 caracteres para o nome.' });

    }

    //Valida Razao social
    if (params[2].length > 50) {

      return res.status(422).json({ msg: 'Use até 50 caracteres para a razão social.' });

    }

    //Valida CNPJ
    if (params[3].length < 14 || params[3].length > 14) {

      return res.status(422).json({ msg: 'Insira um CNPJ válido.' });

    }

    //Valida Observação
    if (params[4].length > 150) {

      return res.status(422).json({ msg: 'Use até 150 caracteres para observação.' });

    }

    //Valida Status
    if (params[5].length > 15) {

      return res.status(422).json({ msg: 'Use até 15 caracteres para o status.' });

    }

    try {

      //Grava no banco se todos os testes foram false
      await cadPutModel.putClientQuery(clientCode, params);
      res.status(200).json({
        codigo: clientCode,
        nome: params[1],
        razao: params[2],
        cnpj: params[3],
        obs: params[4],
        status: params[5],
      });

    } catch (error) {

      console.log(error);
      res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente mais tarde.' })

    }
  },

  //PUT Visita

  putVisit: async (req, res) => {
    let visitCode = req.params.codigo;

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

    if (!(await cadGetController.getVisitId(visitCode))) {

      return res.status(404).json({ msg: 'Visita não encontrada' });

    }

    //Valida quantidade de parametros preenchidos
    if (params.length < 4) {

      return res.status(422).json({ msg: 'Estão faltando campos.' });

    }

    //Verifica se o código do cliente é um numero
    if (!parseInt(params[0])) {

      return res.status(422).json({ msg: 'Apenas números no campo cliente' });

    }

    //Verifica se o numero tem até 11 digitos
    if (params[0].length > 11) {

      return res.status(422).json({ msg: 'Insira até 11 dígitos no campo cliente' });

    }

    //Verifica se existe um cliente com o codigo informado
    if (!(await cadGetController.getClientId(params[0]))) {

      return res.status(404).json({ msg: 'Cliente não encontrado' });

    }

    //Verifica se a data está valida
    if (new Date(params[1]) == 'Invalid Date') {

      return res.status(422).json({ msg: 'Insira uma data válida' });

    }

    //verifica descrição
    if (params[2].length > 50) {

      return res.status(422).json({ msg: 'Use até 50 caracteres para descrição.' });

    }

    //Verifica observação
    if (params[3].length > 50) {

      return res.status(422).json({ msg: 'Use até 150 caracteres para descrição.' });

    }

    //Grava no banco se todos os testes foram false
    try {

      await cadPutModel.putVisitQuery(visitCode, params);
      res.status(200).json({
        codigo: visitCode,
        cliente: params[1],
        data: params[2],
        descricao: params[3],
        obsevacao: params[4],
      });

    } catch (error) {

      console.log(error);
      res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente mais tarde.' });

    }
  }
};