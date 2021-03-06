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

const fetchTrace = async (nfc_id, id_number, first_name, last_name) => {
    try{
        let query;

        if(id_number){
            query = `SELECT visits.nfc_id, customer.first_name, customer.last_name, customer.id_number, visits.area_id, area.area_name, visits._from, visits._to
            FROM customer
            JOIN visits
            ON customer.id_number="${id_number}" AND visits.nfc_id=customer.nfc_id
            JOIN area
            ON visits.area_id = area.area_id
            ORDER BY visits._from ASC;`;
        }
        else if(first_name && last_name){
            query = `SELECT visits.nfc_id, customer.first_name, customer.last_name, customer.id_number, visits.area_id, area.area_name, visits._from, visits._to
            FROM customer
            JOIN visits
            ON customer.first_name="${first_name}" AND customer.last_name="${last_name}" AND visits.nfc_id=customer.nfc_id
            JOIN area
            ON visits.area_id = area.area_id
            ORDER BY visits._from ASC;`;
        }
        else if(nfc_id){
            query = `SELECT visits.nfc_id, customer.first_name, customer.last_name, customer.id_number, visits.area_id, area.area_name, visits._from, visits._to 
            FROM visits
            JOIN area
            ON visits.nfc_id=${nfc_id} AND visits.area_id = area.area_id
            JOIN customer
            ON visits.nfc_id=customer.nfc_id
            ORDER BY visits._from ASC;`;
        }
        else{
            return [];
        }

        console.log(query);

        let res = await pool.query(query);

        // Convert OkPacket to plain object
        res = JSON.parse(JSON.stringify(res));

        return res;
        
    }catch(err){
        throw err;
    }
}

const fetchCovid = async (nfc_id, id_number) => {
    try{
        let query;

        if(id_number){
            query = `SELECT A.nfc_id AS nfc_id_1, A.area_id AS area_id_1, A._from AS from_1, A._to AS to_1, B.nfc_id AS nfc_id_2, customer.id_number, B.area_id AS area_id_2, B._from AS from_2, B._to AS to_2
            FROM visits AS A 
            JOIN visits AS B 
            ON A.area_id = B.area_id AND A.nfc_id <> B.nfc_id AND ((A._from > B._from AND A._from < DATE_ADD(B._to, INTERVAL 1 HOUR)) OR (A._to > B._from AND A._to < DATE_ADD(B._to, INTERVAL 1 HOUR))) 
            JOIN customer
            ON B.nfc_id = customer.nfc_id
            WHERE customer.id_number = "${id_number}";`;
        }
        else if(nfc_id){
            query = `SELECT A.nfc_id AS nfc_id_1, A.area_id AS area_id_1, A._from AS from_1, A._to AS to_1, B.nfc_id AS nfc_id_2, B.area_id AS area_id_2, B._from AS from_2, B._to AS to_2
            FROM visits AS A 
            JOIN visits AS B 
            ON A.area_id = B.area_id AND A.nfc_id <> B.nfc_id AND ((A._from > B._from AND A._from < DATE_ADD(B._to, INTERVAL 1 HOUR)) OR (A._to > B._from AND A._to < DATE_ADD(B._to, INTERVAL 1 HOUR))) 
            WHERE B.nfc_id = ${nfc_id};`;
        }

        console.log(query);

        let res = await pool.query(query);

        // Convert OkPacket to plain object
        res = JSON.parse(JSON.stringify(res));

        return res;
        
    }catch(err){
        throw err;
    }
}

const fetchAreaStats = async (age_low, age_high, start_date, end_date) => {
    try{
        let query = `SELECT COUNT(visits.nfc_id) AS number_of_visits, visits.area_id, area_name
        FROM visits
        JOIN area
        ON visits.area_id = area.area_id
        JOIN customer
        ON visits.nfc_id = customer.nfc_id
        WHERE 1`;

        if(age_low){
            query += ` AND customer.birth_date < CURDATE() - INTERVAL ${age_low} YEAR`;
        }
        if(age_high){
            query += ` AND customer.birth_date > CURDATE() - INTERVAL ${age_high} YEAR`;
        }
        if(start_date){
            query += ` AND visits._from > "${start_date}"`;
        }
        if(end_date){
            query += ` AND visits._from < "${end_date}"`;
        }

        query += ` GROUP BY visits.area_id
        ORDER BY COUNT(visits.nfc_id) DESC;`

        console.log(query);

        let res = await pool.query(query);

        // Convert OkPacket to plain object
        res = JSON.parse(JSON.stringify(res));

        return res;
        
    }catch(err){
        throw err;
    }
}

