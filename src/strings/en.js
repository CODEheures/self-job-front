const en = {
  units: {
    time: {
      second: {
        single: 'second',
        plural: 'seconds',
        abbrevation: 's'
      },
      minute: {
        single: 'minute',
        plural: 'minutes',
        abbrevation: 'min'
      },
      hour: {
        single: 'hour',
        plural: 'hours',
        abbrevation: 'h'
      },
      day: {
        single: 'day',
        plural: 'days',
        abbrevation: 'd'
      },
      month: {
        single: 'month',
        plural: 'months',
        abbrevation: 'mon'
      },
      year: {
        single: 'year',
        plural: 'years',
        abbrevation: 'y'
      }
    }
  },
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  page: {
    layout: {
      appTitle: 'self-job',
      appSubTitle: '== Human ressource ==',
      menu: {
        home: 'home',
        settings: 'Settings',
        login: 'Log in',
        logout: 'Log out',
        register: 'Register'
      },
      logoutSuccess: 'You are logout'
    },
    home: {
      checkYourMail: 'You will receive an email with a confirmation link valid for 3 days. Click this link to validate your account',
      geolocNotAvailable: 'Geoloc is not available on this device',
      geolocDenied: 'You refused geolocation. Your search will not be geolocated',
      geolocError: 'Geolocation has failed. Research will therefore not be geolocated',
      pitch: 'Anonymous human recruitment without C.V. that puts on your personality.',
      subPitch: 'Look for, Find, Answer Affinity Questions and be the best person to be invited to meet the employer',
      searchLabel: 'Ex: barman, beginner',
      searchPlaceHolder: 'Enter key to add to the list',
      mileageLabel: 'Mileage',
      btnFindLabel: 'Find jobs',
      findListHeader: 'We found the following offers:',
      findError: 'The request failed',
      seeMore: 'See offer'
    },
    settings: {
      saveSuccess: 'Your choice is saved',
      saveError: 'The server can not save your choice',
      language: {
        name: 'English',
        label: 'Language',
        helper: 'Choose application language'
      }
    },
    login: {
      emailLabel: 'Email',
      passwordLabel: 'Password',
      btnValidationLabel: 'Log In',
      unknownError: 'The server can not connect you for the moment',
      invalids: 'Invalid Email or password',
      loginSuccess: 'Hello ',
      alreadyConnected: 'You are connected',
      registerLink: 'Register here'
    },
    register: {
      nameLabel: 'Username',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      passwordConfirmationLabel: 'Password confirmation',
      btnValidationLabel: 'Register',
      unknownError: 'The server can not register you for the moment',
      invalidPasswordConfirmation: 'Invalid password confirmation',
      invalidName: '6 characteres minimun',
      invalidEmail: 'Invalid Email address',
      invalidPassword: '6 characteres minimun',
      existEmail: 'This email is already register',
      alreadyConnected: 'You are connected'
    },
    advertShow: {
      findError: 'We can\'t find the offer',
      requirements: 'Requirements',
      checkAcceptLabel: 'I have the requirements to continue',
      btnNextStep: 'Access the quiz'
    }
  }
}

export default en
