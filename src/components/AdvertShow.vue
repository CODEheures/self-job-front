<template>
  <div class="layout-padding">
    <div class="row sm-gutter">
      <div class="col-12" v-if="advert">
        <q-card style="max-width: 700px; margin: auto;">
          <q-item multiline>
            <q-item-side avatar="/statics/quasar-logo.png" />
            <q-item-main>
              <q-item-tile label>{{ advert.title }}
              </q-item-tile>
              <q-item-tile sublabel>{{ advert.company.name + ' - ' + advert.formatted_address + ' - ' + advert.contract.toUpperCase() }}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-item-tile stamp><q-icon name="place" />{{ advert.mileage }}Km</q-item-tile>
              <q-item-tile stamp><q-icon name="hourglass empty"/>{{ formatMyDate(advert.created_at) }}</q-item-tile>
            </q-item-side>
          </q-item>
          <q-card-media v-if="advert.pictureUrl"><img :src="advert.pictureUrl"></q-card-media>
          <q-card-title>
            <div slot="right" class="row items-center">
              <q-chip v-for="tag,index in advert.tags" :key="tag+_uid">{{ tag }} </q-chip>
            </div>
          </q-card-title>
          <q-card-main>
            <p style="white-space: pre-wrap">{{ advert.description }}</p>
          </q-card-main>
          <q-card-separator />
          <q-item>
            <q-item-main>
              <q-item-tile color="brown-5">{{ strings.requirements }}</q-item-tile>
              <q-item-tile color="brown-5">
                <ul>
                  <li v-for="requirement in advert.requirements">{{ requirement }}</li>
                </ul>
              </q-item-tile>
              <q-item-tile>
                <q-checkbox v-model="accept" :label="strings.checkAcceptLabel" />
              </q-item-tile>
            </q-item-main>
          </q-item>
          <q-card-separator />
          <q-card-actions>
            <q-btn color="primary" :disabled="!accept" @click="$router.push({ name: 'quizShow', params: { 'id': advert.id }})">{{ strings.btnNextStep }}</q-btn>
          </q-card-actions>
        </q-card>
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
      advert: null,
      accept: false
    }
  },
  mounted () {
    LanguageSetter.setStrings(this)
    LanguageSetter.setUnits(this)
    this.showAdvert()
  },
  methods: {
    showAdvert () {
      let that = this
      ApiRequests.showAdvert(this.$route.params.id)
        .then(function (response) {
          that.submit = false
          that.advert = response.data
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
  .q-chip {
    margin: 0 5px 5px 0;
  }
</style>
