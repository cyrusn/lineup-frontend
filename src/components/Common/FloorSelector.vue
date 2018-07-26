<template>
  <form class="form-group">
    <select class="form-control" v-model='floor' @change='updateFloor(floor)'>
      <option value='' disabled>選擇樓層</option>
      <option v-for='f in floors' :key='f.id' :value='f'>{{f}}</option>
    </select>
  </form>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
const floors = ['1/F', '2/F', '3/F', '4/F']

export default {
  data () {
    return {
      floors,
      floor: ''
    }
  },
  computed: {
    ...mapState(['currentFloor']),
    ...mapGetters(['floorClazzes'])
  },
  methods: {
    ...mapMutations(['updateFloor'])
  }
}
</script>
