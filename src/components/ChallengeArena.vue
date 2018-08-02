<template>
  <div id="challengearena">
    <div ref="restofcontent">
    <Row><h1>Challenge Arena</h1></Row>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="monster1">
            <Select v-model="formInline.monster1" style="width:250px; margin-top: 10px" placeholder="Choose Your Cryptomon">
                <Option v-for="item in monsterList" :value="item.mid" :key="item.mid">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem prop="opponentaddress">
          <i-input type="text" v-model="formInline.opponentaddress" style="width:250px" placeholder="Opponent Address" @on-blur="handleAddress">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <FormItem prop="monster2">
             <Select v-model="formInline.monster2" style="width:250px" placeholder="Choose Opponent Cryptomon">
                <Option v-for="item in monsterList2" :value="item.mid" :key="item.mid">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <Row>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">Begin Combat</Button>
        </FormItem>
        </Row>
      </Form>

      <Row style="margin-bottom: 10px">Show combat resolution: <i-switch v-model="switch1" size="small"></i-switch></Row>
    </div>
    <Row>
        <battle-text :mID1="formInline.monster1" :mID2="formInline.monster2" ref="btextarea" v-show="switch1" v-on:result="handleResultEvent"></battle-text>
    </Row>
  </div>
 </template>

<script>

    import MonsterHelper from '@/js/monsterhelper'
    import BattleText from './BattleText.vue'



    export default {

    name: 'challengearena',

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

    const validateAddress = (rule, value, callback) => {
                //console.log('address validator called')
                if (!window.web3.isAddress(value)) {
                    callback(new Error('Not a valid Ethereum address.'))
                }
                else {
                    callback();
                }
    }


      return {

        monsterList: this.generateTableData(),

                      
        monsterList2: [],

          switch1: true,

          formInline: {
           monster1: '',
           monster2: '',
           opponentaddress: ''
          },

          ruleInline: {
              monster1: [
              { validator: validateMonster1, trigger: 'change' }
            ],
              monster2: [
            { validator: validateMonster2, trigger: 'change' }
            ],
             opponentaddress: [
                  { validator: validateAddress, trigger: 'blur' }
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
        this.generateListFromAddress()
        this.$refs['btextarea'].listHeight = (window.innerHeight - this.$refs.restofcontent.clientHeight-171).toString()+'px'

    },

    methods: {

        handleResultEvent: function(result){

            //console.log(result)
            //console.log(this.formInline.monster1)
            if(result[0] === this.formInline.monster1){
                this.$Message.success({
                    render: h => {
                        return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                            result[1]+' won against '+result[3]+'!'
                        ])
                    },
                    duration: 5,
                })
                this.$Loading.start()
                MonsterHelper.init().then(() => {
                    MonsterHelper.reportBattleResult(parseInt(result[0]), parseInt(result[2])).then(
                        tx => {
                            this.$Loading.finish() 
                            console.log(tx)
                            this.$Message.success({
                                render: h => {
                                return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                                    'Battle recorded!'
                            ])
                                },
                                duration: 2,
                            })
                    }
                    ).catch(err => {
                        this.$Loading.error();
                        this.$Message.error({
                            render: h => {
                                return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                                    'Battle failed to record!'
                                ])
                            },
                            duration: 2,
                        })
                        reject(err)
                    })
                }).catch(err => {
                    reject(err)
                })
            }
            else{
                this.$Message.warning({
                    render: h => {
                        return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                            result[3]+' lost against '+result[1]+'!'
                        ])
                    },
                    duration: 5,
                })
                this.$Loading.start()
                MonsterHelper.init().then(() => {
                    MonsterHelper.reportBattleResult(parseInt(result[0]), parseInt(result[2])).then(
                        tx => { 
                            this.$Loading.finish() 
                            console.log(tx)
                            this.$Message.success({
                                render: h => {
                                return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                                    'Battle recorded!'
                            ])
                                },
                                duration: 2,
                            })
                    }
                    )
                    .catch(err => {
                        reject(err)
                    })
                }).catch(err => {
                    this.$Loading.error();
                        this.$Message.error({
                            render: h => {
                                return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                                    'Battle failed to record!'
                                ])
                            },
                            duration: 2,
                        })
                    reject(err)
                })
            }


        },

        handleAddress: function () {
            if(window.web3.isAddress(this.formInline.opponentaddress))
            {
                this.generateListFromAddress()
            }
            else
            {
                //console.log('clear selection')
                this.monsterList2 = []
            }
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

        getMonstersByAddress: function (address) {
            return new Promise((resolve, reject) => {
            MonsterHelper.init().then(() => {
                MonsterHelper.getMonstersByOwner(address).then(mons => {
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

        generateListFromAddress: function(){
            
            let data = [];
            this.getMonstersByAddress(this.formInline.opponentaddress).then(mons => { 
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
            this.monsterList2 = data
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

#challengearena {

.form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    margin: auto;

    input[type="text"]
    {
      font-family: 'Monda', sans-serif;
    }
  
      
    .entry {
      display: flex;
      flex-direction: row-reverse;
       justify-content: center;
      
      label {
        margin-right: 20px
        }
        
      button {
        margin-left: 20px
      }  
       
    }

    .select{
        margin-top: 20px
    }
        
  }

}

</style>