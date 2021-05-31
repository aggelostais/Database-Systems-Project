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
    let customers = fs.readFileSync('./data/customer.json', {encoding:'utf8', flag:'r'});
    customers = JSON.parse(customers);

    customers.forEach(customer => {
        const date = customer.birth_date;
        const splited = date.split('/');
        const reconstructed = splited[2] + "-" + splited[1] + "-" + splited[0];

        let query = `INSERT INTO customer(nfc_id, first_name, last_name, birth_date, id_type, id_number, id_authority) VALUES(${customer.nfc_id}, "${customer.first_name}", "${customer.last_name}", "${reconstructed}", "${customer.id_type}", "${customer.id_number}", "${customer.id_authority}");`;

        pool.query(query);
    });
}
catch(e){
    throw e;
}