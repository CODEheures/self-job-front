<template>
  <q-card>
    <q-card-title class="bg-primary text-white">
      {{ strings.questionCardTitle }} {{ index + 1 }}
      <p slot="right" v-if="preview" class="text-white">{{ strings.questionCardtype.preview }}</p>
    </q-card-title>
    <q-card-main>
      <q-field
        :helper="strings.field_helper"
        :label="question.label">
        <q-option-group
          type="checkbox"
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
      index: Number,
      preview: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data () {
      return {
        option: []
      }
    },
    computed: {
      options: {
        get () {
          let options = []
          this.question.options.forEach((elem) => {
            options.push({label: elem.label, value: elem.value})
          })
          return options
        }
      }
    }
  }
</script>

<style>
</style>
