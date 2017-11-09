<template>
  <div>
    <template v-if="question.type === 0">
      <question-type0-constructor
        @removeQuestion="removeQuestion(index)"
        :index="index"
        :strings="getStrings(0)"
        v-model="dataQuestion"
      ></question-type0-constructor>
    </template>
    <template v-if="question.type === 1">
      <question-type1-constructor
        @removeQuestion="removeQuestion(index)"
        :index="index"
        :strings="getStrings(1)"
        v-model="dataQuestion"
      ></question-type1-constructor>
    </template>
    <template v-if="question.type === 2">
      <question-type2-constructor
        @removeQuestion="removeQuestion(index)"
        :index="index"
        :strings="getStrings(2)"
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
      getStrings (type) {
        let language = this.$store.state.properties.appLanguage.choice
        return Object.assign({},
          this.$store.state.strings[language].questions.strings.common,
          this.$store.state.strings[language].questions.strings[type]['constructor'])
      },
      removeQuestion (index) {
        this.$emit('removeQuestion', index)
      }
    }
  }
</script>

<style>
</style>
