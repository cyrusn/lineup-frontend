<template>
  <div style="font-size: x-large" class="btn-toolbar mb-2">
    <div class="btn-group mr-1">
      <button type="button" class="btn" style="font-family: monospace;">
        {{new Date(schedule.arrivedAt)
        .toLocaleTimeString('en-US', {
        hour12: false
        })}}
      </button>
    </div>
    <div class="btn-group mr-1">
      <button v-if="!isComplete" class="btn btn-outline-success" @click="onAddPriority">+1</button>
      <button v-if="!isComplete" class="btn btn-outline-secondary" @click="onMinusPriority">-1</button>
      <button class="btn btn-outline-primary" @click="onToggleIsComplete">完成</button>
      <button v-if="!isComplete" class="btn btn-outline-danger" @click="onToggleIsMeeting">接見中</button>
    </div>
    <div class="btn-group">
      <name-badge :schedule="schedule"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import NameBadge from '@/components/Common/NameBadge'
import _ from 'lodash'

export default {
  components: {
    NameBadge
  },
  props: ['schedule'],
  created () {
    const option = { leading: true, trailing: false }
    const vm = this
    const fnNames = [
      'onMinusPriority',
      'onAddPriority',
      'onMinusPriority',
      'onToggleIsComplete',
      'onToggleIsMeeting'
    ]

    fnNames.map(fnName => _.throttle(vm[fnName], 1000, option))
  },
  computed: {
    ...mapState(['currentRoute']),
    isComplete () {
      return this.schedule.isComplete
    }
  },
  methods: {
    ...mapMutations([
      'fakeAddPriority',
      'fakeMinusPriority',
      'fakeIsComplete',
      'fakeIsMeeting'
    ]),
    ...mapActions(['updatePriority', 'toggleIsComplete', 'toggleIsMeeting']),
    onAddPriority () {
      const { schedule, fakeAddPriority } = this

      let { classcode, classno, priority, isComplete, isMeeting } = schedule
      priority = priority + 1

      if (!isComplete && !isMeeting) {
        fakeAddPriority(schedule)
        this.updatePriority({
          classcode,
          classno,
          priority
        })
      }
    },
    onMinusPriority () {
      const { schedule, fakeMinusPriority } = this
      let { classcode, classno, priority, isComplete, isMeeting } = schedule
      if (priority > 0 && !isComplete && !isMeeting) {
        fakeMinusPriority(schedule)
        priority = priority - 1
        this.updatePriority({
          classcode,
          classno,
          priority
        })
      }
    },
    onToggleIsComplete () {
      const { schedule, fakeIsComplete } = this
      const { classcode, classno, priority } = schedule
      if (priority !== 0) {
        fakeIsComplete(schedule)
        this.toggleIsComplete({
          classcode,
          classno
        })
      }
    },
    onToggleIsMeeting () {
      const { schedule, fakeIsMeeting } = this
      const { classcode, classno, priority } = schedule
      if (priority !== 0) {
        fakeIsMeeting(schedule)
        this.toggleIsMeeting({
          classcode,
          classno
        })
      }
    }
  }
}
</script>
