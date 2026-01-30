<template>
  <div id="waiting-room" class="container mt-3">
    <h2>
      <span class="badge text-bg-danger me-2">
        <font-awesome-icon icon="comment-dots" class="me-2" />接見中
      </span>
      <span class="badge text-bg-success me-2">
        <font-awesome-icon icon="bell" class="me-2" />請到課室門外等候
      </span>
      <span class="badge text-bg-warning">已到等候室 </span>
    </h2>

    <div v-for="c in classcodes" :key="c.id">
      <hr v-if="c" class="m-3" />
      <div class="d-flex flex-row" style="overflow-x: auto">
        <div class="badge text-bg-dark me-1" style="font-size: x-large">
          {{ c.classcode }}
          <br />
          <small>{{ c.location }}</small>
        </div>

        <div v-for="(s, _, id) in filteredSchedules(c.classcode)" :key="id" class="px-1">
          <name-badge :customClass="['btn-lg']" :schedule="s" />
        </div>
      </div>
    </div>

    <hr class="m-3" />
    <div>
      <span v-for="(s, _, id) in arrivedOnlySchedules()" :key="id" class="px-1">
        <name-badge type="badge" :schedule="s" />
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import NameBadge from '@/components/Common/NameBadge.vue'
import _ from 'lodash'

export default {
  components: { NameBadge },
  created() {
    this.update()
  },
  computed: {
    ...mapState(['schedules', 'waitingRooms']),
    room() {
      return this.$route.params.room
    },
    groupedSchedules() {
      return _(this.schedules)
        .filter((s) => s.priority > 0)
        .groupBy('classcode')
        .value()
    },
    classcodes() {
      const { waitingRooms, room } = this
      const found = waitingRooms.find(({ id }) => id == room)
      return found ? found.classcodes : []
    }
  },
  methods: {
    ...mapMutations(['clearAndPushIntervals']),
    ...mapActions(['updateSchedules']),
    update() {
      const { clearAndPushIntervals, updateSchedules, classcodes } = this
      const option = {
        classcodes: classcodes.map((s) => s.classcode),
        filter: {
          is_complete: '=0'
        }
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
    },
    arrivedOnlySchedules() {
      return _(this.schedules)
        .filter(({ priority }) => {
          return priority === 0
        })
        .orderBy(['priority', 'arrivedAt'], ['desc', 'asc'])
        .value()
    },
    filteredSchedules(classcode) {
      return _(this.groupedSchedules[classcode])
        .filter({ isComplete: false })
        .orderBy(['isMeeting', 'priority', 'arrivedAt'], ['desc', 'desc', 'asc'])
        .value()
    }
  }
}
</script>
