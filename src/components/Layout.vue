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
        <q-item item @click="logout()" v-if="$store.state.properties.auth.check">
          <q-item-side icon="exit to app" />
          <q-item-main :label="strings.menu.logout" :sublabel="strings.isLogin + $store.state.properties.auth.user.name" />
        </q-item>
      </q-list>
    </div>

    <!-- sub-routes get injected here: -->
    <router-view />
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
    <q-toolbar slot="footer" >
      <q-toolbar-title>
        Layout Footer
      </q-toolbar-title>
    </q-toolbar>

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
</script>

<style>
  .layout-padding {
    padding-right: 15px;
  }
</style>
