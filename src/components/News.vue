<template>
  <div>
      <h1>News</h1>
      <ul :style="{maxHeight: listHeight}" ref="currentRowTable" >
        <li v-for="(item, index) in newsData" :key="index">
            <news-item :title="item.title" :content="item.content" :date="item.date" :imgurl="item.imgurl"></news-item>
        </li>
      </ul>
  </div>
 </template>

<script>
  import Users from '@/js/users'
  import NewsItem from './NewsItem.vue'

  export default {

    name: 'news',

    components: {
      NewsItem
    },

    data () {
      return {
        listHeight: '100px',
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

    mounted: function () {
      this.listHeight = (window.innerHeight - 250).toString()+'px'
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

  ul {
    list-style-type: none;
    overflow-y:scroll;
  }
  
</style>
