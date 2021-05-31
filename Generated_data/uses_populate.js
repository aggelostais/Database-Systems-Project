const fs = require('fs');
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

try{
    let uses = fs.readFileSync('./data/use.json', {encoding:'utf8', flag:'r'});
    uses = JSON.parse(uses);

    uses.forEach(use => {
        let query = `INSERT INTO uses(nfc_id, service_id, charge_time, amount, charge_description) VALUES(${use.nfc_id}, ${use.service_id}, "${use.charge_time}", ${use.amount}, "${use.charge_description}");`;

        pool.query(query);
    });
}
catch(e){
    throw e;
}