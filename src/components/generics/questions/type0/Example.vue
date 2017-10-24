<template>
  <q-card>
    <q-card-title class="bg-tertiary text-white">
      {{ strings.title }}
    </q-card-title>
    <q-card-main>
      {{ strings.example }}
      <q-field
        :helper="strings.field_helper"
        :label="strings.field_label">
        <q-option-group
          type="radio"
          v-model="option"
          :options="[
                      { label: strings.choices_label1, value: 'op1' },
                      { label: strings.choices_label2, value: 'op2' },
                      { label: strings.choices_label3, value: 'op3' }
                    ]"
        />
      </q-field>
    </q-card-main>
    <q-card-actions>
      <q-btn flat @click="addQuestion">{{ strings.add }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
  export default {
    props: {
      strings: Object
    },
    data () {
      return {
        option: ''
      }
    },
    methods: {
      addQuestion () {
        this.$emit('addQuestion')
      }
    }
  }
</script>

<style>
</style>
