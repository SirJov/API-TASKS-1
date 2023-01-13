const mysql = require("mysql2");
require("dotenv").config();

const con = mysql.createConnection(process.env.my_host);

module.exports = con;
