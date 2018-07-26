// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Login from './components/Login'
import InterviewRoom from './components/InterviewRoom'
import WaitingRoom from './components/WaitingRoom'
import StudentHelper from './components/StudentHelper'

import store from './store'
import {version} from '../package.json'

console.log(`running version ${version}`)
Vue.filter('uppercase', str => str.toUpperCase())

const routes = {
  '/login': Login,
  '/student-helper': StudentHelper,
  '/interview-room': InterviewRoom,
  '/waiting-room': WaitingRoom
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render (h) {
    return h(routes[this.$store.state.currentRoute])
  }
})
