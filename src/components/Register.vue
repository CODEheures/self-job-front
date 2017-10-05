<template>
  <div class="layout-padding">
    <h5 v-if="$store.state.properties.auth.check" round-borders><span class="token bg-info">{{ strings.alreadyConnected }}</span></h5>
    <q-field :error="nameError" :error-label="strings.invalidName">
      <q-input v-model="name" type="text" :float-label="strings.nameLabel" clearable :disable="$store.state.properties.auth.check" @keyup="checkName()"/>
    </q-field>
    <q-field :error="emailError" :error-label="invalidEmailMessage">
      <q-input v-model="email" type="text" :float-label="strings.emailLabel" suffix="@" clearable :disable="$store.state.properties.auth.check || emailBeingVerified" :loading="emailBeingVerified" @change="checkEmail()">
        <span slot="loading"><q-spinner-gears size="20px" /></span>
      </q-input>
    </q-field>
    <q-field :error="passwordError" :error-label="strings.invalidPassword">
      <q-input v-model="password" type="password" :float-label="strings.passwordLabel" :disable="$store.state.properties.auth.check" @keyup="checkPassword()"/>
    </q-field>
    <q-field :error="confirmationPasswordError" :error-label="strings.invalidPasswordConfirmation">
      <q-input v-model="password_confirmation" type="password" :float-label="strings.passwordConfirmationLabel" :disable="$store.state.properties.auth.check" @keyup="checkPassword()"/>
    </q-field>
    <div class="row justify-between">
      <q-btn v-model="submit" loader color="primary" icon-right="arrow forward" @click="register()" :disable="$store.state.properties.auth.check || submit || allError || !emailIsValidAndFree">
        {{ strings.btnValidationLabel }}
        <span slot="loading">{{ strings.btnValidationLabel }}...<q-spinner-gears size="20px" /></span>
      </q-btn>
    </div>
  </div>
</template>

<script>
  import LanguageSetter from '../strings/languageSetter'
  import ApiRequests from '../api/requests'
  import { Alert, date } from 'quasar'

  export default {
    props: {
      stringPageScopeName: String
    },
    data () {
      return {
        strings: {},
        name: '',
        nameError: false,
        email: '',
        emailBeingVerified: false,
        emailError: false,
        emailExist: false,
        emailIsValidAndFree: false,
        emailLastCheckExist: '',
        invalidEmailMessage: '',
        password: '',
        passwordError: false,
        password_confirmation: '',
        confirmationPasswordError: false,
        allError: true,
        submit: false
      }
    },
    mounted () {
      LanguageSetter.setStrings(this)
    },
    methods: {
      register () {
        this.checkAll()
        if (!this.allError) {
          this.submit = true
          this.postRegister()
        }
        else {
          this.submit = false
        }
      },
      postRegister () {
        let that = this
        ApiRequests.register(this.name, this.email, this.password, this.password_confirmation, this.$store.state.properties.appLanguage.choice)
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
      checkEmail () {
        this.emailIsValidAndFree = false
        // eslint-disable-next-line no-useless-escape
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.invalidEmailMessage = this.strings.invalidEmail
        this.emailError = !re.test(this.email)
        if (!this.emailError) {
          this.checkExistEmail()
        }
      },
      checkExistEmail () {
        let that = this
        let waitForEmail = this.email
        // Waiting to not request verification if email change
        setTimeout(function () {
          if (waitForEmail === that.email) {
            that.emailBeingVerified = true
            ApiRequests.existUser(that.email)
              .then(function (response) {
                that.emailLastCheckExist = that.email
                that.emailExist = response.data
                if (that.emailExist) {
                  that.emailIsValidAndFree = false
                  that.invalidEmailMessage = that.strings.existEmail
                  that.emailError = true
                }
                else {
                  that.emailIsValidAndFree = true
                }
                that.emailBeingVerified = false
                that.checkAll()
              })
          }
        }, 800)
      },
      checkName () {
        this.nameError = (this.name.length < 6)
        this.checkAll()
      },
      checkPassword () {
        this.passwordError = (this.password.length < 6)
        this.confirmationPasswordError = (this.password !== this.password_confirmation)
        this.checkAll()
      },
      checkAll () {
        this.allError = this.nameError || this.passwordError || this.confirmationPasswordError || !this.emailIsValidAndFree || this.name === '' || this.email === '' || this.password === '' || this.password_confirmation === ''
      },
      setAuth (accessToken, refreshToken, expire) {
        this.$store.commit('setAuth', {accessToken: accessToken, refreshToken: refreshToken, expire: date.addToDate(new Date(), { seconds: expire }), isNew: true})
      }
    }
  }
</script>

<style>
</style>
