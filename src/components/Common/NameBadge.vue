<template lang="html">
  <button type="button" :class="btnClass" class="btn">
    {{ student.cname || student.name.split(" ")[1] }} ({{ student.classno }})
    <font-awesome-icon :icon="['far', 'bell']" v-if="student.isNotified" />
  </button>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  props: ['schedule', 'customClass'],
  computed: {
    ...mapState([ 'students']),
    student () {
      const { schedule, students } = this
      const { classcode, classno } = schedule
      const result = _.find(students, { classcode, classno })
      return Object.assign({}, schedule, result)
    },
    btnClass () {
      const { schedule, customClass } = this
      const { isNotified, isComplete, isMeeting, priority } = schedule

      const defaultClassObject = {
        'btn-primary': false,
        'btn-outline-success': false,
        'btn-danger': false,
        'btn-warning': false
      }

      if (customClass && customClass.length !== 0) {
        customClass.forEach((key) => {
          defaultClassObject[key] = true
        })
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
