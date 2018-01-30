import Echo from 'laravel-echo'
import ApiRequests from '../api/requests'
import { Alert } from 'quasar'

const StoreUtils = {
  startEcho () {
    window.Echo = new Echo({
      broadcaster: 'socket.io',
      host: window.apiRootDomain + ':6001',
      auth: {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('_at')
        }
      }
    })
  },
  getUser (state, payload) {
    let that = this
    let isAlreadyAuth = localStorage.getItem('_at') === payload.accessToken && localStorage.getItem('_rt') === payload.refreshToken
    ApiRequests.getUser()
      .then(function (response) {
        state.properties.auth.user = response.data
        that.setPropertiesByUser(state)
        state.properties.auth.check = true
        if (!isAlreadyAuth) {
          Alert.create({
            enter: 'bounceInUp',
            leave: 'bounceOutDown',
            color: 'positive',
            icon: 'pan tool',
            html: state.strings[state.properties.appLanguage.choice].page.login.loginSuccess + state.properties.auth.user.name,
            position: 'bottom-center',
            dismissible: true
          })
        }
        if ('isNew' in payload) {
          state.properties.auth.isNew = payload.isNew
        }
        // Launching callBack after get User Infos
        payload.callBack()
      })
      .catch(function () {
        state.properties.auth.check = false
        // Launching callBack after get User Infos
        payload.callBack()
        Alert.create({
          enter: 'bounceInUp',
          leave: 'bounceOutDown',
          color: 'negative',
          icon: 'warning',
          html: state.strings[state.properties.appLanguage.choice].page.login.unknownError,
          position: 'bottom-center',
          dismissible: true
        })
      })
  },
  updateUser (state) {
    ApiRequests.getUser()
      .then(function (response) {
        state.properties.auth.user = response.data
      })
      .catch(function () {
      })
  },
  setPropertiesByUser (state) {
    let user = state.properties.auth.user
    if (user.pref_language !== null) {
      state.properties.appLanguage.choice = user.pref_language
    }
  },
  setUserProperty (state, property, value) {
    ApiRequests.postUserProperty(property, value)
      .then(function () {
        Alert.create({
          enter: 'bounceInUp',
          leave: 'bounceOutDown',
          color: 'positive',
          icon: 'pan tool',
          html: state.strings[state.properties.appLanguage.choice].page.settings.saveSuccess,
          position: 'bottom-center',
          dismissible: true
        })
      })
      .catch(function () {
        Alert.create({
          enter: 'bounceInUp',
          leave: 'bounceOutDown',
          color: 'negative',
          icon: 'warning',
          html: state.strings[state.properties.appLanguage.choice].page.settings.saveError,
          position: 'bottom-center',
          dismissible: true
        })
      })
  },
  setGeolocation (state) {
    if ('geolocation' in navigator) {
      state.properties.geolocation.exist = true
      state.properties.geolocation.watcherId = navigator.geolocation.watchPosition(function (position) {
        state.properties.geolocation.position.latitude = position.coords.latitude
        state.properties.geolocation.position.longitude = position.coords.longitude
      }, function (error) {
        if (error.code === 1) {
          state.properties.geolocation.denied = true
        }
        else {
          state.properties.geolocation.error = true
        }
      })
    }
    else {
      state.properties.geolocation.exist = false
    }
  }
}

export default StoreUtils
