const db = require('../db');

module.exports = {

  //GET Query's
  getClientQuery: (code) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id_cli, nomfan, razcli, cnpj, obscli, stacli  FROM cadcli WHERE id_cli = ${code}`,
        (error, results) => {
          if (error) { return reject(error); }

          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(false);
          }
        });
    });
  },

  getClientCNPJQuery: (cnpj) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT cnpj FROM cadcli WHERE cnpj = ${cnpj}`,
        (error, results) => {
          if (error) { return reject(error); }

          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(false);
          }
        });
    });
  },

  getClientIdQuery: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id_cli FROM cadcli WHERE id_cli = ${id}`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  },

  getAllClientsQuery: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id_cli, nomfan, razcli, cnpj, obscli, stacli  FROM cadcli',
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  },

  getVisitQuery: (visitCode) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT datvis, desvis, obsvis FROM cadvis WHERE id_vis = ${visitCode}`,
        (error, results) => {
          if (error) { return reject(error); }

          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(false);
          }
        });
    });
  },

  getAllVisitsQuery: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT datvis, desvis, obsvis FROM cadvis',
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  },

  getUserQuery: (userCode) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id_usu, usuario, senha, nomusu, sobusu, adm FROM cadusu WHERE id_usu = ${userCode}`,
        (error, results) => {
          if (error) { return reject(error); }

          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(false);
          }
        });
    });
  },

  getUserNameQuery: (userName) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT usuario FROM cadusu WHERE usuario = '${userName}'`,
        (error, results) => {
          if (error) { return reject(error); }

          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(false);
          }
        });
    });
  },

  getAllUsersQuery: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id_usu, usuario, senha, nomusu, sobusu, adm FROM cadusu',
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  },

  getVisitsByClientQuery: (clientCode) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT datvis, desvis, obsvis FROM cadvis WHERE cli_id = ${clientCode}`,
        (error, results) => {
          if (error) { return reject(error) }
          resolve(results);
        });
    });
  },

  getClientsByUserQuery: (clientCode) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id_cli, nomfan, razcli, cnpj, obscli, stacli FROM cadcli WHERE usu_id = ${clientCode}`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  },
};