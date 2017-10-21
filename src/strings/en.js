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
      appSubTitle: 'Human ressource',
      menu: {
        home: 'Search',
        home_sub: 'Search job offers',
        settings: 'Settings',
        settings_sub: 'Choose language, set account...',
        login: 'Log in',
        logout: 'Log out',
        register: 'Register',
        myAdverts: 'My offers',
        myAdverts_sub: 'List of my publish offers'
      },
      logoutSuccess: 'You are logout',
      isLogout: 'log out',
      isLogin: 'log in as '
    },
    home: {
      checkYourMail: 'You will receive an email with a confirmation link valid for 3 days. Click this link to validate your account',
      geolocNotAvailable: 'Geoloc is not available on this device',
      geolocDenied: 'You refused geolocation. Your search will not be geolocated',
      geolocError: 'Geolocation has failed. Research will therefore not be geolocated',
      fakeh1: 'Humans resources',
      realh1: 'Human recruitment',
      pitch: 'Recruitment without C.V.',
      hashtag1: '#expertise',
      hashtag2: '#knowHow',
      step1: 'Select Offers',
      step2: 'Validate the requirements',
      step3: 'Answer questions',
      step4: 'Be 1st to the interview',
      searchLabel: 'Ex: barman, beginner',
      searchPlaceHolder: 'Enter key to add to the list',
      mileageLabel: 'Mileage',
      btnFindLabel: 'Find jobs',
      findListHeader: 'We found the following offers:',
      findError: 'The request failed',
      seeMore: 'See offer',
      endResults: 'End of results'
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
      title: 'Employers, log in here to publish your jobs',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      btnValidationLabel: 'Log In',
      unknownError: 'The server can not connect you for the moment',
      invalids: 'Invalid Email or password',
      loginSuccess: 'Hello ',
      alreadyConnected: 'You are connected',
      registerLink: 'Register here',
      invalidEmail: 'Invalid Email address',
      invalidPassword: '6 characteres minimun'
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
    },
    myAdverts: {
      findError: 'Server problem, your ads can not be found',
      tableTh1: 'Title',
      tableTh2: 'Responses',
      verticalMenu1: 'See',
      verticalMenu2: 'Remove',
      verticalMenu3: 'Edit',
      verticalHead1: 'Offer',
      verticalHead2: 'Responses',
      title: 'My offers'
    },
    quizShow: {
      emailLabel: 'Youre Email',
      invalidEmail: 'Invalid Email address',
      phoneLabel: 'Your Phone number',
      invalidPhone: 'Invalid Phone number',
      infoForAccess: 'Fill in email and phone to access affinity questions'
    },
    createAdvert: {
      requirements: 'Requirements',
      checkAcceptLabel: 'I have the requirements to continue',
      btnNextStep: 'Access the quiz',
      titleLabel: 'Offer title',
      descriptionLabel: 'Offer description',
      contractLabel: 'Contract type',
      tagsLabel: 'Keywords',
      requirementLabel: 'Ex: driver\'s license,... ',
      addImgLabel: 'Upload a picture to personalize your offer',
      instructions: 'Complete the card below to make your offer'
    }
  }
}

export default en
