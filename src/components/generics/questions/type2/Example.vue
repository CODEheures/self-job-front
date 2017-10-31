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
          <draggable-list
            :list="[
                      strings.choices_label1,
                      strings.choices_label2,
                      strings.choices_label3,
                      strings.choices_label4,
                      strings.choices_label5,
                      strings.choices_label6,
                      strings.choices_label7,
                      strings.choices_label8
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
  import DraggableList from '../../DraggableList.vue'
  export default {
    components: {
      DraggableList
    },
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
