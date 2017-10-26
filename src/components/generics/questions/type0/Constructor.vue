<template>
  <q-card>
    <q-card-title class="bg-secondary text-white">
      {{ strings.questionCardTitle }} {{ index + 1 }}
      <p slot="right" class="text-white">{{ strings.questionCardtype.constructor }}</p>
    </q-card-title>
    <q-card-main>
      <q-field>
        <q-input v-model="label" type="text" :float-label="strings.label_helper" clearable @change="updateLabel" />
      </q-field>
      <draggable-list-and-chips
        @updateList="updateOptions"
        @updateRank="ranksUpdate"
        :label="''"
        :list="options"
        groupChipsName="rankingChips"
        iconChips="stars"
        :postLabelChips="strings.label_rank_chips"
      ></draggable-list-and-chips>
      <p>Attribution des points</p>
      <draggable-chips
        groupChipsName="rankingChips"
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
  import DraggableChips from '../../../generics/DraggableChips.vue'
  import DraggableListAndChips from '../../../generics/DraggableListAndChips.vue'

  export default {
    components: {
      DraggableChips,
      DraggableListAndChips
    },
    props: {
      strings: Object,
      question: Object,
      index: Number
    },
    data () {
      return {
        label: '',
        options: [],
        ranks: []
      }
    },
    mounted () {
      let that = this
      this.label = this.question.label
      this.options = this.question.options
      this.ranksUpdate()
      this.$watch('question.label', function () {
        that.label = that.question.label
      })
      this.$watch('question.options', function () {
        that.options = that.question.options
        that.ranksUpdate()
      })
    },
    methods: {
      updateLabel () {
        this.$emit('updateLabel', this.label)
      },
      updateOptions (options) {
        this.$emit('updateOptions', options)
      },
      removeQuestion () {
        this.$emit('removeQuestion')
      },
      ranksUpdate () {
        let completeList = [...this.options.keys()]
        this.options.forEach((item) => {
          if (item.rank.length > 0) {
            if (item.rank[0] >= this.options.length) {
              item.rank = []
            }
            else {
              completeList.splice(completeList.indexOf(item.rank[0]), 1)
            }
          }
        })
        this.ranks = completeList
      }
    }
  }
</script>

<style>
</style>
