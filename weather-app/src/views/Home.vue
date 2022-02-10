<template>
  <div id="app">
      <Header/>
      <Searchbar/>
      <Footer/>
  </div>    
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Header from '@/components/Header.vue'
import Searchbar from '@/components/Searchbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Searchbar,
    Footer
  },
  data() {
      
      return {
          info: null
      }
  }
//   mounted() {

//       axios.get('http://127.0.0.1:3000/searchcountry')
//         .then((response) => {
//             this.info = response;
//         }) 
//   }
  
}
</script>
