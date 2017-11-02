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
      case 2:
        return {
          label: component.$store.state.strings[language].questions.model[type].label,
          options: [
            {label: component.$store.state.strings[language].questions.model[type].option1, value: 0, rank: [0]},
            {label: component.$store.state.strings[language].questions.model[type].option2, value: 1, rank: [1]},
            {label: component.$store.state.strings[language].questions.model[type].option3, value: 2, rank: [2]}
          ],
          isValid: false
        }
    }
  },
  getExampleStrings (component, type) {
    return this.getStrings(component, type, 'example')
  },
  getConstructorStrings (component, type) {
    return this.getStrings(component, type, 'constructor')
  },
  getViewStrings (component, type) {
    return this.getStrings(component, type, 'view')
  },
  getStrings (component, typeQuestion, typeString) {
    let language = component.$store.state.properties.appLanguage.choice
    return Object.assign({},
      component.$store.state.strings[language].questions.strings.common,
      component.$store.state.strings[language].questions.strings[typeString][typeQuestion])
  }
}

export default Question
