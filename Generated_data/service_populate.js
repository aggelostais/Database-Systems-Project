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
    let services = fs.readFileSync('./data/service.json', {encoding:'utf8', flag:'r'});
    services = JSON.parse(services);

    services.forEach(service => {
        let query = `INSERT INTO service(service_id, description, requires_registration) VALUES(${service.service_id}, "${service.description}", ${service.requires_registration});`;

        pool.query(query);
    });
}
catch(e){
    throw e;
}