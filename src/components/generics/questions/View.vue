<template>
  <div>
    <template v-if="question.type === 0">
      <question-type0-view
        :strings="getStrings(0)"
        :index="index"
        :question="question"
        :preview="preview"
        v-model="dataAnswer"
      ></question-type0-view>
    </template>
    <template v-if="question.type === 1">
      <question-type1-view
        :strings="getStrings(1)"
        :index="index"
        :question="question"
        :preview="preview"
        v-model="dataAnswer"
      ></question-type1-view>
    </template>
    <template v-if="question.type === 2">
      <question-type2-view
        :strings="getStrings(2)"
        :index="index"
        :question="question"
        :preview="preview"
        v-model="dataAnswer"
      ></question-type2-view>
    </template>
  </div>
</template>

<script>
  /**
   * Props
   *  - index: integer for question number
   *  - question: object question
   *
   * Events:
   */
  import QuestionType0View from '../questions/type0/View.vue'
  import QuestionType1View from '../questions/type1/View.vue'
  import QuestionType2View from '../questions/type2/View.vue'

  export default {
    components: {
      QuestionType0View,
      QuestionType1View,
      QuestionType2View
    },
    model: {
      prop: 'answer',
      event: 'change'
    },
    props: {
      index: Number,
      question: Object,
      preview: Boolean,
      answer: Object
    },
    watch: {
      dataAnswer () {
        this.$emit('change', this.dataAnswer === undefined ? undefined : {'order': this.question.order, 'answer': this.dataAnswer})
      }
    },
    data () {
      return {
        dataAnswer: undefined
      }
    },
    methods: {
      getStrings (type) {
        let language = this.$store.state.properties.appLanguage.choice
        return Object.assign({},
          this.$store.state.strings[language].questions.strings.common,
          this.$store.state.strings[language].questions.strings[type])
      }
    }
  }
</script>

<style>
</style>
