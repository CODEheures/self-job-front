const LangageSetter = {
  setStrings (component) {
    component.strings = component.$store.state.strings[component.$store.state.properties.appLangage.choice].page[component.stringPageScopeName]
    component.$watch('$store.state.properties.appLangage.choice', function () {
      component.strings = component.$store.state.strings[component.$store.state.properties.appLangage.choice].page[component.stringPageScopeName]
    })
  }
}

export default LangageSetter
