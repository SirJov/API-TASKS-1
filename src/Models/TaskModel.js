const con = require("../DB/db");

const taskModel = async (query, params) => {
  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        reject(err);
        con.end();
      }
      if (params) {
        con.query(query, params, function (err, result, fields) {
          if (err) {
            reject(err);
            con.end();
          }

          resolve(result);
        });
      }

      con.query(query, function (err, result, fields) {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  });
};

module.exports = taskModel;
