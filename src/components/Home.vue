<template>
  <div class="layout-padding">
    <div class="row sm-gutter">
      <div class="col-12" v-if="$store.state.properties.auth.isNew || !$store.state.properties.geolocation.exist || $store.state.properties.geolocation.denied || $store.state.properties.geolocation.error">
        <q-alert v-if="$store.state.properties.auth.isNew" color="green" icon="info outline" appear dismissible>{{ strings.checkYourMail }}</q-alert>
        <q-alert v-if="!$store.state.properties.geolocation.exist" color="warning" icon="warning" appear dismissible>{{ strings.geolocNotAvailable }}</q-alert>
        <q-alert v-if="$store.state.properties.geolocation.denied" color="warning" icon="warning" appear dismissible>{{ strings.geolocDenied }}</q-alert>
        <q-alert v-if="$store.state.properties.geolocation.error" color="warning" icon="warning" appear dismissible>{{ strings.geolocError }}</q-alert>
      </div>
      <div class="col-12" v-if="!$store.state.properties.auth.check && adverts.length <= 0 && !submit">
        <div class="brand-container" :style="'background-image: url(/statics/urban3.jpg);'">
          <div class="darken"></div>
          <div class="brand">
            <div class="fake-h1">
              <p>{{ strings.fakeh1 }}</p>
              <img src="~statics/rature.png" />
            </div>
            <p class="cursive"><strong>{{ strings.realh1 }}</strong></p>
            <h2 class="sub">{{ strings.pitch }}</h2>
            <p class="hashtags">{{ strings.hashtag1 }} {{ strings.hashtag2 }}</p>
            <q-list dense multiline>
              <q-item class="text-white">
                <q-item-side><q-icon name="looks one" size="32px" color="hashtag"></q-icon></q-item-side>
                <q-item-main><q-item-tile sublabel class="text-white">{{ strings.step1 }}</q-item-tile></q-item-main>
              </q-item>
              <q-item class="text-white">
                <q-item-side><q-icon name="looks two" size="32px" color="hashtag"></q-icon></q-item-side>
                <q-item-main><q-item-tile sublabel class="text-white">{{ strings.step2 }} {{ strings.hashtag1 }}</q-item-tile></q-item-main>
              </q-item>
              <q-item class="text-white">
                <q-item-side><q-icon name="looks 3" size="32px" color="hashtag"></q-icon></q-item-side>
                <q-item-main><q-item-tile sublabel class="text-white">{{ strings.step3 }} {{ strings.hashtag2 }}</q-item-tile></q-item-main>
              </q-item>
              <q-item class="text-white">
                <q-item-side><q-icon name="looks 4" size="32px" color="hashtag"></q-icon></q-item-side>
                <q-item-main><q-item-tile sublabel class="text-white">{{ strings.step4 }}</q-item-tile></q-item-main>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
    <div class="row sm-gutter justify-center">
      <div v-if="!$store.state.properties.auth.check" style="max-width: 95%" class="col-12">
        <q-field icon="search">
          <q-chips-input v-model="searchs" :float-label="strings.searchLabel" :placeholder="strings.searchPlaceHolder"/>
        </q-field>
        <q-field  icon="zoom out map" :label="strings.mileageLabel" style="max-width: 90%">
          <q-range v-model="mileage" :min="0" :max="maxiMileage" label-always :left-label-value="`${mileage.min}Km`" :right-label-value="mileage.max === maxiMileage ? `+${mileage.max}Km` : `${mileage.max}Km`" />
        </q-field>
        <q-btn v-model="submit" loader color="secondary" class="full-width" icon-right="arrow forward" @click="findAdverts()" :disable="submit">
          {{ strings.btnFindLabel }}
          <span slot="loading">{{ strings.btnFindLabel }}...<q-spinner-gears size="20px" /></span>
        </q-btn>
      </div>
      <div class="col-12 text-center" v-if="submit">
        <q-spinner-gears color="primary" v-if="submit" :size="90" />
      </div>
      <div class="row" v-if="!submit && adverts.length > 0">
          <q-infinite-scroll ref="infiniteScroll" :handler="loadMore" :offset="10">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-4" v-for="advert,index in adverts" :key="advert.id">
                <q-card>
                  <q-item multiline>
                    <q-item-side avatar="statics/quasar-logo.png" />
                    <q-item-main>
                      <q-item-tile label>{{ advert.title }}</q-item-tile>
                      <q-item-tile sublabel>{{ advert.user.company }}</q-item-tile>
                    </q-item-main>
                    <q-item-side right>
                      <q-item-tile stamp><q-icon name="place" />{{ advert.mileage }}Km</q-item-tile>
                      <q-item-tile stamp><q-icon name="hourglass empty"/>{{ formatMyDate(advert.created) }}</q-item-tile>
                    </q-item-side>
                  </q-item>
                  <template v-if="advert.img">
                    <q-card-media><img :src="advert.img"></q-card-media>
                  </template>
                  <template v-else>
                    <q-card-separator />
                  </template>
                  <q-card-main>
                    <p>{{ advert.description.slice(0,90) + '...' }}</p>
                  </q-card-main>
                  <q-card-separator />
                  <q-card-actions>
                    <q-btn color="primary" @click="$router.push({ name: 'advertShow', params: { 'id': advert.id }})">{{ strings.seeMore }}</q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </div>
            <div class="col-12 text-center" slot="message">
              <q-spinner-gears color="primary" :size="90" />
            </div>
          </q-infinite-scroll>
        <p v-if="adverts.length >= totalHits">{{ strings.endResults }}</p>
      </div>

    </div>
  </div>
