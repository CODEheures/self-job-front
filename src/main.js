// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)
import 'quasar-extras/animate/bounceInUp.css'
import 'quasar-extras/animate/bounceOutDown.css'

import Vue from 'vue'
import Quasar, {
  QLayout, QToolbar, QBtn, QIcon, QToolbarTitle, QTabs, QRouteTab, QPopover,
  QList, QItem, QField, QInput, QSelect, QSpinner, QSpinnerGears, QAlert, QCard, QCardTitle, QCardActions,
  QCardMedia, QCardSeparator, QCardMain, QChipsInput, QRange, QListHeader, QItemSide, QItemMain, QItemTile,
  QInfiniteScroll
} from 'quasar'

import router from './router'

// Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(Quasar, { components: {
  QLayout,
  QToolbar,
  QBtn,
  QIcon,
  QToolbarTitle,
  QTabs,
  QRouteTab,
  QPopover,
  QList,
  QItem,
  QField,
  QInput,
  QSelect,
  QSpinner,
  QSpinnerGears,
  QAlert,
  QCard,
  QCardTitle,
  QCardActions,
  QCardMedia,
  QCardSeparator,
  QCardMain,
  QChipsInput,
  QRange,
  QListHeader,
  QItemSide,
  QItemMain,
  QItemTile,
  QInfiniteScroll
} }) // Install Quasar Framework

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

import store from './store/store'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    store,
    router,
    render: h => h(require('./App'))
  })
})
