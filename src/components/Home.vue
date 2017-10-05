<template>
  <div class="layout-padding">
    <q-alert v-if="$store.state.properties.auth.isNew" color="green" icon="info outline" appear dismissible>{{ strings.checkYourMail }}</q-alert>
    <q-alert v-if="!$store.state.properties.geolocation.exist" color="warning" icon="warning" appear dismissible>{{ strings.geolocNotAvailable }}</q-alert>
    <q-alert v-if="$store.state.properties.geolocation.denied" color="warning" icon="warning" appear dismissible>{{ strings.geolocDenied }}</q-alert>
    <q-alert v-if="$store.state.properties.geolocation.error" color="warning" icon="warning" appear dismissible>{{ strings.geolocError }}</q-alert>


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
