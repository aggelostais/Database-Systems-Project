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
    let emails = fs.readFileSync('./data/email.json', {encoding:'utf8', flag:'r'});
    emails = JSON.parse(emails);

    emails.forEach(email => {
        let query = `INSERT INTO email(nfc_id, email_address) VALUES(${email.nfc_id}, "${email.email_address}");`;

        pool.query(query);
    });
}
catch(e){
    throw e;
}

try{
    let phones = fs.readFileSync('./data/phones.json', {encoding:'utf8', flag:'r'});
    phones = JSON.parse(phones);

    phones.forEach(phone => {
        let query = `INSERT INTO phone(nfc_id, phone_number) VALUES(${phone.nfc_id}, "${phone.phone_number}");`;

        pool.query(query);
    });
}
catch(e){
    throw e;
}