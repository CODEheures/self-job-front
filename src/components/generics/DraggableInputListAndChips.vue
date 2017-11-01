<template>
  <ul :id="'selfJob'+_uid">
    <draggable v-model="dataList" :options="{draggable:'li.draggable', handle: '.q-icon.reorder'}" @update="updateList()">
      <li class="draggable" v-for="item,index in dataList" :key="'item_' + index + '_' + _uid">
        <q-field style="margin-top: 0; margin-bottom: 0; display: inline-block">
          <q-input v-model="dataList[index].label" type="text" @keyup="updateList()"
                   :after="[
               {icon: 'delete forever', error: false, handler () { removeOfList(index) } },
               {icon: 'reorder', error: false }
             ]"
          />
        </q-field>
        <draggable v-model="dataList[index].rank" :options="chipsDragOptions(dataList[index].rank.length)" style="display: inline-block" @add="updateList()">
          <div class="draggableChips">
            <q-chip  :icon="iconChips" v-if="dataList[index].rank.length > 0" color="primary" closable @close="clearRank(index)">{{ dataList[index].rank[0] }}{{postLabelChips}}</q-chip>
            <q-chip  :icon="iconChips" v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</q-chip>
          </div>
        </draggable>
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
   * v-model: Array of list. Structure is [{label: 'a', rank: [0]}, {label: 'b', rank: []}, ...]
   * Props
   *  - label: String for add input
   *  - groupChipsName: String. The name of available draggable Chips group
   *  - iconChips: String. The name of icon of chips if you want
   *  - postLabelChips: String. If you want a label after chips value
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
      },
      groupChipsName: String,
      iconChips: {
        type: String,
        required: false,
        default: ''
      },
      postLabelChips: String
    },
    watch: {
      list () {
        this.dataList = _.clone(this.list)
        this.$nextTick(function () {
          this.addDragSelector()
        })
      }
    },
    data () {
      return {
        dataList: _.cloneDeep(this.list),
        tempo: ''
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.addDragSelector()
      })
    },
    methods: {
      chipsDragOptions (rankLenght) {
        if (rankLenght === 0) {
          return {draggable: '.draggableChips', group: {name: this.groupChipsName, put: true, pull: false}}
        }
        else {
          return {draggable: '.draggableChips', group: {name: this.groupChipsName, put: false, pull: true}}
        }
      },
      clearRank (index) {
        let newList = _.cloneDeep(this.dataList)
        newList[index].rank = []
        this.emitChange(newList)
      },
      addToList () {
        if (this.tempo.length > 0) {
          let newList = this.dataList.concat([{label: this.tempo, rank: []}])
          this.emitChange(newList)
          this.tempo = ''
        }
      },
      removeOfList (index) {
        let newList = _.cloneDeep(this.dataList)
        newList.splice(index, 1)
        this.emitChange(newList)
      },
      addDragSelector () {
        document.querySelectorAll('#selfJob' + this._uid + ' li.draggable .q-icon:last-of-type').forEach(function (elem) {
          elem.classList.add('reorder')
        })
      },
      updateList () {
        let newList = _.cloneDeep(this.dataList)
        this.emitChange(newList)
      },
      emitChange (newList) {
        this.$emit('change', newList)
      }
    }
  }
</script>

<style>
  li.draggable div.sortable-chosen ~ div.draggableChips .q-chip {
    display: none;
  }
  .q-icon.reorder {
    cursor: move;
  }
</style>
