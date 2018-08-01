<template>
  <div id="account">
    <h1>Account Management</h1>
     <Row>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user" style="margin-top: 20px">
          <i-input type="text" v-model="formInline.user" placeholder="New Alias">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <FormItem style="margin-top: 20px">
          <Button type="primary" @click="handleSubmit('formInline')">Change Alias</Button>
        </FormItem>
      </Form>
    </Row>
     <Row>
        <Button type="primary" @click="destroyAccount" style=" margin-top: 10px; margin-bottom: 10px">Deactivate Account</Button>
        <Button type="primary" @click="switchAccount" style="margin-top: 10px; margin-bottom: 10px">Switch Account</Button>
    </Row>
  </div>
 </template>

<script>
  import Users from '@/js/users'
  export default {

    name: 'account',

    data () {
      const validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('User name cannot be empty.'))
                } 
                else if (value.length > 20)
                {
                    callback(new Error('User name cannot be longer than 20 characters.'))
                }
                else if (value === 'Guest')
                {
                    callback(new Error('User name reserved.'))
                }
                else {
                    callback();
                }
       };

      return {
        formInline: {
           user: ''
        },
        ruleInline: {
           user: [
              { validator: validateUser, trigger: 'blur' }
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
    },
    switchAccount: function(){
      this.$store.commit('deregister')
      this.$router.push('/')
      window.location.reload(true)
    },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let self = this
            if(this.web3Exists)
            {
              this.$Loading.start();
              Users.create(this.formInline.user).then(tx => {
                console.log(tx)
                this.$Loading.finish();
                this.$Message.success({
                    render: h => {
                        return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                            'Name changed successfully!'
                        ])
                    },
                    duration: 2,
                })
                this.$store.commit('register', this.formInline.user)
                this.$router.push({ name: 'Home'})
              }).catch(err => {
                this.$Loading.error();
                this.$Message.error({
                    render: h => {
                        return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                            'Name change failed!'
                        ])
                    },
                    duration: 2,
                })
                console.log(err)
              })
            }
            else
            {
              this.popMetaMaskError()
            }
          } else {
            this.$Message.error({
                    render: h => {
                        return h('span', {style: {fontFamily: 'Monda', fontSize: '14px'}}, [
                            'Name change failed!'
                        ])
                    },
                    duration: 2,
                })
          }
        })
      },
      popMetaMaskError()
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
    }
  }
</script>

<style lang="scss" scoped>

#account {


  font-family: 'Monda', sans-serif;

  .form {
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 20px;

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
        
  }
    
  h1, h2 {
    font-weight: normal;
    display: block;
    margin-bottom: 10px;
    text-align: left;
  }

  button {
    margin-right: 19px;
  }
}

</style>