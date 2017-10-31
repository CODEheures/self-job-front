<template>
  <q-card>
    <q-card-title class="bg-secondary text-white">
      {{ strings.questionCardTitle }} {{ index + 1 }}
      <q-icon v-if="dataQuestion.isValid" name="thumb up" color="white" size="20px"></q-icon>
      <q-icon v-if="!dataQuestion.isValid" name="thumb down" color="warning" size="20px"></q-icon>
      <p slot="right" class="text-white">{{ strings.questionCardtype.constructor }}</p>
    </q-card-title>
    <q-card-main>
      <q-field>
        <q-input v-model="dataQuestion.label" type="text" :float-label="strings.label_helper" clearable @change="emitChange" />
      </q-field>
      <draggable-input-list v-model="list" />
      <p>{{ strings.label_helper2 }}</p>
      <draggable-list v-model="rankingList" />
    </q-card-main>
    <q-card-actions>
      <q-btn flat @click="removeQuestion">{{ strings.remove }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
  /**
   * Props
   *  - strings: array of strings for i18n
   *  - question: Object, structure
   *    {label: 'abcd',
   *      options: [
   *        {label: 'aaa', value: 0, rank: [0]},
   *        ... ]
   *      isValid: false
   *    }
   *  - index: integer for question number
   *
   * Events:
   *  - @updateLabel : send new label 'abcd'
   *  - @updateOptions: send new options [{label: 'aaa', value: 0, rank: [0]}, ...]
   *  - @updateValidation: send boolean validation
   */
  import DraggableInputList from '../../../generics/DraggableInputList.vue'
  import DraggableList from '../../../generics/DraggableList.vue'
  import _ from 'lodash'

  export default {
    components: {
      DraggableList,
      DraggableInputList
    },
    model: {
      prop: 'question',
      event: 'change'
    },
    props: {
      strings: Object,
      question: Object,
      index: Number
    },
    data () {
      return {
        label: '',
        list: [],
        rankingList: [],
        dataQuestion: {}
      }
    },
    mounted () {
      this.dataQuestion = _.cloneDeep(this.question)
      this.list = this.getList(this.dataQuestion.options)
      this.rankingList = this.getRankingList(this.dataQuestion.options)
      this.$watch('list', function () {
        this.updateOptions()
        this.rankingList = this.getRankingList(this.dataQuestion.options)
        this.emitChange()
      })
      this.$watch('rankingList', function () {
        this.updateOptions()
        this.emitChange()
      })
    },
    methods: {
      getList (options) {
        let list = []
        options.forEach((item) => {
          list.push(item.label)
        })
        return list
      },
      getRankingList (options) {
        let list = []
        options
          .sort((item1, item2) => {
            return item1.rank - item2.rank
          })
          .forEach((item) => {
            list.push(item.label)
          })
        return list
      },
      getRanking (item, index) {
        let rank = this.rankingList.indexOf(item)
        if (rank !== -1) {
          return [rank]
        }
        else {
          return [index]
        }
      },
      updateOptions () {
        let newOptions = []
        this.list.forEach((item, index) => {
          newOptions.push({label: item, value: index, rank: this.getRanking(item, index)})
        })
        this.dataQuestion.options = newOptions
      },
      testIfValid () {
        let isValid = true
        if (this.dataQuestion.label.length === 0) {
          isValid = false
        }
        if (this.dataQuestion.options.length < 2) {
          isValid = false
        }
        this.dataQuestion.isValid = isValid
        return isValid
      },
      removeQuestion () {
        this.$emit('removeQuestion', this.index)
      },
      emitChange () {
        let newQuestion = _.cloneDeep(this.dataQuestion)
        newQuestion.isValid = this.testIfValid()
        this.$emit('change', newQuestion)
      }
    }
  }
</script>

<style>
</style>
