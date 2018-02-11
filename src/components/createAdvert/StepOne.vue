<template>
  <q-step default name="stepOne" :title="'' + strings.stepOneTitle" :subtitle="strings.stepOneSubTitle">
    <h5 class="text-italic thin-paragraph text-brown-5" style="max-width: 700px; margin: auto;">{{ strings.stepOneInstructions }}</h5>
    <q-card style="max-width: 700px; margin: auto;">
      <q-item multiline>
        <q-item-side avatar="/statics/quasar-logo.png" />
        <q-item-main>
          <q-field style="margin-top: 0">
            <q-input v-model="advert.title" type="text" :float-label="strings.titleLabel" clearable @change="store" />
          </q-field>
          <q-item-tile sublabel>
            {{ $store.state.properties.auth.user.company.name + ' - ' }}
            <q-field style="margin-top: 0; display: inline-block">
              <q-input v-model="advert.contract" type="text" :float-label="strings.contractLabel" clearable @change="store" />
            </q-field>
            <q-field>
              <q-input id="inputAutoComplete" v-model="advert.place.formatted_address" type="text" :placeholder="strings.placeLabel" clearable @change="testClearPlace" />
            </q-field>
          </q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile stamp><q-icon name="place" />15Km</q-item-tile>
          <q-item-tile stamp><q-icon name="hourglass empty"/>{{ fakeDate }}</q-item-tile>
        </q-item-side>
      </q-item>
      <q-card-media>
        <img v-if="$store.state.properties.auth.user.pictureUrl" :src="$store.state.properties.auth.user.pictureUrl">
        <q-uploader :url="postPicture"
                    :headers="headers"
                    :extensions="'.png,.jpg,.jpeg'"
                    :name="'addpicture'"
                    :multiple="false"
                    :float-label="strings.addImgLabel"
                    hide-upload-button
                    @add="uploadFile()"
                    @finish="updateImg()"
                    ref="uploader"
                    :after="[
                                     {icon: 'remove circle', error: false, handler () { delPicture() } }
                                   ]"
        />
      </q-card-media>
      <q-card-title>
        <div slot="right" class="row items-center">
          <q-chips-input ref="qChipsInputKeyWords"
            v-model="advert.tags"
            :placeholder="strings.tagsLabel"
            @blur="validLastInput()"
            @change="store"
          />
        </div>
      </q-card-title>
      <q-card-main>
        <q-field>
          <q-input
            v-model="advert.description"
            type="textarea"
            :float-label="strings.descriptionLabel"
            :max-height="100"
            :min-rows="7"
            clearable
            @change="store"
          />
        </q-field>
      </q-card-main>
      <q-item>
        <q-item-main>
          <q-item-tile color="brown-5">{{ strings.requirements }}</q-item-tile>
          <q-item-tile color="brown-5">
            <draggable-input-list
              :label="strings.requirementLabel"
              v-model="advert.requirements"
            />
          </q-item-tile>
        </q-item-main>
      </q-item>
    </q-card>
    <div style="max-width: 700px; margin: auto; margin-top: 20px">
      <q-alert color="brown-1" class="icon-black" icon="folder shared">
        <q-radio color="brown-8" class="text-brown-8" v-model="advert.is_internal_private" :val="false" :label="strings.stepOneShareOption1" @change="store" />
        <q-radio color="brown-8" class="text-brown-8" v-model="advert.is_internal_private" :val="true" :label="strings.stepOneShareOption2" @change="store"/>
      </q-alert>
    </div>
  </q-step>
</template>

