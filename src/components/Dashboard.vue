<template>
  <div class="dashboard">
    <component :is="dashLayout"></component>
    <!--
    <div id="dashboardinner" v-if="showUserFront">
      <layout>
        
        Welcome {{ this.$store.state.pseudo }}. Deactivate your account by clicking <a href="#" @click="destroyAccount">here</a>.
        <div>
          <i-input v-model="newmonstername" type="text" placeholder="Enter CryptoMon Name"></i-input>
          <i-button v-on:click="createmon">Create Monster</i-button>
        </div>
        <div>
          <i-input v-model="monsterid" type="text" placeholder="Enter Monster ID"></i-input>
          <i-button v-on:click="showmon">Show Owned Monster</i-button>
        </div> 

      </layout>
    </div>
    <div v-if="showNoUserFront">
      <nonuser></nonuser>
    </div>
    <div v-if="showSignUp">
      <signup></signup>
    </div>-->
  </div>
</template>

<script>
import Users from '@/js/users'
import MonsterFactory from '@/js/monsterfactory'
import layout from './Layout.vue'
import signup from './Signup.vue'
import nonuser from './Nonuser.vue'

/*
const promisify = (inner) =>
     new Promise((resolve, reject) =>
         inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
      })
);
*/
export default {

  name: 'dashboard',

  data () {
    return {
      newmonstername: '',
      monsterid: ''
    }
  },

  components: {
    layout,
    signup,
    nonuser
  },

  computed: {

    web3Exists:{
      cache: false,
      get: function () {
      return (typeof window.web3 !== 'undefined')
      }
    },

    dashLayout: function () {
      return this.$store.getters.dashboardState
    }

  },

  beforeCreate: function () {
    Users.init().then(() => {
      Users.exists(window.web3.eth.accounts[0]).then((exists) => {
        if (exists) {
          /*
          console.log(window.web3.eth.accounts[0])
	        promisify(cb => window.web3.eth.getBalance(window.web3.eth.accounts[0], cb)).then(function(value){
		        console.log(window.web3.fromWei(value, 'ether').toString())
		      })*/
          Users.authenticate().then(pseudo => {
            this.$store.commit('register', pseudo)
          })
        }
        else
        {
          this.$store.commit('deregister')
        }
      })
    }).catch(err => {
      this.$store.commit('deregister')
      console.log(err)
    })
  },

  created: function() {
      if(!this.web3Exists){
        this.$Message.error({
          render: h => {
            return h('span', {style: {fontFamily: 'Avenir', fontSize: '14px'}}, [
              'Please use a Metamask enabled browser.'])},
          duration: 5,
          closable: true
        });
      }
    },

  methods: {
    destroyAccount: function (e) {
      e.preventDefault()
      this.$Loading.start();
      Users.destroy().then(() => {
        this.$Loading.finish();
        this.$store.commit('deregister')
      }).catch(err => {
        this.$Loading.error();
        console.log(err)
      })
    },
    toSignUp: function()
    {
      this.$store.commit('signup')
    },
    createmon: function (){
        if(this.newmonstername !== '' && typeof this.newmonstername !== 'undefined'){
	        MonsterFactory.init().then(() => {
            MonsterFactory.createRandomMonster(this.newmonstername).then(tx => {
                console.log(tx)
              }).catch(err => {
                console.log(err)
              })  
            }).catch(err => {
              console.log(err)
            })
        }
        else
        {
          alert('CryptoMon Name Cannot Be Empty')
        }
    },
    showmon: function (){
        MonsterFactory.init().then(() => {
          MonsterFactory.Monsters(this.monsterid).then(mon => {
	    console.log(mon[0])
	  }).catch(err => {
 	    console.log(err)
          })
        }).catch(err => {
          console.log(err)
    })
   }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
