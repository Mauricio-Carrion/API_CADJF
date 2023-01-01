const db = require('../db');

module.exports = {
  deleteUserQuery: (code) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM cadusu WHERE id_usu = ${code}`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  },

  deleteClientQuery: (code) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM cadcli WHERE id_cli = ${code}`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  },

  deleteVisitQuery: (code) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM cadvis WHERE id_vis = ${code}`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  }
};