<script>
  import DraggableInputList from '../generics/DraggableInputList.vue'
  import LanguageSetter from '../../strings/languageSetter'
  import Utils from '../utils'
  import ApiRequests from '../../api/requests'
  import { Alert, date, Events } from 'quasar'

  export default {
    components: {
      DraggableInputList
    },
    props: {
      stringPageScopeName: String
    },
    computed: {
      postPicture () {
        return ApiRequests.listRoutes().postPicture
      },
      headers () {
        return {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('_at')
        }
      }
    },
    data () {
      return {
        strings: {},
        units: [],
        submit: false,
        tempoRequirement: '',
        advert: {
          title: '',
          description: '',
          contract: '',
          tags: [],
          requirements: [],
          place: {
            formatted_address: '',
            lat: '',
            lon: ''
          },
          is_internal_private: false
        },
        fakeDate: '',
        isCompleteStepOne: false
      }
    },
    watch: {
      isCompleteStepOne (value) {
        this.$emit('stepOneStatusChange', {'isCompleteStepOne': value})
      },
      'advert.requirements' () {
        this.store()
      }
    },
    mounted () {
      LanguageSetter.setStrings(this)
      LanguageSetter.setUnits(this)
      this.fakeDate = this.formatMyDate(date.subtractFromDate(new Date(), { days: 2 }))
      let localAdvert = localStorage.getItem('createAdvert')
      if (localAdvert) {
        this.advert = JSON.parse(localAdvert)
      }
      this.testCompleteStepOne()
      Events.$on('placeChanged', (place) => {
        this.placeChanged(place)
      })
      // Add googleApi
      this.addGoogleApiScript()
    },
    methods: {
      validLastInput () {
        let vQChips = this.$refs.qChipsInputKeyWords
        let input = vQChips.$el.getElementsByTagName('input')
        let inputVal = input[0].value
        if (inputVal.length > 0) {
          this.advert.tags.push(inputVal)
          this.store()
          vQChips.$data.input = ''
        }
      },
      store () {
        localStorage.setItem('createAdvert', JSON.stringify(this.advert))
        this.testCompleteStepOne()
      },
      formatMyDate (myDate) {
        return Utils.dateToHumanDiff(this, myDate, true)
      },
      uploadFile () {
        setTimeout(() => {
          this.$refs.uploader.upload()
        }, 200)
      },
      delPicture () {
        let that = this
        let url = this.$store.state.properties.auth.user.pictureUrl
        ApiRequests.delPicture(url)
          .then(function () {
            that.$store.commit('updateUser')
          })
          .catch(function () {
            Alert.create({
              enter: 'bounceInUp',
              leave: 'bounceOutDown',
              color: 'negative',
              icon: 'warning',
              html: that.strings.findError,
              position: 'bottom-center',
              dismissible: true
            })
          })
      },
      updateImg () {
        this.$refs.uploader.reset()
        this.$store.commit('updateUser')
      },
      testCompleteStepOne () {
        let advertParams = Object.keys(this.advert)
        this.isCompleteStepOne = true
        advertParams.forEach((key) => {
          if (this.advert[key].length === 0) {
            this.isCompleteStepOne = false
          }
          if (key === 'place') {
            let place = this.advert[key]
            let placeKeys = Object.keys(this.advert[key])
            placeKeys.forEach((placeKey) => {
              if (place[placeKey].length === 0) {
                this.isCompleteStepOne = false
              }
            })
          }
        })
      },
      testClearPlace () {
        if (this.advert.place.formatted_address === '') {
          this.advert.place.lat = ''
          this.advert.place.lon = ''
          this.store()
        }
      },
      placeChanged (place) {
        if ('geometry' in place && 'location' in place.geometry && 'lat' in place.geometry.location && 'lng' in place.geometry.location) {
          this.advert.place.formatted_address = place.formatted_address
          this.advert.place.lat = place.geometry.location.lat()
          this.advert.place.lon = place.geometry.location.lng()
          this.store()
        }
      },
      addGoogleApiScript () {
        let key = this.$store.state.properties.appGoogleKey
        let lang = this.$store.state.properties.appLanguage.choice
        let url = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&libraries=places&language=' + lang + '&callback=initAutocomplete'
        let gScript = document.createElement('script')

        gScript.async = true
        gScript.defer = true
        gScript.src = url
        document.body.appendChild(gScript)
      }
    }
  }
</script>

<style>
</style>
