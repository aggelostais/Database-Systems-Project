const express = require('express');
const { fetchServices, fetchVisits, fetchTrace } = require('./queries');
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

module.exports = router;