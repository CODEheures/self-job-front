<template>
  <draggable style="display: flex; flex-flow: row wrap; justify-content: flex-start" v-model="dataList" :options="chipsDragOptions()">
    <div style="display: flex; margin-right: 10px" class="draggableChips" v-for="item,index in dataList" :key="'item_' + index + '_' + _uid">
      <q-chip  :icon="iconChips" color="primary">{{ item }}{{ postLabel }}</q-chip>
    </div>
  </draggable>

</template>

<script>
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
      }
    },
    data () {
      return {
        dataList: []
      }
    },
    mounted () {
      this.$watch('list', function () {
        this.dataList = this.list
      })
      this.dataList = this.list
    },
    methods: {
      chipsDragOptions () {
        return {draggable: '.draggableChips', sort: true, group: {name: this.groupChipsName, pull: true, put: false}}
      }
    }
  }
</script>

<style>

</style>
