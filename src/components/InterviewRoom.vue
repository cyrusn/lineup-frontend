<template>
  <div>
    <div id="interview-room" class="container">
      <h1>接見室 <span class="badge badge-info">{{currentClazz}}</span></h1>
      <instruction />
      <p class="lead">
        建議：正當接見一位家長時，門外最多安排兩位家長等候。
      </p>
      <div>
        <hr>
        <div>
          <h2 v-show='ReadyList.length !== 0'>已安排接見</h2>
          <span>
            <student v-for="(p, key) in ReadyList" :key='key' :classcode='currentClazz' :schedule='p' />
          </span>
        </div>
        <hr v-show='WaitingList.length !== 0'>
        <div>
          <h2 v-show='WaitingList.length !== 0'>已到等候室</h2>
          <span>
            <student v-for="(p, key) in WaitingList" :key='key' :classcode='currentClazz' :schedule='p' />
          </span>
        </div>
      </div>
      <hr v-show='CompletedList.length !== 0'>
      <div>
        <h2 v-show='CompletedList.length !== 0'>完成接見</h2>
        <span>
          <student v-for="(p, key) in CompletedList" :key='key' :classcode='currentClazz' :schedule='p' />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import Student from './Student.vue'
import Instruction from './Instruction.vue'
import _ from 'lodash'

export default {
  mounted () {
    const {updateInterviewRoomSchedules, refreshTime} = this
    setInterval(updateInterviewRoomSchedules, refreshTime)
  },
  watch: {
    // trigger update schedules when jwtToken is ready
    jwtToken () {
      this.updateInterviewRoomSchedules()
    }
  },
  components: {
    Student, Instruction
  },
  computed: {
    ...mapState(['schedules', 'currentClazz', 'currentForm', 'refreshTime', 'jwtToken']),
    ...mapGetters(['floorClazzes']),
    ReadyList () {
      return _(this.schedules)
        .filter(p => !p.isComplete && p.priority > 0)
        .orderBy(['isMeeting', 'priority', 'arrivalAt'], ['desc', 'desc', 'asc'])
        .value()
    },
    WaitingList () {
      return _(this.schedules)
        .filter(p => !p.isComplete && p.priority <= 0)
        .orderBy(['priority'], ['desc'])
        .value()
    },
    CompletedList () {
      return _(this.schedules)
        .filter('isComplete')
        .orderBy(['arrivalAt'])
        .value()
    }
  },
  methods: {
    ...mapActions(['updateSchedules']),
    updateInterviewRoomSchedules: _.throttle(function () {
      const {updateSchedules, currentClazz} = this
      let classcodes = [currentClazz]
      updateSchedules({
        classcodes
      })
    }, 2000, {'leading': true, 'trailing': false})
  }
}
</script>
