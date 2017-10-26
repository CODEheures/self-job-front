<template>
  <q-card>
    <q-card-title class="bg-primary text-white">
      {{ strings.questionCardTitle }} {{ index + 1 }}
      <p slot="right" class="text-white">{{ strings.questionCardtype.preview }}</p>
    </q-card-title>
    <q-card-main>
      <q-field
        :helper="strings.field_helper"
        :label="question.label">
        <q-option-group
          type="radio"
          v-model="option"
          :options="options"
        />
      </q-field>
    </q-card-main>
  </q-card>
</template>

<script>
  export default {
    components: {
    },
    props: {
      strings: Object,
      question: Object,
      index: Number
    },
    data () {
      return {
        option: '',
        options: []
      }
    },
    mounted () {
      let that = this
      this.$watch('question.options', function (options) {
        that.makeOptions(options)
      })
      that.makeOptions(this.question.options)
    },
    methods: {
      makeOptions (options) {
        let that = this
        this.options = []
        options.forEach(function (elem, index) {
          that.options.push({label: elem.name, value: index})
        })
      }
    }
  }
</script>

<style>
</style>
