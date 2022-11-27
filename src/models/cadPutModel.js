const db = require('../db');

module.exports = {
  putUserQuery: (code, params) => {
    return new Promise((resolve, reject) => {

      db.query(`UPDATE cadusu SET image='${params[0]}', usuario = '${params[1]}', senha = '${params[2]}', nomusu = '${params[3]}', sobusu = '${params[4]}', adm = ${params[5]} WHERE id_usu = ${code}`,
        (error, results) => {
          if (error) { return reject(error) }
          resolve(results);
        });

      // else {
      //   db.query(`UPDATE cadusu SET image=null, usuario = '${params[0]}', senha = '${params[1]}', nomusu = '${params[2]}', sobusu = '${params[3]}', adm = ${params[4]} WHERE id_usu = ${code}`,
      //     (error, results) => {
      //       if (error) { return reject(error) }
      //       resolve(results);
      //     });
      // }
    });
  },

  putClientQuery: (code, params) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE cadcli SET usu_id = ${params[0]}, nomfan = '${params[1]}', razcli = '${params[2]}', cnpj = ${params[3]}, obscli = '${params[4]}', stacli = '${params[5]}' WHERE id_cli = ${code}`,
        (error, results) => {
          if (error) { return reject(error) }
          resolve(results);
        });
    });
  },

  putVisitQuery: (code, params) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE cadvis SET cli_id = ${params[0]}, datvis = '${params[1]}', desvis = '${params[2]}', obsvis = '${params[3]}' WHERE id_vis = ${code}`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  }
};