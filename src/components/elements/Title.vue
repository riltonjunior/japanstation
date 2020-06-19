<template>
  <div class="title row">
    <h2>{{name}}</h2>
    <q-separator />
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    name: String
  }
}
</script>

<style lang="sass" scoped>
h2
  font-size: 1.2rem
  font-weight: bold
  padding-left: 16px
  margin-bottom: 0px
  line-height: 3rem
.title
  min-width: 320px
  max-width: 1170px
  margin-bottom: 15px
</style>
