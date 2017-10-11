<template>
  <div class="layout-padding">
    <div class="row sm-gutter">
      <div class="col-12" v-if="$store.state.properties.auth.isNew || !$store.state.properties.geolocation.exist || $store.state.properties.geolocation.denied || $store.state.properties.geolocation.error">
        <q-alert v-if="$store.state.properties.auth.isNew" color="green" icon="info outline" appear dismissible>{{ strings.checkYourMail }}</q-alert>
        <q-alert v-if="!$store.state.properties.geolocation.exist" color="warning" icon="warning" appear dismissible>{{ strings.geolocNotAvailable }}</q-alert>
        <q-alert v-if="$store.state.properties.geolocation.denied" color="warning" icon="warning" appear dismissible>{{ strings.geolocDenied }}</q-alert>
        <q-alert v-if="$store.state.properties.geolocation.error" color="warning" icon="warning" appear dismissible>{{ strings.geolocError }}</q-alert>
      </div>
      <div class="col-12" v-if="!$store.state.properties.auth.check && adverts.length <= 0">
        <blockquote><p>{{ strings.subPitch }}</p><small>{{ strings.pitch }} </small></blockquote>
      </div>
    </div>
    <div class="row sm-gutter justify-center">
      <div v-if="!$store.state.properties.auth.check" style="max-width: 95%" class="col-12">
        <q-field icon="search">
          <q-chips-input v-model="searchs" :float-label="strings.searchLabel" :placeholder="strings.searchPlaceHolder"/>
        </q-field>
        <q-field  icon="zoom out map" :label="strings.mileageLabel" style="max-width: 90%">
          <q-range v-model="mileage" :min="0" :max="maxiMileage" label-always :left-label-value="`${mileage.min}Km`" :right-label-value="mileage.max === maxiMileage ? `+${mileage.max}Km` : `${mileage.max}Km`" />
        </q-field>
        <q-btn v-model="submit" loader color="secondary" class="full-width" icon-right="arrow forward" @click="findAdverts()" :disable="submit">
          {{ strings.btnFindLabel }}
          <span slot="loading">{{ strings.btnFindLabel }}...<q-spinner-gears size="20px" /></span>
        </q-btn>
      </div>
      <div class="col-12 text-center" v-if="submit">
        <q-spinner-gears color="primary" v-if="submit" :size="90" />
      </div>
      <div class="col-12" v-if="!submit && adverts.length > 0">
        <q-list separator>
          <q-list-header>{{ strings.findListHeader }}</q-list-header>
          <q-item v-for="advert in adverts" :key="advert.id" multiline>
            <q-item-main>
              <q-item-tile label color="primary" label-line="2">{{ advert.title }}</q-item-tile>
              <q-item-tile sublabel>{{ advert.description.slice(0,90) + '...' }}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-item-tile label>{{ advert.user.company }}</q-item-tile>
              <q-item-tile sublabel><q-icon name="hourglass empty"/>{{ formatMyDate(advert.created) }}</q-item-tile>
              <q-item-tile><q-btn @click="$router.push({ name: 'advert', params: { id: advert.id } })" small round icon="zoom in" color="secondary"></q-btn></q-item-tile>
            </q-item-side>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageSetter from '../strings/languageSetter'
import ApiRequests from '../api/requests'
import { date } from 'quasar'

export default {
  props: {
    stringPageScopeName: String
  },
  data () {
    return {
      strings: {},
      units: [],
      searchs: [],
      maxiMileage: 250,
      mileage: {
        min: 0,
        max: 30
      },
      submit: false,
      adverts: []
    }
  },
  mounted () {
    LanguageSetter.setStrings(this)
    LanguageSetter.setUnits(this)
  },
  methods: {
    findAdverts () {
      let that = this
      this.mileage.stop = this.maxiMileage
      ApiRequests.getAdverts(
        this.searchs,
        this.$store.state.properties.geolocation.position,
        this.mileage,
        this.$store.state.properties.appLanguage.choice
      )
        .then(function (response) {
          that.submit = false
          that.adverts = response.data
        })
        .catch(function () {
          that.submit = false
        })
    },
    formatMyDate (myDate) {
      let now = Date.now()

      let diffInSeconds = date.getDateDiff(now, myDate, 'seconds')
      console.log(diffInSeconds)
      if (diffInSeconds < 60) {
        return diffInSeconds > 1 ? diffInSeconds + ' ' + this.units.time.second.plural : diffInSeconds + ' ' + this.units.time.second.single
      }

      let diffInMinutes = date.getDateDiff(now, myDate, 'minutes')
      console.log(diffInMinutes)
      if (diffInMinutes < 60) {
        return diffInMinutes > 1 ? diffInMinutes + ' ' + this.units.time.minute.plural : diffInMinutes + ' ' + this.units.time.minute.single
      }

      let diffInHours = date.getDateDiff(now, myDate, 'hours')
      console.log(diffInHours)
      if (diffInHours < 24) {
        return diffInHours > 1 ? diffInHours + ' ' + this.units.time.hour.plural : diffInHours + ' ' + this.units.time.hour.single
      }

      let diffInDays = date.getDateDiff(now, myDate, 'days')
      console.log(diffInDays)
      if (diffInDays < 31) {
        return diffInDays > 1 ? diffInDays + ' ' + this.units.time.day.plural : diffInDays + ' ' + this.units.time.day.single
      }

      let diffInMonths = date.getDateDiff(now, myDate, 'months')
      console.log(diffInMonths)
      if (diffInMonths < 31) {
        return diffInMonths > 1 ? diffInMonths + ' ' + this.units.time.month.plural : diffInMonths + ' ' + this.units.time.month.single
      }
    }
  }
}
</script>

<style lang="scss">

</style>
