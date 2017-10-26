<template>
  <ul>
    <draggable v-model="dataList" :options="{draggable:'li.draggable', handle: '.q-icon.reorder'}">
      <li class="draggable" v-for="item,index in dataList" :key="'item_' + index + '_' + _uid">
        <q-field style="margin-top: 0; margin-bottom: 0; display: inline-block">
          <q-input v-model="dataList[index].name" type="text"
                   :after="[
               {icon: 'delete forever', error: false, handler () { removeOfList(index) } },
               {icon: 'reorder', error: false }
             ]"
          />
        </q-field>
        <draggable v-model="dataList[index].rank" :options="chipsDragOptions(dataList[index].rank.length)" style="display: inline-block">
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
  import draggable from 'vuedraggable'

  export default {
    components: {
      draggable
    },
    props: {
      label: String,
      list: {
        type: Array,
        default: []
      },
      groupChipsName: String,
      iconChips: {
        type: String,
        required: false,
        default: ''
      },
      postLabelChips: String
    },
    data () {
      return {
        strings: {},
        dataList: [],
        tempo: ''
      }
    },
    mounted () {
      this.$watch('dataList', function () {
        document.querySelectorAll('li.draggable .q-icon:last-of-type').forEach(function (elem) {
          elem.classList.add('reorder')
        })
        this.$emit('updateList', this.dataList)
      })
      this.$watch('list', function () {
        this.dataList = this.list
      })
      this.dataList = this.list
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
        this.dataList[index].rank = []
        this.$emit('updateRank')
      },
      addToList () {
        if (this.tempo.length > 0) {
          this.dataList.push({name: this.tempo, rank: []})
          this.tempo = ''
        }
      },
      removeOfList (index) {
        this.dataList.splice(index, 1)
      }
    }
  }
</script>

<style>
  li.draggable div.sortable-chosen ~ div.draggableChips .q-chip {
    display: none;
  }
</style>
