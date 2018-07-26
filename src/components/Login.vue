<template>
  <div>
    <div class="container mt-3">
      <div class="w-50 mx-auto">
        <h1 class="display-4 text-center">家長日接見系統</h1>
        <hr>
        <form>
          <div class="form-group">
            <select class="form-control" v-model='page'>
              <option value='' disabled>選擇工作</option>
              <option v-for='r in routers' :key='r.id' :value='r.path'>{{r.name}}</option>
            </select>
          </div>
          <floor-selector />
          <div class='form-group'
            v-if="page === '/interview-room' && currentFloor !== ''">
            <select class="form-control" v-model='clazz' @change='updateClazz(clazz)'>
              <option disabled="" value="">選擇班別</option>
              <option
                v-for='c in floorClazzes' :key='c.id'
                :value="c.classcode">{{c.classcode}}
              </option>
            </select>
          </div>
          <div class="form-group">
            <input type="text" class="form-control" id="username" placeholder="登入名稱" v-model='userAlias'>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="password" placeholder="密碼" v-model='password'>
          </div>
          <button type="button" class="btn btn-primary" @click="onLogin">遞交</button>
        </form>
        <code>
          {{jwtToken}}
        </code>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import FloorSelector from './FloorSelector.vue'

const routers = [
  {
    name: '等候室',
    path: '/waiting-room'
  }, {
    name: '學生大使',
    path: '/student-helper'
  }, {
    name: '接見室',
    path: '/interview-room'
  }
]

export default {
  name: 'Login',
  components: { FloorSelector },
  data () {
    return {
      routers,
      page: '/interview-room',
      clazz: '5D',
      userAlias: 'user1',
      password: 'password1'
    }
  },
  computed: {
    ...mapState(['jwtToken', 'currentFloor']),
    ...mapGetters(['floorClazzes'])
  },
  methods: {
    ...mapMutations(['goto', 'updateClazz']),
    ...mapActions(['login']),
    onLogin () {
      const {page, userAlias, password, login, goto} = this
      if (page !== '') {
        login({
          userAlias, password
        })
        goto(page)
      }
    }
  }
}
</script>
