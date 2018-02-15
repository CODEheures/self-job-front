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
        teamManage: 'Gérer mon équipe',
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
      step4: 'Gagner l\'entretien par votre % d\'affinité',
      searchLabel: 'Ex: barman, débutant',
      searchPlaceHolder: 'Touche entrée pour ajouter à la liste',
      mileageLabel: 'Distance',
      btnGoToFindLabel: 'Chercher des offres',
      btnFindLabel: 'Trouver les offres',
      findListHeader: 'Nous avons trouvé les offres suivantes:',
      findError: 'La demande a échoué',
      seeMore: 'Voir l\'offre',
      endResults: 'Fin des résultats',
      zeroResult: 'Désolé votre demande ne retourne aucun résultat'
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
      notInvitedEmail: 'Cette adresse email n\'est pas invitée',
      alreadyConnected: 'Vous êtes déjà connecté'
    },
    teamManage: {
      emailLabel: 'Email',
      inviteSuccess: 'Invitation lancée!',
      inviteError: 'Le serveur ne peut pas lancer cette invitation pour le moment',
      invitationLabel: 'Inviter un collègue à rejoindre l\'équipe',
      btnInvitationLabel: 'Inviter',
      existEmail: 'Cette addresse email est déjà enregistrée',
      alreadyConnected: 'Vous devez être connecté pour voir cette page'
    },
    advertShow: {
      findError: 'L\'annonce est introuvable',
      requirements: 'Exigences',
      checkAcceptLabel: 'Je possède les exigences requises pour continuer',
      btnNextStep: 'Accéder au questionnaire'
    },
    myAdverts: {
      findError: 'Problème serveur, vos annonces sont introuvables',
      findAnswersError: 'Problème serveur, les réponses n\'ont pas pû être téléchargées',
      deleteError: 'Problème serveur pendant l\'effacement. Merci de recharger la page',
      publishError: 'Problème serveur pendant le changement d\'état du parametre de publication. Merci de recharger la page',
      tableTh1: 'Titre',
      tableTh2: 'Réponses',
      verticalMenu1: 'Voir',
      verticalMenu2: 'Supprimer',
      verticalMenu3: 'Modifier',
      verticalMenu4: 'Publier',
      verticalMenu5: 'Dépublier',
      verticalHead1: 'Annonce',
      verticalHead2: 'Réponses',
      title: 'Mes annonces',
      emptyMessage: 'Vous n\'avez encore créé aucune annonce',
      confirmDialogTitle: 'Confirmation',
      confirmDialogMessage: 'Confirmez la supression de cette annonce?',
      confirmDialogBtnCancel: 'Annuler',
      confirmDialogBtnConfirm: 'Supprimer',
      modalAnswersTitle: 'Scores',
      modalAnswersTh1: 'Coordonnées',
      modalAnswersTh2: 'Score',
      modalAnswersCloseBtn: 'Fermer'
    },
    quizShow: {
      findError: 'Problème serveur, le questionnaire n\'est pas disponible pour cette annonce',
      sendError: 'Problème serveur, vos réponses n\'ont pas pû être sauvegardées',
      alreadySendError: 'Vous avez déjà répondu à ce questionnaire',
      sendSuccess: 'Félicitation, vous êtes désormais dans la liste des candidats pour cette offre avec un score de ',
      emailLabel: 'Votre Email',
      invalidEmail: 'Addresse email mal formée',
      phoneLabel: 'Votre Téléphone',
      invalidPhone: 'Téléphone invalide',
      infoForAccess: 'Remplir Email et téléphone pour acceder au questionnaire #savoirÊtre de l\'employeur',
      quizTitle: 'Questionnaire #savoirÊtre',
      quizInfo: 'Aucune réponse n\'est sauvegardée sur nos serveurs. Vos réponses sont évaluées et seule la note finale totale est sauvée',
      btnValidationLabel: 'Envoyer mes réponses',
      btnValidationInProgressLabel: 'Envoi en cours',
      confirmDialogTitle: 'Confirmation',
      confirmDialogMessage: 'Confirmez l\'envoi de vos réponse? Il ne vous sera plus possible ensuite de repasser ce questionnaire.',
      confirmDialogBtnCancel: 'Annuler',
      confirmDialogBtnConfirm: 'Envoyer'
    },
    createAdvert: {
      requirements: 'Exigences',
      checkAcceptLabel: 'Je possède les exigences requises pour continuer',
      btnNextStep: 'Etape suivante',
      btnPreviousStep: 'Etape précédente',
      titleLabel: 'Titre de l\'annonce',
      descriptionLabel: 'Texte de l\'annonce',
      contractLabel: 'Type de contrat',
      placeLabel: 'Lieu du poste',
      tagsLabel: 'Mots clés de recherche',
      requirementLabel: 'Ex: Bac+2, Permis B...',
      addImgLabel: 'Télécharger une image pour personnaliser votre annonce',
      errorLoadImage: 'Aie! L\'image n\'a pas réussie a être téléchargée!',
      errorDeleteImage: 'Il semble y avoir un problême avec la suppression de cette image',
      stepOneTitle: 'Création de l\'annonce',
      stepOneSubTitle: '1/3',
      stepOneInstructions: 'Remplissez la carte ci-dessous pour constituer votre annonce',
      stepOneShareOption1: 'Cette annonce est gérée et visible par tous les gestionnaires de mon groupe ',
      stepOneShareOption2: 'Cette annonce n\'est gérée et visible que par moi',
      stepTwoTitle: 'Création du questionnaire #savoirÊtre',
      stepTwoSubTitle: '2/3',
      stepTwoInstructions: 'Ajouter des questions #savoirÊtre à votre questionnaire',
      stepTwoQuestionListTitle0: 'Questionnaire',
      stepTwoQuestionListTitle1: 'Nouvelles',
      stepTwoQuestionListTitle2: 'Bibliotheque',
      stepTwoQuestionListTitle2Private: 'Personnelle',
      stepTwoQuestionListTitle2Corporate: 'Entre Collègues',
      stepTwoQuestionListTitle2Public: 'Publique',
      stepTwoValidation: {
        numQuestions: {
          ok: 'Nombre de questions suffisant',
          ko: 'Nombre de questions insuffisant'
        },
        allQuestions: {
          ok: 'Toutes les questions sont valides',
          ko: {
            start: {
              singular: 'La question',
              plural: 'Les questions'
            },
            end: {
              singular: 'est invalide',
              plural: 'sont invalides'
            }
          }
        },
        btn: 'Valider'
      },
      stepTwoGetLibraryError: 'Votre bibliothèque de questions n\'a pas pu être chargée correctement',
      stepTwoPatchLibraryError: 'Erreur pendant ma mise à jour de votre librairie personnelle',
      stepTwoAdvertSaved: 'Votre annonce est enregistrée. Vous devez la publier pour la rendre visible dans les recherches',
      stepTwoAdvertSaveError: 'Erreur pendant l\'enregistrement'
    }
  },
  questions: {
    strings: {
      common: {
        example: 'Exemple',
        add: 'ajouter',
        remove: 'supprimer',
        questionCardTitle: 'Question',
        questionCardtype: {constructor: 'constructeur', preview: 'apperçu'},
        libraryRemoveConfirmTitle: 'Confirmation',
        libraryRemoveConfirmMessage: 'Veuillez confirmer la suppression de cette question de votre librairie personnelle',
        libraryRemoveCancel: 'Annuler',
        libraryRemoveConfirm: 'Confirmer',
        questionVisibilityLabel: 'Cette question a une visibilité',
        questionTypePrivate: 'Personnelle',
        questionTypeCorporate: 'Entre collègues',
        questionTypePublic: 'Publique',
        updateLibraryTypeOk: 'Visibilité mise à jour',
        updateLibraryTypeKo: 'La mise à jour de la visibilité a échouée'
      },
      0: {
        title: 'Question à choix unique',
        field_helper: 'Choisir une réponse',
        constructor: {
          label_helper: 'Votre Question:',
          label_helper2: 'Attribution des points',
          label_rank_chips: 'pts'
        }
      },
      1: {
        title: 'Question à choix multiples',
        field_helper: 'Choisir une ou plusieurs réponse(s)',
        constructor: {
          label_helper: 'Votre Question:',
          label_helper2: 'Attribution des points',
          label_rank_chips: 'pts'
        }
      },
      2: {
        title: 'Liste à classer',
        field_helper: 'Classer cette liste',
        constructor: {
          label_helper: 'Votre Question:',
          label_helper2: 'Votre classement préféré:'
        }
      },
      3: {
        title: 'Question ouverte',
        field_helper: 'Ecrire votre réponse directement dans le champs texte',
        float_helper: 'Ecrire votre réponse ici',
        constructor: {
          label_helper: 'Votre Question:',
          label_helper2: 'Les expressions clés attendues:',
          label_helper3: 'Les expressions clés non désirées:'
        }
      }
    }
  }
}

export default fr
