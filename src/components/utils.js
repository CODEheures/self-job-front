import { date } from 'quasar'

const Utils = {
  dateToHumanDiff (component, myDate, abbreviation = false) {
    let newDate = new Date()
    let nowGMT = Date.parse(newDate) + (newDate.getTimezoneOffset() * 60000)

    let diffInSeconds = date.getDateDiff(nowGMT, myDate, 'seconds')
    if (diffInSeconds < 60) {
      if (abbreviation) {
        return diffInSeconds + component.units.time.second.abbrevation
      }
      else {
        return diffInSeconds > 1 ? diffInSeconds + ' ' + component.units.time.second.plural : diffInSeconds + ' ' + component.units.time.second.single
      }
    }

    let diffInMinutes = date.getDateDiff(nowGMT, myDate, 'minutes')
    if (diffInMinutes < 60) {
      if (abbreviation) {
        return diffInMinutes + component.units.time.minute.abbrevation
      }
      else {
        return diffInMinutes > 1 ? diffInMinutes + ' ' + component.units.time.minute.plural : diffInMinutes + ' ' + component.units.time.minute.single
      }
    }

    let diffInHours = date.getDateDiff(nowGMT, myDate, 'hours')
    if (diffInHours < 24) {
      if (abbreviation) {
        return diffInHours + component.units.time.hour.abbrevation
      }
      else {
        return diffInHours > 1 ? diffInHours + ' ' + component.units.time.hour.plural : diffInHours + ' ' + component.units.time.hour.single
      }
    }

    let diffInDays = date.getDateDiff(nowGMT, myDate, 'days')
    if (diffInDays < 30) {
      if (abbreviation) {
        return diffInDays + component.units.time.day.abbrevation
      }
      else {
        return diffInDays > 1 ? diffInDays + ' ' + component.units.time.day.plural : diffInDays + ' ' + component.units.time.day.single
      }
    }

    let diffInMonths = date.getDateDiff(nowGMT, myDate, 'months')
    if (diffInMonths < 12) {
      if (abbreviation) {
        return diffInMonths + component.units.time.month.abbrevation
      }
      else {
        return diffInMonths > 1 ? diffInMonths + ' ' + component.units.time.month.plural : diffInMonths + ' ' + component.units.time.month.single
      }
    }

    let diffInYears = date.getDateDiff(nowGMT, myDate, 'years')
    if (abbreviation) {
      return diffInYears + component.units.time.year.abbrevation
    }
    else {
      return diffInYears > 1 ? diffInYears + ' ' + component.units.time.year.plural : diffInYears + ' ' + component.units.time.year.single
    }
  },
  redirectByCheck (component) {
    component.$store.watch(function (state) { return state.properties.auth.check }, function (isCheck) {
      if (isCheck) {
        component.$router.push({name: 'myAdverts'})
      }
      else {
        component.$router.push({name: 'home'})
      }
    })
  },
  checkCorrectEmail (email) {
    // eslint-disable-next-line no-useless-escape
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !re.test(email)
  },
  checkCorrectPhone (phone) {
    // eslint-disable-next-line no-useless-escape
    let re = /^(([0-9]{2}[.]){4}[0-9]{2})$/
    return !re.test(phone)
  },
  formPhone (input) {
    let extract = input.replace(/[^0-9]/g, '')
    let parts = []
    for (let i = 0; i < extract.length; i += 2) {
      parts.push(extract.charAt(i).toString() + extract.charAt(i + 1).toString())
    }
    if (parts.length > 4) {
      parts = parts.slice(0, 5)
    }

    let formPhone = '' + (parts.join('.')).toString()
    if (parts.length > 0 && parts.length < 5 && extract.length % 2 === 0) {
      formPhone += '.'
    }

    return formPhone
  }
}

export default Utils
