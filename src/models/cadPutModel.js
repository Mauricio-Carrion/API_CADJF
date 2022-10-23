const db = require('../db');

module.exports = {
  putUserQuery: (code, params) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE cadusu SET usuario = '${params[0]}', senha = '${params[1]}', nomusu = '${params[2]}', sobusu = '${params[3]}', adm = ${params[4]} WHERE id_usu = ${code}`,
        (error, results) => {
          if (error) { return reject(error) }
          resolve(results);
        });
    });
  }
};