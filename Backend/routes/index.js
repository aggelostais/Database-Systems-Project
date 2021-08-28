const express = require('express');
const { fetchServices, fetchVisits, fetchTrace, fetchCovid, fetchAreaStats, fetchServiceStats, fetchSuccessfulServiceStats, fetchSalesView, fetchCustomerRecord } = require('./queries');
const router = express.Router();

router.get('/services', async (req, res) => {
    const services = await fetchServices();
    res.send(services);
})

router.get('/visits', async (req, res) => {
    const service_id = req.query.service_id;
    const date_start = req.query.date_start;
    const date_end = req.query.date_end;
    const cost_low = req.query.cost_low;
    const cost_high = req.query.cost_high;

    const visits = await fetchVisits(service_id, date_start, date_end, cost_low, cost_high);

    console.log('results length = ' + visits.length);

    res.send(visits);
})

router.get('/trace', async (req, res) => {
    const nfc_id = req.query.nfc_id;
    const id_number = req.query.id_number;
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;

    const trace = await fetchTrace(nfc_id, id_number, first_name, last_name);

    res.send(trace);
})

router.get('/checkCovid', async (req, res) => {
    const nfc_id = req.query.nfc_id;
    const id_number = req.query.id_number;

    const checkCovid = await fetchCovid(nfc_id, id_number);

    res.send(checkCovid);
})

router.get('/areaStats', async (req, res) => {
    const age_low = req.query.age_low;
    const age_high = req.query.age_high;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;

    const stats = await fetchAreaStats(age_low, age_high, start_date, end_date);

    res.send(stats);
})

router.get('/serviceStats', async (req, res) => {
    const age_low = req.query.age_low;
    const age_high = req.query.age_high;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;

    const stats = await fetchServiceStats(age_low, age_high, start_date, end_date);

    res.send(stats);
})

router.get('/successfulServiceStats', async (req, res) => {
    const age_low = req.query.age_low;
    const age_high = req.query.age_high;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;

    const stats = await fetchSuccessfulServiceStats(age_low, age_high, start_date, end_date);

    res.send(stats);
})

router.get('/salesView', async (req, res) => {

    const sales = await fetchSalesView();

    res.send(sales);
})

router.get('/customerRecord', async (req, res) => {
    const nfc_id = req.query.nfc_id;
    const id_number = req.query.id_number;
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;

    const record = await fetchCustomerRecord(nfc_id, id_number, first_name, last_name);

    res.send(record);
})

module.exports = router;