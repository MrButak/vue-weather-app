const locations = require('../public/javascripts/locations')

exports.searchCity = async (req, res, next) => {

    data = Object.keys(req.body)
    data = JSON.parse(data)

    try {
        let cities = await locations.searchByName(data.city, data.country);
        res.status(200).json(cities);
    }
    catch(err) {
        console.log(err);
    };
    
};

exports.searchCountry = async (req, res, next) => {
    
    let country = Object.keys(req.body)
    country = country[0];

    try {
        let countries = await locations.searchByCountry(country);
        res.status(200).json(countries);
    }
    catch(err) {
        console.log(err);
    };
     
};

