import Vue from 'vue'
import Vuex from 'vuex'
import StoreUtils from './utils'
import fr from '../strings/fr'
import en from '../strings/en'

Vue.use(Vuex)

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
    }
  },
  mutations: {
    setLangage (state, payload) {
      'use strict'
      state.properties.appLangage.choice = payload
      if (state.properties.auth.check) {
        StoreUtils.setUserProperty(state, 'pref_langage', payload)
      }
    },
    setAuth (state, payload) {
      'use strict'
      localStorage.setItem('_at', payload.accessToken)
      localStorage.setItem('_rt', payload.refreshToken)
      localStorage.setItem('_ex', payload.expire)
      StoreUtils.getUser(state, payload)
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
