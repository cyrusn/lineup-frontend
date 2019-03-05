// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from '@/router'
import App from '@/App.vue'
import store from '@/store'
import { version } from '../package.json'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserPlus,
  faUserMinus,
  faBell,
  faBellSlash,
  faCommentDots,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'

import { faBell as faBellRegular } from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faUserPlus,
  faUserMinus,
  faBell,
  faBellRegular,
  faBellSlash,
  faCommentDots,
  faCheckCircle
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

console.log(`running version ${version}`)
Vue.filter('uppercase', str => str.toUpperCase())

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