</template>

<script>
import LanguageSetter from '../strings/languageSetter'
import ApiRequests from '../api/requests'
import Utils from './utils'
import { Alert } from 'quasar'

export default {
  props: {
    stringPageScopeName: String
  },
  data () {
    return {
      strings: {},
      units: [],
      searchs: [],
      maxiMileage: 250,
      mileage: {
        min: 0,
        max: 30
      },
      submit: false,
      adverts: [],
      totalHits: 0
    }
  },
  mounted () {
    LanguageSetter.setStrings(this)
    LanguageSetter.setUnits(this)
  },
  methods: {
    findAdverts () {
      let that = this
      this.mileage.stop = this.maxiMileage
      this.adverts = []
      ApiRequests.getAdverts(
        this.searchs,
        this.$store.state.properties.geolocation.position,
        this.mileage,
        0,
        this.$store.state.properties.appLanguage.choice
      )
        .then(function (response) {
          that.submit = false
          that.adverts = response.data.adverts
          that.totalHits = response.data.totalHits
        })
        .catch(function () {
          that.submit = false
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
    loadMore (index, done) {
      let that = this
      this.mileage.stop = this.maxiMileage
      ApiRequests.getAdverts(
        this.searchs,
        this.$store.state.properties.geolocation.position,
        this.mileage,
        this.adverts.length,
        this.$store.state.properties.appLanguage.choice
      )
        .then(function (response) {
          that.submit = false
          let adverts = response.data.adverts
          adverts.forEach(function (advert) {
            that.adverts.push(advert)
          })
          that.totalHits = response.data.totalHits
          if (that.adverts.length === that.totalHits) {
            that.$refs.infiniteScroll.stop()
          }
          done()
        })
        .catch(function (error) {
          that.submit = false
          console.log(error)
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
    formatMyDate (myDate) {
      return Utils.dateToHumanDiff(this, myDate, true)
    }
  }
}
</script>

<style lang="scss">
  .brand-container {
    background-size: cover;
    background-position: center center;
    text-align: center;
    padding-bottom: 15px;
    position: relative;
  }
  .darken {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .3;
    filter: alpha(opacity=30);
    z-index: 1;
  }
  div.brand {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
    color: white;
    z-index: 2;
    position: relative;

    & .fake-h1 {
      width: auto;
      position: relative;
      display: inline-block;
      margin-top: 5%;

      & p {
        display: inline-block;
        font-size: 26px;
        margin-bottom: 0;
        margin-top: 0;
        font-weight: 700;

      }

      & img {
        display: inline-block;
        position: absolute;
        bottom: -15px;
        left: 0;
        width: 100%;
        opacity: 0.80;
      }
    }

    & p.hashtags {
      color: #6bc5e1;
      position: relative;
      top: -28px;
      font-size: 18px;
    }

    & .cursive {
      color: white;
      text-align: center;
      margin-top: 1vh;
      font-size: 30px;
    }

    & .sub {
      font-weight: 300;
      text-align: center;
      margin-top: 10px;
      font-size: 26px;
    }

    & .q-list {
      background-color: rgba(255,255,255,0.25);
      border: solid 1px white;
      border-radius: 0.4rem;
      max-width: 90%;
      width: auto;
      margin: auto;
      display: inline-block;
      & .q-item {
        font-size: 0.8rem;
      }
    }
  }


  @media (min-width: 380px) {
    div.brand {
      & .sub {
        font-size: 32px;
      }
      p.hashtags {
        font-size: 24px;
      }

      & .q-list {
        & .q-item {
          font-size: 1rem;
        }
      }
    }
  }

  @media (min-width: 420px) {
    div.brand {
      & .fake-h1 p {
        font-size: 36px;
      }

      .cursive {
        font-size: 42px;
        margin-top: 2vh;
      }
    }

  }

  @media (min-width: 566px) {
    div.brand {
      .sub {
        font-size: 40px;
      }
    }
  }

  @media (min-width: 768px) {
    div.brand {
      .cursive {
        font-size: 60px;
        margin-top: 4vh;
      }
    }
  }

  @media (min-width: 1200px) {
    div.brand {
      & .fake-h1 {
        margin-top: 3vh;

        & p {
          margin-bottom: 20px;
        }
      }

      .cursive {
        margin-bottom: 2vh;
        margin-top: 5vh;
      }

      & .q-list {
        & .q-item {
          font-size: 2rem;
        }
      }
    }
  }

  .text-hashtag {
    color: #6bc5e1;
  }
  .bg-hashtag {
    color: #6bc5e1;
  }

</style>
