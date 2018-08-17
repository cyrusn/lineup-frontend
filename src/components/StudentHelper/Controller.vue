<template>
  <div class="row">
    <div v-for="s in filteredStudents" :key='s.id' class="col-lg-4 col-6">
      <div class="btn-toolbar mb-2">
        <div class="btn-group mr-1">
          <button type="button" class="btn btn-outline-warning"
            @click='onAddSchedule(s)'>+</button>
          <button type="button" class="btn btn-outline-secondary"
            @click='onRemoveSchedule(s)'>-</button>
          <button type="button" class="btn btn-outline-success"
            @click='onToggleIsNotified(s)'>✓‍</button>
        </div>
        <div class="btn-group">
          <div v-if="getSchedule(s)">
            <name-badge :schedule='getSchedule(s)' />
          </div>
          <div v-else>
            <button class="btn btn-outline-secondary">
              {{s.cname}} ({{s.classno}})
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import students from '@/data/student.json'
import NameBadge from '@/components/Common/NameBadge'
import _ from 'lodash'

export default {
  props: ['classcode'],
  created () {
    const option = {'leading': true, 'trailing': false}
    const vm = this
    const fnNames = ['onRemoveSchedule', 'onAddSchedule', 'onToggleIsNotified']
    fnNames.map(fnName => _.throttle(vm[fnName], 500, option))
  },
  components: {
    NameBadge
  },
  computed: {
    ...mapState(['currentForm', 'schedules']),
    filteredStudents () {
      const {classcode} = this
      return _.filter(students, {classcode})
    }
  },
  methods: {
    ...mapMutations(['fakeRemoveSchudule', 'fakeAddSchedule', 'fakeIsNotified']),
    ...mapActions([
      'updateSchedules', 'addSchedule', 'removeSchedule', 'toggleIsNotified'
    ]),
    getSchedule (student) {
      const {classcode, classno} = student
      return _(this.schedules).find({classcode, classno})
    },
    onRemoveSchedule (s) {
      const {classcode, classno} = s
      const {schedules, removeSchedule, fakeRemoveSchudule} = this

      const p = _.find(schedules, {classcode, classno})
      if (p && !p.isComplete && p.priority === 0) {
        removeSchedule(s)
        fakeRemoveSchudule({classcode, classno})
      }
    },
    onAddSchedule (s) {
      const {classcode, classno} = s
      const {schedules, addSchedule, fakeAddSchedule} = this

      const p = _.find(schedules, {classcode, classno})
      if (!p) {
        addSchedule(s)
        fakeAddSchedule({classcode, classno})
      }
    },
    onToggleIsNotified (s) {
      const {fakeIsNotified, schedules, toggleIsNotified} = this
      const {classcode, classno} = s

      const p = _.find(schedules, {classcode, classno})
      if (p && !p.isComplete && p.priority > 0) {
        toggleIsNotified(s)
        fakeIsNotified({classcode, classno})
      }
    }
  }
}
</script>
