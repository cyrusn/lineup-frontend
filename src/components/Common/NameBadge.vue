<template lang="html">
  <button type='button' :class='getClass()' class='btn'>
    {{getStudent.cname}} ({{getStudent.classno}})
  </button>
</template>

<script>
import students from '../../data/student.json'
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

      const classObject = {}

      if (currentRoute === '/waiting-room') {
        classObject['btn-lg'] = true
      }

      if (isNotified) {
        classObject['check'] = true
        classObject['btn-outline-success'] = true
      }

      if (isComplete) {
        classObject['btn-outline-success'] = false
        classObject['check'] = false
        classObject['btn-primary'] = true
        return classObject
      }

      if (isMeeting) {
        classObject['btn-danger'] = true
        return classObject
      }

      if (priority > 0) {
        classObject['btn-success'] = true
        return classObject
      }

      if (priority > 0) {
        classObject['btn-success'] = true
        return classObject
      }

      classObject['btn-warning'] = true
      return classObject
    }
  }
}
</script>
<style lang="css">
  .check::after {
    content: " ✓";
  }
</style>
