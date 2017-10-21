<template>
  <div class="layout-padding">
    <div class="row sm-gutter">
      <div class="col-12" v-if="advert">
        <h5 class="text-italic thin-paragraph text-brown-5" style="max-width: 700px; margin: auto;">{{ strings.instructions }}</h5>
        <q-card style="max-width: 700px; margin: auto;">
          <q-item multiline>
            <q-item-side avatar="/statics/quasar-logo.png" />
            <q-item-main>
              <q-field style="margin-top: 0">
                <q-input v-model="advert.title" type="text" :float-label="strings.titleLabel" clearable @change="store('title',advert.title)" />
              </q-field>
              <q-item-tile sublabel>
                {{ $store.state.properties.auth.user.company + ' - ' }}
                <q-field style="margin-top: 0; display: inline-block">
                  <q-input v-model="advert.contract" type="text" :float-label="strings.contractLabel" clearable @change="store('contract',advert.contract)" />
                </q-field>
              </q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-item-tile stamp><q-icon name="place" />15Km</q-item-tile>
              <q-item-tile stamp><q-icon name="hourglass empty"/>{{ fakeDate }}</q-item-tile>
            </q-item-side>
          </q-item>
          <q-card-media>
            <img v-if="imgSrc" :src="imgSrc">
            <q-uploader :url="postImgUrl"
                        :headers="headers"
                        :extensions="'.png,.jpg,.jpeg'"
                        :name="'tempo'"
                        :multiple="false"
                        :float-label="strings.addImgLabel"
                        hide-upload-button
                        @add="uploadFile()"
                        @finish="loadImg()"
                        ref="uploader"
            />
          </q-card-media>
          <q-card-title>
            <div slot="right" class="row items-center">
              <q-chips-input
                v-model="advert.tags"
                :placeholder="strings.tagsLabel"
                @change="store('tags',advert.tags)"
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
                @change="store('description',advert.description)"
              />
            </q-field>
          </q-card-main>
          <q-card-separator />
          <q-item>
            <q-item-main>
              <q-item-tile color="brown-5">{{ strings.requirements }}</q-item-tile>
              <q-item-tile color="brown-5">
                <ul>
                  <li v-for="requirement,index in advert.requirements">
                    <q-field style="margin-top: 0; margin-bottom: 0; display: inline-block">
                      <q-input v-model="advert.requirements[index]" type="text"
                               :after="[
                                 {icon: 'low priority', error: false, handler () { moveToEndRequirements(index) } },
                                 {icon: 'remove circle', error: false, handler () { removeRequirement(index) } }
                               ]"
                      />
                    </q-field>
                  </li>
                  <li>
                    <q-field style="display: inline-block">
                      <q-input v-model="tempoRequirement" type="text" :float-label="strings.requirementLabel"
                               :after="[{icon: 'add box', error: false, handler () { addRequirement() } }]"
                               @keyup.enter="addRequirement"
                      />
                    </q-field>
                  </li>
                </ul>
              </q-item-tile>
            </q-item-main>
          </q-item>
          <q-card-separator />
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
  import LanguageSetter from '../strings/languageSetter'
  import Utils from './utils'
  import ApiRequests from '../api/requests'
  import { date } from 'quasar'

  export default {
    props: {
      stringPageScopeName: String
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
          requirements: []
        },
        fakeDate: '',
        postImgUrl: '',
        headers: {},
        imgSrc: null
      }
    },
    mounted () {
      LanguageSetter.setStrings(this)
      LanguageSetter.setUnits(this)
      this.postImgUrl = ApiRequests.listRoutes().postAdvertImg
      this.headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('_at')
      }
      this.fakeDate = this.formatMyDate(date.subtractFromDate(new Date(), { days: 2 }))
      let advertParams = Object.keys(this.advert)
      advertParams.forEach((key) => {
        if (localStorage.getItem('createAdvert_' + key)) {
          console.log(localStorage.getItem('createAdvert_' + key))
          this.advert[key] = JSON.parse(localStorage.getItem('createAdvert_' + key))
        }
      })
    },
    methods: {
      store (key, value) {
        localStorage.setItem('createAdvert_' + key, JSON.stringify(value))
      },
      formatMyDate (myDate) {
        return Utils.dateToHumanDiff(this, myDate, true)
      },
      addRequirement () {
        if (this.tempoRequirement.length > 0) {
          this.advert.requirements.push(this.tempoRequirement)
          this.tempoRequirement = ''
          this.store('requirements', this.advert.requirements)
        }
      },
      removeRequirement (index) {
        this.advert.requirements.splice(index, 1)
        this.store('requirements', this.advert.requirements)
      },
      moveToEndRequirements (index) {
        let requirements = []
        this.advert.requirements.forEach(function (elem, _index) {
          if (_index !== index) {
            requirements.push(elem)
          }
        })
        requirements.push(this.advert.requirements[index])
        this.advert.requirements = requirements
        this.store('requirements', this.advert.requirements)
      },
      uploadFile (files) {
        setTimeout(() => {
          this.$refs.uploader.upload()
        }, 200)
      },
      loadImg () {
        let that = this
        ApiRequests.getTempoImg()
          .then(function (response) {
            console.log(response.data)
            that.imgSrc = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style>
</style>
