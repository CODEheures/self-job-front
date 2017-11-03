<template>
  <div>
    <template v-if="question.type === 0">
      <question-type0-view
        @addQuestion="addQuestion"
        :strings="getViewStrings(0)"
        :index="index"
        :question="computedQuestion"
        :library="true"
      ></question-type0-view>
    </template>
    <template v-if="question.type === 1">
      <question-type1-view
        @addQuestion="addQuestion"
        :strings="getViewStrings(1)"
        :index="index"
        :question="computedQuestion"
        :library="true"
      ></question-type1-view>
    </template>
    <template v-if="question.type === 2">
      <question-type2-view
        @addQuestion="addQuestion"
        :strings="getViewStrings(2)"
        :index="index"
        :question="computedQuestion"
        :library="true"
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
  import Question from '../questions/question'
  import QuestionType0View from '../questions/type0/View.vue'
  import QuestionType1View from '../questions/type1/View.vue'
  import QuestionType2View from '../questions/type2/View.vue'

  export default {
    components: {
      QuestionType0View,
      QuestionType1View,
      QuestionType2View
    },
    props: {
      index: Number,
      question: Object,
      preview: Boolean
    },
    computed: {
      computedQuestion () {
        return Object.assign({}, {label: this.question.datas.label, options: this.question.datas.options})
      }
    },
    methods: {
      getViewStrings (type) {
        return Question.getViewStrings(this, type)
      },
      addQuestion () {
        console.log('emit add', this.index)
        this.$emit('addQuestion', this.index)
      }
    }
  }
</script>

<style>
</style>
