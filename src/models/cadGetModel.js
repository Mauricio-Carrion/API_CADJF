const db = require('../db');

module.exports = {
  //GET Query's
  getClientQuery: (code) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id_cli, nomfan, razcli, cnpj, endcli, numend, cidend, baiend, obscli, stacli  FROM cadcli WHERE id_cli = ${code}`,
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

  getClientCNPJQuery: (code) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id_cli, nomfan, razcli, cnpj, obscli, stacli  FROM cadcli WHERE cnpj = ${code}`,
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

  getAllClientsQuery: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id_cli, nomfan, razcli, cnpj, endcli, numend, cidend, baiend, obscli, stacli  FROM cadcli',
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

  getAllUsersQuery: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id_usu, usuario, senha, nomusu, sobusu, adm FROM cadusu',
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
      db.query(`SELECT id_cli, nomfan, razcli, cnpj, endcli, numend, cidend, baiend, obscli, stacli FROM cadcli WHERE usu_id = ${clientCode}`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  },

  //POST Query's
  postClientQuery: (params) => {
    console.log(params)
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO cadcli (usu_id, nomfan, razcli, cnpj, endcli, numend, cidend, baiend, obscli, stacli) VALUES (${params[0]}, '${params[1]}', '${params[2]}', ${params[3]}, '${params[4]}', ${params[5]}, '${params[6]}', '${params[7]}', '${params[8]}', '${params[9]}')`,
        (error, results) => {
          if (error) { return reject(error); }
          resolve(results);
        });
    });
  }
};