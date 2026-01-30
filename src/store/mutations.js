import _ from 'lodash'

export default {
  updateRole(state, role) {
    state.role = role
  },
  clearAndPushIntervals(state, fn) {
    // all intervals will store in intervals, clear all intervals
    // when update the classcode
    state.intervals.forEach(clearInterval)
    while (state.intervals.length !== 0) {
      state.intervals.pop()
    }
    fn()
    const interval = setInterval(fn, state.refreshInterval)
    state.intervals.push(interval)
  },
  updateErrorMessage(state, err) {
    state.errorMessage = err
    console.error(err)
  },
  updateJWT(state, token) {
    state.jwt = token
  },
  updateWaitingRooms(state, waitingRooms) {
    state.waitingRooms = waitingRooms
  },
  updateStudents(state, students) {
    state.students = students
  },
  updateSchedules(state, schedules) {
    // state.schedules = Object.assign({}, state.schedules, json)
    state.schedules = schedules
  },
  fakeAddSchedule(state, schedule) {
    if (!state.jwt) return
    if (!_.find(state.schedules, schedule)) {
      state.schedules.push({
        ...schedule,
        arrivedAt: new Date().toISOString()
      })
    }
  },
  fakeRemoveSchedule(state, schedule) {
    if (!state.jwt) return
    const filtered = _.reject(state.schedules, schedule)
    state.schedules = [...filtered]
  },
  fakeAddPriority(state, schedule) {
    if (!state.jwt) return
    state.schedules.map((s) => {
      if (_.isMatch(s, schedule)) {
        s.priority += 1
      }
    })
  },
  fakeMinusPriority(state, schedule) {
    if (!state.jwt) return
    state.schedules.map((s) => {
      if (_.isMatch(s, schedule)) {
        s.priority -= 1
      }
    })
  },
  fakeIsNotified(state, schedule) {
    if (!state.jwt) return
    state.schedules.map((s) => {
      if (_.isMatch(s, schedule)) {
        s.isNotified = !s.isNotified
      }
    })
  },
  fakeIsComplete(state, schedule) {
    if (!state.jwt) return
    state.schedules.map((s) => {
      if (_.isMatch(s, schedule)) {
        s.isComplete = !s.isComplete
      }
    })
  },
  fakeIsMeeting(state, schedule) {
    if (!state.jwt) return
    state.schedules.map((s) => {
      if (_.isMatch(s, schedule)) {
        s.isMeeting = !s.isMeeting
      }
    })
  }
}
