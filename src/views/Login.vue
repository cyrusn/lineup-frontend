<template>
  <div class="container mt-3" v-if="!jwt">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 align-self-center">
        <h1 class="display-4 text-center">家長日接見系統</h1>
        <hr>
        <div v-if="errorMessage" class="alert alert-danger">{{errorMessage}}</div>
        <form @keypress.enter="onLogin">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="登入名稱"
              v-model="userAlias"
            >
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="密碼"
              v-model="password"
            >
          </div>
          <button type="button" class="btn btn-primary" @click="onLogin">登入</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex"

export default {
  name: "Login",
  data() {
    return {
      userAlias: "",
      password: ""
    }
  },
  computed: {
    ...mapState(["errorMessage", "jwt"])
  },
  watch: {
    jwt() {
      const { getRoleInJWT, updateRole } = this
      const role = getRoleInJWT()
      updateRole(role)
    }
  },
  methods: {
    ...mapActions(["login"]),
    ...mapMutations(["updateRole"]),
    onLogin() {
      const { userAlias, password, login } = this
      login({
        payload: {
          userAlias,
          password
        },
        callback: () => {
          this.$router.push("/")
        }
      })
    },
    getRoleInJWT() {
      return JSON.parse(atob(this.jwt.split(".")[1])).Role
    }
  }
}
</script>
