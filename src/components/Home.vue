<template>
  <div id='home'>
      <Row><h3>Welcome, {{ this.$store.state.pseudo }}.</h3></Row>
      <Row>
        <i-Col span="12">
          <Carousel autoplay v-model="value2" loop :radius-dot=true arrow="never">
            <CarouselItem v-for="(item, index) in newsData" :key="index">
              <news-item :title="item.title" :content="item.content" :date="item.date" :imgurl="item.imgurl"></news-item>
            </CarouselItem>
          </Carousel>
        </i-Col>
        <i-Col span="12"><notification v-bind:hideTitle="true" ></notification></i-Col>
      </Row>
          <!-- Deactivate your account by clicking <a href="#" @click="destroyAccount">here</a>.
          <router-link to="/news">News</router-link>
          <router-link to="/spawn">Spawn Cryptomon</router-link> -->

  </div>
 </template>

<script>
  import Users from '@/js/users'
  import Notification from './Notification.vue'
  import News from './News.vue'
  import NewsItem from './NewsItem.vue'

  
  export default {

    name: 'home',

    components: {
      News,
      Notification,
      NewsItem
    },

    data () {
      return {
        value2: 0,
        newsData: [
          {
            title: 'CryptoMon First News!',
            content: 'Lorem ipsum dolor sit amet, dolorum legimus maiorum eu vis. An alia utinam vulputate eos, minim saperet ornatus ad usu, te ius mentitum euripidis intellegat. Alii petentium theophrastus est at. Simul dictas consetetur sed id, eu nec integre adipiscing assueverit, ex possim eripuit recusabo nam.',
            date: 'June 11, 2018',
            imgurl: '../../static/news1.jpg'
          },
          {
            title: 'Alpha Stage Starting',
            content: 'Harum feugiat lobortis et est, pro appellantur consequuntur conclusionemque ne. Vide congue eam in. Eu noster tamquam efficiendi duo, minimum scripserit eum cu. Mei id quis fabulas, at nulla accusam sed. Ius at consul soluta animal.',
            date: 'June 10, 2018',
            imgurl: '../../static/news2.jpg'
          },
          {
            title: 'Deployment on Ropsten',
            content: 'Altera volumus reprimique et vis, probo admodum efficiendi nam in. An delenit consulatu eos, eros euismod convenire an vim. No pri minim facilisis. Has integre copiosae ad, eam ad munere democritum, ne autem detraxit atomorum sed.',
            date: 'June 10, 2018',
            imgurl: '../../static/news3.jpg'
          }
        ]
      }
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
  background: #f5f7f9;

}

a {
  color: #42b983;
} 

</style>
