<template>
  <div id="app">
      <Header/>
      <Searchbar/>
  </div>    
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Searchbar from '@/components/Searchbar.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Searchbar
  }
}
</script>
