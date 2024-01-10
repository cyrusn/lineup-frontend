// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
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

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

console.log(`running version ${version}`)

app.config.productionTip = false

app.use(store)
app.use(router)
app.mount('#app')
