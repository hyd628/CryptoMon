<template>
  <div style="padding: 20px">
      <Card style="width:80%; margin: auto;">
        <p slot="title">
            {{ title }}
        </p>
        <p><small><b>{{ date }}</b></small></p>
        <p>{{ content }}</p>
    </Card>
  </div>
 </template>

<script>

  export default {

    name: 'newsitem',

    props: {
        title: String,
        date: String,
        isPublished: Boolean,
        content: String
    },

    data () {
      return {
      }
    },

    methods: {
    }
  }
</script>

<style lang="scss" scoped>
</style>
