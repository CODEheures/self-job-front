<template>
  <q-layout ref="layout" view="lHr LpR lFr" :left-breakpoint="999999" :right-breakpoint="1100">
    <!-- Header -->
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        {{ strings.appTitle }}
        <span slot="subtitle">{{ strings.appSubTitle }}</span>
      </q-toolbar-title>
    </q-toolbar>

    <!-- Left Side Panel -->
    <div slot="left">
      <q-list no-border link inset-separator>
        <q-list-header>{{ strings.appTitle }}</q-list-header>
        <q-side-link item :to="{ name: 'home' }" v-if="!$store.state.properties.auth.check">
          <q-item-side icon="search" />
          <q-item-main :label="strings.menu.home" :sublabel="strings.menu.home_sub" />
        </q-side-link>
        <q-side-link item :to="{ name: 'myAdverts' }" v-if="$store.state.properties.auth.check">
          <q-item-side icon="view list" />
          <q-item-main :label="strings.menu.myAdverts" :sublabel="strings.menu.home_sub" />
        </q-side-link>
        <q-side-link item :to="{ name: 'settings' }">
          <q-item-side icon="settings" />
          <q-item-main :label="strings.menu.settings" :sublabel="strings.menu.settings_sub" />
        </q-side-link>
        <q-side-link item :to="{ name: 'login' }" v-if="!$store.state.properties.auth.check">
          <q-item-side icon="person" />
          <q-item-main :label="strings.menu.login" />
        </q-side-link>
        <q-side-link item :to="{ name: 'teamManage' }" v-if="$store.state.properties.auth.check && $store.state.properties.auth.user.can_manage_team">
          <q-item-side icon="people" />
          <q-item-main :label="strings.menu.teamManage" />
        </q-side-link>
        <q-item item @click="logout()" v-if="$store.state.properties.auth.check">
          <q-item-side icon="exit to app" />
          <q-item-main :label="strings.menu.logout" :sublabel="strings.isLogin + $store.state.properties.auth.user.name" />
        </q-item>
      </q-list>
    </div>

    <!-- sub-routes get injected here: -->
    <router-view v-show="!submit" />
    <div class="col-12 text-center" v-if="submit">
      <q-spinner-gears color="primary" :size="90" />
    </div>
    <q-btn
      big
      v-back-to-top.animate="{offset: 500, duration: 200}"
      color="secondary"
      class="fixed-top-right animate-pop"
      style="margin: 55px 12px 0 0"
    >
      <q-icon name="keyboard_arrow_up" />
    </q-btn>
    <!-- Footer -->
    <!--<q-toolbar slot="footer" >-->
      <!--<q-toolbar-title>-->
        <!--Layout Footer-->
      <!--</q-toolbar-title>-->
    <!--</q-toolbar>-->

  </q-layout>
</template>

<script>
import LanguageSetter from '../strings/languageSetter'
import ApiRequests from '../api/requests'
import Utils from './utils'
import { Alert, BackToTop, date } from 'quasar'

