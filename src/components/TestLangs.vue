<template>
  <div class="error-page window-height window-width bg-light column items-center no-wrap">
    <div class="error-code bg-primary flex items-center content-center justify-center">
      TEST
    </div>
    <div>
      <div class="error-card shadow-4 bg-white column items-center justify-center no-wrap">
        <template v-if="isEquals">
          <q-icon name="check circle" color="green" />
          <p class="caption text-center">Les langues matchent</p>
        </template>
        <template v-else>
          <q-icon name="error_outline" color="red" />
          <p class="caption text-center">Les langues ne matchent pas!!</p>
          <ul>
            <li v-for="badKey in badKeys">Manquant: {{ badKey.toString().replace(/[,]/g, '->') }}</li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { QIcon } from 'quasar'
import fr from '../strings/fr'
import en from '../strings/en'
import _ from 'lodash'

export default {
  components: {
    QIcon
  },
  data () {
    return {
      isEquals: false,
      badKeys: []
    }
  },
  mounted () {
    this.testLangs()
  },
  methods: {
    testLangs () {
      let lang = {
        fr: JSON.parse(JSON.stringify(fr)),
        en: JSON.parse(JSON.stringify(en))
      }
      this.traverse(lang)
      if (_.isEqual(lang.fr, lang.en)) {
        this.isEquals = true
      }
      else {
        this.isEquals = false
        this.compare(lang.fr, ['fr'], lang.en, ['en'])
        this.compare(lang.en, ['en'], lang.fr, ['fr'])
      }
    },
    traverse (obj) {
      for (let key in obj) {
        if (obj[key] !== null && typeof (obj[key]) === 'object') {
          this.traverse(obj[key])
        }
        else {
          obj[key] = ''
        }
      }
    },
    compare (obj1, KObj1, obj2, KObj2) {
      for (let key in obj1) {
        if (obj1[key] !== null && typeof (obj1[key]) === 'object' && obj2[key] !== null && typeof (obj2[key]) === 'object') {
          let pushObj1 = _.clone(KObj1)
          pushObj1.push(key)
          let pushObj2 = _.clone(KObj2)
          pushObj2.push(key)
          this.compare(obj1[key], pushObj1, obj2[key], pushObj2)
        }
        else {
          if (!(key in obj2)) {
            let pushObj2 = _.clone(KObj2)
            pushObj2.push(key)
            this.badKeys.push(pushObj2)
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus">
  .error-page
    .error-code
      height 50vh
      width 100%
      padding-top 15vh
      @media (orientation: landscape) {
        font-size 30vw
      }
      @media (orientation: portrait) {
        font-size 30vh
      }
      color rgba(255, 255, 255, .2)
      overflow hidden
    .error-card
      border-radius 2px
      margin-top -50px
      width 80vw
      max-width 600px
      padding 25px
      > i
        font-size 5rem
</style>
