<template>
  <div id="interview-room" class="container mt-3">
    <h1>{{ $route.params.classcode }}接見室</h1>
    <instruction-view />
    <p class="lead">建議：正當接見一位家長時，門外最多安排一位家長等候。</p>
    <student-list name="已安排接見名單" :list="ReadyList" />
    <student-list name="已到等候室名單" :list="WaitingList" />
    <student-list name="完成接見名單" :list="CompletedList" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import StudentList from '@/components/InterviewRoom/StudentList.vue'
import InstructionView from '@/components/Common/InstructionView.vue'
import _ from 'lodash'

export default {
  components: {
    StudentList,
    InstructionView
  },
  created() {
    this.update()
  },
  computed: {
    ...mapState(['schedules']),
    classcode() {
      return this.$route.params.classcode
    },
    ReadyList() {
      return _(this.schedules)
        .filter((p) => !p.isComplete && p.priority > 0)
        .orderBy(['isMeeting', 'priority', 'arrivedAt'], ['desc', 'desc', 'asc'])
        .value()
    },
    WaitingList() {
      return _(this.schedules)
        .filter((p) => !p.isComplete && p.priority <= 0)
        .orderBy(['arrivedAt'], ['asc'])
        .value()
    },
    CompletedList() {
      return _(this.schedules).filter('isComplete').orderBy(['arrivedAt']).value()
    }
  },
  methods: {
    ...mapMutations(['clearAndPushIntervals']),
    ...mapActions(['updateSchedules']),
    update() {
      const { clearAndPushIntervals, updateSchedules, classcode } = this
      const option = {
        classcodes: [classcode]
      }

      clearAndPushIntervals(
        _.throttle(
          () => {
            updateSchedules(option)
          },
          2000,
          { leading: true, trailing: false }
        )
      )
    }
  }
}
</script>
