<script>
import axios from 'axios'
let reAlpha = /^[a-z]+$/i
export default {
    
    name: 'Searchbar',
    data() {
        return {
            countries: null,
            cities: null,
            cityResults: null,
            countryResults: null
           
        }
    },
    mounted() {
        this.cityResults = this.$refs.cityResults,
        this.countryResults = this.$refs.countryResults
    },
    methods: {

        async searchCountry(event, input) {
        
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
            
            // Here I'd like to remove previous search results if field is blank
                // but for some reason afterwards the search results do not want to
                // render to the dom as normal. The database queries continue (see in console).

            // if(cityInput.value.length < 1) {
            //     this.clearList(this.cityResults)
            //     cityInput.value = ""
            //     return
            // }


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
        },
        clearList(list) {
            while (list.firstChild) {
                list.removeChild(list.firstChild)
            }
            
        }
    }
}
</script>


<template>
    <div class="formWrapper">
        <form method="POST" action="/searchcity" id="searchCityForm">

            <div class="formInputWrapper">
                <button id="currLocationBtn"><span class="material-icons">my_location</span></button>
                <!-- the first two @keypress prevent form submission on 'enter' -->
                <input @keypress.enter="$event.preventDefault()" @keyup="searchCity($event, this.$refs.searchCityInput, this.$refs.searchCountryInput)" ref="searchCityInput" type="text" name="searchCityTextInput" id="searchCityTextInput" placeholder="Search City" autocomplete="off" required>
                <input @keypress.enter="$event.preventDefault()" @keyup="searchCountry($event, this.$refs.searchCountryInput); clearList(this.$refs.cityResults)" ref="searchCountryInput" type="text" name="searchCountryTextInput" id="searchCountryTextInput" placeholder="US" maxlength="2" size="1" value="US" autocomplete="off" required>
            </div>
            
            <div class="searchResultsWrapperMain">
                <div class="searchResultsWrapper">

                    <ul ref="cityResults" id=citySearchResults>
                        <li @click="clearList(this.$refs.cityResults)" v-for="city in cities">
                            <!-- display state name only in US -->
                            <text v-if="city['country'] == 'US'">{{ city['name'] + ", " + city['state'] + ", " + city['country']}}</text>
                            <text v-else>{{ city['name'] + ", " + city['country']}}</text>
                        </li>
                    </ul>

                    <ul ref="countryResults" id="countrySearchResults">

                        <li @click="setCountry(country['country']); clearList(this.$refs.countryResults)" v-for="country in countries">
                            {{ country['country'] }}
                        </li>
                    </ul>

                </div>
            </div>

        </form>
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
}
.searchResultsWrapper {
    /* border: 1px solid black; */
    background-color: #E8FFFF;
    width: 89.5%;
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
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
