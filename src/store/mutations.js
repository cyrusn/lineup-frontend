import _ from 'lodash'

export default {
  updateRole (state, role) {
    state.role = role
  },
  clearAndPushIntervals (state, fn) {
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
  updateErrorMessage (state, err) {
    state.errorMessage = err
    console.error(err)
  },
  updateJWT (state, token) {
    state.jwt = token
  },
  goto (state, route) {
    state.currentRoute = route
  },
  updateFloor (state, val) {
    state.currentFloor = val
  },
  updateClazz (state, val) {
    state.currentClazz = val
  },
  updateSchedules (state, schedules) {
    // state.schedules = Object.assign({}, state.schedules, json)
    state.schedules = schedules
  },
  fakeAddSchedule (state, schedule) {
    if (!_.find(state.schedules, schedule)) {
      state.schedules.push(schedule)
    }
  },
  fakeRemoveSchedule (state, schedule) {
    const filtered = _.reject(state.schedules, schedule)
    state.schedules = [...filtered]
  },
  fakeAddPriority (state, schedule) {
    state.schedules.map(s => {
      if (_.isMatch(s, schedule)) {
        s.priority += 1
      }
    })
  },
  fakeMinusPriority (state, schedule) {
    state.schedules.map(s => {
      if (_.isMatch(s, schedule)) {
        s.priority -= 1
      }
    })
  },
  fakeIsNotified (state, schedule) {
    state.schedules.map(s => {
      if (_.isMatch(s, schedule)) {
        s.isNotified = !s.isNotified
      }
    })
  },
  fakeIsComplete (state, schedule) {
    state.schedules.map(s => {
      if (_.isMatch(s, schedule)) {
        s.isComplete = !s.isComplete
      }
    })
  },
  fakeIsMeeting (state, schedule) {
    state.schedules.map(s => {
      if (_.isMatch(s, schedule)) {
        s.isMeeting = !s.isMeeting
      }
    })
  }
}
