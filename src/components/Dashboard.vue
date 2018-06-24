<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    <div v-if="userExists">
      Welcome {{ pseudo }}. Deactivate your account by clicking <a href="#" @click="destroyAccount">here</a>.
    </div>
    <div v-else>Sign up <router-link to="/signup">here</router-link>.</div>
    <div><i-input v-model="newmonstername" type="text" placeholder="Enter CryptoMon Name"></i-input>
    <i-button v-on:click="createmon">Create Monster</i-button></div>

    <div><i-input v-model="monsterid" type="text" placeholder="Enter Monster ID"></i-input>
     <i-button v-on:click="showmon">Show Owned Monster</i-button></div>

  </div>

</template>

<script>
import Users from '@/js/users'
import MonsterFactory from '@/js/monsterfactory'

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
  computed: {
    userExists:{
      cache: false,
      get: function () {
      return (typeof this.pseudo !== 'undefined')
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
      })
    }).catch(err => {
      console.log(err)
    })
    if(!this.web3Exists){
  	this.$Message.error({
                    content: 'Please use a Metamask enabled browser.',
                    duration: 10,
                    closable: true
                });
    }
  },
  methods: {
    destroyAccount: function (e) {
      e.preventDefault()
      Users.destroy().then(() => {
        this.pseudo = undefined
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
<style scoped>
h1, h2 {
  font-weight: normal;
  display: block;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
