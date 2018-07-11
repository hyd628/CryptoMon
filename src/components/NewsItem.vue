<template>
  <div style="padding: 20px">
      <Card style="width:350px">
        <p slot="title">
            {{ title }}
        </p>
        {{ content }}
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
