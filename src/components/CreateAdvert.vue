<template>
  <div class="layout-padding">
    <q-field>
      <q-input v-model="title" type="text" :float-label="strings.advertTitleLabel" clearable />
    </q-field>
  </div>
</template>

<script>
  import LanguageSetter from '../strings/languageSetter'

  export default {
    props: {
      stringPageScopeName: String,
      redirectTo: Object
    },
    data () {
      return {
        strings: {},
        submit: false,
        title: ''
      }
    },
    mounted () {
      LanguageSetter.setStrings(this)
    },
    methods: {

    }
  }
</script>

<style>
</style>
