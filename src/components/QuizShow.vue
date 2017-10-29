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
          <h5 class="text-italic thin-paragraph text-brown-5">{{ strings.quizTitle }}</h5>
          <template v-for="question, index in questions">
            <template v-if="question.type == 0">
              <question-type0-view
                :strings="getViewStrings(0)"
                :index="index"
                :question="question.datas"
              ></question-type0-view>
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
  import Question from './generics/questions/question'
  import QuestionType0View from './generics/questions/type0/View.vue'
  import LanguageSetter from '../strings/languageSetter'
  import ApiRequests from '../api/requests'
  import Utils from './utils'
  import { Alert } from 'quasar'

  export default {
    components: {
      QuestionType0View
    },
    props: {
      stringPageScopeName: String
    },
    data () {
      return {
        strings: {},
        questions: [],
        answer: [],
        email: '',
        phone: '',
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
      getViewStrings (type) {
        return Question.getViewStrings(this, type)
      }
    }
  }
</script>

<style lang="scss">

</style>
