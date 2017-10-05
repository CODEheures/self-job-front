const LanguageSetter = {
  setStrings (component) {
    component.strings = component.$store.state.strings[component.$store.state.properties.appLanguage.choice].page[component.stringPageScopeName]
    component.$watch('$store.state.properties.appLanguage.choice', function () {
      component.strings = component.$store.state.strings[component.$store.state.properties.appLanguage.choice].page[component.stringPageScopeName]
    })
  }
}

export default LanguageSetter
