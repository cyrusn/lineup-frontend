import _ from 'lodash'

function checkError (res) {
  if (!res.ok) {
    throw res
  } else {
    return res
  }
}

function handleCatchError (commit) {
  return res => {
    res.json().then(json => commit('updateErrorMessage', JSON.stringify(json)))
  }
}

function logStatusOnDevelopment (res) {
  switch (process.env.NODE_ENV) {
    case 'production':
      return
    case 'development':
      return res.text().then(console.log)
  }
}

export default {
  login ({state, commit}, payload) {
    fetch(`./api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then(checkError)
      .then(res => res.text())
      .then(text => commit('updateJWT', text))
      .catch(handleCatchError(commit))
  },
  updatePriority ({state, commit}, {classcode, classno, priority}) {
    fetch(`./api/schedule/${classcode}/${classno}/priority/${priority}`, {
      method: 'PUT',
      headers: { jwt: state.jwt }
    })
      .then(checkError)
      .then(logStatusOnDevelopment)
      .catch(handleCatchError(commit))
  },
  toggleIsComplete  ({state, commit}, {classcode, classno}) {
    fetch(`./api/schedule/${classcode}/${classno}/is-complete`, {
      method: 'PUT',
      headers: { jwt: state.jwt }
    })
      .then(checkError)
      .then(logStatusOnDevelopment)
      .catch(handleCatchError(commit))
  },
  toggleIsNotified  ({state, commit}, {classcode, classno}) {
    fetch(`./api/schedule/${classcode}/${classno}/is-notified`, {
      method: 'PUT',
      headers: { jwt: state.jwt }
    })
      .then(checkError)
      .then(logStatusOnDevelopment)
      .catch(handleCatchError(commit))
  },
  toggleIsMeeting  ({state, commit}, {classcode, classno}) {
    fetch(`./api/schedule/${classcode}/${classno}/is-meeting`, {
      method: 'PUT',
      headers: { jwt: state.jwt }
    })
      .then(checkError)
      .then(logStatusOnDevelopment)
      .catch(handleCatchError(commit))
  },
  addSchedule ({state, commit}, {classcode, classno}) {
    fetch(`./api/schedule/${classcode}/${classno}`, {
      method: 'POST',
      headers: { jwt: state.jwt }
    })
      .then(checkError)
      .then(logStatusOnDevelopment)
      .catch(handleCatchError(commit))
  },
  removeSchedule ({state, commit}, {classcode, classno}) {
    fetch(`./api/schedule/${classcode}/${classno}`, {
      method: 'DELETE',
      headers: { jwt: state.jwt }
    })
      .then(checkError)
      .then(logStatusOnDevelopment)
      .catch(handleCatchError(commit))
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
      .then(checkError)
      .then(res => res.json())
      .then(json => {
        if (json == null) return
        commit('updateSchedules', json)
        if (process.env.NODE_ENV === 'development') {
          console.log(`updated ${classcodes.join(', ')} schedule`)
        }
      })
      .catch(handleCatchError(commit))
  }
}
