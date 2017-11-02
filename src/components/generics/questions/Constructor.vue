<template>
  <div>
    <template v-if="question.type === 0">
      <question-type0-constructor
        @removeQuestion="removeQuestion(index)"
        :index="index"
        :strings="getConstructorStrings(0)"
        v-model="dataQuestion"
      ></question-type0-constructor>
    </template>
    <template v-if="question.type === 1">
      <question-type1-constructor
        @removeQuestion="removeQuestion(index)"
        :index="index"
        :strings="getConstructorStrings(1)"
        v-model="dataQuestion"
      ></question-type1-constructor>
    </template>
    <template v-if="question.type === 2">
      <question-type2-constructor
        @removeQuestion="removeQuestion(index)"
        :index="index"
        :strings="getConstructorStrings(2)"
        v-model="dataQuestion"
      ></question-type2-constructor>
    </template>
  </div>
</template>

<script>
  /**
   * v-model: question
   * Props
   *  - index: integer for question number
   *
   * Events:
   *  - @removeQuestion
   */
  import Question from '../questions/question'
  import QuestionType0Constructor from '../questions/type0/Constructor.vue'
  import QuestionType1Constructor from '../questions/type1/Constructor.vue'
  import QuestionType2Constructor from '../questions/type2/Constructor.vue'
  import _ from 'lodash'

  export default {
    components: {
      QuestionType0Constructor,
      QuestionType1Constructor,
      QuestionType2Constructor
    },
    model: {
      prop: 'question',
      event: 'change'
    },
    props: {
      index: Number,
      question: Object
    },
    watch: {
      dataQuestion: {
        handler () {
          this.$emit('change', this.dataQuestion)
        },
        deep: true
      }
    },
    data () {
      return {
        dataQuestion: _.cloneDeep(this.question)
      }
    },
    methods: {
      getConstructorStrings (type) {
        return Question.getConstructorStrings(this, type)
      },
      removeQuestion (index) {
        this.$emit('removeQuestion', index)
      }
    }
  }
</script>

<style>
</style>
