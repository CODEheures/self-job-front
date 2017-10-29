<template>
  <q-step name="stepTwo" :title="'' + strings.stepTwoTitle" :subtitle="strings.stepTwoSubTitle" :disable="!isCompleteStepOne">
    <h5 class="text-italic thin-paragraph text-brown-5">{{ strings.stepTwoInstructions }}</h5>
    <div class="row">
      <div class="col-md-6 col-lg-4 col-xl-3">
        <question-type0-example
          @addQuestion="addQuestion(0)"
          :strings="getExampleStrings(0)"
        ></question-type0-example>
      </div>
      <div class="col-md-6 col-lg-4 col-xl-3">
        <question-type1-example
          @addQuestion="addQuestion(1)"
          :strings="getExampleStrings(1)"
        ></question-type1-example>
      </div>
    </div>
    <q-item-separator />
    <div class="row" v-for="question, index in questions">
      <div class="col-md-6" >
        <template v-if="question.type === 0">
          <question-type0-contructor
            @updateLabel="updateLabel($event, index)"
            @updateOptions="updateOptions($event, index)"
            @updateValidation="updateValidation($event, index)"
            @removeQuestion="removeQuestion(index)"
            :index="index"
            :strings="getConstructorStrings(0)"
            :question="question"
          ></question-type0-contructor>
        </template>
        <template v-if="question.type === 1">
          <question-type1-contructor
            @updateLabel="updateLabel($event, index)"
            @updateOptions="updateOptions($event, index)"
            @updateValidation="updateValidation($event, index)"
            @removeQuestion="removeQuestion(index)"
            :index="index"
            :strings="getConstructorStrings(1)"
            :question="question"
          ></question-type1-contructor>
        </template>
      </div>
      <div class="col-md-6" >
        <template v-if="question.type === 0">
          <question-type0-view
            :strings="getViewStrings(0)"
            :index="index"
            :question="question"
            :flagUpdate="flagUpdatePreview"
            :preview="true"
          ></question-type0-view>
        </template>
        <template v-if="question.type === 1">
          <question-type1-view
            :strings="getViewStrings(1)"
            :index="index"
            :question="question"
            :flagUpdate="flagUpdatePreview"
            :preview="true"
          ></question-type1-view>
        </template>
      </div>
    </div>
    <q-item-separator />
    <q-btn color="secondary" :disabled="!isValid">Valider</q-btn>
  </q-step>
</template>

<script>
  import Question from '../generics/questions/question'
  import QuestionType0Example from '../generics/questions/type0/Example.vue'
  import QuestionType0Contructor from '../generics/questions/type0/Constructor.vue'
  import QuestionType0View from '../generics/questions/type0/View.vue'
  import QuestionType1Example from '../generics/questions/type1/Example.vue'
  import QuestionType1Contructor from '../generics/questions/type1/Constructor.vue'
  import QuestionType1View from '../generics/questions/type1/View.vue'
  import LanguageSetter from '../../strings/languageSetter'

  export default {
    components: {
      QuestionType0Example,
      QuestionType0Contructor,
      QuestionType0View,
      QuestionType1Example,
      QuestionType1Contructor,
      QuestionType1View
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
        flagUpdatePreview: false,
        isValid: false
      }
    },
    mounted () {
      LanguageSetter.setStrings(this)
      LanguageSetter.setUnits(this)
    },
    methods: {
      getExampleStrings (type) {
        return Question.getExampleStrings(this, type)
      },
      getConstructorStrings (type) {
        return Question.getConstructorStrings(this, type)
      },
      getViewStrings (type) {
        return Question.getViewStrings(this, type)
      },
      addQuestion (type) {
        this.questions.push(Object.assign({}, {type: type}, Question.getModel(this, type)))
      },
      updateLabel (label, index) {
        this.questions[index].label = label
      },
      updateOptions (options, index) {
        this.questions[index].options = options
        this.flagUpdatePreview = !this.flagUpdatePreview
      },
      updateValidation (isValid, index) {
        this.isValid = true
        this.questions[index].isValid = isValid
        this.questions.forEach((item) => {
          if (item.isValid === false) {
            this.isValid = false
            return null
          }
        })
      },
      removeQuestion (index) {
        this.questions.splice(index, 1)
      }
    }
  }
</script>

<style>
</style>