export default {
  directives: {
    BackToTop
  },
  props: {
    stringPageScopeName: String
  },
  data () {
    return {
      strings: {
        menu: {}
      },
      submit: false,
      autoLogout: undefined
    }
  },
  mounted () {
    // watcher auth check for redirect
    Utils.redirectIfAuthCheckChange(this)

    // Set App Language
    LanguageSetter.setStrings(this)

    // Set geolocation
    this.$store.commit('setGeoLocation')

    // Get the Session If exist
    this.getExistSession()

    // If login launch the auto logout
    this.$q.events.$on('login', () => this.launchAutoLogoutTimer())
  },
  methods: {
    login () {
      // Goto Login view
      this.$router.push({name: 'login'})
    },
    logout (withAlert = true) {
      // Clear the auto Logout
      if (this.autoLogout !== undefined) {
        clearTimeout(this.autoLogout)
      }

      // Send request for revoke token
      // Unset Auth in always case
      // Return to home and Alert if withAlert
      let that = this
      that.$refs.layout.hideCurrentSide()
      ApiRequests.logout()
        .then(function () {})
        .catch(function () {})
        .then(function () {
          that.unsetAuth()
          that.submit = false
          if (withAlert) {
            Alert.create({
              enter: 'bounceInUp',
              leave: 'bounceOutDown',
              color: 'positive',
              icon: 'check circle',
              html: that.strings.logoutSuccess,
              position: 'bottom-center',
              dismissible: true
            })
          }
        })
    },
    unsetAuth () {
      // Call the unsetAuth store mutation
      this.$store.commit('unsetAuth')
    },
    getExistSession () {
      this.submit = true
      // Call the setAuth store mutation if valid session exist
      if (this.testExistSession()) {
        this.$store.commit('setAuth', {
          accessToken: localStorage.getItem('_at'),
          refreshToken: localStorage.getItem('_rt'),
          expire: localStorage.getItem('_ex'),
          callBack: this.launchAutoLogoutTimer
        })
      }
      else {
        this.$store.commit('unsetAuth')
        this.submit = false
      }
    },
    testExistSession () {
      // Test Local storage session vars and validity
      if (localStorage.getItem('_at') && localStorage.getItem('_rt') && localStorage.getItem('_ex')) {
        let tokenEnd = localStorage.getItem('_ex')
        let now = new Date()
        let min = date.getMinDate(tokenEnd, now)
        if (date.isSameDate(min, tokenEnd)) {
          // Log out if tokens has expired
          this.logout(false)
          return false
        }
        else {
          return true
        }
      }
    },
    launchAutoLogoutTimer () {
      this.submit = false
      if (this.$store.state.properties.auth.check) {
        let that = this
        let tokenEnd = localStorage.getItem('_ex')
        let now = new Date()
        let lifetime = date.getDateDiff(tokenEnd, now, 'seconds')
        this.autoLogout = setTimeout(function () {
          that.logout()
        }, lifetime * 1000)
      }
    }
  }
}
</script>

