<template>
  <ul>
    <draggable v-model="dataList" :options="{draggable:'li.draggable', handle: '.q-icon.reorder'}">
      <li class="draggable" v-for="item,index in dataList" :key="'item_' + index + '_' + _uid">
        <q-field style="margin-top: 0; margin-bottom: 0; display: inline-block">
          <q-input v-model="dataList[index]" type="text"
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
      }
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

        this.$emit('update', this.dataList)
      })
      this.$watch('list', function () {
        this.dataList = this.list
      })
      this.dataList = this.list
    },
    methods: {
      addToList () {
        if (this.tempo.length > 0) {
          this.dataList.push(this.tempo)
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

</style>
