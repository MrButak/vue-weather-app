<script>
import axios from 'axios'
let reAlpha = /^[a-z]+$/i

export default {
    
    name: 'Searchbar',
    data() {
        return {
            countries: null,
            cities: null,
            cityShow: true,
            countryShow: true,
            weatherShow: false,
            fahrenheit: false,
            kelvin: null,
            // dom
            cityName: null,
            currentTemp: null,
            maxTemp: null,
            minTemp: null,
            weatherImageUrl: null,
            errorMessage: null,
            tempBtn: null,
            country: null,
            state: null
            
        }
    },
    
    methods: {

        async searchCountry(event, input) {
            
            // hide weather data div
            this.weatherShow = false
            // only query database for alpa chars and backspace
            if(reAlpha.test(event.key) || event.keyCode === 8) {
                
                
                let response = await axios({
                    method: 'post',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: 'http://127.0.0.1:3000/searchcountry',
                    data: input.value
                     
                })
                
                .then((response) => {
                    console.log(response.data)
                    
                    this.countries = response.data;
                    return this.countries
                });
            };
            return;
        },

        async searchCity(event, cityInput, countryInput) {

            // hide weather data div
            this.weatherShow = false
            // if search input has no value hide search results
            if(cityInput.value.length < 1) {
                this.cityShow = false
                return
            }
            // show city search results div
            this.cityShow = true
            // only query database for alpa chars, backspace, or spacebar
            if(reAlpha.test(event.key)  || event.keyCode === 8 || event.keyCode === 32) {
        
                let searchData = JSON.stringify({city : cityInput.value, country: countryInput.value})
                let response = await axios({
                    method: 'post',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: 'http://127.0.0.1:3000/searchcity',
                    data: searchData
                })
                
                .then((response) => {
                    console.log(response.data)
                    
                    this.cities = response.data;
                    return this.cities
                });
            };
            return;
        },

        setCountry(value) {
            searchCountryTextInput.value = value

            // clear search city text input and hide city search results
            this.cityShow = false
            this.$refs.searchCityInput.value = ""
            
        },
        
        async fetchApi(event, cityData) {

            
            // clear search city text input
            this.$refs.searchCityInput.value = ""

            let cityId = cityData.cityid;
            
            // api call
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=65388c50a787be295df1ae5b1f2c37ea`, {mode: 'cors'});
            let weatherData = await response.json();
            
            // handle errors
            if(!response.ok) {
                this.errorMessage = data.message;
                return;
            };
            return(this.displayWeatherData(weatherData, cityData))
        },

        displayWeatherData(weatherData, cityData) {
            
            // show weather data div
            this.weatherShow = true
            // default display in fahrenheit
            this.fahrenheit = false
            this.kelvin = weatherData.main.temp
            this.minTemp = weatherData.main.temp_min 
            this.maxTemp = weatherData.main.temp_max
            this.cityName = weatherData.name
            this.state = cityData.state
            this.country = cityData.country
            this.weatherImageUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
            

            this.convertTemp(this.kelvin)
            
            console.log(weatherData)
        },

        convertTemp(kelvin) {
            
            switch(this.fahrenheit) {
                // for celcius
                case true:
                    this.fahrenheit = false
                    this.tempBtn = "°C"
                    this.currentTemp = Math.round(kelvin - 273.15) + " °C"
                    return
                // for fahrenheit
                case false:
                    this.fahrenheit = true
                    this.tempBtn = "°F"
                    this.currentTemp = Math.round((kelvin - 273.15) * 1.8 + 32) + " °F"
                    return
            }
        },

        getCurrentLocation() {

            navigator.geolocation.getCurrentPosition((position) => {
                
                this.fetchApiCurrentLocation(position)
            })
            
            
        },

        async fetchApiCurrentLocation(position) {
            let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=65388c50a787be295df1ae5b1f2c37ea`, {mode: 'cors'});
            let weatherData = await response.json();
            
            if(!response.ok) {
                this.errorMessage = data.message;
                return;
            };
            return(this.displayWeatherData(weatherData));
        }
    }
}
</script>


<template>

    <div class="formWrapper">
        
        <div class="formInputWrapper">
            <button @click="getCurrentLocation" id="currLocationBtn"><span class="material-icons">my_location</span></button>
            <input @keyup="searchCity($event, this.$refs.searchCityInput, this.$refs.searchCountryInput)" ref="searchCityInput" type="text" name="searchCityTextInput" id="searchCityTextInput" placeholder="Search City" autocomplete="off" required>
            <input @keyup="searchCountry($event, this.$refs.searchCountryInput); this.cityShow = false; this.countryShow = true" ref="searchCountryInput" type="text" name="searchCountryTextInput" id="searchCountryTextInput" placeholder="US" maxlength="2" size="1" value="US" autocomplete="off" required>
        </div>
        
        <div class="searchResultsWrapperMain">
            <div class="searchResultsWrapper">

                <ul v-show="cityShow" ref="cityResults" id=citySearchResults>
                    <li @click="fetchApi($event, city); this.cityShow = false" v-for="city in cities">
                        <!-- display state name only in US cities -->
                        <span v-if="city['country'] == 'US'">{{ city['name'] + ", " + city['state']}}</span>
                        <span v-else>{{ city['name'] + ", " + city['country']}}</span>
                    </li>
                </ul>

                <ul v-show="countryShow" ref="countryResults" id="countrySearchResults">
                    <li @click="setCountry(country['country']); this.countryShow = false" v-for="country in countries">
                        {{ country['country'] }}
                    </li>
                </ul>

            </div>
        </div>
    </div>

    <p id="errorMessage" style="text-align: center;">{{  errorMessage }}</p>

    <div v-show="weatherShow" class="dataWrapperMain">
        <div id="dataWrapper">
            <p id="cityName">{{ cityName }}, {{ state }} {{ country }}</p>
            <img :src="weatherImageUrl" id="weatherImg">
            <text>Current Temp</text>
            <p id=currentTemp>{{ currentTemp }}</p>
            <p>High {{ maxTemp }} / Low {{ minTemp }}</p>
            <label class="switch">
                <input @click="convertTemp(this.kelvin)" type="checkbox">
                <span class="slider round"></span>
            </label>

        
        </div>
    </div>
    
</template>


<style>
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
    /*border: 1px solid black;*/
    background-color: #E8FFFF;
    width: auto;
}
li {
    transition: ease-in-out;
}
li:hover {
    background-color: #A6F6F1;
}

/* weather results */
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

/* start button slider switch*/ 

/* The switch - the box around the slider */
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

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
  background-color: #E8FFFF;
}
/* end button slider switch*/ 
</style>
