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
    let areas = fs.readFileSync('./data/newAreas.json', {encoding:'utf8', flag:'r'});
    areas = JSON.parse(areas);

    let is_offered = fs.readFileSync('./data/is_offered.json', {encoding:'utf8', flag:'r'});
    is_offered = JSON.parse(is_offered);

    areas.forEach(area => {

        const obj = is_offered.find(offer => offer.area_id === area.area_id);
        
        let query;
        if(obj){
            const service_id = obj.service_id;
            query = `INSERT INTO area(area_id, beds, area_name, area_description, service_id) VALUES(${area.area_id}, ${area.beds}, "${area.area_name}", "${area.area_description}", ${service_id});`;
        }
        else{
            query = `INSERT INTO area(area_id, beds, area_name, area_description, service_id) VALUES(${area.area_id}, ${area.beds}, "${area.area_name}", "${area.area_description}", NULL);`;
        }

        pool.query(query);
    });
}
catch(e){
    throw e;
}