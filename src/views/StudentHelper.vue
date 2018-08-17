<template>
  <div>
    <div class="container mt-3">
      <h1>學生大使 <small>{{classcode}}</small></h1>
      <div class='form-group'>
        <instruction />
        <select v-model='classcode' class="form-control mt-2 w-25">
          <option value='' disabled="">選擇班別</option>
          <option v-for='c in floorClazzes' :key='c.id' :value='c.classcode'>
            {{c.classcode}}
          </option>
        </select>
      </div>
      <hr>
      <controller :classcode='classcode'/>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import Instruction from '@/components/Common/Instruction.vue'
import Controller from '@/components/StudentHelper/Controller.vue'
import _ from 'lodash'

export default {
  data () {
    return {
      classcode: ''
    }
  },
  created () {
    const option = {'leading': true, 'trailing': false}
    this.updateStudentHelperSchedules = _.throttle(
      this.updateStudentHelperSchedules, 2000, option
    )
  },
  components: {
    Controller, Instruction
  },
  watch: {
    // trigger update schedules when student helper selected classcode
    classcode () {
      const {clearAndPushIntervals, updateStudentHelperSchedules} = this
      clearAndPushIntervals(updateStudentHelperSchedules)
    }
  },
  computed: {
    ...mapState(['schedules']),
    ...mapGetters(['floorClazzes'])
  },
  methods: {
    ...mapMutations(['clearAndPushIntervals']),
    ...mapActions(['updateSchedules']),
    updateStudentHelperSchedules () {
      const {updateSchedules, classcode} = this
      updateSchedules({
        classcodes: [classcode]
      })
    }
  }
}
</script>
<style lang="css">
  .check::after {
    content: " ✓";
  }
</style>
