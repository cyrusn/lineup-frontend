<template>
  <nav class="navbar navbar-light navbar-expand-lg bg-light" v-if="jwt">
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
        <form class='d-flex me-auto'>
          <div class="row row-cols-lg-auto g-3 align-items-center">

            <div class='col-12'>
              <select
                  class="form-control me-2"
                  v-model="task"
                  @change="onChange('task')"
                  >
                  <option value disabled>工作</option>
                  <option v-for="t in tasks" :key="t.id" :value="t.id">
                  {{ t.name }}
                  </option>
              </select>
            </div>

            <div class='col-12'>
              <select
                  class="form-control me-2"
                  v-model="floor"
                  @change="onChange('floor')"
                  >
                  <option value disabled>樓層</option>
                  <option v-for="f in floors" :key="f.id" :value="f.value">
                  {{ f.name }}
                  </option>
              </select>
            </div>

            <div class='col-12'>
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
        <span class="navbar-text">聖公會李炳中學</span>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      task: '',
      classcode: '',
      floors: [
        {
          value: '1f',
          name: '1/F'
        },
        {
          value: '2f',
          name: '2/F'
        },
        {
          value: '3f',
          name: '3/F'
        },
        {
          value: '4f',
          name: '4/F'
        }
      ],
      floor: ''
    }
  },
  created () {
    const { fetchStudents, fetchFloorData} = this
    if (!this.jwt) {
      this.$router.push('/')
    }
    fetchStudents()
    fetchFloorData()

  },
  computed: {
    ...mapState(['students', 'floorData']),
    show () {
      const { task, floor } = this
      if (!task) {
        return false
      }
      if (task !== 'waiting-room' && floor) {
        return true
      }
      return false
    },
    tasks () {
      const { role } = this
      return _.filter(
        [
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
        ],
        (task) => {
          if (role === 'teacher') return true
          if (task.id !== 'interview') return true
        }
      )
    },
    classcodes () {
      const { floorData, floor } = this
      return floorData[floor]
    },
    ...mapState(['jwt', 'role'])
  },
  methods: {
    ...mapMutations(['clearAndPushIntervals']),
    ...mapActions(['updateSchedules', 'fetchStudents', 'fetchFloorData']),
    onChange () {
      const { task, classcode, floor, go } = this
      if (!task) return
      if (task === 'waiting-room' && floor) return go()
      if (task !== 'waiting-room' && classcode) return go()
    },
    go () {
      const { task, floor, classcode, update } = this

      this.$router.push({
        path: `/${task}/${task === 'waiting-room' ? floor : classcode}`
      })

      update()
    },
    update () {
      const {
        clearAndPushIntervals,
        updateSchedules,
        task,
        classcode,
        classcodes
      } = this
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
