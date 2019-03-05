<template>
  <div id="interview-room" class="container mt-3">
    <h1>
      接見室
      <span class="badge badge-info">{{$route.params.classcode}}</span>
    </h1>
    <instruction/>
    <p class="lead">建議：正當接見一位家長時，門外最多安排兩位家長等候。</p>
    <list name="已安排接見名單" :list="ReadyList"/>
    <list name="已到等候室名單" :list="WaitingList"/>
    <list name="完成接見名單" :list="CompletedList"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import List from '@/components/InterviewRoom/List.vue'
import Instruction from '@/components/Common/Instruction.vue'
import _ from 'lodash'

export default {
  components: {
    List,
    Instruction
  },
  computed: {
    ...mapState(['schedules']),
    ReadyList () {
      return _(this.schedules)
        .filter(p => !p.isComplete && p.priority > 0)
        .orderBy(
          ['isMeeting', 'priority', 'arrivedAt'],
          ['desc', 'desc', 'asc']
        )
        .value()
    },
    WaitingList () {
      return _(this.schedules)
        .filter(p => !p.isComplete && p.priority <= 0)
        .orderBy(['arrivedAt'], ['asc'])
        .value()
    },
    CompletedList () {
      return _(this.schedules)
        .filter('isComplete')
        .orderBy(['arrivedAt'])
        .value()
    }
  }
}
</script>
