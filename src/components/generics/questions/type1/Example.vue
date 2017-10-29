<template>
  <q-card>
    <q-card-title class="bg-tertiary text-white">
      {{ strings.title }}
    </q-card-title>
    <q-card-main>
      <q-collapsible icon="live help" :label="strings.example">
        <q-field
          :helper="strings.field_helper"
          :label="strings.field_label">
          <q-option-group
            type="checkbox"
            v-model="option"
            :options="[
                      { label: strings.choices_label1, value: 1 },
                      { label: strings.choices_label2, value: 2 },
                      { label: strings.choices_label3, value: 3 }
                    ]"
          />
        </q-field>
      </q-collapsible>
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
        option: []
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
