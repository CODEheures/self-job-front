<template>
  <div class="layout-padding">
    <q-field icon="language" :label="strings.language.label" :helper="strings.language.helper">
      <q-select v-model="appLanguage" :options="languageOptions"/>
    </q-field>
  </div>
</template>

<script>
import LanguageSetter from '../strings/languageSetter'

export default {
  props: {
    stringPageScopeName: String
  },
  data () {
    return {
      strings: {
        language: {}
      },
      languageOptions: [],
      appLanguage: ''
    }
  },
  mounted () {
    LanguageSetter.setStrings(this)

    this.appLanguage = this.$store.state.properties.appLanguage.choice
    for (let lang of this.$store.state.properties.appLanguage.list) {
      this.languageOptions.push({'label': this.$store.state.strings[lang].page.settings.language.name, 'value': lang})
    }

    this.$watch('appLanguage', function () {
      this.$store.commit('setLanguage', this.appLanguage)
    })
  }
}
</script>

<style>
</style>
