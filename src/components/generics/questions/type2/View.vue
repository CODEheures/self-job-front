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
        <draggable-list  v-model="list"/>
      </q-field>
    </q-card-main>
    <q-card-actions v-if="library">
      <q-btn flat @click="$emit('addQuestion')">{{ strings.add }}</q-btn>
      <q-btn v-if="library=='private'" flat @click="$emit('removeOfLibrary')">{{ strings.remove }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
  import DraggableList from '../../../generics/DraggableList.vue'
  export default {
    components: {
      DraggableList
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
    computed: {
      list: {
        get () {
          let list = []
          this.question.form.options.forEach((item) => {
            list.push(item.label)
          })
          return list
        },
        set () {
          console.log('list bouge')
        }
      }
    }
  }
</script>

<style>
</style>
