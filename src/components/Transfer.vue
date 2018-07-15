<template>
  <div>
    <h1>Transfer Cryptomon</h1>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="monster">
            <Select v-model="formInline.monster" style="width:200px">
                <Option v-for="item in monsterList" :value="item.mid" :key="item.mid">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem prop="recipient">
            <i-input type="text" v-model="formInline.recipient" placeholder="Recipient">
                <Icon type="arrow-right-c" slot="prepend"></Icon>
            </i-input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">Transfer</Button>
        </FormItem>
      </Form>
  </div>
 </template>

<script>

    import MonsterHelper from '@/js/monsterhelper'

    const validateMonster = (rule, value, callback) => {
                if (value) {
                    callback()
                }
                else {
                    callback(new Error('Please select a Cryptomon to transfer'))
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

    export default {

    name: 'transfer',

    data () {


      return {
          model1: '',
          monsterList: this.generateTableData(),
          formInline: {
           monster: '',
           recipient: ''
          },
          ruleInline: {
              monster: [
              { validator: validateMonster, trigger: 'blur' }
            ],
              recipient: [
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

    methods: {
        
        getZombieByOwner: function () {
            return new Promise((resolve, reject) => {
            MonsterHelper.init().then(() => {
                MonsterHelper.getZombiesByOwner(window.web3.eth.accounts[0]).then(mons => {
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
        this.getZombieByOwner().then(mons => { 
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
          } else {
            this.$Message.error({
                    render: h => {
                        return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                            'Transfer failed!'
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