const fetchServiceStats = async (age_low, age_high, start_date, end_date) => {
    try{
        let query = `SELECT COUNT(visits.nfc_id) AS number_of_visits, service.description
        FROM visits
        JOIN area
        ON visits.area_id = area.area_id
        JOIN service
        ON service.service_id=area.service_id
        JOIN customer
        ON visits.nfc_id = customer.nfc_id
        WHERE 1`;

        if(age_low){
            query += ` AND customer.birth_date < CURDATE() - INTERVAL ${age_low} YEAR`;
        }
        if(age_high){
            query += ` AND customer.birth_date > CURDATE() - INTERVAL ${age_high} YEAR`;
        }
        if(start_date){
            query += ` AND visits._from > "${start_date}"`;
        }
        if(end_date){
            query += ` AND visits._from < "${end_date}"`;
        }

        query += ` GROUP BY service.description
        ORDER BY COUNT(visits.nfc_id) DESC;`

        console.log(query);

        let res = await pool.query(query);

        // Convert OkPacket to plain object
        res = JSON.parse(JSON.stringify(res));

        return res;
        
    }catch(err){
        throw err;
    }
}

const fetchSuccessfulServiceStats = async (age_low, age_high, start_date, end_date) => {
    try{
        let query = `SELECT service.description, COUNT(*) AS number_of_customers
        FROM service
        JOIN
        (SELECT customer.birth_date, SUB.nfc_id, SUB.service_id, SUB.charge_time
        FROM customer
        JOIN 
        (SELECT DISTINCT nfc_id, service_id, charge_time
        FROM uses
        WHERE 1`;
        
        if(start_date){
            query += ` AND uses.charge_time > "${start_date}"`;
        }
        if(end_date){
            query += ` AND uses.charge_time < "${end_date}"`;
        }

        query += `
        GROUP BY nfc_id,service_id) AS SUB
        ON SUB.nfc_id = customer.nfc_id
        WHERE 1`;

        if(age_low){
            query += ` AND customer.birth_date < CURDATE() - INTERVAL ${age_low} YEAR`;
        }
        if(age_high){
            query += ` AND customer.birth_date > CURDATE() - INTERVAL ${age_high} YEAR`;
        }

        query += `) AS B
        ON service.service_id= B.service_id
        GROUP BY service.description;`

        console.log(query);

        let res = await pool.query(query);

        // Convert OkPacket to plain object
        res = JSON.parse(JSON.stringify(res));

        return res;
        
    }catch(err){
        throw err;
    }
}

const fetchSalesView = async () => {
    try{
        let query = `SELECT * FROM sales_per_service;`

        console.log(query);

        let res = await pool.query(query);

        // Convert OkPacket to plain object
        res = JSON.parse(JSON.stringify(res));

        return res;
        
    }catch(err){
        throw err;
    }
}

const fetchCustomerRecord = async (nfc_id, id_number, first_name, last_name) => {
    try{
        let query;

        if(id_number){
            query = `SELECT * FROM customer_records WHERE id_number="${id_number}"`;
        }
        else if(first_name && last_name){
            query = `SELECT * FROM customer_records WHERE first_name="${first_name}" AND last_name="${last_name}"`;
        }
        else if(nfc_id){
            query = `SELECT * FROM customer_records WHERE nfc_id=${nfc_id}`;
        }
        else{
            return [];
        }

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
    fetchVisits,
    fetchTrace,
    fetchCovid,
    fetchAreaStats,
    fetchServiceStats,
    fetchSuccessfulServiceStats,
    fetchSalesView,
    fetchCustomerRecord
}