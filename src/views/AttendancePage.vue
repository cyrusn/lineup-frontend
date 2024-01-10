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
import { mapState } from 'vuex'
import InstructionView from '@/components/Common/InstructionView.vue'
import ControllerView from '@/components/StudentHelper/ControllerView.vue'

export default {
  components: {
    ControllerView,
    InstructionView
  },
  computed: {
    ...mapState(['schedules']),
    classcode() {
      return this.$route.params.classcode
    }
  }
}
</script>
<style lang="css">
.check::after {
  content: ' ✓';
}
</style>
