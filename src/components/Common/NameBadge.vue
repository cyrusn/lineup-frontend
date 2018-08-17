<template lang="html">
  <button type='button' :class='getClass()' class='btn'>
    {{getStudent.cname}} ({{getStudent.classno}})
  </button>
</template>

<script>
import students from '@/data/student.json'
import _ from 'lodash'
import {mapState} from 'vuex'

export default {
  props: ['schedule'],
  computed: {
    ...mapState(['currentRoute']),
    getStudent () {
      const {schedule} = this
      const {classcode, classno} = schedule
      const result = _.find(students, {classcode, classno})
      return Object.assign({}, schedule, result)
    }
  },
  methods: {
    getClass () {
      const {schedule, currentRoute} = this
      const {isNotified, isComplete, isMeeting, priority} = schedule

      const defaultClassObject = {
        'btn-primary': false,
        'btn-outline-success': false,
        'btn-danger': false,
        'btn-warning': false,
        'check': false
      }

      if (currentRoute === '/waiting-room') {
        defaultClassObject['btn-lg'] = true
      }

      if (priority > 0) {
        return Object.assign({}, defaultClassObject, {
          'btn-success': true
        })
      }

      if (isNotified && priority > 0) {
        return Object.assign({}, defaultClassObject, {
          'check': true,
          'btn-outline-success': true
        })
      }

      if (isComplete) {
        return Object.assign({}, defaultClassObject, {
          'btn-primary': true
        })
      }

      if (isMeeting) {
        return Object.assign({}, defaultClassObject, {
          'btn-danger': true
        })
      }

      return Object.assign({}, defaultClassObject, {
        'btn-warning': true
      })
    }
  }
}
</script>
<style lang="css">
  .check::after {
    content: " ✓";
  }
</style>
