<template>
  <div class="layout-padding">
    <q-field
            icon="public"
            :label="strings.langage.label"
            :helper="strings.langage.helper"
    >
      <q-select
        v-model="appLangage"
        :options="langageOptions"
      />
    </q-field>
  </div>
</template>

<script>
import LangageSetter from '../strings/langageSetter'

export default {
  props: {
    stringPageScopeName: String
  },
  data () {
    return {
      strings: {
        langage: {}
      },
      langageOptions: [],
      appLangage: ''
    }
  },
  mounted () {
    LangageSetter.setStrings(this)

    this.appLangage = this.$store.state.properties.appLangage.choice
    for (let lang of this.$store.state.properties.appLangage.list) {
      this.langageOptions.push({'label': this.$store.state.strings[lang].page.settings.langage.name, 'value': lang})
    }

    this.$watch('appLangage', function () {
      this.$store.commit('setLangage', this.appLangage)
    })
  }
}
</script>

<style>
</style>
