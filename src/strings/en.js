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
      btnGoToFindLabel: 'Go To Offers',
      btnFindLabel: 'Find jobs',
      findListHeader: 'We found the following offers:',
      findError: 'The request failed',
      seeMore: 'See offer',
      endResults: 'End of results',
      zeroResult: 'Sorry, your request return no results'
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
      findAnswersError: 'Server problem, response can\'t be loaded',
      deleteError: 'Server problem when deleting. Please reload the page',
      publishError: 'Server problem when change publish parameter. Please reload the page',
      tableTh1: 'Title',
      tableTh2: 'Responses',
      verticalMenu1: 'See',
      verticalMenu2: 'Remove',
      verticalMenu3: 'Edit',
      verticalMenu4: 'Publish',
      verticalMenu5: 'Unpublish',
      verticalHead1: 'Offer',
      verticalHead2: 'Responses',
      title: 'My offers',
      emptyMessage: 'You have not created any ads yet',
      confirmDialogTitle: 'Confirmation',
      confirmDialogMessage: 'Confirm deleting of this advert?',
      confirmDialogBtnCancel: 'Cancel',
      confirmDialogBtnConfirm: 'Delete',
      modalAnswersTitle: 'Scores',
      modalAnswersTh1: 'Contact Infos',
      modalAnswersTh2: 'Score',
      modalAnswersCloseBtn: 'Close Me'
    },
    quizShow: {
      findError: 'Server problem, Quiz is not available for this advert',
      sendError: 'Server problem, yous answsers can`t be saved',
      alreadySendError: 'You have already send answers for this quiz',
      sendSuccess: 'Congratulations, you are now in the list of candidates for this offer with a score of',
      emailLabel: 'Youre Email',
      invalidEmail: 'Invalid Email address',
      phoneLabel: 'Your Phone number',
      invalidPhone: 'Invalid Phone number',
      infoForAccess: 'Fill in email and phone to access employer quiz of #knowHow',
      quizTitle: 'Quiz',
      quizInfo: 'No answer is saved on our servers. Your answers are evaluated and only the total final score is saved',
      btnValidationLabel: 'Send my answers',
      btnValidationInProgressLabel: 'Sending',
      confirmDialogTitle: 'Confirmation',
      confirmDialogMessage: 'Confirm the sending of your answer? You will not be able to return to this questionnaire.',
      confirmDialogBtnCancel: 'Cancel',
      confirmDialogBtnConfirm: 'Send'
    },
    createAdvert: {
      requirements: 'Requirements',
      checkAcceptLabel: 'I have the requirements to continue',
      btnNextStep: 'Next step',
      btnPreviousStep: 'Previous step',
      titleLabel: 'Offer title',
      descriptionLabel: 'Offer description',
      contractLabel: 'Contract type',
      placeLabel: 'Place of job',
      tagsLabel: 'Keywords',
      requirementLabel: 'Ex: driver\'s license,... ',
      addImgLabel: 'Upload a picture to personalize your offer',
      errorLoadImage: 'Oops! Image download failure',
      errorDeleteImage: 'There seems to be a problem with the removal of this image',
      stepOneTitle: 'Create Offer',
      stepOneSubTitle: '1/3',
      stepOneInstructions: 'Complete the card below to make your offer',
      stepOneShareOption1: 'This ad is managed by all managers in my group ',
      stepOneShareOption2: 'This ad is only managed by me',
      stepTwoTitle: 'Create Quiz #knowHow',
      stepTwoSubTitle: '2/3',
      stepTwoInstructions: 'Add #knowHow questions to your Quiz',
      stepTwoQuestionListTitle0: 'Quiz',
      stepTwoQuestionListTitle1: 'New questions',
      stepTwoQuestionListTitle2: 'My library',
      stepTwoQuestionListTitle2Private: 'Personnal',
      stepTwoQuestionListTitle2Corporate: 'Corporate',
      stepTwoQuestionListTitle2Public: 'Public',
      stepTwoValidation: {
        numQuestions: {
          ok: 'Suufficient number of questions',
          ko: 'Insufficient number of questions'
        },
        allQuestions: {
          ok: 'All questions are valid',
          ko: {
            start: {
              singular: 'The question',
              plural: 'Questions'
            },
            end: {
              singular: 'is invalid',
              plural: 'are invalid'
            }
          }
        },
        btn: 'Validate'
      },
      stepTwoGetLibraryError: 'Fail to load Your personnal question library',
      stepTwoPatchLibraryError: 'Fail to update Your personnal question library',
      stepTwoAdvertSaved: 'Your ad is saved You must publish it to make it visible in searches',
      stepTwoAdvertSaveError: 'Saving failed'
    }
  },
  questions: {
    strings: {
      common: {
        example: 'Example',
        add: 'add',
        remove: 'remove',
        questionCardTitle: 'Question',
        questionCardtype: {constructor: 'constructor', preview: 'preview'},
        libraryRemoveConfirmTitle: 'Confirm',
        libraryRemoveConfirmMessage: 'Confirm to definitively remove this question of your personnal library',
        libraryRemoveCancel: 'Cancel',
        libraryRemoveConfirm: 'Confirm',
        questionVisibilityLabel: 'This question has a visibility',
        questionTypePrivate: 'Personal',
        questionTypeCorporate: 'Corporate',
        questionTypePublic: 'Public',
        updateLibraryTypeOk: 'Visibility updated',
        updateLibraryTypeKo: 'Fail to process the update of visibility'
      },
      0: {
        title: 'Question with one choice',
        field_helper: 'Choose your option',
        constructor: {
          label_helper: 'Your Question:',
          label_helper2: 'Award of points',
          label_rank_chips: 'pts'
        }
      },
      1: {
        title: 'Multiple choice question',
        field_helper: 'Choose one or more answer(s)',
        constructor: {
          label_helper: 'Your Question:',
          label_helper2: 'Award of points',
          label_rank_chips: 'pts'
        }
      },
      2: {
        title: 'List to sort',
        field_helper: 'Sort this list',
        constructor: {
          label_helper: 'Your Question:',
          label_helper2: 'Your favorite ranking:'
        }
      },
      3: {
        title: 'Open question',
        field_helper: 'Write your answer directly in the text field',
        float_helper: 'Write your answer here',
        constructor: {
          label_helper: 'Your question:',
          label_helper2: 'Expected Key Expressions:',
          label_helper3: 'Unwanted key phrases:'
        }
      }
    }
  }
}

export default en
