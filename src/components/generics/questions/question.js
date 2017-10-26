const Question = {
  getModel (component, type) {
    let language = component.$store.state.properties.appLanguage.choice
    switch (type) {
      case 0:
        return {
          label: component.$store.state.strings[language].questions.model[type].label,
          options: [
            {name: component.$store.state.strings[language].questions.model[type].option1, rank: []},
            {name: component.$store.state.strings[language].questions.model[type].option2, rank: []},
            {name: component.$store.state.strings[language].questions.model[type].option3, rank: []}
          ]
        }
    }
  },
  getExampleStrings (component, type) {
    let language = component.$store.state.properties.appLanguage.choice
    return Object.assign({},
      component.$store.state.strings[language].questions.strings.common,
      component.$store.state.strings[language].questions.strings.example[type])
  },
  getConstructorStrings (component, type) {
    let language = component.$store.state.properties.appLanguage.choice
    return Object.assign({},
      component.$store.state.strings[language].questions.strings.common,
      component.$store.state.strings[language].questions.strings.constructor[type])
  },
  getPreviewStrings (component, type) {
    let language = component.$store.state.properties.appLanguage.choice
    return Object.assign({},
      component.$store.state.strings[language].questions.strings.common,
      component.$store.state.strings[language].questions.strings.preview[type])
  }
}

export default Question
