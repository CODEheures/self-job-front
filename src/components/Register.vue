<template>
  <div class="layout-padding">
    <h5 v-if="$store.state.properties.auth.check" round-borders><span class="token bg-info">{{ strings.alreadyConnected }}</span></h5>
    <q-field :error="nameError" :error-label="strings.invalidName">
      <q-input v-model="name" type="text" :float-label="strings.nameLabel" clearable :disable="$store.state.properties.auth.check" @keyup="checkName()" :after="[{icon: 'done', condition: !nameError && name.length > 1, handler () {}}]" />
    </q-field>
    <q-field :error="emailError" :error-label="invalidEmailMessage">
      <q-input v-model="email" type="text" :float-label="strings.emailLabel" clearable :disable="$store.state.properties.auth.check || emailBeingVerified" :loading="emailBeingVerified" @change="checkEmail()"
               :after="[{icon: 'done', condition: !emailError && email.length > 1, handler () {}}]">
        <span slot="loading"><q-spinner-gears size="20px" /></span>
      </q-input>
    </q-field>
    <q-field :error="passwordError" :error-label="strings.invalidPassword">
      <q-input v-model="password" type="password" :float-label="strings.passwordLabel" :disable="$store.state.properties.auth.check" @keyup="checkPassword()"
               :after="[{icon: 'done', condition: !passwordError && password.length > 1, handler () {}}]"/>
    </q-field>
    <q-field :error="confirmationPasswordError" :error-label="strings.invalidPasswordConfirmation">
      <q-input v-model="password_confirmation" type="password" :float-label="strings.passwordConfirmationLabel" :disable="$store.state.properties.auth.check" @keyup="checkPassword()"
               :after="[{icon: 'done', condition: !confirmationPasswordError && password_confirmation.length > 1, handler () {}}]"/>
    </q-field>
    <div class="row justify-between">
      <q-btn v-model="submit" loader color="primary" icon-right="arrow forward" @click="register()" :disabled="$store.state.properties.auth.check || submit || allError || !emailIsValidInvitedAndFree">
        {{ strings.btnValidationLabel }}
        <span slot="loading">{{ strings.btnValidationLabel }}...<q-spinner-gears size="20px" /></span>
      </q-btn>
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
        name: '',
        nameError: false,
        email: '',
        emailBeingVerified: false,
        emailError: false,
        emailisInvitedAndFree: false,
        emailIsValidInvitedAndFree: false,
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
            that.$store.commit('setAuth', {
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh_token,
              expire: date.addToDate(new Date(), { seconds: response.data.expires_in }),
              isNew: true,
              callBack: that.actionsAfterRegister
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
        this.emailIsValidInvitedAndFree = false
        // eslint-disable-next-line no-useless-escape
        this.invalidEmailMessage = this.strings.invalidEmail
        this.emailError = Utils.checkCorrectEmail(this.email)
        if (!this.emailError) {
          this.checkIsInvitedAndFreeEmail()
        }
      },
      checkIsInvitedAndFreeEmail () {
        let that = this
        let waitForEmail = this.email
        // Waiting to not request verification if email change
        setTimeout(function () {
          if (waitForEmail === that.email) {
            that.emailBeingVerified = true
            ApiRequests.isInvitedAndFreeUser(that.email)
              .then(function (response) {
                that.emailLastCheckExist = that.email
                that.emailisInvitedAndFree = response.data.isInvited && response.data.isFree
                if (!that.emailisInvitedAndFree) {
                  that.emailIsValidInvitedAndFree = false
                  that.invalidEmailMessage = !response.data.isFree ? that.strings.existEmail : that.strings.notInvitedEmail
                  that.emailError = true
                }
                else {
                  that.emailIsValidInvitedAndFree = true
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
        this.allError = this.nameError || this.passwordError || this.confirmationPasswordError || !this.emailIsValidInvitedAndFree || this.name === '' || this.email === '' || this.password === '' || this.password_confirmation === ''
      },
      actionsAfterRegister () {
        this.submit = false
        this.$q.events.$emit('login')
      }
    }
  }
</script>

<style>
</style>
