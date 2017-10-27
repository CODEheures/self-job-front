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
    </div>
    <q-item-separator />
    <div class="row" v-for="question, index in questions">
      <div class="col-md-6" >
        <template v-if="question.type === 0">
          <question-type0-contructor
            @updateLabel="updateLabel($event, index)"
            @updateOptions="updateOptions($event, index)"
            @removeQuestion="removeQuestion(index)"
            :index="index"
            :strings="getConstructorStrings(0)"
            :question="question"
          ></question-type0-contructor>
        </template>
      </div>
      <div class="col-md-6" >
        <template v-if="question.type === 0">
          <question-type0-preview
            :strings="getPreviewStrings(0)"
            :index="index"
            :question="question"
            :underConstruction="true"
          ></question-type0-preview>
        </template>
      </div>
    </div>
  </q-step>
</template>

<script>
  import Question from '../generics/questions/question'
  import QuestionType0Example from '../generics/questions/type0/Example.vue'
  import QuestionType0Contructor from '../generics/questions/type0/Constructor.vue'
  import QuestionType0Preview from '../generics/questions/type0/Preview.vue'
  import LanguageSetter from '../../strings/languageSetter'

  export default {
    components: {
      QuestionType0Example,
      QuestionType0Contructor,
      QuestionType0Preview
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
        questions: []
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
      getPreviewStrings (type) {
        return Question.getPreviewStrings(this, type)
      },
      addQuestion (type) {
        this.questions.push(Object.assign({}, {type: type}, Question.getModel(this, type)))
      },
      updateLabel (label, index) {
        this.questions[index].label = label
      },
      updateOptions (options, index) {
        this.questions[index].options = options
      },
      removeQuestion (index) {
        this.questions.splice(index, 1)
      }
    }
  }
</script>

<style>
</style>
