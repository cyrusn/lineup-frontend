<template>
  <div>
    <div class="container mt-3">
      <h1>
        簽到
        <span class="badge badge-info">{{$route.params.classcode}}</span>
      </h1>
      <instruction/>
      <hr>
      <controller :classcode="classcode"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Instruction from '@/components/Common/Instruction.vue'
import Controller from '@/components/StudentHelper/Controller.vue'

export default {
  components: {
    Controller,
    Instruction
  },
  computed: {
    ...mapState(['schedules']),
    classcode () {
      return this.$route.params.classcode
    }
  }
}
</script>
<style lang="css">
.check::after {
  content: " ✓";
}
</style>
