<template>
  <va-card>
    <p class="text-size">Payments</p><br>
    <div class="row">
      <div v-for="info in infoTiles" :key="i" class="flex xs4 lg3">
        <va-card  color='#c4c2c2'>
          <p style="color: black;">{{info.text}}</p>
          <p class="display-2 mb-0" style="color: black;">{{ info.value }}</p>
        </va-card>
      </div>    
    </div>
    <va-data-table
        :fields="fields"
        :data="filteredData"
        :per-page="parseInt(perPage)"
        clickable
      >
    </va-data-table>
  </va-card>
</template>

<script>
  import Vue from 'vue'
  import vueResource from 'vue-resource'
  import config from '../../i18n/en.json'
  import { hex2rgb } from '../../services/vuestic-ui'
  import { search } from '../../i18n/search.js'

  Vue.use(vueResource)
  export default {
    name: 'dashboard',
    created() {
      this.getData();
    },
    data() {
      return {
        perPage: '10',
        perPageOptions: ['4', '6', '10', '20'],
        infoTiles: [{
          color: '#c4c2c2',
          value: '0.00',
          text: 'Total Payable',
          icon: '',
        }, {
          color: '#c4c2c2',
          value: '0.00',
          text: 'Total Receivable',
          icon: '',
        }, {
          color: '#c4c2c2',
          value: '0.00',
          text: 'Overdue Payable',
          icon: '',
        }, {
          color: '#c4c2c2',
          value: '0.00',
          text: 'Overdue Receivable',
          icon: '',
        }],
        lineChartData: '',     
        donutChartData: '',   
        verticalBarChartData: '',
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
        name: 'company',
        title: 'Company',
      },
      {
        name: 'document_type',
        title: 'Document Type',
      },
      {
        name: 'amt_to_pay',
        title: 'Amount To Pay',
      },
      {
        name: 'amt_paid',
        title: 'Amount Paid',
      },
      {
        name: 'balance_amt',
        title: 'Balance Amount',
      },
      {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
    filteredData () {
      var data = [{"active_tags":[],"balance_amt":80442,"amt_paid":"100","amt_to_pay":"10909","invoice_status_text":"Invoice Pending","company":"Merc Demo Buyer","last_modified_date":"2023-03-07 14:52:40.589691","initiator_object_type":1,"id":1143667,"name":"Dummy Purchase Order Transaction","initiator_object_id":788129,"invoice_status":"1","goods_status":"11"},{"active_tags":[],"balance_amt":80473,"amt_paid":"1000","amt_to_pay":"777890","invoice_status_text":"Invoice Pending","company":"Surya Demo Supplier","last_modified_date":"2023-03-07 14:52:40.492161","initiator_object_type":4,"id":1143666,"name":"Dummy Order Confirmation Transaction","initiator_object_id":602365,"invoice_status":"1","goods_status":"1"}]
      return search(this.term, data)
    },
    },
    methods: {
      getData(){
        this.verticalBarChartData = {
          labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
          datasets: [
            {
              label: 'Sales',
              backgroundColor: '#3ec1ed',
              borderColor: 'transparent',
              data: [50, 20, 12, 39, 25, 40,70],
            }
          ],

        }
        this.donutChartData = {
          labels: ['Gadgets', 'Clothes', 'Furniture','Footwear','Personal Care'],
          datasets: [{
            backgroundColor: ['#E91E34', '#FFD42B', '#FF7700', '#2CB2F2', '#4DA138'],
            data: [20, 30, 40, 50, 100]
            // hover: { mode: null }
          }]
        } 
        function generateArray (length){
          return Array.from(Array(length), generateValue)
        }
        function generateYLabels () {
          const flip = !!Math.floor(Math.random() * 2)
          return flip ? ['Debit', 'Credit'] : ['Credit', 'Debit']
        }
        function getSize () {
          const minSize = 4
          return Math.max(minSize, new Date().getMonth())
        }
        function generateValue (){
          return Math.floor(Math.random() * 100)
        }
        const size = getSize()
        const yLabels = generateYLabels();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let firstMonthIndex = 0
        this.lineChartData = {
          labels: months.splice(firstMonthIndex, size),
          datasets: [
          {
            label: 'Sales',
            backgroundColor: hex2rgb('#34ebd0', 0.6).css,
            borderColor: 'transparent',
            data: generateArray(size),
          }]
        }
        console.log("lineChartData",JSON.stringify(this.lineChartData))
      }
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