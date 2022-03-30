var express = require('express');
var router = express.Router();
var app = express();
const index = require('../controllers/index')


// allow requests from vue front end
const allowRequest = app.use(function(req, res, next) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// POST route for city search
router.post('/searchcity', index.searchCity);

// POST route for country search
router.post('/searchcountry', index.searchCountry);

module.exports = router;