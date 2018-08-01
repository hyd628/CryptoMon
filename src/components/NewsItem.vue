<template>
  <div style="padding: 20px">
      <Card style="width:80%;">
        <p slot="title">
            {{ title }}
        </p>
        <p><small><b>{{ date }}</b></small></p>
        <p>{{ content }}</p>
         <br>
        <p><img width="100%" :src = layoutview></p>
    </Card>
  </div>
 </template>

<script>

 require("../assets/frontlogo.png")

  export default {

    name: 'newsitem',

    props: {
        title: String,
        date: String,
        isPublished: Boolean,
        content: String,
        imgurl: String
    },

    computed: {

            layoutview: function () {
                return this.imgurl
            }
    },

    methods: {
    }
  }
</script>

<style lang="scss" scoped>
</style>
