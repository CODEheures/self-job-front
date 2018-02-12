<template>
  <div class="layout-padding">
    <q-field :error="emailError && email.length > 0" :error-label="strings.invalidEmail">
      <q-input v-model="email" type="text" :float-label="strings.emailLabel" clearable @change="checkEmail()"
               :after="[{icon: 'done', condition: !emailError && email.length > 1, handler () {}}]">
      </q-input>
    </q-field>
    <q-field :error="phoneError && phone.length > 0" :error-label="strings.invalidPhone">
      <q-input v-model="phone" type="text" :float-label="strings.phoneLabel" clearable @keyup="checkAndFormPhone()"
               :after="[{icon: 'done', condition: !phoneError && phone.length > 1, handler () {}}]">
      </q-input>
    </q-field>
    <div class="col-12" v-show="!availableForQuiz">
      <p>{{ strings.infoForAccess }}</p>
    </div>
    <template v-if="firstViewQuiz">
      <div class="row" v-show="availableForQuiz">
        <div class="col-12">
          <h5 class="text-italic thin-paragraph text-brown-5">{{ strings.quizTitle }}</h5>
          <q-alert color="brown-1" class="text-brown-6" icon="security">
            <span class="text-brown-8">{{ strings.quizInfo }}</span>
          </q-alert>
          <template v-for="question, index in questions">
            <question-view
              :index="index"
              :question="question"
              v-model="answers[index]"
            ></question-view>
          </template>
        </div>
        <div class="col-12" v-if="availableForQuiz">
          <q-btn loader glossy color="secondary" class="full-width" :disabled="!quizIsValid || $store.state.properties.auth.check" big @click="sendQuizAnswers" icon-right="flight takeoff">
            {{ strings.btnValidationLabel }}
            <span v-if="submit" slot="loading">{{ strings.btnValidationInProgressLabel }}...<q-spinner-gears size="20px" /></span>
          </q-btn>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import QuestionView from './generics/questions/View.vue'
  import LanguageSetter from '../strings/languageSetter'
  import ApiRequests from '../api/requests'
  import Utils from './utils'
  import _ from 'lodash'
  import { Alert, Dialog } from 'quasar'

  export default {
    components: {
      QuestionView
    },
    props: {
      stringPageScopeName: String
    },
    computed: {
      availableForQuiz () {
        let isAvailableForQuiz = !this.emailError && !this.phoneError && this.email !== '' && this.phone !== ''
        if (isAvailableForQuiz) {
          this.firstViewQuiz = true
        }
        return isAvailableForQuiz
      }
    },
    watch: {
      answers () {
        this.testQuizValidity()
      },
      email (value) {
        if (value === '') {
          this.checkEmail()
        }
      },
      phone (value) {
        if (value === '') {
          this.checkAndFormPhone()
        }
      }
    },
    data () {
      return {
        strings: {},
        questions: [],
        answers: [],
        email: '',
        phone: '',
        emailError: true,
        phoneError: true,
        quizIsValid: false,
        submit: false,
        firstViewQuiz: false
      }
    },
    mounted () {
      LanguageSetter.setStrings(this)
      this.showQuiz()
    },
    methods: {
      showQuiz () {
        let that = this
        ApiRequests.showQuiz(this.$route.params.id)
          .then(function (response) {
            that.submit = false
            that.questions = response.data
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
      checkEmail () {
        this.emailError = Utils.checkCorrectEmail(this.email)
      },
      checkAndFormPhone () {
        this.phone = Utils.formPhone(this.phone)
        this.phoneError = Utils.checkCorrectPhone(this.phone)
      },
      getStrings (type) {
        let language = this.$store.state.properties.appLanguage.choice
        return Object.assign({},
          this.$store.state.strings[language].questions.strings.common,
          this.$store.state.strings[language].questions.strings[type])
      },
      testQuizValidity () {
        let answersNotUndefined = _.filter(this.answers, function (v) { return v !== undefined })
        this.quizIsValid = answersNotUndefined.length === this.questions.length
      },
      sendQuizAnswers (event, done) {
        let that = this
        that.submit = false
        Dialog.create({
          title: this.strings.confirmDialogTitle,
          message: this.strings.confirmDialogMessage,
          buttons: [
            {
              label: this.strings.confirmDialogBtnCancel,
              handler () {
                done()
              }
            },
            {
              label: this.strings.confirmDialogBtnConfirm,
              handler () {
                let answers = {}
                that.answers.forEach(function (answer) {
                  //  answers.push({'order': answer.order, 'answer': answer.answer})
                  answers[answer.order] = answer.answer
                })
                that.submit = true
                ApiRequests.sendQuizAnswers(that.$route.params.id, that.email, that.phone, answers)
                  .then(function (response) {
                    that.submit = false
                    done()
                    console.log(response.data)
                    Alert.create({
                      enter: 'bounceInUp',
                      leave: 'bounceOutDown',
                      color: 'positive',
                      icon: 'check',
                      html: that.strings.sendSuccess + '<strong>' + response.data + '%</strong>',
                      position: 'bottom-center',
                      dismissible: true
                    })
                    that.$router.push({name: 'home'})
                  })
                  .catch(function (error) {
                    that.submit = false
                    done()
                    let stringError = that.strings.sendError
                    if (error.response.status === 403) {
                      stringError = that.strings.alreadySendError
                    }
                    Alert.create({
                      enter: 'bounceInUp',
                      leave: 'bounceOutDown',
                      color: 'negative',
                      icon: 'warning',
                      html: stringError,
                      position: 'bottom-center',
                      dismissible: true
                    })
                  })
              }
            }
          ]
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
