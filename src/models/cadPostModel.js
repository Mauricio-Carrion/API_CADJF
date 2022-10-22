const db = require('../db');

module.exports = {
  //POST Query's

  postUserQuery: (params) => {
    console.log(params)
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO cadcli (usuario, senha, nomusu, sobusu, adm) VALUES ('${params[0]}', '${params[1]}', '${params[2]}', ${params[3]}, ${params[4]})`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  },

  postClientQuery: (params) => {
    console.log(params)
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO cadcli (usu_id, nomfan, razcli, cnpj, obscli, stacli) VALUES (${params[0]}, '${params[1]}', '${params[2]}', ${params[3]}, '${params[4]}', '${params[5]}')`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  }
};