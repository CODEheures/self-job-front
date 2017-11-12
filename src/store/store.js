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
      appGoogleKey: 'AIzaSyB6YONdutLGDWC70gK9f3VZp_3_eIE7Alw',
      appLanguage: {
        list: ['fr', 'en'],
        choice: 'fr'
      },
      auth: {
        check: null,
        isNew: false,
        user: {}
      },
      geolocation: {
        exist: false,
        denied: false,
        error: false,
        watcherId: undefined,
        position: {
          latitude: undefined,
          longitude: undefined
        }
      }
    }
  },
  mutations: {
    setLanguage (state, payload) {
      state.properties.appLanguage.choice = payload
      if (state.properties.auth.check) {
        StoreUtils.setUserProperty(state, 'pref_language', payload)
      }
    },
    setAuth (state, payload) {
      localStorage.setItem('_at', payload.accessToken)
      localStorage.setItem('_rt', payload.refreshToken)
      localStorage.setItem('_ex', payload.expire)
      StoreUtils.getUser(state, payload)
    },
    updateUser (state) {
      StoreUtils.updateUser(state)
    },
    unsetAuth (state, payload) {
      localStorage.removeItem('_at')
      localStorage.removeItem('_rt')
      localStorage.removeItem('_ex')
      state.properties.auth.user = {}
      state.properties.auth.check = false
    },
    setGeoLocation (state) {
      StoreUtils.setGeolocation(state)
    }
  }
})

export default store
