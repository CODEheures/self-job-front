<template>
  <q-list>
    <draggable v-model="dataList" :options="{draggable:'.q-item.draggable', handle: '.q-icon.reorder'}" @update="updateList()">
      <q-item class="draggable" v-for="item,index in dataList" :key="'item_' + index + '_' + _uid">
        <q-item-main>
          <q-item-tile label>{{ item }}</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-icon name="reorder" size="24px" class="reorder"/>
        </q-item-side>
      </q-item>
    </draggable>
  </q-list>
</template>

<script>
  /**
   * v-model: array. Structure is ['a', 'b', ...]
   * Props
   *
   * Events:
   *
   */
  import draggable from 'vuedraggable'
  import _ from 'lodash'

  export default {
    components: {
      draggable
    },
    model: {
      prop: 'list',
      event: 'change'
    },
    props: {
      list: {
        type: Array
      }
    },
    data () {
      return {
        strings: {},
        dataList: _.clone(this.list),
        tempo: ''
      }
    },
    mounted () {
      let that = this
      this.$watch('list', function () {
        that.dataList = _.clone(that.list)
      })
    },
    methods: {
      updateList () {
        let newList = _.clone(this.dataList)
        this.$emit('change', newList)
      }
    }
  }
</script>

<style>
 .q-icon.reorder {
   cursor: move;
 }
</style>
