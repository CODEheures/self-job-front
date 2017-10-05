<template>
  <div class="layout-padding">
    <div class="row sm-gutter">
      <div class="col-12" v-if="$store.state.properties.auth.isNew || !$store.state.properties.geolocation.exist || $store.state.properties.geolocation.denied || $store.state.properties.geolocation.error">
        <q-alert v-if="$store.state.properties.auth.isNew" color="green" icon="info outline" appear dismissible>{{ strings.checkYourMail }}</q-alert>
        <q-alert v-if="!$store.state.properties.geolocation.exist" color="warning" icon="warning" appear dismissible>{{ strings.geolocNotAvailable }}</q-alert>
        <q-alert v-if="$store.state.properties.geolocation.denied" color="warning" icon="warning" appear dismissible>{{ strings.geolocDenied }}</q-alert>
        <q-alert v-if="$store.state.properties.geolocation.error" color="warning" icon="warning" appear dismissible>{{ strings.geolocError }}</q-alert>
      </div>
      <div class="col-12" v-if="!$store.state.properties.auth.check">
        <blockquote><p>{{ strings.subPitch }}</p><small>{{ strings.pitch }} </small></blockquote>
      </div>
    </div>
    <div class="row sm-gutter justify-center">
      <div v-if="!$store.state.properties.auth.check" style="max-width: 95%" class="col-12">
        <q-field icon="search">
          <q-chips-input v-model="search" :float-label="strings.searchLabel" :placeholder="strings.searchPlaceHolder"/>
        </q-field>
        <q-field  icon="zoom out map" :label="strings.mileageLabel" style="max-width: 90%">
          <q-range v-model="mileage" :min="0" :max="maxiMileage" label-always :left-label-value="`${mileage.min}Km`" :right-label-value="mileage.max === maxiMileage ? `+${mileage.max}Km` : `${mileage.max}Km`" />
        </q-field>
        <q-btn v-model="submit" loader color="secondary" class="full-width" icon-right="arrow forward" @click="findJobs()" :disable="submit">
          {{ strings.btnFindLabel }}
          <span slot="loading">{{ strings.btnFindLabel }}...<q-spinner-gears size="20px" /></span>
        </q-btn>
      </div>
      <div class="col-12 text-center">
        <q-spinner-gears color="primary" v-if="submit" :size="90" />
      </div>
    </div>
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
      strings: {},
      search: [],
      maxiMileage: 100,
      mileage: {
        min: 0,
        max: 30
      },
      submit: false
    }
  },
  mounted () {
    LanguageSetter.setStrings(this)
  },
  methods: {
    findJobs () {
      let that = this
      setTimeout(function () {
        that.submit = false
      }, 5000)
    }
  }
}
</script>

<style lang="scss">

</style>
