<template>
  <ul>
    <li v-for="item,index in dataList">
      <q-field style="margin-top: 0; margin-bottom: 0; display: inline-block">
        <q-input v-model="dataList[index]" type="text"
           :after="[
             {icon: 'low priority', error: false, handler () { moveToEnd(index) } },
             {icon: 'remove circle', error: false, handler () { removeOfList(index) } }
           ]"
        />
      </q-field>
    </li>
    <li>
      <q-field style="display: inline-block">
        <q-input v-model="tempo" type="text" :float-label="label"
                 :after="[{icon: 'add box', error: false, handler () { addToList() } }]"
                 @keyup.enter="addToList"
        />
      </q-field>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      name: String,
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
      this.dataList = this.list
      this.$watch('dataList', function () {
        this.$emit('update', this.dataList)
      })
      this.$watch('list', function () {
        this.dataList = this.list
      })
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
      },
      moveToEnd (index) {
        let list = []
        this.dataList.forEach(function (elem, _index) {
          if (_index !== index) {
            list.push(elem)
          }
        })
        list.push(this.dataList[index])
        this.dataList = list
      }
    }
  }
</script>

<style>
</style>
