<template>
  <div></div>
</template>

<script>
  import LangageSetter from '../strings/langageSetter'

  export default {
    props: {
      stringPageScopeName: String
    },
    data () {
      return {
        strings: {}
      }
    },
    mounted () {
      LangageSetter.setStrings(this)
    }
  }
</script>

<style>
</style>
