<template>
  <div>
      <h1>Notifications</h1>
      <ul>
        <li v-for="(item, index) in notificationData" :key="index">
            <Icon type="android-notifications-none"></Icon> {{ item.args.name }} created.
        </li>
      </ul>
  </div>
 </template>

<script>
  import Users from '@/js/users'
  import MonsterFactory from '@/js/monsterfactory'
  import MonsterHelper from '@/js/monsterhelper'

  export default {

    name: 'notification',

    data () {
      return {
        notificationData:[]
      }
    },

    beforeCreate: function () {
      MonsterHelper.init().then(() => {
        const event = MonsterHelper.instance.NewMonster({})
        const pastEvents = MonsterHelper.instance.NewMonster({}, { fromBlock: 0, toBlock: 'latest' })
        pastEvents.get((err, result) => {
            var i;
            for (i = 0; i < result.length - 1; i++) { 
                this.notificationData.push(result[i])
            }
            /*
          let self = this
          result.forEach(function(element) {
                self.notificationData.push(element)
          })*/
        })
        event.watch((err, result) => {
          this.notificationData.push(result)
        })
      }).catch(err => {
        console.log(err)
      })
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

ul {
  list-style-type: none;
}

</style>
