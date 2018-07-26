<template lang="html">
  <span :class='getClass(schedule)' class='badge'>
    {{getStudent.cname}} ({{getStudent.classno}})
  </span>
</template>

<script>
import students from '../data/student.json'
import _ from 'lodash'
export default {
  props: ['classcode', 'schedule'],
  computed: {
    getStudent () {
      let {classcode, schedule} = this
      classcode = classcode.toUpperCase()
      const {classno} = schedule
      const result = _(students)
        .find({
          classcode, classno
        })
      return Object.assign({}, schedule, result)
    }
  },
  methods: {
    getClass (schedule) {
      const classObject = {}
      if (schedule.isNotified) {
        classObject['check'] = true
      }

      if (schedule.isComplete) {
        classObject['badge-primary'] = true
        return classObject
      }

      if (schedule.isMeeting) {
        classObject['badge-danger'] = true
        return classObject
      }

      if (schedule.priority > 0) {
        classObject['badge-success'] = true
        return classObject
      }

      if (schedule.priority > 0) {
        classObject['badge-success'] = true
        return classObject
      }

      classObject['badge-warning'] = true
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
