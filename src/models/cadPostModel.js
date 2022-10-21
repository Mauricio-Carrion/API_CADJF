const db = require('../db');

module.exports = {
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