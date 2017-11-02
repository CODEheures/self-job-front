<template>
  <div>
    <template v-if="type === 0">
      <question-type0-example
        @addQuestion="addQuestion(0)"
        :strings="getExampleStrings(0)"
      ></question-type0-example>
    </template>
    <template v-if="type === 1">
      <question-type1-example
        @addQuestion="addQuestion(1)"
        :strings="getExampleStrings(1)"
      ></question-type1-example>
    </template>
    <template v-if="type === 2">
      <question-type2-example
        @addQuestion="addQuestion(2)"
        :strings="getExampleStrings(2)"
      ></question-type2-example>
    </template>
  </div>
</template>

<script>
  /**
   * Props
   *  - type: integer for question type
   *
   * Events:
   *  - @addQuestion when click add
   */
  import Question from '../questions/question'
  import QuestionType0Example from '../questions/type0/Example.vue'
  import QuestionType1Example from '../questions/type1/Example.vue'
  import QuestionType2Example from '../questions/type2/Example.vue'

  export default {
    components: {
      QuestionType0Example,
      QuestionType1Example,
      QuestionType2Example
    },
    props: {
      type: Number
    },
    methods: {
      getExampleStrings (type) {
        return Question.getExampleStrings(this, type)
      },
      addQuestion (type) {
        this.$emit('addQuestion', type)
      }
    }
  }
</script>

<style>
</style>
