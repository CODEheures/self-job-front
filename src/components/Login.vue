<template>
  <div class="layout-padding">
    <h5 v-if="$store.state.properties.auth.check" round-borders><span class="token bg-info">{{ strings.alreadyConnected }}</span></h5>
    <q-input v-model="email" type="email" :float-label="strings.emailLabel" suffix="@gmail.com" clearable :disable="$store.state.properties.auth.check"/>
    <q-input v-model="password" type="password" :float-label="strings.passwordLabel" :disable="$store.state.properties.auth.check"/>
    <div class="row justify-between">
      <q-btn v-model="submit" loader color="primary" icon-right="arrow forward" @click="login()" :disable="$store.state.properties.auth.check || submit">
        {{ strings.btnValidationLabel }}
        <span slot="loading">{{ strings.btnValidationLabel }}...<q-spinner-gears size="20px" /></span>
      </q-btn>
      <a v-if="!$store.state.properties.auth.check" class="text-right" @click="register()">{{ strings.registerLink }}</a>
    </div>
  </div>
</template>

<script>
  import LangageSetter from '../strings/langageSetter'
  import ApiRequests from '../api/requests'
  import { Alert, date } from 'quasar'

  export default {
    props: {
      stringPageScopeName: String
    },
    data () {
      return {
        strings: {},
        email: 'test@mail.test',
        password: 'password',
        submit: false
      }
    },
    mounted () {
      LangageSetter.setStrings(this)
    },
    methods: {
      login () {
        this.submit = true
        let that = this
        ApiRequests.login(this.email, this.password, this.$store.state.properties.appLangage.choice)
          .then(function (response) {
            that.setAuth(response.data.access_token, response.data.refresh_token, response.data.expires_in)
            that.submit = false
            that.$q.events.$emit('login')
            that.$router.push({name: 'home'})
          })
          .catch(function (error) {
            that.submit = false
            if (error.response && error.response.status === 422) {
              for (let info in error.response.data.errors) {
                Alert.create({
                  enter: 'bounceInUp',
                  leave: 'bounceOutDown',
                  color: 'negative',
                  icon: 'warning',
                  html: error.response.data.errors[info],
                  position: 'bottom-center',
                  dismissible: true
                })
              }
            }
            else if (error.response && error.response.status === 401) {
              Alert.create({
                enter: 'bounceInUp',
                leave: 'bounceOutDown',
                color: 'negative',
                icon: 'warning',
                html: that.strings.invalids,
                position: 'bottom-center',
                dismissible: true
              })
            }
            else {
              Alert.create({
                enter: 'bounceInUp',
                leave: 'bounceOutDown',
                color: 'negative',
                icon: 'warning',
                html: that.strings.unknownError,
                position: 'bottom-center',
                dismissible: true
              })
            }
          })
      },
      register () {
        // Goto Login view
        this.$router.push({name: 'register'})
      },
      setAuth (accessToken, refreshToken, expire) {
        this.$store.commit('setAuth', {accessToken: accessToken, refreshToken: refreshToken, expire: date.addToDate(new Date(), { seconds: expire })})
      }
    }
  }
</script>

<style>
</style>
