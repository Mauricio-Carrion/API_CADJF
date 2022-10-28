const db = require('../db');

module.exports = {
  //POST Query's

  postUserQuery: (params) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO cadusu (usuario, senha, nomusu, sobusu, adm) VALUES ('${params[0]}', '${params[1]}', '${params[2]}', '${params[3]}', ${params[4]})`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  },

  postClientQuery: (params) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO cadcli (usu_id, nomfan, razcli, cnpj, obscli, stacli) VALUES (${params[0]}, '${params[1]}', '${params[2]}', ${params[3]}, '${params[4]}', '${params[5]}')`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  },

  postVisitQuery: (params) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO cadvis (cli_id, datvis, desvis, obsvis) VALUES (${params[0]}, '${params[1]}', '${params[2]}', '${params[3]}')`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  },

  postLogDelete: (action, code, where, user) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO cadlog VALUES(null,'${action}','Usuário ${user}. Exclusão de ${where}. Código ${code}', NOW())`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  }
};