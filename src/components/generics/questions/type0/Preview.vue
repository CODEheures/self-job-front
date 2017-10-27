<template>
  <q-card>
    <q-card-title class="bg-primary text-white">
      {{ strings.questionCardTitle }} {{ index + 1 }}
      <p slot="right" v-if="underConstruction" class="text-white">{{ strings.questionCardtype.preview }}</p>
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
      flagUpdate: {
        type: Boolean,
        required: false,
        default: false
      },
      index: Number,
      underConstruction: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data () {
      return {
        option: '',
        options: []
      }
    },
    mounted () {
      let that = this
      this.$watch('flagUpdate', function () {
        that.makeOptions()
      })
      that.makeOptions()
    },
    methods: {
      makeOptions (options) {
        let that = this
        this.options = []
        this.question.options.forEach(function (elem, index) {
          that.options.push({label: elem.name, value: index})
        })
      }
    }
  }
</script>

<style>
</style>
