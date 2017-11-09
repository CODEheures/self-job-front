<template>
  <div>
    <template v-if="question.example.type === 0">
      <question-type0-example
        @addQuestion="addQuestion(0)"
        :strings="getStrings(0)"
        :example="question.example.form"
      ></question-type0-example>
    </template>
    <template v-if="question.example.type === 1">
      <question-type1-example
        @addQuestion="addQuestion(1)"
        :strings="getStrings(1)"
        :example="question.example.form"
      ></question-type1-example>
    </template>
    <template v-if="question.example.type === 2">
      <question-type2-example
        @addQuestion="addQuestion(2)"
        :strings="getStrings(2)"
        :example="question.example.form"
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
      question: Object
    },
    methods: {
      getStrings (type) {
        let language = this.$store.state.properties.appLanguage.choice
        return Object.assign({},
          this.$store.state.strings[language].questions.strings.common,
          this.$store.state.strings[language].questions.strings[type])
      },
      addQuestion (type) {
        this.$emit('addQuestion', type)
      }
    }
  }
</script>

<style>
</style>
