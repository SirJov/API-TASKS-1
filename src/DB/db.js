const mysql = require("mysql2");
require("dotenv").config();

const con = mysql.createConnection({
  host: process.env.my_host,
  user: process.env.my_user,
  password: process.env.my_password,
  database: process.env.my_db,
});

module.exports = con;