<style>
  .layout-padding {
    padding-right: 15px;
  }
  main.layout-page {
    /* https://www.svgbackgrounds.com/#wavey-fingerprint */
    /* background-color: #fdfeff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='565' height='68' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23e2e2e2' stroke-width='13.6' stroke-opacity='0.08'%3E%3Cpath d='M-500%2C75c0%2C0%2C125-30%2C250-30S0%2C75%2C0%2C75s125%2C30%2C250%2C30s250-30%2C250-30s125-30%2C250-30s250%2C30%2C250%2C30s125%2C30%2C250%2C30s250-30%2C250-30'/%3E%3Cpath d='M-500%2C45c0%2C0%2C125-30%2C250-30S0%2C45%2C0%2C45s125%2C30%2C250%2C30s250-30%2C250-30s125-30%2C250-30s250%2C30%2C250%2C30s125%2C30%2C250%2C30s250-30%2C250-30'/%3E%3Cpath d='M-500%2C105c0%2C0%2C125-30%2C250-30S0%2C105%2C0%2C105s125%2C30%2C250%2C30s250-30%2C250-30s125-30%2C250-30s250%2C30%2C250%2C30s125%2C30%2C250%2C30s250-30%2C250-30'/%3E%3Cpath d='M-500%2C15c0%2C0%2C125-30%2C250-30S0%2C15%2C0%2C15s125%2C30%2C250%2C30s250-30%2C250-30s125-30%2C250-30s250%2C30%2C250%2C30s125%2C30%2C250%2C30s250-30%2C250-30'/%3E%3Cpath d='M-500-15c0%2C0%2C125-30%2C250-30S0-15%2C0-15s125%2C30%2C250%2C30s250-30%2C250-30s125-30%2C250-30s250%2C30%2C250%2C30s125%2C30%2C250%2C30s250-30%2C250-30'/%3E%3Cpath d='M-500%2C135c0%2C0%2C125-30%2C250-30S0%2C135%2C0%2C135s125%2C30%2C250%2C30s250-30%2C250-30s125-30%2C250-30s250%2C30%2C250%2C30s125%2C30%2C250%2C30s250-30%2C250-30'/%3E%3C/g%3E%3C/svg%3E"); */

    /* background-color: #abced8;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23d8e6ec'/%3E%3Cstop offset='1' stop-color='%23abced8'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23f8feff' stop-opacity='0.35'/%3E%3Cstop offset='1' stop-color='%23f8feff' stop-opacity='0.35'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.35'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
    background-position: center; */

    /* background-color: #ebf1f0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='628' height='628' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23fdffff' stroke-width='1' stroke-opacity='0.2'%3E%3Crect x='-40' y='40' width='75' height='75'/%3E%3Crect x='-35' y='45' width='65' height='65'/%3E%3Crect x='-30' y='50' width='55' height='55'/%3E%3Crect x='-25' y='55' width='45' height='45'/%3E%3Crect x='-20' y='60' width='35' height='35'/%3E%3Crect x='-15' y='65' width='25' height='25'/%3E%3Crect x='-10' y='70' width='15' height='15'/%3E%3Crect x='-5' y='75' width='5' height='5'/%3E%3Crect width='35' height='35'/%3E%3Crect x='5' y='5' width='25' height='25'/%3E%3Crect x='10' y='10' width='15' height='15'/%3E%3Crect x='15' y='15' width='5' height='5'/%3E%3Crect x='40' width='75' height='75'/%3E%3Crect x='45' y='5' width='65' height='65'/%3E%3Crect x='50' y='10' width='55' height='55'/%3E%3Crect x='55' y='15' width='45' height='45'/%3E%3Crect x='60' y='20' width='35' height='35'/%3E%3Crect x='65' y='25' width='25' height='25'/%3E%3Crect x='70' y='30' width='15' height='15'/%3E%3Crect x='75' y='35' width='5' height='5'/%3E%3Crect x='40' y='80' width='35' height='35'/%3E%3Crect x='45' y='85' width='25' height='25'/%3E%3Crect x='50' y='90' width='15' height='15'/%3E%3Crect x='55' y='95' width='5' height='5'/%3E%3Crect x='120' y='-40' width='75' height='75'/%3E%3Crect x='125' y='-35' width='65' height='65'/%3E%3Crect x='130' y='-30' width='55' height='55'/%3E%3Crect x='135' y='-25' width='45' height='45'/%3E%3Crect x='140' y='-20' width='35' height='35'/%3E%3Crect x='145' y='-15' width='25' height='25'/%3E%3Crect x='150' y='-10' width='15' height='15'/%3E%3Crect x='155' y='-5' width='5' height='5'/%3E%3Crect x='120' y='40' width='35' height='35'/%3E%3Crect x='125' y='45' width='25' height='25'/%3E%3Crect x='130' y='50' width='15' height='15'/%3E%3Crect x='135' y='55' width='5' height='5'/%3E%3Crect y='120' width='75' height='75'/%3E%3Crect x='5' y='125' width='65' height='65'/%3E%3Crect x='10' y='130' width='55' height='55'/%3E%3Crect x='15' y='135' width='45' height='45'/%3E%3Crect x='20' y='140' width='35' height='35'/%3E%3Crect x='25' y='145' width='25' height='25'/%3E%3Crect x='30' y='150' width='15' height='15'/%3E%3Crect x='35' y='155' width='5' height='5'/%3E%3Crect x='200' y='120' width='75' height='75'/%3E%3Crect x='40' y='200' width='75' height='75'/%3E%3Crect x='80' y='80' width='75' height='75'/%3E%3Crect x='85' y='85' width='65' height='65'/%3E%3Crect x='90' y='90' width='55' height='55'/%3E%3Crect x='95' y='95' width='45' height='45'/%3E%3Crect x='100' y='100' width='35' height='35'/%3E%3Crect x='105' y='105' width='25' height='25'/%3E%3Crect x='110' y='110' width='15' height='15'/%3E%3Crect x='115' y='115' width='5' height='5'/%3E%3Crect x='80' y='160' width='35' height='35'/%3E%3Crect x='85' y='165' width='25' height='25'/%3E%3Crect x='90' y='170' width='15' height='15'/%3E%3Crect x='95' y='175' width='5' height='5'/%3E%3Crect x='120' y='160' width='75' height='75'/%3E%3Crect x='125' y='165' width='65' height='65'/%3E%3Crect x='130' y='170' width='55' height='55'/%3E%3Crect x='135' y='175' width='45' height='45'/%3E%3Crect x='140' y='180' width='35' height='35'/%3E%3Crect x='145' y='185' width='25' height='25'/%3E%3Crect x='150' y='190' width='15' height='15'/%3E%3Crect x='155' y='195' width='5' height='5'/%3E%3Crect x='160' y='40' width='75' height='75'/%3E%3Crect x='165' y='45' width='65' height='65'/%3E%3Crect x='170' y='50' width='55' height='55'/%3E%3Crect x='175' y='55' width='45' height='45'/%3E%3Crect x='180' y='60' width='35' height='35'/%3E%3Crect x='185' y='65' width='25' height='25'/%3E%3Crect x='190' y='70' width='15' height='15'/%3E%3Crect x='195' y='75' width='5' height='5'/%3E%3Crect x='160' y='120' width='35' height='35'/%3E%3Crect x='165' y='125' width='25' height='25'/%3E%3Crect x='170' y='130' width='15' height='15'/%3E%3Crect x='175' y='135' width='5' height='5'/%3E%3Crect x='200' y='200' width='35' height='35'/%3E%3Crect x='200' width='35' height='35'/%3E%3Crect y='200' width='35' height='35'/%3E%3C/g%3E%3C/svg%3E"); */

    /* background-color: #fdffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='402' height='334.9' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.02'%3E%3Cpolygon fill='%23444' points='90%2C150 0%2C300 180%2C300'/%3E%3Cpolygon points='90%2C150 180%2C0 0%2C0'/%3E%3Cpolygon fill='%23AAA' points='270%2C150 360%2C0 180%2C0'/%3E%3Cpolygon fill='%23DDD' points='450%2C150 360%2C300 540%2C300'/%3E%3Cpolygon fill='%23999' points='450%2C150 540%2C0 360%2C0'/%3E%3Cpolygon points='630%2C150 540%2C300 720%2C300'/%3E%3Cpolygon fill='%23DDD' points='630%2C150 720%2C0 540%2C0'/%3E%3Cpolygon fill='%23444' points='810%2C150 720%2C300 900%2C300'/%3E%3Cpolygon fill='%23FFF' points='810%2C150 900%2C0 720%2C0'/%3E%3Cpolygon fill='%23DDD' points='990%2C150 900%2C300 1080%2C300'/%3E%3Cpolygon fill='%23444' points='990%2C150 1080%2C0 900%2C0'/%3E%3Cpolygon fill='%23DDD' points='90%2C450 0%2C600 180%2C600'/%3E%3Cpolygon points='90%2C450 180%2C300 0%2C300'/%3E%3Cpolygon fill='%23666' points='270%2C450 180%2C600 360%2C600'/%3E%3Cpolygon fill='%23AAA' points='270%2C450 360%2C300 180%2C300'/%3E%3Cpolygon fill='%23DDD' points='450%2C450 360%2C600 540%2C600'/%3E%3Cpolygon fill='%23999' points='450%2C450 540%2C300 360%2C300'/%3E%3Cpolygon fill='%23999' points='630%2C450 540%2C600 720%2C600'/%3E%3Cpolygon fill='%23FFF' points='630%2C450 720%2C300 540%2C300'/%3E%3Cpolygon points='810%2C450 720%2C600 900%2C600'/%3E%3Cpolygon fill='%23DDD' points='810%2C450 900%2C300 720%2C300'/%3E%3Cpolygon fill='%23AAA' points='990%2C450 900%2C600 1080%2C600'/%3E%3Cpolygon fill='%23444' points='990%2C450 1080%2C300 900%2C300'/%3E%3Cpolygon fill='%23222' points='90%2C750 0%2C900 180%2C900'/%3E%3Cpolygon points='270%2C750 180%2C900 360%2C900'/%3E%3Cpolygon fill='%23DDD' points='270%2C750 360%2C600 180%2C600'/%3E%3Cpolygon points='450%2C750 540%2C600 360%2C600'/%3E%3Cpolygon points='630%2C750 540%2C900 720%2C900'/%3E%3Cpolygon fill='%23444' points='630%2C750 720%2C600 540%2C600'/%3E%3Cpolygon fill='%23AAA' points='810%2C750 720%2C900 900%2C900'/%3E%3Cpolygon fill='%23666' points='810%2C750 900%2C600 720%2C600'/%3E%3Cpolygon fill='%23999' points='990%2C750 900%2C900 1080%2C900'/%3E%3Cpolygon fill='%23999' points='180%2C0 90%2C150 270%2C150'/%3E%3Cpolygon fill='%23444' points='360%2C0 270%2C150 450%2C150'/%3E%3Cpolygon fill='%23FFF' points='540%2C0 450%2C150 630%2C150'/%3E%3Cpolygon points='900%2C0 810%2C150 990%2C150'/%3E%3Cpolygon fill='%23222' points='0%2C300 -90%2C450 90%2C450'/%3E%3Cpolygon fill='%23FFF' points='0%2C300 90%2C150 -90%2C150'/%3E%3Cpolygon fill='%23FFF' points='180%2C300 90%2C450 270%2C450'/%3E%3Cpolygon fill='%23666' points='180%2C300 270%2C150 90%2C150'/%3E%3Cpolygon fill='%23222' points='360%2C300 270%2C450 450%2C450'/%3E%3Cpolygon fill='%23FFF' points='360%2C300 450%2C150 270%2C150'/%3E%3Cpolygon fill='%23444' points='540%2C300 450%2C450 630%2C450'/%3E%3Cpolygon fill='%23222' points='540%2C300 630%2C150 450%2C150'/%3E%3Cpolygon fill='%23AAA' points='720%2C300 630%2C450 810%2C450'/%3E%3Cpolygon fill='%23666' points='720%2C300 810%2C150 630%2C150'/%3E%3Cpolygon fill='%23FFF' points='900%2C300 810%2C450 990%2C450'/%3E%3Cpolygon fill='%23999' points='900%2C300 990%2C150 810%2C150'/%3E%3Cpolygon points='0%2C600 -90%2C750 90%2C750'/%3E%3Cpolygon fill='%23666' points='0%2C600 90%2C450 -90%2C450'/%3E%3Cpolygon fill='%23AAA' points='180%2C600 90%2C750 270%2C750'/%3E%3Cpolygon fill='%23444' points='180%2C600 270%2C450 90%2C450'/%3E%3Cpolygon fill='%23444' points='360%2C600 270%2C750 450%2C750'/%3E%3Cpolygon fill='%23999' points='360%2C600 450%2C450 270%2C450'/%3E%3Cpolygon fill='%23666' points='540%2C600 630%2C450 450%2C450'/%3E%3Cpolygon fill='%23222' points='720%2C600 630%2C750 810%2C750'/%3E%3Cpolygon fill='%23FFF' points='900%2C600 810%2C750 990%2C750'/%3E%3Cpolygon fill='%23222' points='900%2C600 990%2C450 810%2C450'/%3E%3Cpolygon fill='%23DDD' points='0%2C900 90%2C750 -90%2C750'/%3E%3Cpolygon fill='%23444' points='180%2C900 270%2C750 90%2C750'/%3E%3Cpolygon fill='%23FFF' points='360%2C900 450%2C750 270%2C750'/%3E%3Cpolygon fill='%23AAA' points='540%2C900 630%2C750 450%2C750'/%3E%3Cpolygon fill='%23FFF' points='720%2C900 810%2C750 630%2C750'/%3E%3Cpolygon fill='%23222' points='900%2C900 990%2C750 810%2C750'/%3E%3Cpolygon fill='%23222' points='1080%2C300 990%2C450 1170%2C450'/%3E%3Cpolygon fill='%23FFF' points='1080%2C300 1170%2C150 990%2C150'/%3E%3Cpolygon points='1080%2C600 990%2C750 1170%2C750'/%3E%3Cpolygon fill='%23666' points='1080%2C600 1170%2C450 990%2C450'/%3E%3Cpolygon fill='%23DDD' points='1080%2C900 1170%2C750 990%2C750'/%3E%3C/g%3E%3C/svg%3E"); */

    background-color: #f3f4f6; /* 2d4563; */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%23546580' d='M486%2C705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5%2C692.1%2C49%2C703%2C0%2C719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8%2C707.1%2C489.4%2C706.5%2C486%2C705.8z'/%3E%3Cpath fill='%237a879d' d='M1600%2C0H0v719.8c49-16.8%2C99.5-27.8%2C150.7-33.5c111.9-12.7%2C226-2.4%2C335.3%2C19.4c3.4%2C0.7%2C6.8%2C1.4%2C10.2%2C2c116.8%2C24%2C231.7%2C59%2C347.6%2C92.2H1600V0z'/%3E%3Cpath fill='%23a2abbc' d='M478.4%2C581c3.2%2C0.8%2C6.4%2C1.7%2C9.5%2C2.5c196.2%2C52.5%2C388.7%2C133.5%2C593.5%2C176.6c174.2%2C36.6%2C349.5%2C29.2%2C518.6-10.2V0H0v574.9c52.3-17.6%2C106.5-27.7%2C161.1-30.9C268.4%2C537.4%2C375.7%2C554.2%2C478.4%2C581z'/%3E%3Cpath fill='%23cbd0dc' d='M0%2C0v429.4c55.6-18.4%2C113.5-27.3%2C171.4-27.7c102.8-0.8%2C203.2%2C22.7%2C299.3%2C54.5c3%2C1%2C5.9%2C2%2C8.9%2C3c183.6%2C62%2C365.7%2C146.1%2C562.4%2C192.1c186.7%2C43.7%2C376.3%2C34.4%2C557.9-12.6V0H0z'/%3E%3Cpath fill='%23f5f6fc' d='M181.8%2C259.4c98.2%2C6%2C191.9%2C35.2%2C281.3%2C72.1c2.8%2C1.1%2C5.5%2C2.3%2C8.3%2C3.4c171%2C71.6%2C342.7%2C158.5%2C531.3%2C207.7c198.8%2C51.8%2C403.4%2C40.8%2C597.3-14.8V0H0v283.2C59%2C263.6%2C120.6%2C255.7%2C181.8%2C259.4z'/%3E%3Cpath fill='%23f7f8fd' d='M1600%2C0H0v136.3c62.3-20.9%2C127.7-27.5%2C192.2-19.2c93.6%2C12.1%2C180.5%2C47.7%2C263.3%2C89.6c2.6%2C1.3%2C5.1%2C2.6%2C7.7%2C3.9c158.4%2C81.1%2C319.7%2C170.9%2C500.3%2C223.2c210.5%2C61%2C430.8%2C49%2C636.6-16.6V0z'/%3E%3Cpath fill='%23f9fafd' d='M454.9%2C86.3C600.7%2C177%2C751.6%2C269.3%2C924.1%2C325c208.6%2C67.4%2C431.3%2C60.8%2C637.9-5.3c12.8-4.1%2C25.4-8.4%2C38.1-12.9V0H288.1c56%2C21.3%2C108.7%2C50.6%2C159.7%2C82C450.2%2C83.4%2C452.5%2C84.9%2C454.9%2C86.3z'/%3E%3Cpath fill='%23fbfbfe' d='M1600%2C0H498c118.1%2C85.8%2C243.5%2C164.5%2C386.8%2C216.2c191.8%2C69.2%2C400%2C74.7%2C595%2C21.1c40.8-11.2%2C81.1-25.2%2C120.3-41.7V0z'/%3E%3Cpath fill='%23fdfdfe' d='M1397.5%2C154.8c47.2-10.6%2C93.6-25.3%2C138.6-43.8c21.7-8.9%2C43-18.8%2C63.9-29.5V0H643.4c62.9%2C41.7%2C129.7%2C78.2%2C202.1%2C107.4C1020.4%2C178.1%2C1214.2%2C196.1%2C1397.5%2C154.8z'/%3E%3Cpath fill='%23ffffff' d='M1315.3%2C72.4c75.3-12.6%2C148.9-37.1%2C216.8-72.4h-723C966.8%2C71%2C1144.7%2C101%2C1315.3%2C72.4z'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
  }
  .q-card, .q-stepper {
    background: white;
  }
</style>
