<template>
  <q-card>
    <q-card-title class="bg-primary text-white">
      {{ strings.questionCardTitle }} {{ index + 1 }}
      <p slot="right" v-if="preview" class="text-white">{{ strings.questionCardtype.preview }}</p>
      <q-select
        v-if="library=='private'"
        dark
        v-model="question.library_type"
        :float-label="strings.questionVisibilityLabel"
        radio
        :options="[
          {label: strings.questionTypePrivate, value:0},
          {label: strings.questionTypeCorporate, value:1},
          {label: strings.questionTypePublic, value:2}
        ]"
      />
    </q-card-title>
    <q-card-main>
      <q-field
        :helper="strings.field_helper"
        :label="question.form.label">
        <q-option-group
          type="checkbox"
          v-model="option"
          :options="question.form.options"
        />
      </q-field>
    </q-card-main>
    <q-card-actions v-if="library">
      <q-btn flat @click="$emit('addQuestion')">{{ strings.add }}</q-btn>
      <q-btn v-if="library=='private'" flat @click="$emit('removeOfLibrary')">{{ strings.remove }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
  export default {
    components: {
    },
    model: {
      prop: 'answer',
      event: 'change'
    },
    props: {
      strings: Object,
      question: Object,
      index: Number,
      answer: Array,
      preview: {
        type: Boolean,
        required: false,
        default: false
      },
      library: {
        type: String,
        required: false,
        default: undefined
      }
    },
    watch: {
      option () {
        this.$emit('change', this.option.length > 0 ? this.option : undefined)
      }
    },
    data () {
      return {
        option: []
      }
    }
  }
</script>

<style>
</style>
