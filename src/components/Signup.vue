<template>
  <section id='signup'>
    <img src="../assets/logo.png">
    <h1>Sign up for CryptoMon World!</h1>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="user">
        <i-input type="text" v-model="formInline.user" placeholder="Alias">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </i-input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Sign Up</Button>
      </FormItem>
    </Form>
  </section>
</template>

<script>
  import Users from '@/js/users'

  export default {

    name: 'signup',

    data () {
      return {
        formInline: {
           user: ''
        },
        ruleInline: {
           user: [
            { required: true, message: 'User name cannot be empty.', trigger: 'blur' },
            { type: 'string', max: 20, message: 'User name cannot be longer than 20 characters.', trigger: 'blur' }
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
      }
    },

    beforeCreate: function () {
      Users.init()
      
    },

    created: function() {
      if(!this.web3Exists){
  	    this.popMetaMaskError()
      }
    },

    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let self = this
            if(this.web3Exists)
            {
              Users.create(this.formInline.user).then(tx => {
                console.log(tx)
                this.$Message.success({
                    render: h => {
                        return h('span', {style: {fontFamily: 'Avenir', fontSize: '14px'}}, [
                            'Sign up successful!'
                        ])
                    },
                    duration: 2,
                })
                setTimeout(function () {
                  self.$router.push('/')
                }, 1000);
              }).catch(err => {
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
                        return h('span', {style: {fontFamily: 'Avenir', fontSize: '14px'}}, [
                            'Sign up failed!'
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
                        return h('span', {style: {fontFamily: 'Avenir', fontSize: '14px'}}, [
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

#signup {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;

  .form {
    display: flex;
    flex-direction: column;
    margin: auto;
      
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
  }
}

</style>
