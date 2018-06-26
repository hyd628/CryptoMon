<template>
  <div id='nonuser' class='nonuser'>
      <img src="../assets/logo.png">
      <h1>{{ msg }}</h1>
      <h2>Sign up <a href="#" @click="toSignUp">here</a></h2>
      <footer>
        <span>Address Zero Studios &copy; 2018, All Rights Reserved</span>
      </footer>
  </div>
 </template>

<script>
  export default {

    name: 'nonuser',

    data () {
      return {
        msg: 'Welcome to CryptoMon World!'
      }
    },

    methods: {
      toSignUp: function(){
        this.$store.commit('signup')
      }
    }
  }
</script>

<style lang="scss" scoped>


h1, h2 {
  font-weight: normal;
  display: block;
  margin-bottom: 10px;
}

a {
  color: #42b983;
} 

footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  text-align: center;
}
</style>
