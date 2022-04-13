<template>
  <div class="AGCLoading" v-if="showLoad">
      <img src="../assets/logo2.png" alt="" srcset="" class="logo-load">
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'AGCLoading',
  components: {
  },
  data: function () {
    return {
        showLoad: true
    }
  },
  mounted() {  
      function showAll(){
          this.showLoad = false
      }    
      setTimeout(showAll, 10000);
  },
  methods: {
    
  },
  computed: {
    
  }
}
</script>

<style scoped src="../style/style.css">
    
</style>
