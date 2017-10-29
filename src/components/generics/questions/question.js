const Question = {
  getModel (component, type) {
    let language = component.$store.state.properties.appLanguage.choice
    switch (type) {
      case 0:
        return {
          label: component.$store.state.strings[language].questions.model[type].label,
          options: [
            {label: component.$store.state.strings[language].questions.model[type].option1, value: 0, rank: []},
            {label: component.$store.state.strings[language].questions.model[type].option2, value: 1, rank: []},
            {label: component.$store.state.strings[language].questions.model[type].option3, value: 2, rank: []}
          ],
          isValid: false
        }
      case 1:
        return {
          label: component.$store.state.strings[language].questions.model[type].label,
          options: [
            {label: component.$store.state.strings[language].questions.model[type].option1, value: 0, rank: []},
            {label: component.$store.state.strings[language].questions.model[type].option2, value: 1, rank: []},
            {label: component.$store.state.strings[language].questions.model[type].option3, value: 2, rank: []}
          ],
          isValid: false
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
  getViewStrings (component, type) {
    let language = component.$store.state.properties.appLanguage.choice
    return Object.assign({},
      component.$store.state.strings[language].questions.strings.common,
      component.$store.state.strings[language].questions.strings.preview[type])
  }
}

export default Question
