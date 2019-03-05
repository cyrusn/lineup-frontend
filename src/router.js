import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Navbar from '@/views/Navbar'
import Interview from '@/views/Interview'
import WaitingRoom from '@/views/WaitingRoom'
import Attendance from '@/views/Attendance'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      components: {
        default: Login,
        Navbar: Navbar
      }
    }, {
      path: '/attendance/:classcode',
      name: 'attendance',
      components: {
        default: Attendance,
        Navbar: Navbar
      }
    },
    {
      path: '/interview/:classcode',
      name: 'interview',
      components: {
        default: Interview,
        Navbar: Navbar
      }
    },
    {
      path: '/waiting-room/:floor',
      name: 'waiting room',
      components: {
        default: WaitingRoom,
        Navbar: Navbar
      }
    }
  ]
})
