<template lang="html">
  <span v-if="type == 'badge'" :class="nameBadgeClass.badge" class="badge">
    {{ student.cname || student.ename.split(' ')[1] }} ({{ student.classcode
    }}{{ String(student.classno).padStart(2, '0') }})
    <font-awesome-icon :icon="['far', 'bell']" v-if="student.isNotified" />
  </span>

  <button
    v-else
    type="button"
    :class="nameBadgeClass.button"
    class="btn"
  >
    {{ student.cname || student.ename.split(' ')[1] }} ({{ student.classno }})
    <font-awesome-icon :icon="['far', 'bell']" v-if="student.isNotified" />
  </button>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  props: ['schedule', 'customClass', 'type'],
  computed: {
    ...mapState(['students']),
    student() {
      const { schedule, students } = this
      const { classcode, classno } = schedule
      const result = _.find(students, { classcode, classno })
      return Object.assign({}, schedule, result)
    },
    nameBadgeClass() {
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

      let button, badge

      switch (true) {
        case isComplete:
          button = Object.assign({}, defaultClassObject, {
            'btn-primary': true
          })

          badge = Object.assign({}, defaultClassObject, {
            'text-bg-primary': true
          })

          break
        case isMeeting:
          button = Object.assign({}, defaultClassObject, {
            'btn-danger': true
          })
          badge = Object.assign({}, defaultClassObject, {
            'text-bg-danger': true
          })
          break
        case isNotified && priority > 0:
          button = Object.assign({}, defaultClassObject, {
            'btn-outline-success': true
          })
          badge = Object.assign({}, defaultClassObject, {
            'bg-light': true,
            'text-success': true
          })
          break
        case priority > 0:
          button = Object.assign({}, defaultClassObject, {
            'btn-success': true
          })
          badge = Object.assign({}, defaultClassObject, {
            'text-bg-success': true
          })
          break
        default:
          button = Object.assign({}, defaultClassObject, {
            'btn-warning': true
          })
          badge = Object.assign({}, defaultClassObject, {
            'text-bg-warning': true
          })
      }
      return {
        button,
        badge
      }
    }
  }
}
</script>
