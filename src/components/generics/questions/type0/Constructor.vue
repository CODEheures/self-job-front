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
      <dynamic-list
        @update="updateOptions"
        :label="''"
        :list="options"
      ></dynamic-list>
    </q-card-main>
    <q-card-actions>
      <q-btn flat @click="removeQuestion">{{ strings.remove }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
  import DynamicList from '../../../generics/DynamicList.vue'

  export default {
    components: {
      DynamicList
    },
    props: {
      strings: Object,
      question: Object,
      index: Number
    },
    data () {
      return {
        label: '',
        options: []
      }
    },
    mounted () {
      let that = this
      this.label = this.question.label
      this.options = this.question.options
      this.$watch('question.label', function () {
        that.label = that.question.label
      })
      this.$watch('question.options', function () {
        that.options = that.question.options
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
      }
    }
  }
</script>

<style>
</style>
