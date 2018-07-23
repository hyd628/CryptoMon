<template>
  <div>
      <h1>Combat Resolution</h1>
      <ul :style="{maxHeight: listHeight}">
        <li v-for="(item, index) in combatData" :key="index">
            <div v-if="item.action === 'announcement'">
              <Icon type="ios-information-outline"></Icon> Combat between {{ item.name1 }} and {{item.name2}} begins! {{item.mon1name}} HP: {{item.mon1currenthp}}/{{item.mon1maxhp}} {{item.mon2name}} HP: {{item.mon2currenthp}}/{{item.mon2maxhp}} 
            </div>
            <div v-if="item.action === 'initiative'">
              <Icon type="ios-information-outline"></Icon> {{ item.name1 }} has won initiative roll and will go first! 
            </div>
            <div v-if="item.action === 'hits'">
              <Icon type="ios-bolt"></Icon> {{ item.name1 }} hits {{item.name2}} for {{item.damage}} damage. {{item.mon1name}} HP: {{item.mon1currenthp}}/{{item.mon1maxhp}} {{item.mon2name}} HP: {{item.mon2currenthp}}/{{item.mon2maxhp}} 
            </div>
            <div v-if="item.action === 'misses'">
              <Icon type="android-close"></Icon> {{ item.name1 }} misses {{item.name2}}! {{item.mon1name}} HP: {{item.mon1currenthp}}/{{item.mon1maxhp}} {{item.mon2name}} HP: {{item.mon2currenthp}}/{{item.mon2maxhp}} 
            </div>
            <div v-if="item.action === 'result'">
              <Icon type="ios-information-outline"></Icon> {{item.name1}} knocks out {{item.name2}} and wins!
            </div>
        </li>
      </ul>
      
  </div>
 </template>

