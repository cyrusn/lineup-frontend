<template lang="html">
  <button type='button' :class='btnClass' class='btn'>
    {{student.cname}} ({{student.classno}})
    <font-awesome-icon :icon="['far', 'bell']" v-if='student.isNotified'/>
  </button>
</template>

<script>
import students from '@/data/student.json'
import _ from 'lodash'

export default {
  props: ['schedule'],
  computed: {
    student () {
      const { schedule } = this
      const { classcode, classno } = schedule
      const result = _.find(students, { classcode, classno })
      return Object.assign({}, schedule, result)
    },
    btnClass () {
      const { schedule } = this
      const { isNotified, isComplete, isMeeting, priority } = schedule

      const defaultClassObject = {
        'btn-primary': false,
        'btn-outline-success': false,
        'btn-danger': false,
        'btn-warning': false
      }

      if (this.$route.name === 'waiting room') {
        defaultClassObject['btn-lg'] = true
      }

      let buttonClass

      switch (true) {
        case isComplete:
          buttonClass = Object.assign({}, defaultClassObject, {
            'btn-primary': true
          })
          break
        case isMeeting:
          buttonClass = Object.assign({}, defaultClassObject, {
            'btn-danger': true
          })
          break
        case isNotified && priority > 0:
          buttonClass = Object.assign({}, defaultClassObject, {
            'btn-outline-success': true
          })
          break
        case priority > 0:
          buttonClass = Object.assign({}, defaultClassObject, {
            'btn-success': true
          })
          break
        default:
          buttonClass = Object.assign({}, defaultClassObject, {
            'btn-warning': true
          })
      }
      return buttonClass
    }
  }
}
</script>
