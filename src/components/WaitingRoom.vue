<template>
  <div id="waiting-room" class="container mt-3">
    <h1>等候室</h1>
    <h2>
      <span class="badge badge-danger mr-1">接見中</span>
      <span class="badge badge-success">請到課室門外等候</span>
    </h2>
    <div v-for="c in floorClazzes" :key='c.id'>
      <hr v-if='c' class="m-3">
      <div class="d-flex flex-row" style="overflow-x: auto">
        <div class="badge badge-dark mr-1" style="font-size: x-large;">{{c.classcode | uppercase}}<br><small>{{c.location}}</small></div>

        <div v-for="(s, key, id) in filteredSchedules(c.classcode)"
          :key='id' class="px-1">
          <name-badge :schedule='s' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import NameBadge from './Common/NameBadge'
import _ from 'lodash'

export default {
  components: { NameBadge },
  created () {
    const option = {'leading': true, 'trailing': false}
    this.updateWaitingRoomSchedules = _.throttle(
      this.updateWaitingRoomSchedules, 2000, option
    )
  },
  watch: {
    // trigger update schedules when jwt is ready
    jwt () {
      const {clearAndPushIntervals, updateWaitingRoomSchedules} = this
      clearAndPushIntervals(updateWaitingRoomSchedules)
    }
  },
  computed: {
    ...mapState(['schedules', 'currentFloor', 'jwt', 'throttleOption']),
    ...mapGetters(['floorClazzes']),
    groupedSchedules () {
      return _.groupBy(this.schedules, 'classcode')
    },
  },
  methods: {
    ...mapMutations(['clearAndPushIntervals']),
    ...mapActions(['updateSchedules']),
    filteredSchedules (classcode) {
      return _(this.groupedSchedules[classcode])
        .orderBy(['isMeeting', 'isNotified', 'priority'], ['desc', 'desc'])
        .value()
    },
    updateWaitingRoomSchedules () {
      const {floorClazzes, updateSchedules} = this
      let classcodes = floorClazzes.map(s => s.classcode)
      updateSchedules({
        classcodes,
        filter: {
          'is_complete': '=0',
          'priority': '>0'
        }
      })
    }
  }
}
</script>
