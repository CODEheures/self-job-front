<template>
  <div>
    <template v-if="question.type === 0">
      <question-type0-view
        @addQuestion="addQuestion"
        @removeOfLibrary="removeOfLibrary"
        :strings="getStrings(0)"
        :index="index"
        :question="question"
        :library="mode"
      ></question-type0-view>
    </template>
    <template v-if="question.type === 1">
      <question-type1-view
        @addQuestion="addQuestion"
        @removeOfLibrary="removeOfLibrary"
        :strings="getStrings(1)"
        :index="index"
        :question="question"
        :library="mode"
      ></question-type1-view>
    </template>
    <template v-if="question.type === 2">
      <question-type2-view
        @addQuestion="addQuestion"
        @removeOfLibrary="removeOfLibrary"
        :strings="getStrings(2)"
        :index="index"
        :question="question"
        :library="mode"
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
  import ApiRequests from '../../../api/requests'
  import { Alert, Dialog } from 'quasar'

  export default {
    components: {
      QuestionType0View,
      QuestionType1View,
      QuestionType2View
    },
    props: {
      index: Number,
      question: Object,
      mode: String
    },
    computed: {
      strings () {
        let language = this.$store.state.properties.appLanguage.choice
        return this.$store.state.strings[language].questions.strings.common
      }
    },
    watch: {
      'question.library_type' () {
        console.log('question bouge', this.question.id)
        let that = this
        ApiRequests.changeQuestionLibraryType(this.question.md5, this.question.library_type)
          .then(function (response) {
            Alert.create({
              enter: 'bounceInUp',
              leave: 'bounceOutDown',
              color: 'positive',
              icon: 'check circle',
              html: that.strings.updateLibraryTypeOk,
              position: 'bottom-center',
              dismissible: true
            })
          })
          .catch(function () {
            Alert.create({
              enter: 'bounceInUp',
              leave: 'bounceOutDown',
              color: 'negative',
              icon: 'warning',
              html: that.strings.updateLibraryTypeKo,
              position: 'bottom-center',
              dismissible: true
            })
          })
      }
    },
    methods: {
      getStrings (type) {
        let language = this.$store.state.properties.appLanguage.choice
        return Object.assign({},
          this.$store.state.strings[language].questions.strings.common,
          this.$store.state.strings[language].questions.strings[type])
      },
      addQuestion () {
        this.$emit('addQuestion', this.index)
      },
      removeOfLibrary () {
        let that = this
        Dialog.create({
          title: this.strings.libraryRemoveConfirmTitle,
          message: this.strings.libraryRemoveConfirmMessage,
          buttons: [
            {
              label: this.strings.libraryRemoveCancel
            },
            {
              label: this.strings.libraryRemoveConfirm,
              handler () {
                that.$emit('removeOfLibrary', that.question.md5)
              }
            }
          ]
        })
      }
    }
  }
</script>

<style>
</style>
