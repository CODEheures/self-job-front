<template>
  <div class="layout-padding">
    <h5 v-if="!$store.state.properties.auth.check" round-borders><span class="token bg-info">{{ strings.alreadyConnected }}</span></h5>
    <p v-if="$store.state.properties.auth.check">{{ strings.invitationLabel }}</p>
    <div v-if="$store.state.properties.auth.check">
      <q-field :error="emailError" :error-label="invalidEmailMessage">
        <q-input v-model="email" type="text" :float-label="strings.emailLabel" clearable :disable="!$store.state.properties.auth.check || emailBeingVerified" :loading="emailBeingVerified" @change="checkEmail()"
                 :after="[{icon: 'done', condition: !emailError && email.length > 1, handler () {}}]">
          <span slot="loading"><q-spinner-gears size="20px" /></span>
        </q-input>
      </q-field>
      <div class="row justify-between">
        <q-btn v-model="submit" loader color="primary" icon-right="arrow forward" @click="invite()" :disabled="!$store.state.properties.auth.check || submit || !this.emailIsValidAndFree || this.email === ''">
          {{ strings.btnInvitationLabel }}
          <span slot="loading">{{ strings.btnValidationLabel }}...<q-spinner-gears size="20px" /></span>
        </q-btn>
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
        email: '',
        emailBeingVerified: false,
        emailError: false,
        emailExist: false,
        emailIsValidAndFree: false,
        emailLastCheckExist: '',
        invalidEmailMessage: '',
        submit: false
      }
    },
    mounted () {
      LanguageSetter.setStrings(this)
    },
    methods: {
      invite () {
        if (this.emailIsValidAndFree && this.email !== '') {
          this.submit = true
          this.postInvite()
        }
        else {
          this.submit = false
        }
      },
      postInvite () {
        let that = this
        ApiRequests.invite(this.email)
          .then(function (response) {
            that.submit = false
            Alert.create({
              enter: 'bounceInUp',
              leave: 'bounceOutDown',
              color: 'positive',
              icon: 'check',
              html: that.strings.inviteSuccess,
              position: 'bottom-center',
              dismissible: true
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
                html: that.strings.inviteError,
                position: 'bottom-center',
                dismissible: true
              })
            }
          })
      },
      checkEmail () {
        this.emailIsValidAndFree = false
        // eslint-disable-next-line no-useless-escape
        this.invalidEmailMessage = this.strings.invalidEmail
        this.emailError = Utils.checkCorrectEmail(this.email)
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
              })
          }
        }, 800)
      }
    }
  }
</script>

<style>
</style>
