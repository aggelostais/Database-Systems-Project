const express = require('express');
const { fetchServices } = require('./queries');
const router = express.Router();

router.get('/', async (req, res) => {
    const services = await fetchServices();
    res.send(services);
})

module.exports = router;