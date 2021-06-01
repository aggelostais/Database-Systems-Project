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

const fetchVisits = async (service_id, date_start, date_end, cost_low, cost_high) => {
    try{
        let query;

        if(cost_low || cost_high){
            query = `SELECT uses.nfc_id, uses.service_id, uses.amount, uses.charge_description, uses.charge_time, area.area_name, visits._from, visits._to
            FROM uses
            JOIN area
                ON area.service_id = uses.service_id
            JOIN visits
                ON area.area_id = visits.area_id AND uses.nfc_id = visits.nfc_id AND uses.charge_time <= visits._to AND uses.charge_time >= visits._from
            WHERE`;

            if(cost_low){
                query += ` uses.amount >= ${cost_low} AND`;
            }
            if(cost_high){
                query += ` uses.amount <= ${cost_high} AND`;
            }
        }
        else{
            query = `SELECT *
            FROM visits
            JOIN area
                ON area.area_id = visits.area_id
            WHERE`;
        }

        if(date_start){
            query += ` visits._to >= "${date_start}" AND`;
        }
        if(date_end){
            query += ` visits._from <= "${date_end}" AND`;
        }
        
        if(service_id){
            query += ` area.service_id = ${service_id} AND`;
        }

        query += ` 1 ORDER BY visits._from ASC;`;

        console.log(query);

        let res = await pool.query(query);

        // Convert OkPacket to plain object
        res = JSON.parse(JSON.stringify(res));

        return res;
        
    }catch(err){
        throw err;
    }
}

module.exports = {
    fetchServices,
    fetchVisits
}