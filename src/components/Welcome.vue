<template>
  <section id='welcome'>
    <div>
      <img src="../assets/newlogo.svg">
      <h1>{{ msg }}</h1>
      <h2>Sign up <router-link to="/signup">here</router-link></h2>
      <h2>Browse as a <router-link to="/home" v-on:click.native="guestSignIn" >guest</router-link></h2>
      <footer>
        <span>Address Zero Studios &copy; 2018, All Rights Reserved.</span>
      </footer>
    </div>
  </section>
</template>

<script>
  export default {

    name: 'welcome',

    data () {
      return {
        msg: 'Welcome to CryptoMon World!'
      }
    },

    computed: {

    },

    methods: {
      guestSignIn: function(){
        this.$store.commit('register', 'Guest')
        this.$router.push({name: 'Home'})
      }
    }
  }
</script>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css?family=Monda:400,700');

#welcome{
  font-family: 'Monda', sans-serif;
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
