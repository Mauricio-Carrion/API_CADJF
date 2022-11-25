const db = require('../db');

module.exports = {

  //GET Query's
  getClientQuery: (code) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id_cli, nomfan, razcli, cnpj, obscli, stacli  FROM cadcli WHERE id_cli = ${code}`,
        (error, results) => {
          if (error) { return reject(error); }

          if (results.length > 0) {
            resolve(JSON.parse(JSON.stringify(results[0])));
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
            resolve(true);
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

          if (results.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  },

  getClientHasVisitQuery: (codeClient) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT cli_id FROM cadvis WHERE cli_id = ${codeClient}`,
        (error, results) => {
          if (error) { return reject(error); }

          if (results.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
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
            resolve(JSON.parse(JSON.stringify(results[0])));
          } else {
            resolve(false);
          }
        });
    });
  },

  getVisitIdQuery: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id_vis FROM cadvis WHERE id_vis = ${id}`,
        (error, results) => {
          if (error) { return reject(error); }

          if (results.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  },

  getAllVisitsQuery: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id_vis, datvis, desvis, obsvis FROM cadvis',
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  },

  getUserQuery: (userName) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id_usu, usuario, senha, nomusu, sobusu, adm FROM cadusu WHERE usuario = '${userName}'`,
        (error, results) => {
          if (error) { return reject(error); }

          if (results.length > 0) {
            resolve(JSON.parse(JSON.stringify(results[0])));
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
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  },

  getPasswordQuery: (userName) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT senha FROM cadusu WHERE usuario = '${userName}'`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(JSON.parse(JSON.stringify(results)));
        });
    });
  },

  getUserIdQuery: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id_usu FROM cadusu WHERE id_usu = ${id}`,
        (error, results) => {
          if (error) { return reject(error); }

          if (results.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  },

  getUserNameById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT usuario FROM cadusu WHERE id_usu = ${id}`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(JSON.parse(JSON.stringify(results)));
        })
    })
  },

  getUserHasClientQuery: (codeUser) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT usu_id FROM cadcli WHERE usu_id = ${codeUser}`,
        (error, results) => {
          if (error) { return reject(error); }

          if (results.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  },

  getAllUsersQuery: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id_usu, image ,usuario, nomusu, sobusu, adm FROM cadusu',
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  },

  getVisitsByClientQuery: (clientCode) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id_vis, datvis, desvis, obsvis FROM cadvis WHERE cli_id = ${clientCode}`,
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

  getLogsQuery: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id_log, tiplog, usulog, datlog FROM cadlog',
        (error, results) => {
          if (error) { return reject(error); }
          if (results.length > 0) {
            resolve(results);
          } else {
            resolve(false);
          }
        });
    });
  }
};