<template>
  <nav class="navbar navbar-light navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand me-5" href="#">家長接見系統</a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarText">
        <form class="d-flex me-auto">
          <div class="row row-cols-lg-auto g-3 align-items-center">
            <div class="col-12">
              <select class="form-control me-2" v-model="task" @change="onChange('task')">
                <option value disabled>工作</option>
                <option v-for="t in tasks" :key="t.id" :value="t.id">
                  {{ t.name }}
                </option>
              </select>
            </div>

            <div class="col-12">
              <select class="form-control me-2" v-model="room" @change="onChange('room')">
                <option value disabled>等候室</option>
                <option v-for="r in waitingRooms" :key="r.id" :value="r.id">
                  {{ r.name }}
                </option>
              </select>
            </div>

            <div class="col-12">
              <select
                class="form-control"
                v-model="classcode"
                v-if="show"
                @change="onChange('classcode')"
              >
                <option disabled value>班別</option>
                <option v-for="k in classcodes" :key="k.id" :value="k.classcode">
                  {{ k.classcode }}
                </option>
              </select>
            </div>
          </div>
        </form>

        <form class="d-flex ms-auto" v-if="!jwt" @submit.prevent="onLogin">
          <div class="row row-cols-lg-auto g-3 align-items-center">
            <div class="col-12">
              <input type="text" class="form-control" placeholder="登入名稱" v-model="userAlias" />
            </div>
            <div class="col-12">
              <input type="password" class="form-control" placeholder="密碼" v-model="password" />
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary">登入</button>
            </div>
          </div>
        </form>
        <div class="navbar-text ms-auto" v-else>
          <span class="badge bg-secondary me-2" v-if="role">{{ role }}</span>
          <span>聖公會李炳中學</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data() {
    return {
      task: 'waiting-room',
      classcode: '',
      room: '',
      userAlias: '',
      password: ''
    }
  },
  created() {
    const { fetchStudents, fetchWaitingRooms } = this
    fetchStudents()
    fetchWaitingRooms()
  },
  watch: {
    jwt() {
      if (!this.jwt) {
        this.updateRole('')
        return
      }
      try {
        const { getRoleInJWT, updateRole } = this
        const role = getRoleInJWT()
        updateRole(role)
      } catch (e) {
        console.error('Invalid JWT', e)
      }
    }
  },
  computed: {
    ...mapState(['students', 'waitingRooms', 'jwt', 'role']),
    show() {
      const { task, room } = this
      if (!task) {
        return false
      }
      if (task !== 'waiting-room' && room) {
        return true
      }
      return false
    },
    tasks() {
      const { role, jwt } = this
      const allTasks = [
        {
          id: 'attendance',
          name: '點名'
        },
        {
          id: 'waiting-room',
          name: '等候室'
        },
        {
          id: 'interview',
          name: '接見'
        }
      ]

      if (!jwt) {
        return _.filter(allTasks, (t) => t.id !== 'interview')
      }

      if (role == 'teacher') {
        return allTasks
      }

      return _.filter(allTasks, (t) => t.id !== 'interview')
    },
    classcodes() {
      const { waitingRooms, room } = this
      console.log(room)
      const found = waitingRooms.find(({ id }) => id == room)
      return found ? found.classcodes : []
    }
  },
  methods: {
    ...mapMutations(['clearAndPushIntervals', 'updateRole']),
    ...mapActions(['updateSchedules', 'fetchStudents', 'fetchWaitingRooms', 'login']),
    onLogin() {
      const { userAlias, password, login } = this
      login({
        payload: {
          userAlias,
          password
        },
        callback: () => {
          // Stay on current page or go to default?
          // If we are on waiting room, maybe stay?
          // But user might want to go to their task.
          // For now, let's just clear the form or something.
          // The store updates JWT, and 'tasks' computed property will update.
          this.userAlias = ''
          this.password = ''
        }
      })
    },
    getRoleInJWT() {
      return JSON.parse(atob(this.jwt.split('.')[1])).Role
    },
    onChange() {
      const { task, classcode, room, go, jwt } = this
      if (!task) return
      if (!jwt && task === 'interview') {
        this.task = 'waiting-room'
        return
      }
      if (task === 'waiting-room' && room) return go()
      if (task !== 'waiting-room' && classcode) return go()
    },
    go() {
      const { task, room, classcode, update } = this

      this.$router.push({
        path: `/${task}/${task === 'waiting-room' ? room : classcode}`
      })

      update()
    },
    update() {
      const { clearAndPushIntervals, updateSchedules, task, classcode, classcodes } = this
      const option = {}

      switch (task) {
        case 'interview':
        case 'attendance':
          option.classcodes = [classcode]
          break
        case 'waiting-room':
          option.classcodes = classcodes.map((s) => s.classcode)
          option.filter = {
            is_complete: '=0'
          }
      }

      clearAndPushIntervals(
        _.throttle(
          () => {
            updateSchedules(option)
          },
          2000,
          { leading: true, trailing: false }
        )
      )
    }
  }
}
</script>
