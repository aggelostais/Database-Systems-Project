const mysql = require('mysql');
const util = require('util');
const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  port            : 3306,
  user            : 'db_user',
  password        : 'db_user',
  database        : 'dbsystems2021',
  dateStrings     : true
});

pool.query = util.promisify(pool.query) // Magic happens here.

const fetchServices = async () => {
    try{
        let query = `SELECT * FROM service;`;

        let res = await pool.query(query);

        // Convert OkPacket to plain object
        res = JSON.parse(JSON.stringify(res));

        return res;
        
    }catch(err){
        throw err;
    }
}

module.exports = {
    fetchServices
}