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
    let visits_events = fs.readFileSync('./data/visit.json', {encoding:'utf8', flag:'r'});
    visits_events = JSON.parse(visits_events);

    visits_events.forEach(visits_event => {
        let query = `INSERT INTO visits(nfc_id, area_id, _from, _to) VALUES(${visits_event.nfc_id}, ${visits_event.area_id}, "${visits_event.from}", "${visits_event.to}");`;

        pool.query(query);
    });
}
catch(e){
    throw e;
}