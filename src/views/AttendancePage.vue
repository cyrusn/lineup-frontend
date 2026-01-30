<template>
  <div>
    <div class="container mt-3">
      <h1>{{ $route.params.classcode }}點名</h1>
      <instruction-view />
      <hr />
      <controller-view :classcode="classcode" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import InstructionView from '@/components/Common/InstructionView.vue'
import ControllerView from '@/components/StudentHelper/ControllerView.vue'
import _ from 'lodash'

export default {
  components: {
    ControllerView,
    InstructionView
  },
  created() {
    this.update()
  },
  computed: {
    ...mapState(['schedules', 'waitingRooms']),
    classcode() {
      return this.$route.params.classcode
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
<style lang="css">
.check::after {
  content: ' ✓';
}
</style>
