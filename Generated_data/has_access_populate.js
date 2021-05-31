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
    let access_records = fs.readFileSync('./data/has_access.json', {encoding:'utf8', flag:'r'});
    access_records = JSON.parse(access_records);

    access_records.forEach(access_record => {
        let query = `INSERT INTO has_access(nfc_id, area_id, _start, _end) VALUES(${access_record.nfc_id}, ${access_record.area_id}, "${access_record.start}", "${access_record.end}");`;

        pool.query(query);
    });
}
catch(e){
    throw e;
}