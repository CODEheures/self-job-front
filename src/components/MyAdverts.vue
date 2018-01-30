<template>
  <div class="layout-padding">
    <q-modal v-model="openAnswerModalView" minimized :content-css="{padding: '50px'}">
      <h4>{{ strings.modalAnswersTitle }}</h4>
      <div class="col-12 text-center" v-if="submit2">
        <q-spinner-gears color="primary" v-if="submit2" :size="90" />
      </div>
      <div v-else>
        <q-list separator no-border v-if="answers.length > 0">
          <q-item>
            <q-item-main :label="strings.modalAnswersTh1" />
            <q-item-side right :stamp="strings.modalAnswersTh2" />
          </q-item>
          <q-item v-for="answer in answers" :key="answer.id">
            <q-item-main :label="answer.email" :sublabel="answer.phone" />
            <q-item-side right :stamp="answer.score + '%'" />
          </q-item>
        </q-list>
      </div>
      <q-btn color="primary" @click="openAnswerModalView = false">Close Me</q-btn>
    </q-modal>
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
            <q-item-side right>
              <q-btn small color="primary" @click="openAnswers(advert.id)" icon="view list">{{ advert.responses_count.toString() }}</q-btn>
            </q-item-side>
            <q-item-side right icon="more_vert">
              <q-popover ref="popover">
                <q-list item-separator link>
                  <q-list-header>{{ strings.verticalHead1 }}</q-list-header>
                  <q-item @click="$router.push({name: 'advertShow', params: {id: advert.id}})">
                    <q-item-main :label="strings.verticalMenu1" />
                  </q-item>
                  <q-item @click="publishAdvert(advert)">
                    <q-item-main :label="advert.is_publish ? strings.verticalMenu5 : strings.verticalMenu4" />
                  </q-item>
                  <q-item :disabled="!advert.is_updatable" @click="advert.is_updatable ? $router.push({name: 'advertEdit', params: {id: advert.id}}) : null">
                    <q-item-main :label="strings.verticalMenu3" />
                  </q-item>
                  <q-item :disabled="!advert.is_deletable" @click="advert.is_deletable ? delAdvert(advert.id) : null">
                    <q-item-main :label="strings.verticalMenu2" />
                  </q-item>
                </q-list>
              </q-popover>
            </q-item-side>
          </q-item>
        </q-list>
        <q-alert v-else color="info" icon="info outline" appear>{{ strings.emptyMessage }}</q-alert>
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
import { Alert, Dialog } from 'quasar'

export default {
  props: {
    stringPageScopeName: String
  },
  data () {
    return {
      strings: {},
      units: [],
      adverts: [],
      answers: [],
      submit: true,
      submit2: false,
      openAnswerModalView: false
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
    openAnswers (id) {
      this.openAnswerModalView = true
      let that = this
      that.submit2 = true
      that.answers = []
      ApiRequests.getAdvertAnswers(id)
        .then(function (response) {
          that.submit2 = false
          that.answers = response.data
        })
        .catch(function () {
          that.submit2 = false
          Alert.create({
            enter: 'bounceInUp',
            leave: 'bounceOutDown',
            color: 'negative',
            icon: 'warning',
            html: that.strings.deleteError,
            position: 'bottom-center',
            dismissible: true
          })
        })
    },
    publishAdvert (advert) {
      let that = this
      that.submit = true
      ApiRequests.publishAdvert(advert.id, !advert.is_publish)
        .then(function (response) {
          that.submit = false
          that.adverts = response.data
        })
        .catch(function () {
          that.submit2 = false
          Alert.create({
            enter: 'bounceInUp',
            leave: 'bounceOutDown',
            color: 'negative',
            icon: 'warning',
            html: that.strings.deleteError,
            position: 'bottom-center',
            dismissible: true
          })
        })
    },
    delAdvert (id) {
      let that = this
      Dialog.create({
        title: this.strings.confirmDialogTitle,
        message: this.strings.confirmDialogMessage,
        buttons: [
          {
            label: this.strings.confirmDialogBtnCancel
          },
          {
            label: this.strings.confirmDialogBtnConfirm,
            handler () {
              that.submit = true
              ApiRequests.deleteAdvert(id)
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
                    html: that.strings.deleteError,
                    position: 'bottom-center',
                    dismissible: true
                  })
                })
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss">

</style>
