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
      <div class="col-12 text-center" v-show="onReindexed">
        <q-spinner-gears color="primary" :size="90" />
      </div>
      <div class="row" v-show="!onReindexed" v-for="question, index in questions" :ref="'selfJobQuestion' + _uid + '_' + index">
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
      <p class="thin-paragraph">
        <template v-if="validation.numQuestions.isValid">
          <q-icon size="30px" color="positive"  name="check box" />
          {{ strings.stepTwoValidation.numQuestions.ok }}
        </template>
        <template v-else>
          <q-icon size="30px" color="warning" name="warning" />
          {{ strings.stepTwoValidation.numQuestions.ko }}: {{ questions.length }} /{{ validation.numQuestions.min }}
        </template>
      </p>
      <p class="thin-paragraph" v-if="questions.length > 0 && validation.allQuestions.isValid">
        <q-icon size="30px" color="positive" name="check box" /> {{ strings.stepTwoValidation.allQuestions.ok }}
      </p>
      <p class="thin-paragraph" v-if="questions.length > 0 && !validation.allQuestions.isValid">
        <q-icon size="30px" color="warning" name="warning" />
        <template v-if="validation.allQuestions.invalids.length === 1">
          {{ strings.stepTwoValidation.allQuestions.ko.start.singular }} {{ validation.allQuestions.invalids[0] + 1 }} {{ strings.stepTwoValidation.allQuestions.ko.end.singular }}
        </template>
        <template v-else>
          {{ strings.stepTwoValidation.allQuestions.ko.start.plural }}
          <span v-for="invalid, index in validation.allQuestions.invalids">
            <template v-if="index === validation.allQuestions.invalids.length - 1">
              {{ invalid + 1 }}
            </template>
            <template v-if="index === validation.allQuestions.invalids.length - 2">
              {{ invalid + 1 }} et
            </template>
            <template v-if="index !== validation.allQuestions.invalids.length - 2 && index !== validation.allQuestions.invalids.length - 1">
              {{ invalid + 1 }},
            </template>
          </span>
          {{ strings.stepTwoValidation.allQuestions.ko.end.plural }}
        </template>
      </p>
      <q-btn v-model="submit" loader glossy class="full-width" color="secondary" :disabled="!validation.isValid" @click="postAdvert">
        {{ strings.stepTwoValidation.btn }}
        <span slot="loading">{{ strings.stepTwoValidation.btn }}...<q-spinner-gears size="20px" /></span>
      </q-btn>
    </div>
    <q-item-separator />
    <div class="row" v-show="selectedTab=='tab1'">
      <div class="col-md-6 col-lg-6 col-xl-4" v-for="newQuestion in questionsLibrary.news">
        <question-news
          @addQuestion="addQuestion"
          :question="newQuestion"
        ></question-news>
      </div>
    </div>
    <div class="row" v-show="selectedTab=='tab2'">
      <div class="col-12" v-if="!libraryLoaded">
        <q-alert color="warning" icon="warning" appear>{{ strings.stepTwoGetLibraryError }}</q-alert>
      </div>
      <div class="col-12">
        <q-list no-border>
          <q-collapsible icon="person" :label="strings.stepTwoQuestionListTitle2Private">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-4"  v-for="question, index in questionsLibrary.privates">
                <question-library
                  @addQuestion="addLibraryQuestion('privates', $event)"
                  @removeOfLibrary="removeOfLibrary"
                  :index="index"
                  :question="question"
                  :mode="'private'"
                ></question-library>
              </div>
            </div>
          </q-collapsible>
          <q-collapsible icon="person" :label="strings.stepTwoQuestionListTitle2Corporate">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-4"  v-for="question, index in questionsLibrary.corporates">
                <question-library
                  @addQuestion="addLibraryQuestion('privates', $event)"
                  :index="index"
                  :question="question"
                  :mode="'corporate'"
                ></question-library>
              </div>
            </div>
          </q-collapsible>
          <q-collapsible icon="cloud" :label="strings.stepTwoQuestionListTitle2Public">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-4"  v-for="question, index in questionsLibrary.publics">
                <question-library
                  @addQuestion="addLibraryQuestion('publics', $event)"
                  :index="index"
                  :question="question"
                  :mode="'public'"
                ></question-library>
              </div>
            </div>
          </q-collapsible>
        </q-list>
      </div>
    </div>
  </q-step>
</template>

