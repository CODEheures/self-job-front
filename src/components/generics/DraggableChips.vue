<template>
  <draggable style="display: flex; flex-flow: row wrap; justify-content: flex-start" v-model="dataList" :options="chipsDragOptions()">
    <div style="display: flex; margin-right: 10px" class="draggableChips" v-for="item,index in dataList" :key="'item_' + index + '_' + _uid">
      <q-chip  :icon="iconChips" color="primary">{{ item }}{{ postLabel }}</q-chip>
    </div>
  </draggable>

</template>

<script>
  /**
   * Props
   *  - groupChipsName: String. The name of available draggable Chips group
   *  - iconChips: String. The name of icon of chips if you want
   *  - postLabel: String. If you want a label after chips value
   *  - list: Array of chips values. [1,2,3,...]
   *  - clone: Boolean. If you want a clone after drag
   *
   * Events:
   *
   */
  import draggable from 'vuedraggable'

  export default {
    components: {
      draggable
    },
    props: {
      groupChipsName: String,
      iconChips: {
        type: String,
        required: false,
        default: ''
      },
      postLabel: {
        type: String,
        required: false,
        default: ''
      },
      list: {
        type: Array
      },
      clone: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    watch: {
      list () {
        this.dataList = this.list
      }
    },
    data () {
      return {
        dataList: this.list
      }
    },
    methods: {
      chipsDragOptions () {
        if (this.clone) {
          return {draggable: '.draggableChips', sort: true, group: {name: this.groupChipsName, pull: 'clone', put: false}}
        }
        else {
          return {draggable: '.draggableChips', sort: true, group: {name: this.groupChipsName, pull: true, put: false}}
        }
      }
    }
  }
</script>

<style>

</style>
