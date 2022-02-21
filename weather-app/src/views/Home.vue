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
  }
}
</script>
