const express = require('express');
const { fetchServices, fetchVisits } = require('./queries');
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

module.exports = router;