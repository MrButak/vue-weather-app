

<script>
import axios from 'axios'
let reAlpha = /^[a-z]+$/i
//let citySearchResults = document.getElementById('citySearchResults')
export default {
    
    name: 'Searchbar',
    data() {
       return {
           countries: null,
           cities: null,
           citySearchResults: document.getElementById('citySearchResults')
           
       }
    },
    // mounted() {
        
    //   axios.post('http://127.0.0.1:3000/searchcountry')
    //     .then((response) => {
    //         this.info = response;
    //     }) 
    // },
    methods: {

        async searchCountry(input) {
            
            // only query database for alpa chars
            if(reAlpha.test(input.value)) {
                let countryInput = input.value
                
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
        async searchCity(input) {
            
            // only query database for alpa chars
            if(reAlpha.test(input.value)) {
                let searchData = JSON.stringify({city : input.value, country: searchCountryTextInput.value})
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
            
            if(list.childElementCount > 0) {
                let first = list.firstElementChild;
                while(first) {
                    first.remove();
                    first = list.firstElementChild;
                }
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
                <input @keyup="searchCity(this.$refs.searchCityInput)" ref="searchCityInput" type="text" name="searchCityTextInput" id="searchCityTextInput" placeholder="Search City" autocomplete="off" required>
                <input @keyup="searchCountry(this.$refs.searchCountryInput); clearList(this.$refs.cityResults)" ref="searchCountryInput" type="text" name="searchCountryTextInput" id="searchCountryTextInput" placeholder="US" maxlength="2" size="1" value="US" autocomplete="off" required>
            </div>
            
            <div class="searchResultsWrapperMain">
                <div class="searchResultsWrapper">
                    <ul ref="cityResults" id=citySearchResults>
                        <li @click="clearList(this.$refs.cityResults)" v-for="city in cities">
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
