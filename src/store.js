import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Alert } from 'quasar'

Vue.use(Vuex)

import fr from './strings/fr'
import en from './strings/en'

const apiDomain = 'http://api.selfjob.dev/api'

const store = new Vuex.Store({
  state: {
    strings: {
      fr: fr,
      en: en
    },
    properties: {
      appLangage: {
        list: ['fr', 'en'],
        choice: 'fr'
      },
      auth: {
        check: false,
        isNew: false,
        user: {}
      }
    },
    api: {
      routes: {
        login: apiDomain + '/login',
        logout: apiDomain + '/logout',
        register: apiDomain + '/register',
        existUser: apiDomain + '/existUser',
        user: apiDomain + '/user'
      }
    }
  },
  mutations: {
    setLangage (state, payload) {
      'use strict'
      state.properties.appLangage.choice = payload
    },
    setAuth (state, payload) {
      'use strict'
      let isAlreadyAuth = localStorage.getItem('_at') === payload.accessToken && localStorage.getItem('_rt') === payload.refreshToken
      localStorage.setItem('_at', payload.accessToken)
      localStorage.setItem('_rt', payload.refreshToken)
      localStorage.setItem('_ex', payload.expire)
      axios.request({
        method: 'get',
        url: state.api.routes.user,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('_at')
        }
      })
        .then(function (response) {
          state.properties.auth.user = response.data
          state.properties.auth.check = true
          if (!isAlreadyAuth) {
            Alert.create({
              enter: 'bounceInUp',
              leave: 'bounceOutDown',
              color: 'positive',
              icon: 'pan tool',
              html: state.strings[state.properties.appLangage.choice].page.login.loginSuccess + state.properties.auth.user.name,
              position: 'bottom-center',
              dismissible: true
            })
          }
          if ('isNew' in payload) {
            state.properties.auth.isNew = payload.isNew
          }
        })
        .catch(function () {
          Alert.create({
            enter: 'bounceInUp',
            leave: 'bounceOutDown',
            color: 'negative',
            icon: 'warning',
            html: state.strings[state.properties.appLangage.choice].page.login.unknownError,
            position: 'bottom-center',
            dismissible: true
          })
        })
    },
    unsetAuth (state, payload) {
      'use strict'
      localStorage.removeItem('_at')
      localStorage.removeItem('_rt')
      localStorage.removeItem('_ex')
      state.properties.auth.user = {}
      state.properties.auth.check = false
    }
  }
})

export default store
