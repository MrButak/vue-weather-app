<template>
    <div class="formWrapper">
        <form method="POST" action="/searchcity" id="searchCityForm">

            <div class="formInputWrapper">
                <button id="currLocationBtn"><span class="material-icons">my_location</span></button>
                <input type="text" name="searchCityTextInput" id="searchCityTextInput" placeholder="Search City" autocomplete="off" required>
                <input type="text" name="searchCountryTextInput" id="searchCountryTextInput" placeholder="US" maxlength="2" size="1" value="US" autocomplete="off" required>
            </div>

            <div class="searchResultsWrapperMain">
                <div class="searchResultsWrapper">
                    <ul id=citySearchResults></ul>
                    <ul id="countrySearchResults"></ul>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
export default {
  name: 'Searchbar',

}
</script>


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
