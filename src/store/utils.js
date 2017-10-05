import ApiRequests from '../api/requests'
import { Alert } from 'quasar'

const StoreUtils = {
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
  setPropertiesByUser (state) {
    let user = state.properties.auth.user
    if (user.pref_langage !== null) {
      state.properties.appLangage.choice = user.pref_langage
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
          html: state.strings[state.properties.appLangage.choice].page.settings.saveSuccess,
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
          html: state.strings[state.properties.appLangage.choice].page.settings.saveError,
          position: 'bottom-center',
          dismissible: true
        })
      })
  }
}

export default StoreUtils
