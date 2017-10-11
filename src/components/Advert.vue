<template>
  <div class="layout-padding">
    <div class="row sm-gutter">
      <div class="col-12">
        <p>{{ $route.params.id }}</p>
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
      advert: {}
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
