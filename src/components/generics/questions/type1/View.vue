<template>
  <q-card>
    <q-card-title class="bg-primary text-white">
      {{ strings.questionCardTitle }} {{ index + 1 }}
      <p slot="right" v-if="preview" class="text-white">{{ strings.questionCardtype.preview }}</p>
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
    props: {
      strings: Object,
      question: Object,
      index: Number,
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
    data () {
      return {
        option: []
      }
    }
  }
</script>

<style>
</style>
