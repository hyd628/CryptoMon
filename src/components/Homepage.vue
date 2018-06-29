<template>
  <div>
      <h1>HomePage Filler Content</h1>
          Welcome {{ this.$store.state.pseudo }}. Deactivate your account by clicking <a href="#" @click="destroyAccount">here</a>.

  </div>
 </template>

<script>
  import Users from '@/js/users'
  export default {

    name: 'homepage',

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
        this.$router.push({ name: 'welcome'})
      }).catch(err => {
        this.$Loading.error();
        console.log(err)
      })
    }
    }
  }
</script>

<style lang="scss" scoped>
</style>
