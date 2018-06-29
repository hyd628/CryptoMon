<template>
  <div id='welcome'>
      <img src="../assets/logo.png">
      <h1>{{ msg }}</h1>
      <h2>Sign up <router-link to="/signup">here</router-link></h2>
      <h2>Browse as a <router-link to="/dashboard" v-on:click.native="guestSignIn" >guest</router-link></h2>
      <footer>
        <span>Address Zero Studios &copy; 2018, All Rights Reserved</span>
      </footer>
  </div>
 </template>

<script>
  export default {

    name: 'welcome',

    data () {
      return {
        msg: 'Welcome to CryptoMon World!'
      }
    },

    methods: {
      guestSignIn: function(){
        this.$store.commit('register', 'Guest')
      }
    }
  }
</script>

<style lang="scss" scoped>

#welcome{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px; 
}

h1, h2, h3 {
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
