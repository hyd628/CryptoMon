<template>
  <div>
      <div ref="restofcontent">
    <Row><h1>Practice Battles</h1></Row>

    <Row><Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="monster1">
            <Select v-model="formInline.monster1" style="width:250px" placeholder="Participant One">
                <Option v-for="item in monsterList" :value="item.mid" :key="item.mid">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem prop="monster2">
             <Select v-model="formInline.monster2" style="width:250px" placeholder="Participant Two">
                <Option v-for="item in monsterList" :value="item.mid" :key="item.mid">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">Begin Combat</Button>
        </FormItem>
      </Form>
    </Row>
    </div>
    <Row>
        <battle-text :mID1="formInline.monster1" :mID2="formInline.monster2" ref="btextarea" v-on:result="handleResultEvent"></battle-text>
    </Row>
  </div>
 </template>

<script>

    import MonsterHelper from '@/js/monsterhelper'
    import BattleText from './BattleText.vue'



    export default {

    name: 'practicebattle',

    components: {
      BattleText
    },

    data () {

    const validateMonster1 = (rule, value, callback) => {
                //console.log('address validator called')
                if (!value) {
                    callback(new Error('Choose a valid Cryptomon'))
                }
                if (value === this.formInline.monster2) {
                    callback(new Error('Cannot choose the same Cryptomon.'))
                }
                else {
                    callback()
                }
    }

    const validateMonster2 = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('Choose a valid Cryptomon'))
                }
                if (value === this.formInline.monster1) {
                    callback(new Error('Cannot choose the same Cryptomon.'))
                }
                else {
                    callback()
                }
    }


      return {
          monsterList: this.generateTableData(),
          formInline: {
           monster1: '',
           monster2: ''
          },
          ruleInline: {
              monster1: [
              { validator: validateMonster1, trigger: 'change' }
            ],
              monster2: [
            { validator: validateMonster2, trigger: 'change' }
            ]

           }
      }
    },

    computed: {

      web3Exists:{
        cache: false,
        get: function () {
          return (typeof window.web3 !== 'undefined')
        }
      },

    },

    mounted: function()
    {
        //console.log(window.innerHeight)
        //console.log(this.$refs.restofcontent.clientHeight)
        //console.log((window.innerHeight - this.$refs.restofcontent.clientHeight-171).toString()+'px')
        this.$refs['btextarea'].listHeight = (window.innerHeight - this.$refs.restofcontent.clientHeight-171).toString()+'px'
        //this.combatListHeight = (window.innerHeight - this.$refs.restofcontent.clientHeight).toString()+'px'
    },

    methods: {

        handleResultEvent: function($event){

            //console.log($event)
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

        generateTableData: function(){
        let data = [];
        this.getMonstersByOwner().then(mons => { 
            mons.forEach(function(element) {
            MonsterHelper.Monsters(element).then(mon => {
                    //console.log(element)
                    data.push({'value': mon[0], 'label': mon[0], 'mid': element.toString()})
                }).catch(err => {
                    console.log(err)
                })
            })
        }).catch(err => {
            console.log(err)
        })
            //console.log(data)
            return data
        },

        handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$refs['btextarea'].generateCombatData()
            /*
            let self = this
            if(this.web3Exists)
            {
              this.$Loading.start();
              MonsterHelper.init().then(() => {
                MonsterHelper.transferMonster(this.formInline.monster, this.formInline.recipient).then(tx => {
                  console.log(tx)
                  this.$Loading.finish();
                  this.$Message.success({
                      render: h => {
                        return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                            'Transfer successful!'
                        ])
                      },
                      duration: 2,
                  })
                }).catch(err => {
                  this.$Loading.error();
                  this.$Message.error({
                    render: h => {
                        return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                            'Transfer failed!'
                        ])
                    },
                    duration: 2,
                    })
                })
              }).catch(err => {
                console.log(err)
              })
            }
            else
            {
              this.$Message.error({
                render: h => {
                                return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                                    'Please use a Metamask enabled browser.'
                                ])
                            },
                duration: 5,
                closable: true
                });
            }
            */
          } else {
            this.$Message.error({
                    render: h => {
                        return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                            'Invalid Request!'
                        ])
                    },
                    duration: 2,
            })
          }
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