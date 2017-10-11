const LanguageSetter = {
  setStrings (component) {
    component.strings = component.$store.state.strings[component.$store.state.properties.appLanguage.choice].page[component.stringPageScopeName]
    component.$watch('$store.state.properties.appLanguage.choice', function () {
      component.strings = component.$store.state.strings[component.$store.state.properties.appLanguage.choice].page[component.stringPageScopeName]
    })
  },

  setDayNames (component) {
    component.dayNames = component.$store.state.strings[component.$store.state.properties.appLanguage.choice].dayNames
    component.$watch('$store.state.properties.appLanguage.choice', function () {
      component.dayNames = component.$store.state.strings[component.$store.state.properties.appLanguage.choice].dayNames
    })
  },

  setUnits (component) {
    component.units = component.$store.state.strings[component.$store.state.properties.appLanguage.choice].units
    component.$watch('$store.state.properties.appLanguage.choice', function () {
      component.units = component.$store.state.strings[component.$store.state.properties.appLanguage.choice].units
    })
  }
}

export default LanguageSetter
