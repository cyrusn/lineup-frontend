import _ from 'lodash'

export default {
  login ({state, commit}, payload) {
    fetch(`./api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then(
      response => response.text()
    ).then(
      text => commit('updateJWT', text)
    ).catch(
      console.error
    )
  },
  updatePriority ({state}, {classcode, classno, priority}) {
    fetch(`./api/schedule/${classcode}/${classno}/priority/${priority}`, {
      method: 'PUT',
      headers: { jwt: state.jwt }
    }).then(response => response.text()).then(console.log).catch(console.error)
  },
  toggleIsComplete  ({state}, {classcode, classno}) {
    fetch(`./api/schedule/${classcode}/${classno}/is-complete`, {
      method: 'PUT',
      headers: { jwt: state.jwt }
    }).then(response => response.text()).then(console.log).catch(console.error)
  },
  toggleIsNotified  ({state}, {classcode, classno}) {
    fetch(`./api/schedule/${classcode}/${classno}/is-notified`, {
      method: 'PUT',
      headers: { jwt: state.jwt }
    }).then(response => response.text()).then(console.log).catch(console.error)
  },
  toggleIsMeeting  ({state}, {classcode, classno}) {
    fetch(`./api/schedule/${classcode}/${classno}/is-meeting`, {
      method: 'PUT',
      headers: { jwt: state.jwt }
    }).then(response => response.text()).then(console.log).catch(console.error)
  },
  addSchedule ({state, commit}, {classcode, classno}) {
    fetch(`./api/schedule/${classcode}/${classno}`, {
      method: 'POST',
      headers: { jwt: state.jwt }
    }).then(response => response.text()).then(console.log).catch(console.error)
  },
  removeSchedule ({state, commit}, {classcode, classno}) {
    fetch(`./api/schedule/${classcode}/${classno}`, {
      method: 'DELETE',
      headers: { jwt: state.jwt }
    })
      .then(response => response.text())
      .then(console.log)
      .catch(console.error)
  },
  updateSchedules ({state, commit}, {classcodes, filter}) {
    // classcodes for query e.g. ?classcode=3A&classcode=4D&classcode=5D
    let query = '?classcode=' + classcodes.join('&classcode=')

    // accept other filter for query
    // e.g. ?classcode=3A&classcode=4D&classcode=5D&is_complete=1&priority=>0
    if (filter) {
      _.mapValues(filter, function (v, k) {
        query += `&${k}=${v}`
      })
    }
    fetch(`./api/schedules${query}`, {
      headers: { jwt: state.jwt }
    })
      .then(response => response.json())
      .then(json => {
        commit('updateSchedules', json)
      })
      .then(() => {
        console.log(`update ${classcodes.join(', ')} schedules`)
      })
      .catch(console.error)
  }
}
