import axios from 'axios'

const apiDomain = 'http://api.selfjob.dev/api'

const routes = {
  login: apiDomain + '/login',
  logout: apiDomain + '/logout',
  register: apiDomain + '/register',
  existUser: apiDomain + '/existUser',
  user: apiDomain + '/user',
  setUserProperty: apiDomain + '/user/set',
  getAdverts: apiDomain + '/getAdverts',
  showAdvert: apiDomain + '/advert/',
  showQuiz: apiDomain + '/quiz/',
  getMyAdverts: apiDomain + '/myAdverts',
  postAdvertImg: apiDomain + '/advert/img',
  postAdvert: apiDomain + '/advert',
  getTempoImg: apiDomain + '/advert/img/tempo',
  getQuestionsLibrary: apiDomain + '/question/library'
}

axios.defaults.timeout = 3000

const ApiRequests = {
  listRoutes () {
    return routes
  },
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
  postAdvert (advert, questions, language) {
    return axios.request({
      method: 'post',
      url: routes.postAdvert,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      },
      data: {
        'advert': advert,
        'questions': questions,
        'language': language
      }
    })
  },
  getAdverts (searchs, location, mileage, fromResult, language) {
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
        from: fromResult,
        language: language
      }
    })
  },
  showAdvert (id) {
    return axios.request({
      method: 'get',
      url: routes.showAdvert + id,
      headers: {
        'Accept': 'application/json'
      }
    })
  },
  showQuiz (id) {
    return axios.request({
      method: 'get',
      url: routes.showQuiz + id,
      headers: {
        'Accept': 'application/json'
      }
    })
  },
  getMyAdverts () {
    return axios.request({
      method: 'get',
      url: routes.getMyAdverts,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      }
    })
  },
  getTempoImg () {
    return axios.request({
      method: 'get',
      url: routes.getTempoImg,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      },
      responseType: 'blob'
    })
  },
  delTempoImg () {
    return axios.request({
      method: 'delete',
      url: routes.getTempoImg,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      }
    })
  },
  getQuestionsLibrary () {
    return axios.request({
      method: 'get',
      url: routes.getQuestionsLibrary,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      }
    })
  }
}

export default ApiRequests