<script>

  import MonsterHelper from '@/js/monsterhelper'
  import BattleHelper from '@/js/battlehelper'

  export default {

    name: 'battletext',

    props: {
        mID1: String,
        mID2: String
    },

    data () {
      return {
          combatData:[],
          listHeight: ''
      }
    },

    methods: {

        generateCombatData: function(){
            
            this.combatData.length = 0

            var detailedMon1;
            var detailedMon2;
            MonsterHelper.init().then(() => {
                MonsterHelper.Monsters(this.mID1).then(mon => {
                    detailedMon1 = BattleHelper.getDerivedStats({'name': mon[0], 'experience': mon[2], 'dna': mon[1], 'mid': this.mID1})
                    MonsterHelper.Monsters(this.mID2).then(mon => {
                        detailedMon2 = BattleHelper.getDerivedStats({'name': mon[0], 'experience': mon[2], 'dna': mon[1], 'mid': this.mID2})
                            var mon1MaxHp = detailedMon1.hp
                            var mon2MaxHp = detailedMon2.hp
                            this.combatData.push({  'name1': detailedMon1.name, 
                                                                'name2': detailedMon2.name, 
                                                                'mon1name': detailedMon1.name, 
                                                                'mon2name': detailedMon2.name, 
                                                                'action': 'announcement', 
                                                                'damage': detailedMon1.attack, 
                                                                'mon1maxhp': mon1MaxHp, 
                                                                'mon2maxhp': mon2MaxHp, 
                                                                'mon1currenthp': detailedMon1.hp, 
                                                                'mon2currenthp': detailedMon2.hp})

                            var mon1First = Math.random() > 0.5 //roll initiative
                            if (mon1First){
                                this.combatData.push({  'name1': detailedMon1.name, 
                                                                'action': 'initiative'
                                                               })
                            }
                            else{
                                    this.combatData.push({  'name1': detailedMon2.name, 
                                                            'action': 'initiative'
                                                               })    
                            }
                            while(detailedMon1.hp > 0 && detailedMon2.hp > 0)
                            {
                                //console.log(Math.random())
                                if(mon1First)
                                {
                                    
                                    if(BattleHelper.getRandomInt(0, detailedMon1.attack+detailedMon2.defense)< detailedMon1.attack){
                                        detailedMon2.hp = detailedMon2.hp - detailedMon1.attack
                                        this.combatData.push({  'name1': detailedMon1.name, 
                                                                'name2': detailedMon2.name, 
                                                                'mon1name': detailedMon1.name, 
                                                                'mon2name': detailedMon2.name, 
                                                                'action': 'hits', 
                                                                'damage': detailedMon1.attack, 
                                                                'mon1maxhp': mon1MaxHp, 
                                                                'mon2maxhp': mon2MaxHp, 
                                                                'mon1currenthp': detailedMon1.hp, 
                                                                'mon2currenthp': detailedMon2.hp})
                                        if(detailedMon2.hp <= 0)
                                        {
                                            continue
                                        }
                                    }
                                    else{
                                        this.combatData.push({  'name1': detailedMon1.name, 
                                                                'name2': detailedMon2.name, 
                                                                'mon1name': detailedMon1.name, 
                                                                'mon2name': detailedMon2.name, 
                                                                'action': 'misses', 
                                                                'damage': detailedMon1.attack, 
                                                                'mon1maxhp': mon1MaxHp, 
                                                                'mon2maxhp': mon2MaxHp, 
                                                                'mon1currenthp': detailedMon1.hp, 
                                                                'mon2currenthp': detailedMon2.hp})
                                    }

                                    //second mon retaliates
                                    if(BattleHelper.getRandomInt(0, detailedMon2.attack+detailedMon1.defense)< detailedMon2.attack){
                                        detailedMon1.hp = detailedMon1.hp - detailedMon2.attack
                                        this.combatData.push({  'name1': detailedMon2.name, 
                                                                'name2': detailedMon1.name, 
                                                                'mon1name': detailedMon1.name, 
                                                                'mon2name': detailedMon2.name, 
                                                                'action': 'hits', 
                                                                'damage': detailedMon1.attack, 
                                                                'mon1maxhp': mon1MaxHp, 
                                                                'mon2maxhp': mon2MaxHp, 
                                                                'mon1currenthp': detailedMon1.hp, 
                                                                'mon2currenthp': detailedMon2.hp})
                                        if(detailedMon1.hp <= 0)
                                        {
                                            continue
                                        }
                                    }
                                    else{
                                        this.combatData.push({  'name1': detailedMon2.name, 
                                                                'name2': detailedMon1.name, 
                                                                'mon1name': detailedMon1.name, 
                                                                'mon2name': detailedMon2.name, 
                                                                'action': 'misses', 
                                                                'damage': detailedMon1.attack, 
                                                                'mon1maxhp': mon1MaxHp, 
                                                                'mon2maxhp': mon2MaxHp, 
                                                                'mon1currenthp': detailedMon1.hp, 
                                                                'mon2currenthp': detailedMon2.hp})
                                    }


                                }
                                else
                                {                               
                                    if(BattleHelper.getRandomInt(0, detailedMon2.attack+detailedMon1.defense)< detailedMon2.attack){
                                        detailedMon1.hp = detailedMon1.hp - detailedMon2.attack
                                        this.combatData.push({  'name1': detailedMon2.name, 
                                                                'name2': detailedMon1.name, 
                                                                'mon1name': detailedMon1.name, 
                                                                'mon2name': detailedMon2.name, 
                                                                'action': 'hits', 
                                                                'damage': detailedMon2.attack, 
                                                                'mon1maxhp': mon1MaxHp, 
                                                                'mon2maxhp': mon2MaxHp, 
                                                                'mon1currenthp': detailedMon1.hp, 
                                                                'mon2currenthp': detailedMon2.hp})
                                        if(detailedMon1.hp <= 0)
                                        {
                                            continue
                                        }
                                    }
                                    else{
                                        //emit a miss event
                                        this.combatData.push({  'name1': detailedMon2.name, 
                                                                'name2': detailedMon1.name, 
                                                                'mon1name': detailedMon1.name, 
                                                                'mon2name': detailedMon2.name, 
                                                                'action': 'misses', 
                                                                'damage': detailedMon2.attack, 
                                                                'mon1maxhp': mon1MaxHp, 
                                                                'mon2maxhp': mon2MaxHp, 
                                                                'mon1currenthp': detailedMon1.hp, 
                                                                'mon2currenthp': detailedMon2.hp})
                                    }

                                    if(BattleHelper.getRandomInt(0, detailedMon1.attack+detailedMon2.defense)< detailedMon1.attack){
                                        detailedMon2.hp = detailedMon2.hp - detailedMon1.attack
                                        //emit a hit event
                                        this.combatData.push({  'name1': detailedMon1.name, 
                                                                'name2': detailedMon2.name, 
                                                                'mon1name': detailedMon1.name, 
                                                                'mon2name': detailedMon2.name, 
                                                                'action': 'hits', 
                                                                'damage': detailedMon1.attack, 
                                                                'mon1maxhp': mon1MaxHp, 
                                                                'mon2maxhp': mon2MaxHp, 
                                                                'mon1currenthp': detailedMon1.hp, 
                                                                'mon2currenthp': detailedMon2.hp})
                                        if(detailedMon2.hp <= 0)
                                        {
                                            continue
                                        }
                                    }
                                    else{
                                        //emit a miss event
                                        this.combatData.push({  'name1': detailedMon1.name, 
                                                                'name2': detailedMon2.name, 
                                                                'mon1name': detailedMon1.name, 
                                                                'mon2name': detailedMon2.name, 
                                                                'action': 'misses', 
                                                                'damage': detailedMon1.attack, 
                                                                'mon1maxhp': mon1MaxHp, 
                                                                'mon2maxhp': mon2MaxHp, 
                                                                'mon1currenthp': detailedMon1.hp, 
                                                                'mon2currenthp': detailedMon2.hp})
                                    }

                                }
                            }
                            //console.log(detailedMon1)
                            //console.log(detailedMon2)
                            //console.log(this.combatData)
                            if (detailedMon1.hp <= 0){
                                this.combatData.push({  'name1': detailedMon2.name, 
                                                        'name2': detailedMon1.name,
                                                                'action': 'result'
                                                               })
                                this.$emit('result', [detailedMon2.mid, detailedMon2.name, detailedMon1.mid, detailedMon1.name])

                            }
                            else{
                                this.combatData.push({  'name1': detailedMon1.name, 
                                                        'name2': detailedMon2.name,
                                                                'action': 'result'
                                                               })
                                this.$emit('result', [detailedMon1.mid, detailedMon1.name, detailedMon2.mid, detailedMon2.name])
                            }
                        }).catch(err => {
                            console.log(err)
                        })

                    }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
            return data
        }
    }
  }
</script>

<style lang="scss" scoped>

ul {
  list-style-type: none;
  overflow-y:scroll;
}

</style>
