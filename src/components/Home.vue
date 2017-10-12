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
        <q-infinite-scroll ref="infiniteScroll" :handler="loadMore" :offset="10">
          <q-card inline style="width: 300px; max-width: 95%;" v-for="advert,index in adverts" :key="advert.id">
            <q-item>
              <q-item-side avatar="statics/quasar-logo.png" />
              <q-item-main>
                <q-item-tile label>{{ advert.title }}</q-item-tile>
                <q-item-tile sublabel>{{ advert.user.company }}</q-item-tile>
              </q-item-main>
            </q-item>
            <q-card-media v-if="index==0"><img src="~assets/be.jpg"></q-card-media>
            <q-card-title>
              <div slot="right" class="row items-center">
                <q-icon name="place" /> {{ advert.mileage }}Km
                <q-icon name="hourglass empty"/>{{ formatMyDate(advert.created) }}
              </div>
            </q-card-title>
            <q-card-main>
              <p>{{ advert.description.slice(0,90) + '...' }}</p>
            </q-card-main>
            <q-card-separator />
            <q-card-actions>
              <q-btn color="primary" @click="$router.push({ name: 'advertShow', params: { 'id': advert.id }})">{{ strings.seeMore }}</q-btn>
            </q-card-actions>
          </q-card>
          <div class="col-12 text-center" slot="message">
            <q-spinner-gears color="primary" :size="90" />
          </div>
        </q-infinite-scroll>
        <p v-if="adverts.length >= totalHits">Fin des résultats</p>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageSetter from '../strings/languageSetter'
import ApiRequests from '../api/requests'
import { Alert, date } from 'quasar'

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
      adverts: [],
      totalHits: 0
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
        0,
        this.$store.state.properties.appLanguage.choice
      )
        .then(function (response) {
          that.submit = false
          that.adverts = response.data.adverts
          that.totalHits = response.data.totalHits
        })
        .catch(function () {
          that.submit = false
          Alert.create({
            enter: 'bounceInUp',
            leave: 'bounceOutDown',
            color: 'negative',
            icon: 'warning',
            html: that.strings.findError,
            position: 'bottom-center',
            dismissible: true
          })
        })
    },
    loadMore (index, done) {
      let that = this
      this.mileage.stop = this.maxiMileage
      ApiRequests.getAdverts(
        this.searchs,
        this.$store.state.properties.geolocation.position,
        this.mileage,
        this.adverts.length,
        this.$store.state.properties.appLanguage.choice
      )
        .then(function (response) {
          that.submit = false
          let adverts = response.data.adverts
          adverts.forEach(function (advert) {
            that.adverts.push(advert)
          })
          that.totalHits = response.data.totalHits
          if (that.adverts.length === that.totalHits) {
            that.$refs.infiniteScroll.stop()
          }
          done()
        })
        .catch(function (error) {
          that.submit = false
          console.log(error)
          Alert.create({
            enter: 'bounceInUp',
            leave: 'bounceOutDown',
            color: 'negative',
            icon: 'warning',
            html: that.strings.findError,
            position: 'bottom-center',
            dismissible: true
          })
        })
    },
    formatMyDate (myDate) {
      let now = Date.now()

      // If diff >= 1 month
      let diffInMonths = date.getDateDiff(now, myDate, 'months')
      if (diffInMonths >= 1) {
        return diffInMonths > 1 ? diffInMonths + ' ' + this.units.time.month.plural : diffInMonths + ' ' + this.units.time.month.single
      }

      // If diff >= 1 day
      let diffInDays = date.getDateDiff(now, myDate, 'days')
      if (diffInDays >= 1) {
        return diffInDays > 1 ? diffInDays + ' ' + this.units.time.day.plural : diffInDays + ' ' + this.units.time.day.single
      }

      // If diff >= 1 hour
      let diffInHours = date.getDateDiff(now, myDate, 'hours')
      if (diffInHours >= 1) {
        return diffInHours > 1 ? diffInHours + ' ' + this.units.time.hour.plural : diffInHours + ' ' + this.units.time.hour.single
      }

      // If diff >= 1 minute
      let diffInMinutes = date.getDateDiff(now, myDate, 'minutes')
      if (diffInMinutes >= 1) {
        return diffInMinutes > 1 ? diffInMinutes + ' ' + this.units.time.minute.plural : diffInMinutes + ' ' + this.units.time.minute.single
      }

      // Else
      let diffInSeconds = date.getDateDiff(now, myDate, 'seconds')
      if (diffInSeconds < 60) {
        return diffInSeconds > 1 ? diffInSeconds + ' ' + this.units.time.second.plural : diffInSeconds + ' ' + this.units.time.second.single
      }
    }
  }
}
</script>

<style lang="scss">

</style>
