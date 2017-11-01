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
      <draggable-input-list-and-chips
        :label="''"
        v-model="dataQuestion.options"
        :groupChipsName="'rankingChips'+index"
        iconChips="stars"
        :postLabelChips="strings.label_rank_chips"
      ></draggable-input-list-and-chips>
      <p>{{ strings.label_helper2 }}</p>
      <draggable-chips
        :groupChipsName="'rankingChips'+index"
        iconChips="stars"
        :postLabel="strings.label_rank_chips"
        :list="ranks"
      ></draggable-chips>
    </q-card-main>
    <q-card-actions>
      <q-btn flat @click="removeQuestion">{{ strings.remove }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
  /**
   * v-model: question
   * Props
   *  - strings: array of strings for i18n
   *  - index: integer for question number
   *
   * Events:
   *  - @removeQuestion
   */
  import DraggableChips from '../../../generics/DraggableChips.vue'
  import DraggableInputListAndChips from '../../../generics/DraggableInputListAndChips.vue'
  import _ from 'lodash'

  export default {
    components: {
      DraggableChips,
      DraggableInputListAndChips
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
        ranks: [],
        dataQuestion: _.cloneDeep(this.question)
      }
    },
    watch: {
      'dataQuestion.options' () {
        this.ranksUpdate()
        this.emitChange()
      }
    },
    mounted () {
      this.ranksUpdate()
    },
    methods: {
      ranksUpdate () {
        let completeList = [...this.dataQuestion.options.keys()]
        this.dataQuestion.options.forEach((item) => {
          if (item.rank.length > 0) {
            if (item.rank[0] >= this.dataQuestion.options.length) {
              item.rank = []
            }
            else {
              completeList.splice(completeList.indexOf(item.rank[0]), 1)
            }
          }
        })
        this.ranks = completeList
        this.testIfValid()
      },
      testIfValid () {
        let isValid = true
        if (this.dataQuestion.label.length === 0) {
          isValid = false
        }
        if (this.dataQuestion.options.length < 2) {
          isValid = false
        }
        this.dataQuestion.options.forEach((item) => {
          if (item.rank.length === 0) {
            isValid = false
          }
        })
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
