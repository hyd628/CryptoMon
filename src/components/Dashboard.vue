<template>
  <div class="dashboard">
    <div id="dashboardinner" v-if="userExists">
      <layout>
        Welcome {{ pseudo }}. Deactivate your account by clicking <a href="#" @click="destroyAccount">here</a>.
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
    <div id="non-account" v-if="userDoesntExist">
      <img src="../assets/logo.png">
      <h1>{{ msg }}</h1>
      <h2>Sign up <router-link to="/signup">here</router-link></h2>
    </div>
  </div>
</template>

<script>
import Users from '@/js/users'
import MonsterFactory from '@/js/monsterfactory'
import layout from './Layout.vue'

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

const userNotFoundHash = '9C1FB859-E440-4E35-A8C7-96E71BDE37FA';


export default {

  name: 'dashboard',

  data () {
    return {
      msg: 'Welcome to CryptoMon World!',
      pseudo: undefined,
      newmonstername: '',
      monsterid: ''
    }
  },

  components: {
    layout
  },

  computed: {

    userExists:{
      cache: false,
      get: function () {
      return (typeof this.pseudo !== 'undefined' && this.pseudo !== userNotFoundHash)
      }
    },

    userDoesntExist:{
      cache: false,
      get: function () {
      return (typeof this.pseudo !== 'undefined' && this.pseudo == userNotFoundHash)
      }
    },

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
          console.log(window.web3.eth.accounts[0])
	        promisify(cb => window.web3.eth.getBalance(window.web3.eth.accounts[0], cb)).then(function(value){
		        console.log(window.web3.fromWei(value, 'ether').toString())
		      })
          Users.authenticate().then(pseudo => {
            this.pseudo = pseudo
          })
        }
        else
        {
          this.pseudo = userNotFoundHash
        }
      })
    }).catch(err => {
      this.pseudo = userNotFoundHash
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
      Users.destroy().then(() => {
        this.pseudo = userNotFoundHash
      }).catch(err => {
        console.log(err)
      })
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

h1, h2 {
  font-weight: normal;
  display: block;
  margin-bottom: 10px;
}

a {
  color: #42b983;
} 

#non-account{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>
