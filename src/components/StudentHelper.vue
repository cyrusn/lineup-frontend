<template>
  <div>
    <div class="container mt-3">
      <h1>學生大使</h1>
      <instruction />
      <code>
        {{schedules}}
      </code>
      <hr>
      <select v-model='selectedClazz'>
        <option value='' disabled="">選擇班別</option>
        <option v-for='c in floorClazzes' :key='c.id' :value='c.classcode'>
          {{c.classcode}}
        </option>
      </select>
      <div id='student-helper' style="font-size: 1.4em">
        <h2 class="display-4">{{selectedClazz}}</h2>
          <div class="row">
            <div v-for="s in getStudentsByClasscode(selectedClazz)"
              :key='s.id' class="col-lg-4 col-6">
              <button type="button" class="badge btn-outline-warning"
                @click='onAddSchedule(s)'>+</button>
              <button type="button" class="badge btn-outline-secondary"
                @click='onRemoveSchedule(s)'>-</button>
              <button type="button" class="badge btn-outline-seoncdary"
                @click='onToggleIsNotified(s)'>✓‍</button>
              <span class="badge" :class='getClass(s)'>
                {{s.classno}} - {{s.cname}}
              </span>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import students from '../data/student.json'
import Instruction from './Instruction.vue'
import _ from 'lodash'

export default {
  data () {
    return {
      selectedClazz: '',
      intervals: []
    }
  },
  components: {
    Instruction
  },
  watch: {
    // trigger update schedules when jwtToken is ready
    jwtToken () {
      this.updateStudentHelperSchedules()
    },
    selectedClazz () {
      const {intervals, updateStudentHelperSchedules, refreshTime} = this
      intervals.forEach(clearInterval)

      updateStudentHelperSchedules()
      const interval = setInterval(updateStudentHelperSchedules, refreshTime)

      // all interval will store in intervals, clear all intervals
      // when update the classcode
      intervals.push(interval)
    }
  },
  computed: {
    ...mapState(['schedules', 'currentForm', 'schedules', 'jwtToken', 'refreshTime']),
    ...mapGetters(['floorClazzes'])
  },
  methods: {
    ...mapMutations(['fakeRemoveSchudule', 'fakeAddSchedule']),
    ...mapActions([
      'updateSchedules', 'addSchedule', 'removeSchedule', 'toggleIsNotified'
    ]),
    updateStudentHelperSchedules: _.throttle(function () {
      console.log(this.selectedClazz)
      this.updateSchedules({
        classcodes: [this.selectedClazz]
      })
    }, 500, {'leading': true, 'trailing': false}),
    getStudentsByClasscode (classcode) {
      classcode = classcode.toUpperCase()
      return _.filter(students, { classcode })
    },
    getSchedule (student) {
      const {classcode, classno} = student
      return _(this.schedules).find({classcode, classno})
    },
    getClass (student) {
      const schedule = this.getSchedule(student)
      if (!schedule) return { 'badge-secondary': true }

      if (!schedule) return { 'badge-secondary': true }
      if (schedule.isComplete) return { 'badge-primary': true }
      if (schedule.isMeeting) return { 'badge-danger': true }
      if (schedule.isNotified && schedule.priority > 0) {
        return {'check': true, 'badge-success': true}
      }
      if (schedule.priority > 0) return { 'badge-success': true }
      return { 'badge-warning': true }
    },
    onRemoveSchedule: _.throttle(function (s) {
      const {classcode, classno} = s

      const p = _.find(this.schedules, {classcode, classno})
      if (p && !p.isComplete && p.priority === 0) {
        this.removeSchedule(s)
        this.fakeRemoveSchudule({classcode, classno})
      }
    }, 500, {'leading': true, 'trailing': false}),
    onAddSchedule: _.throttle(function (s) {
      const {classcode, classno} = s

      const p = _.find(this.schedules, {classcode, classno})
      if (!p) {
        this.addSchedule(s)
      }
      this.fakeAddSchedule({classcode, classno})
    }, 500, {'leading': true, 'trailing': false}),
    onToggleIsNotified: _.throttle(function (s) {
      const {classcode, classno} = s
      const p = _.find(this.schedules, {classcode, classno})
      if (p && !p.isComplete && p.priority > 0) {
        this.toggleIsNotified(s)
      }
    }, 500, {'leading': true, 'trailing': false})
  }
}
</script>
<style lang="css">
  .check::after {
    content: " ✓";
  }
</style>
