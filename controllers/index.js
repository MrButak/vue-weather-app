const locations = require('../public/javascripts/locations')

exports.index = (req, res, next) => {

    // res.render('index');
    res.sendFile(path + "../public/dist/index.html");
};

exports.searchCity = (req, res, next) => {

    data = Object.keys(req.body)
    data = JSON.parse(data)
    let cities = locations.searchByName(data.city, data.country);
    res.status(200).json(cities)
};

exports.searchCountry = (req, res, next) => {
    
    
    let country = Object.keys(req.body)
    country = country[0];
    let countries = locations.searchByCountry(country);
    res.status(200).json(countries)  
};