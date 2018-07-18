<template>
  <div>
    <h1>Manage Cryptomon Collection</h1>
    <Table highlight-row ref="currentRowTable" :height="tableHeight" :columns="columns3" :data="tableData" @on-current-change="changeHandler($event)"></Table>
    <Button type="primary" @click="handleClearCurrentRow">Clear Selection</Button>
    <Button type="primary" @click="viewCurrentRow" :disabled = "mIDDefined">View Details</Button>
    <Modal
        v-model="modal1"
        :title=monsterDetails.name id="monsterstats">
        <p>Level: {{monsterDetails.level}}</p>
        <p>DNA: {{monsterDetails.DNA}}</p>
        <p>Wins: {{monsterDetails.wins}}</p>
        <p>Losses: {{monsterDetails.losses}}</p>
        <p>Ready Time: {{monsterDetails.readytime}}</p>
    </Modal>
    
  </div>

 </template>

<script>
 
  import MonsterHelper from '@/js/monsterhelper'

  export default {

    name: 'collection',

    data () {
      return {
        monsterid: '',
        modal1: false, 
        tableHeight: 500,
        columns3: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Level',
                        key: 'level'
                    },
                    {
                        title: 'Wins',
                        key: 'wins'
                    },
                    {
                        title: 'Losses',
                        key: 'losses'
                    },
                    {
                        title: 'Monster ID',
                        key: 'mid'
                    }
                ],

                tableData: this.generateTableData(),

                monsterDetails: {
                  name: '',
                  DNA: '',
                  wins: '',
                  losses: '',
                  level: '',
                  readytime: ''
                },
      }
    },

    computed: {

      mIDDefined:{
        cache: false,
        get: function () {
          return (this.monsterid === '')
        }
      },

    },

    beforeCreate: function () {
      MonsterHelper.init()
    },

    mounted: function () {
      this.tableHeight = window.innerHeight - this.$refs.currentRowTable.$el.offsetTop - 150
    },

    methods: {

      changeHandler ($event) {
        if ($event)
        {
          this.monsterid = $event.mid
        }
        else
        {
          this.monsterid = ''
        }
      },

      handleClearCurrentRow () {
         this.$refs.currentRowTable.clearCurrentRow();
      },

      viewCurrentRow () {
        console.log(this.monsterid)
        this.modal1 = true
        MonsterHelper.Monsters(this.monsterid).then(mon => {
            this.monsterDetails.name = mon[0]
            this.monsterDetails.level = mon[2]
            this.monsterDetails.wins = mon[4]
            this.monsterDetails.losses = mon[5]
            this.monsterDetails.DNA = mon[1]
            this.monsterDetails.readytime = mon[3]
 	        }).catch(err => {
  	        console.log(err)
          })

      },

      getMonstersByOwner: function () {
        return new Promise((resolve, reject) => {
          MonsterHelper.init().then(() => {
            MonsterHelper.getMonstersByOwner(window.web3.eth.accounts[0]).then(mons => {
 	            resolve(mons)
 	          }).catch(err => {
  	          reject(err)
            })
          }).catch(err => {
            reject(err)
          })
        })
      },

      showmon: function (){
         MonsterHelper.init().then(() => {
           MonsterHelper.Monsters(this.monsterid).then(mon => {
 	          console.log(mon)
 	        }).catch(err => {
  	    console.log(err)
           })
         }).catch(err => {
           console.log(err)
        })
     },

     generateTableData: function(){
       let data = [];
       this.getMonstersByOwner().then(mons => { 
        mons.forEach(function(element) {
          MonsterHelper.Monsters(element).then(mon => {
             data.push({'name': mon[0], 'level': mon[2], 'wins': mon[4], 'losses': mon[5], 'mid': element})
 	        }).catch(err => {
  	        console.log(err)
          })
        })
      }).catch(err => {
        console.log(err)
      })
      //console.log(data)
      return data
     }
    }
  }
</script>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css?family=Monda:400,700');

a {
  color: #42b983;
} 

#monsterstats{
  font-family: 'Monda', sans-serif;
}

</style>