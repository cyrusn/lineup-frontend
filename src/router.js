import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

import NavbarMenu from '@/views/NavbarMenu.vue'
import InterviewRoom from '@/views/InterviewRoom.vue'
import WaitingRoom from '@/views/WaitingRoom.vue'
import AttendancePage from '@/views/AttendancePage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: WaitingRoom,
        Navbar: NavbarMenu
      }
    },
    {
      path: '/attendance/:classcode',
      name: 'attendance',
      components: {
        default: AttendancePage,
        Navbar: NavbarMenu
      }
    },
    {
      path: '/interview/:classcode',
      name: 'interview',
      components: {
        default: InterviewRoom,
        Navbar: NavbarMenu
      }
    },
    {
      path: '/waiting-room/:room',
      name: 'waiting room',
      components: {
        default: WaitingRoom,
        Navbar: NavbarMenu
      }
    }
  ]
})

let isInitialLoad = true

router.beforeEach((to, from, next) => {
  if (isInitialLoad) {
    isInitialLoad = false
    if (to.path !== '/') {
      next({ path: '/' })
      return
    }
  }

  const jwt = store.state.jwt
  if (to.name === 'interview' && !jwt) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
