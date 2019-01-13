<template>
  <div>
    <div class="container mt-3">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 align-self-center">
          <h1 class="display-4 text-center">家長日接見系統</h1>
          <hr>
          <div v-if="errorMessage" class="alert alert-danger">
            {{errorMessage}}
          </div>
          <form @keypress.enter='onLogin'>
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
                <option disabled value="">選擇班別</option>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import FloorSelector from '@/components/Common/FloorSelector.vue'

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
      page: '',
      clazz: '',
      userAlias: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['currentFloor', 'jwt', 'errorMessage']),
    ...mapGetters(['floorClazzes'])
  },
  watch: {
    jwt () {
      const {goto, page, updateErrorMessage, getRoleInJWT} = this
      const role = getRoleInJWT()

      if (role === 'student' && page === '/interview-room') {
        updateErrorMessage('Forbidden access for student user')
        return
      }

      goto(page)
    }
  },
  methods: {
    ...mapMutations(['goto', 'updateClazz', 'updateErrorMessage']),
    ...mapActions(['login']),
    onLogin () {
      const {page, userAlias, password, login} = this
      if (page !== '') {
        login({
          userAlias, password
        })
      }
    },
    getRoleInJWT () {
      return JSON.parse(atob(this.jwt.split('.')[1])).Role
    }
  }
}
</script>
