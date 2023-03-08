<template>
  <div v-if="isshowgrid">
    <va-card title="Inventory List">
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
        <div slot="actions" class="mt-1">
          <va-button color="success" icon="fa fa-plus" @click="add()">Add</va-button>
          <va-button color="purple" icon="fa fa-plus" @click="initiateImport()">Import</va-button>
        </div>
        <va-modal
          class="flex xs12"
          v-model="importModal"
          size='small'
          okText=""
          cancelText=""
          @cancel="cancelImport()"
          noEscDismiss>
          <template #header>
            <h2>Import CSV</h2>
          </template>
          <va-button small color="danger" icon="entypo entypo-cancel" class="model_cancel " @click="cancelImport()"></va-button><br>
          <va-button v-if="!make_import" @click="makeImport()">Upload</va-button>
          <div class="row mt-2">
            <va-file-upload
              v-if="bulkData"
              type="single"
              v-model="importData"
            />
            <a class="download_script" href="#" style="margin-left: 40px; margin-top: 8px;" v-if="bulkData" @click="downloadFormat()">Download Format</a>
          </div>
          <div v-if="bulkData" style="text-align: right;">
            <va-button type="submit" class="my-0" @click.prevent="saveImport()">Import</va-button>
            <va-button type="submit" class="my-0 va-button-normal-cancel" @click.prevent="cancelImport()">Cancel</va-button>
          </div>
        </va-modal>
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
            <span class="va-form-label va-form-required-label">Product Name</span>
            <va-input
              v-model.trim="product_name"
              type="text"
              placeholder="Enter Product Name"
              pattern="^[A-Za-z0-9_-]+(?: +[A-Za-z0-9_-]+)*$"
              :error="!!productNameErrors.length"
              :error-messages="productNameErrors"
            />
            <span class="va-form-label va-form-required-label">Brand Name</span>
            <va-input
              v-model.trim="brand_name"
              type="text"
              placeholder="Enter Product Name"
              pattern="^[A-Za-z0-9_-]+(?: +[A-Za-z0-9_-]+)*$"
              :error="!!brandNameErrors.length"
              :error-messages="brandNameErrors"
            />
            <span class="va-form-label va-form-required-label">Bar Code</span>
            <va-input
              v-model.trim="bar_code"
              type="text"
              placeholder="Enter Bar Code"
              pattern="^[A-Za-z0-9_-]+(?: +[A-Za-z0-9_-]+)*$"
              :error="!!barCodeErrors.length"
              :error-messages="barCodeErrors"
            />
            <span class="va-form-label va-form-required-label">Price</span>
            <va-input
              v-model.trim="number"
              type="text"
              placeholder="Enter Price"
              pattern="^[A-Za-z0-9_-]+(?: +[A-Za-z0-9_-]+)*$"
              :error="!!priceErrors.length"
              :error-messages="priceErrors"
            />
            <span class="va-form-label va-form-required-label">Selling Price</span>
            <va-input
              v-model.trim="number"
              type="text"
              placeholder="Enter Selling Price"
              pattern="^[A-Za-z0-9_-]+(?: +[A-Za-z0-9_-]+)*$"
              :error="!!sellingPriceErrors.length"
              :error-messages="sellingPriceErrors"
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
  <va-card title="Inventory List" v-else-if="isShowCust">
    <template slot="actions">
      <va-button type="submit" color="warning" icon="fa fa-arrow-circle-left" class="my-0" @click="backPage()">Back</va-button><br>
    </template>
    <template>
      <div class="container row">
        <div class="left" style="margin-top: 17px;">S.No</div>
        <div class="labelwidth left">Product Name</div>
        <div class="labelwidth left">Brand Name</div>
        <div class="labelwidth left">Barcode</div>
        <div  class="labelwidth left">Price</div>
        <div class="labelwidth left">Selling Price</div>
      </div>
      <!-- <div class="row align--center"></div> -->
      <fieldset class="row align--center" v-for="(row, i) in cust_list" :key="i">
        <label v-if="((i+1)<=9)" style="margin-right: 9px;" class="left">{{i+1}}</label>
        <label v-if="((i+1)>9)" class="left">{{i+1}}</label>
        <input
          v-if="!row.flag"
          class="width left"
          v-model="row.product_name"
          type="text"
          :error="!!productNameErrors.length"
          :error-messages="productNameErrors"
        />
        <input
          v-if="row.flag"
          class="width left activeClass"
          v-model="row.product_name"
          type="text"
          :error="!!productNameErrors.length"
          :error-messages="productNameErrors"
        />
        <input
          v-if="!row.flag"
          class="width left"
          v-model="row.brand_name"
          type="text"
          :error="!!brandNameErrors.length"
          :error-messages="brandNameErrors"
        />
        <input
          v-if="row.flag"
          class="width left activeClass"
          v-model="row.brand_name"
          type="text"
          :error="!!brandNameErrors.length"
          :error-messages="brandNameErrors"
        />
        <input
          v-if="!row.flag"
          class="width left"
          v-model="row.barcode"
          type="text"
          :error="!!barCodeErrors.length"
          :error-messages="barCodeErrors"
        />
        <input
          v-if="row.flag"
          class="width left activeClass"
          v-model="row.barcode"
          type="text"
          :error="!!barCodeErrors.length"
          :error-messages="barCodeErrors"
        />
        <input
          v-if="!row.flag"
          class="width left"
          v-model="row.price"
          type="text"
          :error="!!priceErrors.length"
          :error-messages="priceErrors"
        />
        <input
          v-if="row.flag"
          class="width left"
          v-model="row.price"
          type="text"
          :error="!!priceErrors.length"
          :error-messages="priceErrors"
        />
        <input
          v-if="!row.flag"
          class="width left activeClass"
          v-model="row.selling_price"
          type="text"
          :error="!!sellingPriceErrors.length"
          :error-messages="sellingPriceErrors"
        />
        <input
          v-if="row.flag"
          class="width left activeClass"
          v-model="row.selling_price"
          type="text"
          :error="!!sellingPriceErrors.length"
          :error-messages="sellingPriceErrors"
        />
        <!-- <va-button flat small color="red" icon="fa fa-remove" @click="delCustList(row,i)" class="ma-0"></va-button> -->
      </fieldset><br>
      <div style="text-align: right;">
        <va-button type="submit" class="my-0" @click.prevent="createSubscription()">Submit</va-button>
        <va-button type="submit" class="my-0" @click.prevent="backPage()">Cancel</va-button><br>
        <!-- <label class="word">
          <input style=" vertical-align: middle;" type="checkbox" v-model="autorenewal"/> <label style="font-size: 11px;"> Enable Auto Renewal</label>
        </label> -->
      </div>
    </template>
  </va-card>
