<template>
  <form @submit.prevent="onsubmit()">
    <va-input
      v-model.trim="license_key"
      type="text"
      label="License Key"
      placeholder="Enter License Key"
      required="true"
    />
    <label v-if="isShowError" style="color: #f8706d;">{{err_message}}</label>
    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">Submit</va-button>
    </div>
    <va-modal
      v-model="showModal"
      title="User Detail"
      okText="Ok"
      @ok="okModal()"
      cancelText=''
      noOutsideDismiss
      noEscDismiss>
      <div><label>Email     : {{email}}</label></div>
      <div><label>Password  : {{password}}</label></div>
    </va-modal>
  </form>
</template>

<script>
import config from '../../../i18n/en'
import Vue from 'vue'
import vueResource from 'vue-resource'
Vue.use(vueResource)
export default {
  name: 'signup',
  data () {
    return {
      license_key: '',
      isShowError: false,
      showModal: false,
      email: '',
      password: '',
      err_message: '',
    }
  },
  methods: {
    onsubmit () {
      this.isShowError = false
      this.showModal = false
      const loader = Vue.$loading.show({ width: 40, height: 40 })
      this.$http.post(config.menu.host + '/auth/validate_license_key', { license_key: this.license_key }).then(response => {
        loader.hide()
        console.log(response.body);
        var responseBody = response.body
        this.showModal = true
        this.email = responseBody.mail_id
        this.password = responseBody.password
      }, error => {
        loader.hide()
        this.isShowError = true
        if (error.body) {
          this.err_message = error.body
        } else {
          this.err_message = 'Invalid Licence Key Found'
        }
      })
    },
    okModal () {
      this.$router.push({ name: 'login' })
    },
  },
}
</script>

<style lang="scss">
</style>