<template>
  <div id='home'>
      <h1>Welcome, {{ this.$store.state.pseudo }}.</h1>
           Deactivate your account by clicking <a href="#" @click="destroyAccount">here</a>.
          <router-link to="/news">News</router-link>

  </div>
 </template>

<script>
  import Users from '@/js/users'
  export default {

    name: 'home',

    data () {
      return {
        msg: 'Welcome to CryptoMon World!'
      }
    },

    methods: {
      destroyAccount: function (e) {
      e.preventDefault()
      this.$Loading.start();
      Users.destroy().then(() => {
        this.$Loading.finish()
        this.$store.commit('deregister')
        this.$router.push({ name: 'Welcome'})
      }).catch(err => {
        this.$Loading.error();
        console.log(err)
      })
    }
    }
  }
</script>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css?family=Monda:400,700');

#home{

  font-family: 'Monda', sans-serif;

}

a {
  color: #42b983;
} 

</style>
