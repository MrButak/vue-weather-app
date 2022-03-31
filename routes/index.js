var express = require('express');
var router = express.Router();
var app = express();
const index = require('../controllers/index')

// POST route for city search
router.post('/searchcity', index.searchCity);

// POST route for country search
router.post('/searchcountry', index.searchCountry);

module.exports = router;