// searchCountry cityList
let queryCountry = (searchCountryTextInput, countryList) => {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/searchcountry', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    
    // If a POST request happens
    xhr.onreadystatechange = function() { // Call a function when the state changes.

        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

            // the returned object(s) from the database query
            let countryObjs = JSON.parse(xhr.responseText);
        };
    };
    
    // send text input value to database for query
    xhr.send("searchCountry=" + searchCountryTextInput);
};


let queryCity = (searchCityTextInput, searchCountryTextInput, cityList) => {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/searchcity', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    // If a POST request happens
    xhr.onreadystatechange = function() { // Call a function when the state changes.

        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

            // the returned object(s) from the database query
            let cityObjs = JSON.parse(xhr.responseText);
        };
    };

    // send text input values (city, country) to DB for query
    xhr.send("searchCity=" + searchCityTextInput.value + "&searchCountry=" + searchCountryTextInput.value);
    
};

export {queryCountry, queryCity};
