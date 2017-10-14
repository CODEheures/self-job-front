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
      appSubTitle: '== Recrutement Humain ==',
      menu: {
        home: 'Accueil',
        settings: 'Préférences',
        login: 'Se connecter',
        logout: 'Se déconnecter',
        register: 'S\'enregistrer',
        myAdverts: 'Mes offres'
      },
      logoutSuccess: 'Vous êtes maintenant déconnecté'
    },
    home: {
      checkYourMail: 'Vous allez recevoir un email avec un lien de confirmation valable 3 jours. Cliquez ce lien afin de valider votre compte',
      geolocNotAvailable: 'La géolocation n\'est pas disponible sur cet appareil',
      geolocDenied: 'Vous avez refusé la géolocation. Vos recherches ne seront donc pas géolocalisées',
      geolocError: 'La géolocation a échouée. Les recherches ne seront donc pas géolocalisées',
      pitch: 'Recrutement humain anonyme sans C.V. qui mise sur votre personnalité.',
      subPitch: 'Cherchez, Trouvez, Répondez aux questions d\'affinité et soyez le mieux placé pour être invité à renconter l\'employeur',
      searchLabel: 'Ex: barman, débutant',
      searchPlaceHolder: 'Touche entrée pour ajouter à la liste',
      mileageLabel: 'Distance',
      btnFindLabel: 'Trouver les offres',
      findListHeader: 'Nous avons trouvé les offres suivantes:',
      findError: 'La demande a échoué',
      seeMore: 'Voir l\'offre'
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
      registerLink: 'S\'enregistrer ici'
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
      verticalHead2: 'Réponses'
    }
  }
}

export default fr
