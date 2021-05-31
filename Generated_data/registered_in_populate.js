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
    let registered_ins = fs.readFileSync('./data/registered_in.json', {encoding:'utf8', flag:'r'});
    registered_ins = JSON.parse(registered_ins);

    registered_ins.forEach(registered_in => {
        let query = `INSERT INTO registered_in(nfc_id, service_id, registration_time) VALUES(${registered_in.nfc_id}, ${registered_in.service_id}, "${registered_in.registration_time}");`;

        pool.query(query);
    });
}
catch(e){
    throw e;
}