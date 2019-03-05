<template>
  <div id="waiting-room" class="container mt-3">
    <h1>等候室</h1>
    <h2>
      <span class="badge badge-danger mr-2">
        <font-awesome-icon icon="comment-dots" class="mr-2"/>接見中
      </span>
      <span class="badge badge-success">
        <font-awesome-icon icon="bell" class="mr-2"/>請到課室門外等候
      </span>
    </h2>

    <div v-for="c in classcodes" :key="c.id">
      <hr v-if="c" class="m-3">
      <div class="d-flex flex-row" style="overflow-x: auto">
        <div class="badge badge-dark mr-1" style="font-size: x-large;">
          {{c.classcode | uppercase}}
          <br>
          <small>{{c.location}}</small>
        </div>

        <div v-for="(s, key, id) in filteredSchedules(c.classcode)" :key="id" class="px-1">
          <name-badge :schedule="s"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NameBadge from '@/components/Common/NameBadge'
import floorJSON from '@/data/floor.json'
import _ from 'lodash'

export default {
  components: { NameBadge },
  computed: {
    ...mapState(['schedules']),
    groupedSchedules () {
      return _.groupBy(this.schedules, 'classcode')
    },
    classcodes () {
      return floorJSON[this.$route.params.floor]
    }
  },
  methods: {
    filteredSchedules (classcode) {
      return _(this.groupedSchedules[classcode])
        .orderBy(
          ['isMeeting', 'priority', 'arrivedAt', 'isNotified'],
          ['desc', 'desc', 'asc', 'desc']
        )
        .value()
    }
  }
}
</script>
