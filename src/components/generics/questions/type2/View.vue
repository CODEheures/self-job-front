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
        <draggable-list  v-model="list"/>
      </q-field>
    </q-card-main>
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
      }
    },
    computed: {
      list: {
        get () {
          let list = []
          this.question.options.forEach((item) => {
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
