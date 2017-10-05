<template>
  <q-layout ref="layout" view="lHr LpR lFr" :right-breakpoint="1100">
    <!-- Header -->
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        {{ strings.appTitle }}
        <span slot="subtitle">{{ strings.appSubTitle }}</span>
      </q-toolbar-title>
      <q-btn v-if="!$store.state.properties.auth.check" flat @click="login()">
        {{ strings.menu.login }}
      </q-btn>
      <q-btn v-if="$store.state.properties.auth.check" v-model="submit" loader flat @click="logout()">
        {{ strings.menu.logout }}
        <span slot="loading">{{ strings.menu.logout }}...<q-spinner-gears size="20px" /></span>
      </q-btn>
    </q-toolbar>

    <!-- Navigation -->
    <q-tabs slot="navigation">
      <q-route-tab slot="title" icon="home" :to="{ name: 'home' }" replace :label="strings.menu.home" />
      <q-route-tab slot="title" icon="settings" :to="{ name: 'settings' }" replace :label="strings.menu.settings" />
    </q-tabs>

    <!-- sub-routes get injected here: -->
    <router-view />

    <!-- Footer -->
    <q-toolbar slot="footer" >
      <q-toolbar-title>
        Layout Footer
      </q-toolbar-title>
    </q-toolbar>

  </q-layout>
</template>

<script>
import LangageSetter from '../strings/langageSetter'
import ApiRequests from '../api/requests'
import { Alert, date } from 'quasar'

export default {
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
    // Set App Langage
    LangageSetter.setStrings(this)

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
      ApiRequests.logout()
        .then(function () {})
        .catch(function () {})
        .then(function () {
          that.unsetAuth()
          that.$router.push({name: 'home'})
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
        this.$store.commit('setAuth', {accessToken: localStorage.getItem('_at'), refreshToken: localStorage.getItem('_rt'), expire: localStorage.getItem('_ex')})
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
          // launch auto logout if session is valid
          this.launchAutoLogoutTimer()
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
</style>
