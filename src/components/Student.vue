<template>
  <div style="font-size: x-large">
    <span v-show="!disable" class="badge badge-outline-light">{{new Date(schedule.arrivedAt).toLocaleTimeString('en-US', {
      hour12: false
    })}}</span>
    <button v-show="!disable" class='badge btn-outline-success' @click='onAddPriority'>+1</button>
    <button v-show="!disable" class='badge btn-outline-secondary' @click='onMinusPriority'>-1</button>
    <button v-show="!disable" class='badge btn-outline-primary' @click='onToggleIsComplete'>完成</button>
    <button v-show="!disable" class='badge btn-outline-danger' @click='onToggleIsMeeting'>接見中</button>
    <button v-show="!disable && currentRoute !== '/interview-room'" class='badge btn-outline-secondary' @click='onToggleIsNotified'>✓</button>
    <name-badge :classcode='classcode' :schedule='schedule' style="font-size: 1.2em;" class="my-2"/>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import NameBadge from './NameBadge'
import _ from 'lodash'

export default {
  components: {
    NameBadge
  },
  props: ['classcode', 'schedule', 'disable'],
  computed: {
    ...mapState(['currentRoute'])
  },
  methods: {
    ...mapActions(['updatePriority', 'toggleIsComplete', 'toggleIsNotified', 'toggleIsMeeting']),
    onAddPriority: _.throttle(function () {
      const {classcode, schedule, disable} = this
      let {classno, priority} = schedule
      priority = priority + 1

      if (!disable && !schedule.isComplete && !schedule.isMeeting) {
        this.updatePriority({
          classcode, classno, priority
        })
      }
    }, 500, {'leading': true, 'trailing': false}),
    onMinusPriority: _.throttle(function () {
      const {classcode, schedule, disable} = this
      let {classno, priority} = schedule
      if (schedule.priority > 0 && !disable && !schedule.isComplete && !schedule.isMeeting) {
        priority = priority - 1
        this.updatePriority({
          classcode, classno, priority
        })
      }
    }, 500, {'leading': true, 'trailing': false}),
    onToggleIsComplete: _.debounce(function () {
      const {classcode, schedule, disable} = this
      const {classno} = schedule
      if (!disable && schedule.priority !== 0) {
        this.toggleIsComplete({
          classcode, classno
        })
      }
    }, 500, {'leading': true, 'trailing': false}),
    onToggleIsNotified: _.throttle(function () {
      const {classcode, schedule, disable} = this
      const {classno} = schedule
      if (!disable && schedule.priority !== 0) {
        this.toggleIsNotified({
          classcode, classno
        })
      }
    }, 500, {'leading': true, 'trailing': false}),
    onToggleIsMeeting: _.throttle(function () {
      const {classcode, schedule, disable} = this
      const {classno} = schedule
      if (!disable && schedule.priority !== 0) {
        this.toggleIsMeeting({
          classcode, classno
        })
      }
    }, 500, {'leading': true, 'trailing': false})
  }
}
</script>
