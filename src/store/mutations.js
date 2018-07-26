import _ from 'lodash'

export default {
  updateJWT (state, token) {
    state.jwtToken = token
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
  fakeRemoveSchudule (state, schedule) {
    const filtered = _.reject(state.schedules, schedule)
    state.schedules = [...filtered]
  }
}
