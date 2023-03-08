<template>  
  <form class="login-form" @submit.prevent="onsubmit">
  <h1>LOG IN</h1>

    <va-input
      v-model="username"
      type="text"
      placeholder="Username"
      required="true"
    />
    <div>
      <va-input
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Password"
        pattern="[A-Za-z0-9_@!./#&+-^]{8,}$"
        required="true"
      />
      <span v-if="password.length" @click="showHidePassword()"><i v-bind:class="{'fa-eye fa-eye-slash' : showPassword }" class="fa fa-fw field-icon fa-eye"></i></span>
    </div>

    <div v-if="err_flag" style="color: Tomato;"><label>{{err_msg}}</label></div>
    <div class="d-flex justify--center mt-3 login-btn-container">      
      <va-button type="submit" class="my-0 login-btn" v-bind:class="{ 'disable-btn' : isLogging }">
      <span v-if="isLogging"><i class="fa fa-spinner fa-spin"></i></span><p style="color: white;">Log in</p></va-button>
    </div>
  </form>
</template>

<script>
import config from '../../../i18n/en'
import Vue from 'vue'
import vueResource from 'vue-resource'
import { navigationRoutes } from '../../admin/app-sidebar/NavigationRoutes'
import { sidebar } from '../../../i18n/sidebar.js'

Vue.use(vueResource)
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      keepLoggedIn: false,
      err_flag: false,
      err_msg: '',
      isLogging: false,
      showPassword: false
    }
  },
  methods: {
    showHidePassword() {
         this.showPassword = !this.showPassword;
    },
    onsubmit () {
      this.isLogging = true;
      this.$http.post(config.menu.host + '/auth/login', { username: this.username, password: this.password })
        .then(data => {
          this.create_org_flag = false
          var response = data.body
          var vm = this
          console.log("response..",response)
          Vue.$cookies.set('x-access-token', response.token)
          Vue.$cookies.set('user-id', response.userId)
          Vue.$cookies.set('org-id', response.orgId)
          Vue.$cookies.set('first_name',response.first_name)
          //Vue.$cookies.set('reseller_id', response.reseller_id)
          //Vue.$cookies.set('userRole', response.roles)
          //Vue.$cookies.set('ad_provision', response.ad_provision)
          //Vue.$cookies.set('allowed_app', response.allowed_app)
          Vue.$cookies.set('roles', response.roles)
          //Vue.$cookies.set('org_create_provision', response.org_create_provision)
          var navigation_routes = navigationRoutes.routes
          
          var user_role = response.roles
          var routes_data_by_role = []
          for (var i = 0; i < navigation_routes.length; i++) {
            if (navigation_routes[i].meta.authorize.includes(user_role)) {
              routes_data_by_role.push(navigation_routes[i])
            }
          }
          navigationRoutes.routes = routes_data_by_role
          this.$router.push({ name: 'dashboard' })
        }, err => {
          this.isLogging = false;
          this.err_flag = true;
          this.err_msg = 'Invalid login credentials'
        })
    },
  },
}
</script>

<style lang="scss">
  .login-btn-container {
    .login-btn {
      background: black !important;
      border-radius: 4px;
      box-shadow: none !important;
      font-size: 14px;
      font-weight: normal;
    }
  }

  .login-form {
    .va-input__container {
      border: none;
      background: transparent;
      margin: 0;
    }
  }

  .disable-btn {
    opacity: 0.5;
    pointer-events: none;
    margin-right: 5px;
  }

  .field-icon {
    float: right;
    margin-right: 10px;
    margin-top: -43px;
    position: relative;
    z-index: 2;
    cursor: pointer;
  }
</style>
