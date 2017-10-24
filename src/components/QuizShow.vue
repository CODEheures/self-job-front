<template>
  <div class="layout-padding">
    <q-field :error="emailError" :error-label="strings.invalidEmail">
      <q-input v-model="email" type="text" :float-label="strings.emailLabel" clearable @change="checkEmail()"
               :after="[{icon: 'done', condition: !emailError && email.length > 1, handler () {}}]">
      </q-input>
    </q-field>
    <q-field :error="phoneError" :error-label="strings.invalidPhone">
      <q-input v-model="phone" type="text" :float-label="strings.phoneLabel" clearable @keyup="checkAndFormPhone()"
               :after="[{icon: 'done', condition: !phoneError && phone.length > 1, handler () {}}]">
      </q-input>
    </q-field>
    <div class="row">
      <template v-if="emailError || phoneError || email == '' || phone == ''">
        <div class="col-12">
          <p>{{ strings.infoForAccess }}</p>
        </div>
      </template>
      <template v-else="">
        <div class="col-12">
          <template v-for="question in questions">
            <template v-if="question.type == 0">
              <q-field :label="question.datas.title" :helper="'Question ' + (question.order+1) + '/' + questions.length">
                <q-option-group
                  type="radio"
                  v-model="answer[question.order]"
                  :options="getOptions(question)"
                ></q-option-group>
              </q-field>
            </template>
          </template>
        </div>
        <div class="col-12">

        </div>
      </template>
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
      questions: [],
      answer: [],
      email: 'test@mail.test',
      phone: '123456',
      emailError: false,
      phoneError: false
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
    getOptions (question) {
      let options = []
      question.datas.choices.forEach(function (choice, index) {
        options.push({label: choice.item, value: index})
      })
      return options
    }
  }
}
</script>

<style lang="scss">

</style>
