import axios from 'axios'

const apiDomain = 'http://api.selfjob.dev/api'

const routes = {
  login: apiDomain + '/login',
  logout: apiDomain + '/logout',
  register: apiDomain + '/register',
  existUser: apiDomain + '/existUser',
  user: apiDomain + '/user',
  setUserProperty: apiDomain + '/user/set',
  getAdverts: apiDomain + '/getAdverts'
}

axios.defaults.timeout = 3000

const ApiRequests = {
  register (name, email, password, passwordConfirmation, language) {
    return axios.request({
      method: 'post',
      url: routes.register,
      data: {'name': name, 'email': email, 'password': password, 'password_confirmation': passwordConfirmation, 'language': language},
      headers: {
        'Accept': 'application/json'
      }
    })
  },
  login (email, password, language) {
    return axios.request({
      method: 'post',
      url: routes.login,
      data: {'email': email, 'password': password, 'language': language},
      headers: {
        'Accept': 'application/json'
      }
    })
  },
  logout () {
    return axios.request({
      method: 'post',
      url: routes.logout,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      }
    })
  },
  existUser (email) {
    return axios.request({
      method: 'get',
      url: routes.existUser,
      params: {
        email: email
      },
      headers: {
        'Accept': 'application/json'
      }
    })
  },
  getUser () {
    return axios.request({
      method: 'get',
      url: routes.user,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      }
    })
  },
  postUserProperty (property, value) {
    return axios.request({
      method: 'post',
      url: routes.setUserProperty,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      },
      data: {
        property: property,
        value: value
      }
    })
  },
  getAdverts (searchs, location, mileage, language) {
    return axios.request({
      method: 'post',
      url: routes.getAdverts,
      headers: {
        'Accept': 'application/json'
      },
      data: {
        searchs: searchs,
        location: {
          lat: location.latitude,
          lon: location.longitude
        },
        mileage: mileage,
        language: language
      }
    })
  }
}

export default ApiRequests
