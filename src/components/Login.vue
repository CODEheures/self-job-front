<template>
  <div class="layout-padding">
    <h5 v-if="$store.state.properties.auth.check" round-borders><span class="token bg-info">{{ strings.alreadyConnected }}</span></h5>
    <p v-if="!$store.state.properties.auth.check" class="thin-paragraph">{{ strings.title }}:</p>
    <q-field :error="emailError" :error-label="strings.invalidEmail">
      <q-input v-model="email" type="text" :float-label="strings.emailLabel" clearable :disable="$store.state.properties.auth.check" @change="checkEmail()"
             :after="[{icon: 'done', condition: !emailError && email.length > 1, handler () {}}]"/>
    </q-field>
    <q-field :error="passwordError" :error-label="strings.invalidPassword">
      <q-input v-model="password" type="password" :float-label="strings.passwordLabel" :disable="$store.state.properties.auth.check" @keyup="checkPassword()"
               :after="[{icon: 'done', condition: !passwordError && password.length > 1, handler () {}}]"/>
    </q-field>
    <div class="row justify-between">
      <q-btn v-model="submit" loader color="primary" icon-right="arrow forward" @click="login()" :disable="$store.state.properties.auth.check || submit || emailError || passwordError || email.length == 0 || password.length == 0">
        {{ strings.btnValidationLabel }}
        <span slot="loading">{{ strings.btnValidationLabel }}...<q-spinner-gears size="20px" /></span>
      </q-btn>
      <a v-if="!$store.state.properties.auth.check" class="text-right" @click="register()">{{ strings.registerLink }}</a>
    </div>
  </div>
</template>

<script>
  import LanguageSetter from '../strings/languageSetter'
  import ApiRequests from '../api/requests'
  import Utils from './utils'
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
        submit: false,
        emailError: false,
        passwordError: false
      }
    },
    mounted () {
      LanguageSetter.setStrings(this)
    },
    methods: {
      login () {
        this.submit = true
        let that = this
        ApiRequests.login(this.email, this.password, this.$store.state.properties.appLanguage.choice)
          .then(function (response) {
            that.$store.commit('setAuth', {
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh_token,
              expire: date.addToDate(new Date(), { seconds: response.data.expires_in }),
              callBack: that.actionsAfterLogin
            })
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
      actionsAfterLogin () {
        this.submit = false
        this.$q.events.$emit('login')
      },
      checkEmail () {
        this.emailError = Utils.checkCorrectEmail(this.email)
      },
      checkPassword () {
        this.passwordError = (this.password.length < 6)
      }
    }
  }
</script>

<style>
</style>
