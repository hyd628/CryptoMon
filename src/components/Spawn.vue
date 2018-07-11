<template>
  <div>
    <h1>Spawn Cryptomon</h1>
    <h2>Enter a name for your Cryptomon</h2>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="monster">
          <i-input type="text" v-model="formInline.monster" placeholder="Monster Name">
            <Icon type="social-octocat" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">Spawn Cryptomon</Button>
        </FormItem>
      </Form>
  </div>
 </template>

<script>

  import MonsterHelper from '@/js/monsterhelper'
  
  export default {

    name: 'spawn',

    data () {
      const validateMonster = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Name cannot be empty.'))
                } 
                else if (value.length > 20)
                {
                    callback(new Error('Name cannot be longer than 20 characters.'))
                }
                else {
                    callback();
                }
       };

      return {
        formInline: {
           monster: ''
        },
        ruleInline: {
           monster: [
              { validator: validateMonster, trigger: 'blur' }
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

    beforeCreate: function () {
      MonsterHelper.init()
    },

    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let self = this
            if(this.web3Exists)
            {
              this.$Loading.start();
              MonsterHelper.init().then(() => {
                MonsterHelper.createRandomMonster(this.formInline.monster).then(tx => {
                  console.log(tx)
                  this.$Loading.finish();
                  this.$Message.success({
                      render: h => {
                        return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                            'Spawn successful!'
                        ])
                      },
                      duration: 2,
                  })
                }).catch(err => {
                  this.$Loading.error();
                  this.popFailureMessage()
                  console.log(err)
                })
              }).catch(err => {
                console.log(err)
              })
            }
            else
            {
              this.popFailureMessage()
            }
          } else {
            this.popFailureMessage()
          }
        })
      },

      popFailureMessage()
      {
        this.$Message.error({
                    render: h => {
                        return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                            'Spawn failed!'
                        ])
                    },
                    duration: 2,
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