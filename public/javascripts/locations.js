const { Pool, Client } = require('pg')
config = require('dotenv').config()

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


client.connect();

// Query DB for city and country
exports.searchByName = async (cityName, countryName) => {

    // console.log
    const text = 'SELECT * FROM cities WHERE name ILIKE ($1) AND country ILIKE ($2) LIMIT 30';
    const values = [cityName + "%", countryName];

    
    const res = await client.query(text, values);
    
   
    //await client.end();
    return res.rows; 
};

// Query DB for countries
exports.searchByCountry = async (countryName) => {


    const text = 'SELECT DISTINCT country FROM cities WHERE country ILIKE ($1) LIMIT 10';
    const values = [countryName + "%"];

    const res = await client.query(text, values);

    //await client.end();
    
    return res.rows;
    
    
};