<template>
  <section id='signup'>
    <div v-if="pseudoDefined">
      You already have an account, redirecting to the dashboard...
    </div>
    <div v-else>
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
      <footer>
        <span>Address Zero Studios &copy; 2018, All Rights Reserved</span>
      </footer>
    </div>
  </section>
</template>

<script>
  import Users from '@/js/users'

  export default {

    name: 'signup',

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

      pseudoDefined: {
        cache: false,
        get: function () {
          return (typeof this.$store.state.pseudo !== 'undefined')
        }
      }

    },

    beforeCreate: function () {
      Users.init()
    },

    mounted: function()
    {
      if (this.pseudoDefined){
        var self = this;
        setTimeout(function () {
          self.$router.push('/homepage')
        }, 2500);
      }
    },

    methods: {
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
                        return h('span', {style: {fontFamily: 'Avenir', fontSize: '14px'}}, [
                            'Sign up successful!'
                        ])
                    },
                    duration: 2,
                })
                this.$store.commit('register', this.formInline.user)
                this.$router.push({ name: 'homepage'})
              }).catch(err => {
                this.$Loading.error();
                this.$Message.error({
                    render: h => {
                        return h('span', {style: {fontFamily: 'Avenir', fontSize: '14px'}}, [
                            'Sign up failed!'
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

footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  text-align: center;
}

</style>
