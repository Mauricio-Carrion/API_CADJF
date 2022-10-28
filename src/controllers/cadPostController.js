const cadPostModel = require('../models/cadPostModel');
const cadGetController = require('./cadGetController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  /**********POST************/

  /////////////Autenticação\\\\\\\\\\\\\

  authUser: async (req, res) => {
    let usuario = req.body.usuario;
    let senha = req.body.senha;

    if (!usuario) {

      return res.status(422).json({ msg: 'Usuario é obrigatório' });

    }

    if (!senha) {

      return res.status(422).json({ msg: 'Senha é obrigatória' });

    }

    if (!(await cadGetController.getUserName(usuario))) {

      return res.status(404).json({ msg: 'Usuário não encontrado' });

    }

    const user = await cadGetController.getUser(usuario);

    console.log(user)

    if (!(await bcrypt.compare(senha, user.senha))) {

      return res.status(422).json({ msg: 'Senha inválida' });

    }

    try {

      const secret = process.env.SECRET;
      const token = jwt.sign({ id: user.id_usu, adm: user.adm }, secret);

      res.status(200).json({ msg: 'Autenticação efetuada com sucesso!', token });

    } catch (error) {

      console.log(error);
      res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' });

    }

  },

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

      return res.status(422).json({ msg: 'Estão faltando campos.' });

    }

    //Verificar se o Usuario já possui cadastro
    if (await cadGetController.getUserName(params[0])) {

      return res.status(404).json({ msg: 'O nome de usuário já possui cadastro.' });

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

      let userCode = await cadPostModel.postUserQuery(params);
      res.status(200).json({
        codigo: userCode.insertId,
        usuario: params[0],
        nome: params[2],
        sobrenome: params[3],
        adm: params[4],
      });

    } catch (error) {

      console.log(error);
      res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' });

    }
  },

  /////////////Post cliente\\\\\\\\\\\\\\
  postClient: async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secret = process.env.SECRET;
    const tokenID = await jwt.verify(token, secret).id;

    //Adiciona parametros da requisição em um array
    const reqParams = [
      usuario = tokenID,
      nome = req.body.nome,
      razcli = req.body.razao,
      cnpj = req.body.cnpj,
      obscli = req.body.obs,
      stacli = req.body.status
    ];
    console.log(tokenID)
    //Retorna apenas parametros preenchidos
    const params = reqParams.filter(e => {
      if (e) {
        return e;
      }
    });

    //Verifica quantidade de campos preenchidos
    if (params.length < 6) {

      return res.status(422).json({ msg: 'Estão faltando campos.' });

    }

    //Verifica verifica se o cnpj é um numero
    if (!parseInt(params[3])) {

      return res.status(422).json({ msg: 'Insira um CNPJ válido.' });

    }

    //Verificar se o cliente já possui cadastro
    if (await cadGetController.getClientCNPJ(params[3])) {

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
      let userCode = await cadPostModel.postClientQuery(params);
      res.status(200).json({
        codigo: userCode.insertId,
        nome: params[1],
        razao: params[2],
        cnpj: params[3],
        obs: params[4],
        status: params[5],
      });

    } catch (error) {

      console.log(error);
      res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' });

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

    try {

      //Grava no banco se todos os testes foram false
      let visitCode = await cadPostModel.postVisitQuery(params);
      res.status(200).json({
        codigo: visitCode.insertId,
        cliente: params[0],
        data: params[1],
        descricao: params[2],
        obsevacao: params[3],
      });

    } catch (error) {

      console.log(error);
      res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' });

    }
  },
};