</template>

<script>
import Vue from 'vue'
import vueResource from 'vue-resource'
import { search } from '../../i18n/search.js'
import config from '../../i18n/en.json'
import { debounce } from 'lodash'
import { exportToFile } from '../../i18n/exportToFile.js'
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
      title: '',
      productNameErrors: [],
      brandNameErrors: [],
      brand_name: '',
      product_name: '',
      barcode: '',
      barCodeErrors: [],
      importData: [],
      importModal: false,
      price: 0,
      selling_price: 0,
      priceErrors: [],
      sellingPriceErrors: [],
      bulkData: false,
      make_import: false,
      isShowCust: false,
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
        name: 'first_name',
        title: 'First Name',
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
    createSubscription () {
      this.iscreated = true
      var ref = this
        var dupeFlag = false
        var cust_arr = []
        var amount = 0
        var vm = this
        const loader = Vue.$loading.show({ width: 40, height: 40 })
        if (this.cust_list.length > 0) {
          loop:
          this.cust_list.map(function (prop) {
            var subscription_id = vm.guid()
            cust_arr.push(prop)
          })
        }
        var payload = {
          arr: cust_arr
        }
        if (!dupeFlag) {
          loader.hide()
          execute(this)
        } else {
          this.cust_list.map(function (arg) { arg.amount = vm.amount })
          Vue.notify({ text: 'Please remove duplicate entries', type: 'error' })
          return loader.hide()
        }
      
      function execute (vm) {
        vm.addonbundleArr.map(function(iter, i){iter.id = i+1})
        const loader = Vue.$loading.show({ width: 40, height: 40 })
        ref.$http.post(config.menu.host + '/inventory', payload).then(resp => {
          loader.hide()
          if (resp && resp.body.msg) {
            ref.msgFlag = true
            ref.msg = resp.body.msg
            ref.btn = resp.body.btn
            ref.account_balance = resp.body.account_balance
            ref.adjusted_amount = resp.body.adjusted_amount
            ref.reseller_cost = resp.body.reseller_cost
          } else if (resp && resp.body.url) {
            window.open(resp.body.url, '_self')
          } else {
            Vue.notify({ text: resp.body, type: 'success' })
            ref.list()
          }
        }, errResponse => {
          loader.hide()
          if (errResponse && errResponse.body.dupe) {
            var totalData = ref.cust_list
            ref.isShowCust = false
            totalData.map(function (obj) {
              errResponse.body.dupe.map(function (thing) {
                if (obj.name == thing.name) {
                  obj.amount = ref.amount
                  obj.flag = true
                }
              })
            })
            ref.cust_list = totalData
            ref.isShowCust = true
            Vue.notify({ text: 'Please change duplicate details', type: 'error' })
          } else {
            Vue.notify({ text: errResponse.body, type: 'error' })
          }
        })
      }
    },
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
    backPage () {
      this.isshowgrid = true
      this.importData = []
      this.cancelImport()
    },
    delCustList (row, index) {
      this.cust_list = this.cust_list.filter(function (prop) {
        return prop.index != row.index
      })
      this.msgFlag = false
    },
    saveImport () {
      if (this.importData && this.importData.length > 0) {
        const loader = Vue.$loading.show({ width: 40, height: 40 })
        var file_content = this.importData[0]
        var reference = this.$http
        var ref = this
        var sno = 0
        var str = file_content.type.split('/')
  
        this.selectedFile = file_content
        if (typeof (FileReader) !== 'undefined') {
          var reader = new FileReader()
          reader.onload = function (e) {
            var headerKeys = ['Product Name', 'Brand Name', 'Barcode', 'Price', 'Selling Price']
            var cust_list = new Array()
            var rows = e.target.result.split('\n')
            var proceedFlag = false
            for (var i = 0; i < rows.length; i++) {
              if (i == 0) {
                var cells = rows[i].split(',')
                var compareArray = JSON.stringify(headerKeys) == JSON.stringify(cells).replace(/\\r/g, '')
                if (compareArray) {
                  proceedFlag = true
                } else {
                  loader.hide()
                  return Vue.notify({ text: "Please don't remove or modify the columns", type: 'error' })
                }
              }
              if (proceedFlag && (i > 0)) {
                var cells = rows[i].split(',')
                if (cells.length > 1) {
                  if ((cells[0] && cells[0].length > 0) && (cells[1] && cells[1].length > 0) && (cells[2] && cells[2].length > 0)) {
                    var cust = {}
                    cust.index = sno++
                    cust.product_name = cells[0]
                    cust.brand_name = cells[1]
                    cust.barcode = cells[2]
                    cust.price = cells[3]
                    cust.selling_price = cells[4]
                    cust_list.push(cust)
                  } else {
                    cust_list = []
                    loader.hide()
                    return Vue.notify({ text: "Please enter valid details, don't leave it empty", type: 'error' })
                  }
                }
              }
            }
            if (cust_list.length > 0) {
              loader.hide()
              ref.isShowCust = true
              ref.importModal = false
              ref.isshowgrid = false
              ref.bulkCreate = true
              ref.cust_list = cust_list
              console.log("cust_list",JSON.stringify(cust_list))
            } else {
              loader.hide()
              return Vue.notify({ text: 'File is empty.', type: 'error' })
            }
          }
          reader.readAsText(this.selectedFile)
        } else {
          loader.hide()
          return alert('This browser does not support HTML5.')
        }
      } else {
        return Vue.notify({ text: 'No File Found.', type: 'error' })
      }
    },
    initiateImport () {
      this.importModal = true
      this.makeImport()
    },
    makeImport () {
      this.bulkData = true
      this.make_import = true
    },
    downloadFormat () {
      this.cancelImport()
      var rowKeys = {
        product_name: 'Product Name',
        brand_name: 'Brand Name',
        barcode: 'Barcode',
        price: 'Price',
        selling_price: 'Selling Price'
      }
      var subscriber_list = []
      exportToFile(subscriber_list, rowKeys, 'InventoryFormat', 'CSV')
    },
    cancelImport () {
      this.importModal = false
      this.make_import = false
      this.bulkData = false
      this.bulkCreate = false
      this.bundle = ''
      this.addonbundle = []
      this.mode = ''
      this.btn = ''
      this.msg = ''
      this.allowed_device = ''
      this.msgFlag = false
      this.importData = []
    },
    getAllUser () {
      var role = "ADMIN"
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
      var role = this.$cookies.get('userRole')
      if (role === 'ADMIN') {
        this.role_obj = [{ id: 'RESELLER' }, { id: 'OPERATOR' }, { id: 'HEPI_RESELLER'}, { id: 'HEPI_OPERATOR'},{id:'PROVIDER'}]
      } else if (role === 'RESELLER' || role === 'HEPI_RESELLER') {
        this.orgArr = this.orgArr.filter(function (prop) { return (prop.org_type === 'OPERATOR' || prop.org_type === 'HEPI_OPERATOR') })
        this.role_obj = [{ id: 'OPERATOR' }, { id: 'HEPI_OPERATOR'}]
      }
      this.title = 'Create Inventory'
      this.username = ''
      this.first_name = ''
      this.last_name = ''
      this.password = ''
      this.org_name = ''
      this.role = ''
      this.phone_number = ''
      this.partner_code=''
      this.city = ''
      this.status = true
      this.set_moq = false
      this.free_credit = false
      this.sub_operators = false
      this.enable_vod = false
      this.ad_provision = false

      this.userNameErrors = []
      this.firstNameErrors = []
      this.lastNameErrors = []
      this.passwordErrors = []
      this.mobileNumberErrors = []
      this.roleErrors = []


      this.isshowForm = true
      this.isshowgrid = false
      this.isUpdate = false
      this.isCreate = true
      this.org_update_flag = false
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

  .labelwidth {
    width: 149px;
    margin-top: 17px;
  }

  .left {
    margin-left: 6px;
    color: black;
  }

  .width {
    width: 150px;
  }
</style>
