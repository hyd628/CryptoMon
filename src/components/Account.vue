<template>
  <div>
    <h1>Account Management</h1>
    Deactivate your account by clicking <a href="#" @click="destroyAccount">here</a>.

  </div>
 </template>

<script>
  import Users from '@/js/users'
  export default {

    name: 'account',

    data () {
      return {
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

a {
  color: #42b983;
} 

</style>