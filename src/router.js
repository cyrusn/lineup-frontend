import { createRouter, createWebHashHistory } from 'vue-router'

import LoginPage from '@/views/LoginPage.vue'
import NavbarMenu from '@/views/NavbarMenu.vue'
import InterviewRoom from '@/views/InterviewRoom.vue'
import WaitingRoom from '@/views/WaitingRoom.vue'
import AttendancePage from '@/views/AttendancePage.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      components: {
        default: LoginPage,
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
