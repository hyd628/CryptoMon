<template>
  <div>
      <div v-if=" !hideTitle ">
      <h1>Notifications</h1>
      </div>
      <ul>
        <li v-for="(item, index) in notificationData" :key="index">
            <div v-if="item.event === 'NewMonster'">
              <Icon type="android-notifications-none"></Icon> {{ item.args.name }} created by {{item.args.owner}}.
            </div>
            <div v-if="item.event === 'MonsterTransferred'">
              <Icon type="android-notifications-none"></Icon> {{ item.args.name }} transferred from {{item.args.oldOwner}} to {{item.args.newOwner}}.
            </div>
            <div v-if="item.event === 'BattleResult'">
              <Icon type="android-notifications-none"></Icon> {{ item.args.winnerOwner }}'s {{ item.args.winnerName}} has defeated {{item.args.loserOwner}}'s {{item.args.loserName}} in combat!
            </div>
        </li>
      </ul>
  </div>
 </template>

<script>
  import Users from '@/js/users'
  import MonsterHelper from '@/js/monsterhelper'

  export default {

    name: 'notification',

    data () {
      return {
        notificationData:[]
      }
    },

    props: {
        hideTitle: Boolean
    },

    beforeCreate: function () {
      MonsterHelper.init().then(() => {
        const events = MonsterHelper.instance.allEvents({ fromBlock: 0, toBlock: 'latest' })
        events.watch((err, result) => {
          //console.log(result)
          this.notificationData.push(result)
        })
      }).catch(err => {
        console.log(err)
      })
      console.log('check prop')
      console.log(this.showtitle)
    },

    mounted: function() {
        console.log('check prop')
      console.log(this.showtitle)
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
