<template>
  <q-step :id="'selfJob'+_uid" name="stepTwo" :title="'' + strings.stepTwoTitle" :subtitle="strings.stepTwoSubTitle" :disable="!isCompleteStepOne">
    <h5 class="text-italic thin-paragraph text-brown-5">{{ strings.stepTwoInstructions }}</h5>
    <div class="row">
      <div class="col-12">
        <q-tabs inverted v-model="selectedTab" class="gt-xs">
          <q-tab default slot="title" icon="format list numbered" :label="strings.stepTwoQuestionListTitle0" name="tab0" />
          <q-tab slot="title" icon="playlist add" :label="strings.stepTwoQuestionListTitle1" name="tab1" />
          <q-tab slot="title" icon="folder" :label="strings.stepTwoQuestionListTitle2" name="tab2" />
        </q-tabs>
        <q-tabs inverted v-model="selectedTab" class="lt-sm">
          <q-tab default slot="title" icon="format list numbered" name="tab0" />
          <q-tab slot="title" icon="playlist add" name="tab1" />
          <q-tab slot="title" icon="folder" name="tab2" />
        </q-tabs>
      </div>
    </div>
    <q-item-separator />
    <div v-show="selectedTab=='tab0'">
      <div class="row" v-for="question, index in questions" :ref="'selfJobQuestion' + _uid + '_' + index">
        <div class="col-md-6" >
          <question-constructor
            @removeQuestion="removeQuestion(index)"
            :index="index"
            v-model="questions[index]"
          ></question-constructor>
        </div>
        <div class="col-md-6" >
          <question-view
            :index="index"
            :question="question"
            :preview="true"
          ></question-view>
        </div>
      </div>
      <q-item-separator />
      <q-btn color="secondary" :disabled="!isValid">Valider</q-btn>
    </div>

    <div class="row" v-show="selectedTab=='tab1'">
      <div class="col-md-6 col-lg-6 col-xl-3" v-for="type in 3">
        <question-example
          @addQuestion="addQuestion"
          :type="type-1"
        ></question-example>
      </div>
    </div>
    <div class="row" v-show="selectedTab=='tab2'">
      Ma biblio
    </div>
  </q-step>
</template>

<script>
  import Question from '../generics/questions/question'
  import QuestionConstructor from '../generics/questions/Constructor.vue'
  import QuestionView from '../generics/questions/View.vue'
  import QuestionExample from '../generics/questions/Example.vue'
  import LanguageSetter from '../../strings/languageSetter'

  export default {
    components: {
      QuestionConstructor,
      QuestionView,
      QuestionExample
    },
    props: {
      stringPageScopeName: String,
      isCompleteStepOne: Boolean
    },
    data () {
      return {
        strings: {},
        units: [],
        submit: false,
        questions: [],
        isValid: false,
        selectedTab: undefined
      }
    },
    watch: {
      questions: {
        handler () {
          this.updateValidation()
          this.store()
        },
        deep: true
      }
    },
    mounted () {
      LanguageSetter.setStrings(this)
      LanguageSetter.setUnits(this)
      if (localStorage.getItem('createQuestions')) {
        this.questions = JSON.parse(localStorage.getItem('createQuestions'))
        this.updateValidation()
      }
    },
    methods: {
      store () {
        localStorage.setItem('createQuestions', JSON.stringify(this.questions))
      },
      addQuestion (type) {
        this.questions.push(Object.assign({}, {type: type}, Question.getModel(this, type)))
        this.store()
        this.selectedTab = 'tab0'
        this.$nextTick(function () {
          let $name = 'selfJobQuestion' + this._uid + '_' + (this.questions.length - 1)
          let elem = this.$refs[$name][0]
          window.scroll(0, (elem.offsetTop - window.pageYOffset))
        })
      },
      removeQuestion (index) {
        this.questions.splice(index, 1)
        this.updateValidation()
        this.store()
      },
      updateValidation () {
        this.isValid = true
        if (this.questions.length === 0) {
          this.isValid = false
          return null
        }
        this.questions.forEach((item) => {
          if (item.isValid === false) {
            this.isValid = false
            return null
          }
        })
      }
    }
  }
</script>

<style>
</style>
