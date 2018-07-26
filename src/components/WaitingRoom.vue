<template>
  <div id="waiting-room" class="container">
    <h1>等候室</h1>
    <code>
      {{schedules}}
    </code>
    <h2>
      <span class="badge badge-danger mr-1">接見中</span>
      <span class="badge badge-success">請到課室門外等候</span>
    </h2>
    <div v-for="clazz in floorClazzes" :key='clazz.id'>
      <hr v-show='clazz' class="m-3">
      <div class="d-flex flex-row" style="overflow-x: scroll">
        <div class="badge badge-dark mr-4" style="font-size: x-large;">{{clazz.classcode | uppercase}}<br><small>{{clazz.location}}</small></div>
        <div v-for="(s, key, id) in filteredClazzSchedules(clazz.classcode)"
          :key='id' class="px-1">
          <student :classcode='clazz.classcode' :schedule='s' :disable='true'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import Student from './Student.vue'
import _ from 'lodash'

export default {
  mounted () {
    setInterval(this.updateWaitingRoomSchedules, this.refreshTime)
  },
  components: { Student },
  watch: {
    // trigger update schedules when jwtToken is ready
    jwtToken () {
      this.updateWaitingRoomSchedules()
    }
  },
  computed: {
    ...mapState(['schedules', 'currentFloor', 'jwtToken', 'refreshTime']),
    ...mapGetters(['floorClazzes']),
    clazzSchedules () {
      return _.groupBy(this.schedules, 'classcode')
    }
  },
  methods: {
    ...mapActions(['updateSchedules']),
    filteredClazzSchedules (classcode) {
      return _(this.clazzSchedules[classcode])
        .filter(p => {
          return !p.isComplete && p.priority > 0
        })
        .orderBy(['isMeeting', 'priority'], ['desc', 'desc'])
        .value()
    },
    updateWaitingRoomSchedules: _.throttle(function () {
      const {floorClazzes, updateSchedules} = this
      let classcodes = floorClazzes.map(s => s.classcode)
      updateSchedules({
        classcodes,
        filter: {
          'is_complete': '=0',
          'priority': '>0'
        }
      })
    }, 1000, {'leading': true, 'trailing': false})
  }
}
</script>
