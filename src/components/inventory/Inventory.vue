<template>
  <div v-if="isshowgrid">
    <va-card>
      <p class="text-size">Inventory</p><br>
      <div class="flex xs12 md6">
        <!-- <va-button color="success" icon="fa fa-plus" @click="add()">Add</va-button> -->
      </div>

      <va-data-table
          :fields="fields"
          :data="filteredData"
          :per-page="parseInt(perPage)"
          clickable
        >
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
              v-model.trim="price"
              type="text"
              placeholder="Enter Price"
              pattern="^[A-Za-z0-9_-]+(?: +[A-Za-z0-9_-]+)*$"
              :error="!!priceErrors.length"
              :error-messages="priceErrors"
            />
            <span class="va-form-label va-form-required-label">Selling Price</span>
            <va-input
              v-model.trim="selling_price"
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
</template>

<script>
  import Vue from 'vue'
  import vueResource from 'vue-resource'
  import config from '../../i18n/en.json'
  import { search } from '../../i18n/search.js'
  import { hex2rgb } from '../../services/vuestic-ui'
  Vue.use(vueResource)
  export default {
    name: 'transactions',
    created() {
      this.getData();
    },
    data() {
      return {
        isshowgrid: false,
        isshowForm: false,
        product_name:'',
        brand_name:'',
        bar_code:'',
        price:'',
        selling_price:'',
        productNameErrors: [],
        brandNameErrors: [],
        barCodeErrors: [],
        priceErrors: [],
        sellingPriceErrors: [],
        perPage: '10',
        perPageOptions: ['4', '6', '10', '20'],
      }
    },
    computed: {
      fields () {
      return [{
        name: '__slot:marker',
        width: '30px',
        dataClass: 'text-center',
      },
      {
        name: 'product_name',
        title: 'Product Name',
      },
      {
        name: 'brand_name',
        title: 'Brand Name',
      },
      {
        name: 'bar_code',
        title: 'Bar Code',
      },
      {
        name: 'price',
        title: 'Price',
      },
      {
        name: 'selling_price',
        title: 'Selling Price',
      },
      {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
    filteredData () {
      var data = [{
        product_name: 'Material1',
        brand_name: 'Mex Textile',
        bar_code:'759tdff098',
        price:140,
        selling_price:200
      },{
        product_name: 'Material2',
        brand_name: 'Zad Quality',
        bar_code:'099tdff098',
        price:200,
        selling_price:300
      }]
      return search(this.term, data)
    },
    },
    methods: {
      getData(){
        this.isshowgrid = true
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
      this.product_name = ''
      this.brand_name = ''
      this.bar_code = ''
      this.price = ''
      this.selling_proce = ''
      this.productNameErrors = []
      this.brandNameErrors = []
      this.barCodeErrors = []
      this.priceErrors = []
      this.sellingPriceErrors = []
      this.roleErrors = []


      this.isshowForm = true
      this.isshowgrid = false
      this.isUpdate = false
      this.isCreate = true
    },
    }
  }
</script>

<style lang="scss">
  .text-size {
    font-weight: 300 !important;
    font-size: 2.125rem !important;
    line-height: 2.5rem;
    letter-spacing: 0.0073529412em !important;
  }
</style>
