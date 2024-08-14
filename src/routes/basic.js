const express = require('express');
const router = express.Router();
const { InfluxDB } = require('@influxdata/influxdb-client');

const influx = new InfluxDB({
    url: process.env.INFLUXDB_URL || 'http://influxdb:8086',
    token: process.env.INFLUXDB_TOKEN || 'mytoken123'
});

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the InfluxDB No-Code Solution API',
        influxdb: {
            url: influx.url,
            org: process.env.INFLUXDB_ORG || 'myorg'
        }
    });
});

module.exports = router;
