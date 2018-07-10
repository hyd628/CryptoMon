<template>
  <div class="dashboard">
    <router-view></router-view>
  </div>
</template>

<script>
import Users from '@/js/users'
import Layout from './Layout.vue'
import Signup from './Signup.vue'
import Welcome from './Welcome.vue'

export default {

  name: 'dashboard',

  components: {
    Layout,
    Signup,
    Welcome
  },

  computed: {

    web3Exists:{
      cache: false,
      get: function () {
      return (typeof window.web3 !== 'undefined')
      }
    }
  },

  beforeCreate: function () {
    Users.init().then(() => {
      Users.exists(window.web3.eth.accounts[0]).then((exists) => {
        if (exists) {
          Users.authenticate().then(pseudo => {
            this.$store.commit('register', pseudo)
            if(this.$router.currentRoute.path === '/'){
              this.$router.push({ name: 'Home'})

            }
            else {
              this.$router.push(this.$router.currentRoute.path)
            }
          })
        }
        else
        {
          this.$store.commit('deregister')
          this.$router.push({ name: 'Welcome'})
        }
      })
    }).catch(err => {
      this.$store.commit('deregister')
      this.$router.push({ name: 'Welcome'})
      console.log(err)
    })
  },

  created: function() {
      if(!this.web3Exists){
        this.$Message.error({
          render: h => {
            return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
              'Please use a Metamask enabled browser.'])},
          duration: 5,
          closable: true
        });
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