<script>
  import QuestionConstructor from '../generics/questions/Constructor.vue'
  import QuestionView from '../generics/questions/View.vue'
  import QuestionLibrary from '../generics/questions/Library.vue'
  import QuestionNews from '../generics/questions/News.vue'
  import LanguageSetter from '../../strings/languageSetter'
  import ApiRequests from '../../api/requests'
  import { Alert } from 'quasar'
  import _ from 'lodash'

  export default {
    components: {
      QuestionConstructor,
      QuestionView,
      QuestionLibrary,
      QuestionNews
    },
    props: {
      stringPageScopeName: String,
      isCompleteStepOne: Boolean
    },
    data () {
      return {
        strings: {
          stepTwoValidation: {
            numQuestions: {},
            allQuestions: {
              ko: {
                start: {},
                end: {}
              }
            }
          }
        },
        units: [],
        submit: false,
        libraryLoaded: false,
        questions: [],
        onReindexed: false,
        questionsLibrary: [],
        validation: {
          isValid: false,
          numQuestions: {
            min: 2,
            isValid: false
          },
          allQuestions: {
            invalids: [],
            isValid: false
          }
        },
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
        this.onReindexed = true
        this.questions = JSON.parse(localStorage.getItem('createQuestions'))
        this.updateValidation()
        this.$nextTick(() => {
          this.onReindexed = false
        })
      }
      this.getQuestionsLibrary()
    },
    methods: {
      store () {
        localStorage.setItem('createQuestions', JSON.stringify(this.questions))
      },
      emptyStorage () {
        localStorage.removeItem('createAdvert')
        localStorage.removeItem('createQuestions')
      },
      addQuestion (type) {
        this.questions.push(Object.assign({}, {type: type, datas: this.questionsLibrary.news[type].blueprint.datas, form: this.questionsLibrary.news[type].blueprint.form}))
        this.store()
        this.selectedTab = 'tab0'
        this.$nextTick(function () {
          let $name = 'selfJobQuestion' + this._uid + '_' + (this.questions.length - 1)
          let elem = this.$refs[$name][0]
          window.scroll(0, (elem.offsetTop - window.pageYOffset))
        })
      },
      addLibraryQuestion (mode, index) {
        this.questions.push(Object.assign({}, {type: this.questionsLibrary[mode][index].type, datas: this.questionsLibrary[mode][index].datas, form: this.questionsLibrary[mode][index].form}))
        this.store()
        this.selectedTab = 'tab0'
        this.$nextTick(function () {
          let $name = 'selfJobQuestion' + this._uid + '_' + (this.questions.length - 1)
          let elem = this.$refs[$name][0]
          window.scroll(0, (elem.offsetTop - window.pageYOffset))
        })
      },
      removeQuestion (index) {
        this.onReindexed = true
        let questions = _.cloneDeep(this.questions)
        questions.splice(index, 1)
        // Force empty question for remounted because uncomprehensible bug of watcher in constructor
        this.questions = []
        this.$nextTick(() => {
          this.questions = questions
          this.updateValidation()
          this.store()
          this.$nextTick(() => {
            this.onReindexed = false
          })
        })
      },
      updateValidation () {
        // Minimun num of questions for a valid quiz
        this.validation.numQuestions.isValid = this.questions.length >= this.validation.numQuestions.min

        // Each question is valid
        this.validation.allQuestions.invalids = []
        this.questions.forEach((item, index) => {
          if (item.isValid === false) {
            this.validation.allQuestions.invalids.push(index)
          }
        })
        this.validation.allQuestions.isValid = this.validation.allQuestions.invalids.length === 0

        // Global Results
        this.validation.isValid = this.validation.numQuestions.isValid && this.validation.allQuestions.isValid
      },
      getQuestionsLibrary () {
        let that = this
        this.libraryLoaded = false
        ApiRequests.getQuestionsLibrary(this.$store.state.properties.appLanguage.choice)
          .then(function (response) {
            that.questionsLibrary = response.data
            that.libraryLoaded = true
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      postAdvert () {
        let that = this
        this.submit = true
        let advert = localStorage.getItem('createAdvert')
        let questions = localStorage.getItem('createQuestions')
        ApiRequests.postAdvert(advert, questions, this.$store.state.properties.appLanguage.choice)
          .then(function () {
            that.submit = false
            that.emptyStorage()
            Alert.create({
              enter: 'bounceInUp',
              leave: 'bounceOutDown',
              color: 'positive',
              icon: 'check',
              html: that.strings.stepTwoAdvertSaved,
              position: 'bottom-center',
              dismissible: true
            })
            that.$router.push({name: 'myAdverts'})
          })
          .catch(function () {
            that.submit = false
            Alert.create({
              enter: 'bounceInUp',
              leave: 'bounceOutDown',
              color: 'negative',
              icon: 'warning',
              html: that.strings.stepTwoAdvertSaveError,
              position: 'bottom-center',
              dismissible: true
            })
          })
      },
      removeOfLibrary (hash) {
        console.log(hash)
        this.libraryLoaded = false
        let that = this
        ApiRequests.removeOfLibrary(hash)
          .then(function (response) {
            that.questionsLibrary = response.data
            that.libraryLoaded = true
          })
          .catch(function (error) {
            console.log(error)
            Alert.create({
              enter: 'bounceInUp',
              leave: 'bounceOutDown',
              color: 'negative',
              icon: 'warning',
              html: that.strings.stepTwoPatchLibraryError,
              position: 'bottom-center',
              dismissible: true
            })
          })
      }
    }
  }
</script>

<style>
</style>
