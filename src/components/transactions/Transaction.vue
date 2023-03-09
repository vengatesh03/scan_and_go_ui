<template>
  <va-card>
    <p class="text-size">Transactions</p><br>
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
        lineChartData: '',     
        donutChartData: '',   
        verticalBarChartData: '',
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
        name: 'counterparty_name',
        title: 'Company Name',
      },
      {
        name: 'name',
        title: 'Transaction Name',
      },
      {
        name: 'initiator_document_full_number',
        title: 'Document Number',
      },
      {
        name: 'goods_status_text',
        title: 'Goods status',
      },
      {
        name: 'last_modified_date',
        title: 'Last Modified Date',
      },
      {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
    filteredData () {
      var data = [{"active_tags":[],"counterparty_id":80442,"counterparty_name":"Surya Demo Supplier","initiator_document_full_number":"PO - PO00001","invoice_status_text":"Invoice Pending","goods_status_text":"Not Received","last_modified_date":"2023-03-07 14:52:40.589691","initiator_object_type":1,"id":1143667,"name":"Dummy Purchase Order Transaction","initiator_object_id":788129,"invoice_status":"1","goods_status":"11"},{"active_tags":[],"counterparty_id":80473,"counterparty_name":"Merc Demo Buyer","initiator_document_full_number":"OC - OC00001","invoice_status_text":"Invoice Pending","goods_status_text":"Not Dispatched","last_modified_date":"2023-03-07 14:52:40.492161","initiator_object_type":4,"id":1143666,"name":"Dummy Order Confirmation Transaction","initiator_object_id":602365,"invoice_status":"1","goods_status":"1"}]
      return search(this.term, data)
    },
    },
    methods: {
      getData(){

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
