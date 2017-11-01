<template>
  <ul :id="'selfJob'+_uid">
    <draggable v-model="dataList" :options="{draggable:'li.draggable', handle: '.q-icon.reorder'}" @update="updateList()">
      <li class="draggable" v-for="item,index in dataList" :key="'item_' + index + '_' + _uid">
        <q-field style="margin-top: 0; margin-bottom: 0; display: inline-block">
          <q-input v-model="dataList[index]" type="text" @keyup="updateList()"
                   :after="[
               {icon: 'delete forever', error: false, handler () { removeOfList(index) } },
               {icon: 'reorder', error: false }
             ]"
          />
        </q-field>
      </li>
      <li slot="footer">
        <q-field style="display: inline-block">
          <q-input v-model="tempo" type="text" :float-label="label"
                   :after="[{icon: 'add box', error: false, handler () { addToList() } }]"
                   @keyup.enter="addToList"
          />
        </q-field>
      </li>
    </draggable>
  </ul>
</template>

<script>
  /**
   * v-model: array. Structure is ['a', 'b', ...]
   * Props
   *  - label: String for add input
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
      label: String,
      list: {
        type: Array
      }
    },
    data () {
      return {
        tempo: '',
        dataList: _.clone(this.list)
      }
    },
    watch: {
      list () {
        this.dataList = _.clone(this.list)
        this.$nextTick(function () {
          this.addDragSelector()
        })
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.addDragSelector()
      })
    },
    methods: {
      addToList () {
        if (this.tempo.length > 0) {
          let newList = this.dataList.concat([this.tempo])
          this.emitChange(newList)
          this.tempo = ''
        }
      },
      removeOfList (index) {
        let newList = _.clone(this.dataList)
        newList.splice(index, 1)
        this.emitChange(newList)
      },
      addDragSelector () {
        document.querySelectorAll('#selfJob' + this._uid + ' li.draggable .q-icon:last-of-type').forEach(function (elem) {
          elem.classList.add('reorder')
        })
      },
      updateList () {
        let newList = _.clone(this.dataList)
        this.emitChange(newList)
      },
      emitChange (newList) {
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
