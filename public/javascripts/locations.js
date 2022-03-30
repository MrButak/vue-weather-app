const { Pool, Client } = require('pg')
config = require('dotenv').config()

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
//

client.connect();

// Query DB for city and country
exports.searchByName = async(cityName, countryName) => {

    
    const text = 'SELECT * FROM cities WHERE name ILIKE ($1) AND country ILIKE ($2) LIMIT 30';
    const values = [cityName + "%", countryName];

    
    const res = await client.query(text, values);
    //await client.end();
    return res.rows;
    
    // let db = new Database('citylist.db', {verbose: console.log});

	// try {
	// 	let statement = db.prepare('SELECT * FROM cities WHERE name LIKE (?) AND country = (?) LIMIT 30');
	// 	let city = statement.all(cityName + "%", countryName);
	// 	db.close();
	// 	return city;
	// }
    // catch (e) {
	// 	console.log(e);
	// };
    
};

// Query DB for countries
exports.searchByCountry = async(countryName) => {

    const text = 'SELECT DISTINCT country FROM cities WHERE country ILIKE ($1) LIMIT 10';
    const values = [countryName + "%"];
    // const text = 'SELECT DISTINCT country FROM cities WHERE country LIKE ($1) LIMIT 10 RETURNING *';

   
    const res = await client.query(text, values);
    //await client.end();
    return res.rows;
    
    
    // let db = new Database('citylist.db', {verbose: console.log});

	// try {
	// 	let statement = db.prepare('SELECT DISTINCT country FROM cities WHERE country LIKE (?) LIMIT 10');
	// 	let country = statement.all(countryName + "%");
	// 	db.close();
	// 	return country;
	// } 
    // catch (e) {
	// 	console.log(e);
	// };
};