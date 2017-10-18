<template>
  <div class="layout-padding">
    <div class="row sm-gutter">
      <div class="col-12">
        <p class="text-center">{{ strings.title }}</p>
        <q-list highlight separator no-border v-if="adverts.length > 0">
          <q-list-header>
            <q-item>
              <q-item-main :label="strings.tableTh1" />
              <q-item-side right :stamp="strings.tableTh2" />
            </q-item>
          </q-list-header>
          <q-item-separator></q-item-separator>
          <q-item v-for="advert in adverts" :key="advert.id">
            <q-item-main :label="advert.title" label-lines="2" />
            <q-item-side right stamp="30" />
            <q-item-side right icon="more_vert">
              <q-popover ref="popover">
                <q-list item-separator link>
                  <q-list-header>{{ strings.verticalHead2 }}</q-list-header>
                  <q-item @click="$router.push({name: 'advertShow', params: {id: advert.id}})">
                    <q-item-main :label="strings.verticalMenu1" />
                  </q-item>
                  <q-item-separator />
                  <q-list-header>{{ strings.verticalHead1 }}</q-list-header>
                  <q-item @click="$router.push({name: 'advertShow', params: {id: advert.id}})">
                    <q-item-main :label="strings.verticalMenu1" />
                  </q-item>
                  <q-item @click="$router.push({name: 'advertEdit', params: {id: advert.id}})">
                    <q-item-main :label="strings.verticalMenu3" />
                  </q-item>
                  <q-item @click="delAdvert(advert.id)">
                    <q-item-main :label="strings.verticalMenu2" />
                  </q-item>
                </q-list>
              </q-popover>
            </q-item-side>
          </q-item>
        </q-list>
        <div class="col-12 text-center" v-if="submit">
          <q-spinner-gears color="primary" v-if="submit" :size="90" />
        </div>
      </div>
    </div>
    <q-fixed-position corner="top-right" :offset="[18, 18]">
      <q-btn round color="secondary" @click="$router.push({name: 'createAdvert'})" icon="add" />
    </q-fixed-position>
  </div>
</template>

<script>
// TODO implementer delete, v-if delete et edit annonce et voir responses selon etat annonce
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
      submit: true
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
    },
    delAdvert (id) {
      console.log('bye bye advert ' + id)
    }
  }
}
</script>

<style lang="scss">

</style>
