<script>
import axios from 'axios'
let reAlpha = /^[a-z]+$/i
export default {
    
    name: 'Searchbar',
    data() {
        return {
            countries: {},
            cities: {},
            showCity: true,
            showCountry: true,
            showWeather: false,
            fahrenheit: true,
            // dom variables
            cityName: "",
            currentTemp: 0,
            maxTemp: 0,
            minTemp: 0,
            tempSymbol: "",
            weatherImageUrl: "",
            errorMessage: "",
            country: "",
            state: ""
        }
    },
    
    methods: {
        async searchCountry(event, input) {
            
            // hide weather data and search city div
            this.showWeather = false;
            this.showCity = false; 
            this.showCountry = true;
            // only query database for alpa chars and backspace
            if(!reAlpha.test(event.key) && event.keyCode != 8) {
                return;
            };
            let response = await axios({
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: '/searchcountry',
                data: input.value  
            })
            
            this.countries = response.data;
            return this.countries;   
        },
        async searchCity(event, cityInput, countryInput) {
            // hide weather data div
            this.showWeather = false;
            // if search input has no value hide search results
            if(cityInput.value.length < 1) {
                this.showCity = false;
                return;
            };
            // show city search results div
            this.showCity = true;
            // only query database for alpa chars, backspace, or spacebar
            if(!reAlpha.test(event.key) && event.keyCode != 8 && event.keyCode != 32) {
                return;
            }
                let searchData = JSON.stringify({city : cityInput.value, country: countryInput.value});
                let response = await axios({
                    method: 'post',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: '/searchcity',
                    data: searchData
                })
                
                this.cities = response.data;
                return this.cities;
            
        },
        setCountry(value) {
            searchCountryTextInput.value = value;
            // clear search city text input and hide city search results
            this.showCity = false;
            this.$refs.searchCityInput.value = "";
            
        },
        
        async fetchApi(event, cityData) {
            // default temp unit in farenheit
            this.fahrenheit = true;
            
            // clear search city text input
            this.$refs.searchCityInput.value = "";
            // api call
            let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.lat}&lon=${cityData.lon}&units=imperial&exclude=minutely,hourly&appid=65388c50a787be295df1ae5b1f2c37ea`, {mode: 'cors'});
            let weatherData = await response.json();
            
            // console.table(weatherData)
            // handle errors
            if(!response.ok) {
                this.errorMessage = data.message;
                return;
            };
            return(this.displayWeatherData(weatherData, cityData));
        },
        displayWeatherData(weatherData, cityData) {
            
            // show weather data div
            this.showWeather = true;
            // default temp unit in fahrenheit
            this.currentTemp = Math.round(weatherData.current.temp);
            this.minTemp = Math.round(weatherData.daily[0].temp.min);
            this.maxTemp = Math.round(weatherData.daily[0].temp.max);
            this.tempSymbol = "°F";
        
            this.cityName = cityData.name;
            this.state = cityData.state;
            this.country = cityData.country;
            
            // get weather image
            this.weatherImageUrl = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
        },
        convertTemp(cTemp, miTemp, mxTemp) {
            
            switch(this.fahrenheit) {
                // for celcius
                case true:
                    this.fahrenheit = false;
                    this.tempSymbol = "°C";
                    this.currentTemp = Math.round((cTemp - 32) * .556);
                    this.minTemp = Math.round((miTemp - 32) * .556);
                    this.maxTemp = Math.round((mxTemp - 32) * .556);
                    return;
                // for fahrenheit
                case false:
                    this.fahrenheit = true;
                    this.tempSymbol = "°F";
                    this.currentTemp = Math.round(cTemp * 1.8 + 32);
                    this.minTemp = Math.round(miTemp * 1.8 + 32);
                    this.maxTemp = Math.round(mxTemp * 1.8 + 32);
                    return;
            };
        },
        getCurrentLocation() {
            navigator.geolocation.getCurrentPosition((position) => {
                this.fetchApiCurrentLocation(position);
            });
        },
        async fetchApiCurrentLocation(position) {
            
            // js Geolocation Api only provides lat, lon, so this api call gets information located in cityInfo below
            // api call for general info on lat, lon
            let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=65388c50a787be295df1ae5b1f2c37ea`, {mode: 'cors'});
            let weatherInfo = await response.json();
            if(!response.ok) {
                this.errorMessage = data.message;
                return;
            };
            // store location information
            let cityInfo = {
                name: weatherInfo.name,
                country: weatherInfo.sys.country,
                state: null,
                lat: weatherInfo.coord.lat,
                lon: weatherInfo.coord.lon
            };
            // api call for weather info
            let responseTwo = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${cityInfo.lat}&lon=${cityInfo.lon}&units=imperial&exclude=minutely,hourly&appid=65388c50a787be295df1ae5b1f2c37ea`, {mode: 'cors'});
            let weatherData = await responseTwo.json();
            if(!responseTwo.ok) {
                this.errorMessage = data.message;
                return;
            };
            return(this.displayWeatherData(weatherData, cityInfo));
        }
    }
};
</script>


<template>

    <div class="formWrapper">
        
        <div class="formInputWrapper">
            <button @click="getCurrentLocation" id="currLocationBtn"><span class="material-icons">my_location</span></button>
            <input @keyup="searchCity($event, this.$refs.searchCityInput, this.$refs.searchCountryInput)" ref="searchCityInput" type="text" name="searchCityTextInput" id="searchCityTextInput" placeholder="Search City" autocomplete="off" required>
            <input @keyup="searchCountry($event, this.$refs.searchCountryInput)" ref="searchCountryInput" type="text" name="searchCountryTextInput" id="searchCountryTextInput" placeholder="US" maxlength="2" size="1" value="US" autocomplete="off" required>
        </div>
        
        <div class="searchResultsWrapperMain">
            <div class="searchResultsWrapper">

                <ul v-show="showCity" ref="cityResults" id=citySearchResults>
                    <li @click="fetchApi($event, city); this.showCity = false" v-for="city in cities">
                        <!-- display state name only in US cities -->
                        <span v-if="city['country'] == 'US'">{{ city['name'] + ", " + city['state']}}</span>
                        <span v-else>{{ city['name'] + ", " + city['country']}}</span>
                    </li>
                </ul>

                <ul v-show="showCountry" ref="countryResults" id="countrySearchResults">
                    <li @click="setCountry(country['country']); this.showCountry = false" v-for="country in countries">
                        {{ country['country'] }}
                    </li>
                </ul>

            </div>
        </div>
    </div>

    <p id="errorMessage" style="text-align: center;">{{  errorMessage }}</p>

    <div v-show="showWeather" class="dataWrapperMain">
        <div id="dataWrapper">
            <p id="cityName">{{ cityName }} {{ state }} {{ country }}</p>
            <img :src="weatherImageUrl" id="weatherImg">
            <text>Current Temp</text>
            <p id=currentTemp>{{ currentTemp }} {{ tempSymbol }}</p>
            <p>High {{ maxTemp }} {{ tempSymbol }} / Low {{ minTemp }} {{ tempSymbol }}</p>
            <label class="switch">
                <input @click="convertTemp(this.currentTemp, this.minTemp, this.maxTemp)" type="checkbox">
                <span class="slider round"></span>
            </label>
        </div>
    </div>
    
</template>


<style>
/*start search form*/
.formWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: -33px;
}
#searchCityForm {
    display: inline-flex;
    flex-direction: column;
    justify-content: center; 
}
.formInputWrapper {
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
}
#currLocationBtn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    border-color: #213E3B;
}
#searchCityTextInput {
    width: 70%;
    border-left: none;
    border-right: none;
    border-radius: 0;
    border-color: #213E3B;
}
#searchCountryTextInput {
    width: 44px;
    border-radius: 0;
    text-align: center;
    border-color: #213E3B;
}
#citySearchResults , #countrySearchResults {
    padding: 0;
    list-style: none;
}
.searchResultsWrapperMain {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.searchResultsWrapper {
    background-color: #E8FFFF;
    width: auto;
}
li {
    transition: ease-in-out;
}
li:hover {
    background-color: #A6F6F1;
}
/*end search form*/
/* start weather results */
.dataWrapperMain {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 30px;
}
#dataWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
/* end weather results */
/* start button slider switch*/ 
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #41AEA9;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color:#41AEA9;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: #41AEA9;
}
input:focus + .slider {
  box-shadow: 0 0 1px #41AEA9;
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
  background-color: #E8FFFF;
}
/* end button slider switch*/ 
</style>