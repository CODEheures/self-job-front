const fr = {
  units: {
    time: {
      second: {
        single: 'seconde',
        plural: 'secondes',
        abbrevation: 's'
      },
      minute: {
        single: 'minute',
        plural: 'minutes',
        abbrevation: 'mn'
      },
      hour: {
        single: 'heure',
        plural: 'heures',
        abbrevation: 'h'
      },
      day: {
        single: 'jour',
        plural: 'jours',
        abbrevation: 'j'
      },
      month: {
        single: 'mois',
        plural: 'mois',
        abbrevation: 'mois'
      },
      year: {
        single: 'année',
        plural: 'années',
        abbrevation: 'an(s)'
      }
    }
  },
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  page: {
    layout: {
      appTitle: 'self-job',
      appSubTitle: 'Recrutement Humain',
      menu: {
        home: 'Recherche',
        home_sub: 'cherchez les annonces d\'emploi',
        settings: 'Préférences',
        settings_sub: 'Choix de la langue, paramètres personnels...',
        login: 'Se connecter',
        logout: 'Se déconnecter',
        register: 'S\'enregistrer',
        myAdverts: 'Mes offres',
        myAdverts_sub: 'Liste de mes offres publiées'
      },
      logoutSuccess: 'Vous êtes maintenant déconnecté',
      isLogout: 'non connecté',
      isLogin: 'connecté en tant que '
    },
    home: {
      checkYourMail: 'Vous allez recevoir un email avec un lien de confirmation valable 3 jours. Cliquez ce lien afin de valider votre compte',
      geolocNotAvailable: 'La géolocation n\'est pas disponible sur cet appareil',
      geolocDenied: 'Vous avez refusé la géolocation. Vos recherches ne seront donc pas géolocalisées',
      geolocError: 'La géolocation a échouée. Les recherches ne seront donc pas géolocalisées',
      fakeh1: 'Ressources humaines',
      realh1: 'Recrutement humain',
      pitch: 'Le recrutement sans C.V.',
      hashtag1: '#savoirFaire',
      hashtag2: '#savoirÊtre',
      step1: 'Selectionnez les annonces',
      step2: 'Validez les exigences',
      step3: 'Répondez au questions',
      step4: 'Soyez 1er à l\'entretien',
      searchLabel: 'Ex: barman, débutant',
      searchPlaceHolder: 'Touche entrée pour ajouter à la liste',
      mileageLabel: 'Distance',
      btnFindLabel: 'Trouver les offres',
      findListHeader: 'Nous avons trouvé les offres suivantes:',
      findError: 'La demande a échoué',
      seeMore: 'Voir l\'offre',
      endResults: 'Fin des résultats'
    },
    settings: {
      saveSuccess: 'Votre choix est enregistré',
      saveError: 'Le serveur n\'arrive pas à sauver votre choix',
      language: {
        name: 'Français',
        label: 'Langage',
        helper: 'Choisir la langue de l\'application'
      }
    },
    login: {
      title: 'Employeurs, connectez-vous ici pour publier vos offres',
      emailLabel: 'Email',
      passwordLabel: 'Mot de passe',
      btnValidationLabel: 'Se connecter',
      unknownError: 'Le serveur ne peut pas vous connecter pour le moment',
      invalids: 'Email ou mot de passe invalide',
      loginSuccess: 'Bonjour ',
      alreadyConnected: 'Vous êtes déjà connecté',
      registerLink: 'S\'enregistrer ici',
      invalidEmail: 'Addresse email mal formée',
      invalidPassword: 'Minimun 6 caractères'
    },
    register: {
      nameLabel: 'Nom d\'utilisateur',
      emailLabel: 'Email',
      passwordLabel: 'Mot de passe',
      passwordConfirmationLabel: 'Confirmation mot de passe',
      btnValidationLabel: 'S\'enregistrer',
      unknownError: 'Le serveur ne peut pas vous enregistrer pour le moment',
      invalidPasswordConfirmation: 'Les mots de passe ne sont pas identiques',
      invalidName: 'Minimun 6 caractères',
      invalidEmail: 'Addresse email mal formée',
      invalidPassword: 'Minimun 6 caractères',
      existEmail: 'Cette addresse email est déjà enregistrée',
      alreadyConnected: 'Vous êtes déjà connecté'
    },
    advertShow: {
      findError: 'L\'annonce est introuvable',
      requirements: 'Exigences',
      checkAcceptLabel: 'Je possède les exigences requises pour continuer',
      btnNextStep: 'Accéder au questionnaire'
    },
    myAdverts: {
      findError: 'Problème serveur, vos annonces sont introuvables',
      tableTh1: 'Titre',
      tableTh2: 'Réponses',
      verticalMenu1: 'Voir',
      verticalMenu2: 'Supprimer',
      verticalMenu3: 'Modifier',
      verticalHead1: 'Annonce',
      verticalHead2: 'Réponses',
      title: 'Mes annonces'
    },
    quizShow: {
      emailLabel: 'Votre Email',
      invalidEmail: 'Addresse email mal formée',
      phoneLabel: 'Votre Téléphone',
      invalidPhone: 'Téléphone invalide',
      infoForAccess: 'Remplir Email et téléphone pour acceder au questionnaire #savoirÊtre de l\'employeur',
      quizTitle: 'Questionnaire #savoirÊtre'
    },
    createAdvert: {
      requirements: 'Exigences',
      checkAcceptLabel: 'Je possède les exigences requises pour continuer',
      btnNextStep: 'Etape suivante',
      btnPreviousStep: 'Etape précédente',
      titleLabel: 'Titre de l\'annonce',
      descriptionLabel: 'Texte de l\'annonce',
      contractLabel: 'Type de contrat',
      tagsLabel: 'Mots clés de recherche',
      requirementLabel: 'Ex: Bac+2, Permis B...',
      addImgLabel: 'Télécharger une image pour personnaliser votre annonce',
      errorLoadImage: 'Aie! L\'image n\'a pas réussie a être téléchargée!',
      errorDeleteImage: 'Il semble y avoir un problême avec la suppression de cette image',
      stepOneTitle: 'Création de l\'annonce',
      stepOneSubTitle: '1/3',
      stepOneInstructions: 'Remplissez la carte ci-dessous pour constituer votre annonce',
      stepTwoTitle: 'Création du questionnaire #savoirÊtre',
      stepTwoSubTitle: '2/3',
      stepTwoInstructions: 'Ajouter des questions #savoirÊtre à votre questionnaire'
    }
  },
  questions: {
    strings: {
      common: {
        example: 'Exemple',
        add: 'ajouter',
        remove: 'supprimer',
        questionCardTitle: 'Question',
        questionCardtype: {constructor: 'constructeur', preview: 'apperçu'}
      },
      example: {
        0: {
          title: 'Question à choix unique',
          field_helper: 'Choisir une réponse',
          field_label: 'Préférez-vous travailler',
          choices_label1: 'seul',
          choices_label2: 'en duo',
          choices_label3: 'en groupe'
        },
        1: {
          title: 'Question à choix multiples',
          field_helper: 'Choisir une ou plusieurs réponse(s)',
          field_label: 'Mon futur employeur doit',
          choices_label1: 'Etre à l\'écoute de mes demandes',
          choices_label2: 'Me laisser un maximum d\'autonomie',
          choices_label3: 'Être ferme avec les clients',
          choices_label4: 'Être souple avec les clients'
        },
        2: {
          title: 'Liste à classer',
          field_helper: 'Classer cette liste',
          field_label: 'Classez ces qualités selon vos préférences',
          choices_label1: 'La patience',
          choices_label2: 'Le respect',
          choices_label3: 'L\'altruisme',
          choices_label4: 'La cohérence',
          choices_label5: 'La confiance',
          choices_label6: 'Le courage',
          choices_label7: 'La curiosité',
          choices_label8: 'La ténacité'
        }
      },
      constructor: {
        0: {
          label_helper: 'Votre Question:',
          label_helper2: 'Attribution des points',
          label_rank_chips: 'pts'
        },
        1: {
          label_helper: 'Votre Question:',
          label_helper2: 'Attribution des points',
          label_rank_chips: 'pts'
        },
        2: {
          label_helper: 'Votre Question:',
          label_helper2: 'Votre classement préféré:'
        }
      },
      preview: {
        0: {
          field_helper: 'Choisir une réponse'
        },
        1: {
          field_helper: 'Choisir une ou plusieurs réponse(s)'
        },
        2: {
          field_helper: 'Classer cette liste'
        }
      }
    },
    model: {
      0: {
        label: 'Votre Question...',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3'
      },
      1: {
        label: 'Votre Question...',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3'
      },
      2: {
        label: 'Votre Question...',
        option1: 'option 1',
        option2: 'option 2',
        option3: 'option 3'
      }
    }
  }
}

export default fr
