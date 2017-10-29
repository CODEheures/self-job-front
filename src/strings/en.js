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
      infoForAccess: 'Fill in email and phone to access employer quiz of #knowHow',
      quizTitle: 'Quiz'
    },
    createAdvert: {
      requirements: 'Requirements',
      checkAcceptLabel: 'I have the requirements to continue',
      btnNextStep: 'Next step',
      btnPreviousStep: 'Previous step',
      titleLabel: 'Offer title',
      descriptionLabel: 'Offer description',
      contractLabel: 'Contract type',
      tagsLabel: 'Keywords',
      requirementLabel: 'Ex: driver\'s license,... ',
      addImgLabel: 'Upload a picture to personalize your offer',
      errorLoadImage: 'Oops! Image download failure',
      errorDeleteImage: 'There seems to be a problem with the removal of this image',
      stepOneTitle: 'Create Offer',
      stepOneSubTitle: '1/3',
      stepOneInstructions: 'Complete the card below to make your offer',
      stepTwoTitle: 'Create Quiz #knowHow',
      stepTwoSubTitle: '2/3',
      stepTwoInstructions: 'Add #knowHow questions to your Quiz'
    }
  },
  questions: {
    strings: {
      common: {
        example: 'Example:',
        add: 'add',
        remove: 'remove',
        questionCardTitle: 'Question',
        questionCardtype: {constructor: 'constructor', preview: 'preview'}
      },
      example: {
        0: {
          title: 'Question with one choice',
          field_helper: 'Choose your option',
          field_label: 'You prefer to work',
          choices_label1: 'alone',
          choices_label2: 'duet',
          choices_label3: 'in a group'
        },
        1: {
          title: 'Multiple choice question',
          field_helper: 'Choose one or more answer(s)',
          field_label: 'My future employer must',
          choices_label1: 'Listen to my requests',
          choices_label2: 'Give me maximum autonomy',
          choices_label3: 'Be firm with customers',
          choices_label4: 'Be flexible with customers'
        }
      },
      constructor: {
        0: {
          label_helper: 'Your Question:',
          label_rank_chips: 'pts'
        },
        1: {
          label_helper: 'Your Question:',
          label_rank_chips: 'pts'
        }
      },
      preview: {
        0: {
          field_helper: 'Choose your option'
        },
        1: {
          field_helper: 'Choose one or more answer(s)'
        }
      }
    },
    model: {
      0: {
        label: 'Your Question...',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3'
      },
      1: {
        label: 'Your Question...',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3'
      }
    }
  }
}

export default en
