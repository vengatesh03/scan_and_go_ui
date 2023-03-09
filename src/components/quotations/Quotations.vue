<template>
  <div v-if="isshowgrid">
    <va-card title="User List">
      <div class="row align--center">
        <div class="flex xs12 md6">
          <va-input class="va-input-search-container"
            :value="term"
            placeholder="search"
            @input="search"
            removable
          >
            <va-icon name="fa fa-search" slot="prepend" />
          </va-input>
        </div>
        <div class="flex xs12 md3 offset--md3">
          <va-button color="success" icon="fa fa-plus" v-if="adminRole || createProvision" @click="add()">Add</va-button>
        </div>
      </div>
      <va-data-table
        :fields="fields"
        :data="filteredData"
        :per-page="parseInt(perPage)"
        clickable
      >
        <template slot="actions" slot-scope="props">
          <va-button flat small color="gray" icon="fa fa-pencil" v-if="adminRole || createProvision" @click="edit(props.rowData)" class="ma-0"></va-button>
        </template>
      </va-data-table>
    </va-card>
  </div>
  <div v-else-if='isshowForm'>
    <div>
      <va-card :title="title">
        <template slot="actions">
          <va-button color="gray" @click="list()">List</va-button>
        </template>
        <div>
          <form>
            <span v-if="isCreate" class="va-form-label va-form-required-label">Role</span>
            <va-select
              v-if = "isCreate"
              placeholder="Select Role"
              v-model="role"
              textBy="role"
              :options="role_obj"
              :error="!!roleErrors.length"
              :error-messages="roleErrors"
              noClear
            />
            <span v-if="isUpdate" class="va-form-label va-form-required-label">Role</span>
            <va-input
              v-if = "isUpdate"
              v-model="role"
              type="text"
              :disabled="true"
            />
            <span class="va-form-label va-form-required-label">User Name</span>
            <va-input
              v-if = "isCreate"
              v-model.trim="username"
              type="text"
              placeholder="Enter User Name"
              pattern="^[a-z0-9]+$"
              :error="!!userNameErrors.length"
              :error-messages="userNameErrors"
              :required="true"
            />
            <va-input
              v-if = "isUpdate"
              v-model="username"
              type="text"
              :disabled="true"
            />
            <span class="va-form-label va-form-required-label">Password (Minimum length should be 8)</span>
            <va-input
              v-model.trim="password"
              type="password"
              placeholder="Enter Password"
              pattern="[A-Za-z0-9_@!./#&+-^]{8,}$"
              :error="!!passwordErrors.length"
              :error-messages="passwordErrors"
            />
            <span class="va-form-label va-form-required-label">Mobile Number</span>
            <va-input
              v-model.trim="phone_number"
              type="telphone"
              pattern="[6-9]{1}[0-9]{9}"
              maxlength="10"
              placeholder="Enter Mobile Number"
              :error="!!mobileNumberErrors.length"
              :error-messages="mobileNumberErrors"
            />
            <div class="d-flex justify--end mt-3">
              <va-button type="submit" class="my-0 va-button-normal-cancel" @click.prevent="list()">Cancel</va-button>
              <va-button v-if="isCreate" type="submit" class="my-0" @click.prevent="createUser()">Create</va-button>
              <va-button v-if="isUpdate" type="submit" class="my-0" @click.prevent="updateUser()">Update</va-button>
            </div>
          </form>
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import vueResource from 'vue-resource'
import { search } from '../../i18n/search.js'
import config from '../../i18n/en.json'
import { debounce } from 'lodash'
import REGEX from '../../i18n/regex_pattern'
Vue.use(vueResource)
export default {
  name: 'org',
  created () {
    this.getAllUser()
  },
  data () {
    return {
      term: null,
      perPage: '10',
      perPageOptions: ['4', '6', '10', '20'],
      isshowgrid: false,
      isshowForm: false,
      isCreate: false,
      isUpdate: false,
      showRemoveModal: false,
      status: false,
      orgFlag: false,
      createProvision: false,
      adminRole: true,
      role: '',
      password: '',
      username: '',
      phone_number: '',
      title: '',
      userData: [],
      orgNameErrors: [],
      roleErrors: [],
      userNameErrors: [],
      mobileNumberErrors: [],
      passwordErrors: [],  
      role_obj:[{id:1,role:'Admin'},{id:2,role:'Sales'},{id:3,role:'Cashier'}]    
    }
  },
  computed: {
    checkpassword () {
      if (this.password.length >= 8) {
        return true
      } else {
        return false
      }
    },
    formReady () {
      return !this.userNameErrors.length && !this.firstNameErrors.length && !this.roleErrors.length && !this.mobileNumberErrors.length
    },
    fields () {
      return [{
        name: 'sno',
        title: 'S.NO',
        width: '6%',
      }, {
        name: 'username',
        title: 'User Name',
      },
      {
        name: 'roles',
        title: 'Role',
      },
      {
        name: 'phone_number',
        title: 'Phone Number',
      },
      {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
    filteredData () {
      return search(this.term, this.userData)
    },
  },
  methods: {
    getOrgData (org_name) {
      this.role_obj = []
      this.role = ''
      this.orgFlag = true
      if(this.org_name.org_type === null){
        this.role_obj = [{id: 'SALES'},{id: 'SUPPORT'},{id: 'ADVANCE SUPPORT'},{id: 'FINANCE'},{id:'PROVIDER'}]
        this.org_update_flag = true
      }else{
        this.role_obj = [{ id: org_name.org_type }]
        this.org_update_flag = false
      }
    },
    getAllUser () {
      var role = this.$cookies.get('userRole')
      if (role === 'ADMIN') {
        this.adminRole = true
        this.createProvision = true
      } else {
        this.adminRole = false
      }
      this.$http.get(config.menu.host + '/user').then(response => {
        let index = 0
        this.userData = []
        var vm = this;
        response.body.map(function (item) {
          item.id = index++
          item.sno = index
          item.is_existing = true
          item.checkbox_value = false
          if(!vm.adminRole && (item.roles == 'OPERATOR' || item.roles == 'HEPI_OPERATOR')){
            vm.userData.push(item)
          }else if(vm.adminRole){
            vm.userData.push(item)
          }
        })
        this.isshowForm = false
        this.isshowgrid = true
        var ref = this
        this.$http.get(config.menu.host + '/org').then(response => {
          response.body.map(function (thing) {
            if (thing.org_type === 'RESELLER' || thing.org_type === 'HEPI_RESELLER') {
              ref.createProvision = thing.sub_operators
            }
            ref.orgArr = response.body
            ref.orgArr.map(function (arg, i) { arg.id = i + 1 })
            ref.orgArr = ref.orgArr.filter(function (prop) {
              return (prop.org_type !== 'ADMIN')
            })
          })
        })
      })
    },
    createUser () {
      this.userNameErrors = this.username ? [] : ['User Name is required']
      this.firstNameErrors = this.first_name ? [] : ['First Name is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      this.mobileNumberErrors = this.phone_number ? [] : ['Phone Number is required']
      this.roleErrors = this.role ? [] : ['Role is required']

      if (!this.checkpassword) {
        Vue.notify({ text: 'Password Length must 8 Characters', type: 'error' })
        return
      }
      if (!this.formReady) {
        return
      }
      if (!REGEX.smallAndNumber(this.username)) {
        return this.userNameErrors.push('Only Lower Case and Numbers are allowed')
      }
      var payload = {
        org_name: this.org_name.org_name,
        org_id: this.org_name.org_id,
        reseller_org_id: this.org_name.reseller_org_id,
        username: this.username,
        roles: this.role.id,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        status: this.status,
        phone_number: this.phone_number,
        org_update_flag: this.org_update_flag,
        partner_code: this.partner_code
      }
      const loader = Vue.$loading.show({ width: 40, height: 40 })
      this.$http.post(config.menu.host + '/user', payload).then(responseData => {
        loader.hide()
        if (responseData && responseData.body) {
          Vue.notify({ text: responseData.body, type: 'success' })
        }
        this.list()
      }, errResponse => {
        loader.hide()
        if (errResponse && errResponse.body) {
          Vue.notify({ text: errResponse.body, type: 'error' })
        }
      })
    },
    updateUser () {
      this.firstNameErrors = this.first_name ? [] : ['First Name is required']
      this.mobileNumberErrors = this.phone_number ? [] : ['Phone Number is required']
      if (this.password && !this.checkpassword) {
        Vue.notify({
          text: 'Password Length must 8 Characters',
          type: 'error',
        })
        return
      }
      if (!this.formReady) {
        return
      }
      var payload = {  
        username: this.username,
        role: this.role,
        last_name: this.last_name,
        first_name: this.first_name,
        phone_number: this.phone_number,
        partner_code: this.partner_code,
        status: this.status,
        partner_code: this.partner_code
      }
      if (this.password) {
        payload.password = this.password
      }
      const loader = Vue.$loading.show({ width: 40, height: 40 })
      this.$http.put(config.menu.host + '/user/' + this.user_id, payload).then(resp => {
        loader.hide()
        if (resp && resp.body) {
          Vue.notify({ text: resp.body, type: 'success' })
        }
        this.list()
      }, errResponse => {
        loader.hide()
        if (errResponse && errResponse.body) {
          Vue.notify({ text: errResponse.body, type: 'error' })
        }
      })
    },
    add () {
      this.title = 'Create User'
      this.username = ''
      this.password = ''
      this.role = ''
      this.phone_number = ''
      this.status = true
      this.userNameErrors = []
      this.passwordErrors = []
      this.mobileNumberErrors = []
      this.roleErrors = []

      this.isshowForm = true
      this.isshowgrid = false
      this.isUpdate = false
      this.isCreate = true
    },
    edit (row) {
      this.title = 'Update User'
      this.user_id = row.user_id
      this.org_name = row.org_name
      this.first_name = row.first_name
      this.last_name = row.last_name
      this.username = row.username
      this.role = row.roles
      this.password = ''
      this.phone_number = row.phone_number
      this.partner_code = row.partner_code
      this.status = row.status ? true : false
      this.partner_code = row.partner_code
      this.isshowgrid = false
      this.isshowForm = true
      this.isCreate = false
      this.isUpdate = true
      this.org_update_flag = false
    },
    list () {
      this.isshowForm = false
      this.isshowgrid = true
      this.getAllUser()
      this.passwordErrors = []
      this.firstNameErrors = []
      this.mobileNumberErrors = []

    },
    search: debounce(function (term) {
      this.term = term
    }, 400),
  },
}
</script>
<style>
  .checkbox {
    width: 40px;
    height: 22px;
    accent-color: #121212;
  }

  .va-checkbox__square:active input {
    background-color: #121212;
  }
</style>
