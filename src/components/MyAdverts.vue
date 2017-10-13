<template>
  <div class="layout-padding">
    <div class="row sm-gutter">
      <div class="col-12">
        <p v-for="advert in adverts" :key="'p'+_uid">{{ advert.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageSetter from '../strings/languageSetter'
import ApiRequests from '../api/requests'
import Utils from './utils'
import { Alert } from 'quasar'

export default {
  props: {
    stringPageScopeName: String
  },
  data () {
    return {
      strings: {},
      units: [],
      adverts: [],
      accept: false
    }
  },
  mounted () {
    LanguageSetter.setStrings(this)
    LanguageSetter.setUnits(this)
    this.getMyAdverts()
  },
  methods: {
    getMyAdverts () {
      let that = this
      ApiRequests.getMyAdverts()
        .then(function (response) {
          that.submit = false
          that.adverts = response.data
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
    formatMyDate (myDate) {
      return Utils.dateToHumanDiff(this, myDate, true)
    }
  }
}
</script>

<style lang="scss">

</style>
