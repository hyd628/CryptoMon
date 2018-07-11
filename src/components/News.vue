<template>
  <div>
      <h1>News</h1>
      <ul>
        <li v-for="(item, index) in newsData" :key="index">
            <news-item :title="item.title" :content="item.content" :date="item.date"></news-item>
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
        newsData: [
          {
            title: 'News Item 1',
            content: 'blah blah blah',
            date: 'June 11, 2018'
          },
          {
            title: 'News Item 2',
            content: 'blah blah blah',
            date: 'June 10, 2018'
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

  ul {
    list-style-type: none;
  }
  
</style>
