<template>
  <div v-if="isshowgrid">
  <va-card>
    <p class="text-size">Users</p><br>
    <va-data-table
        :fields="fields"
        :data="filteredData"
        :per-page="parseInt(perPage)"
        clickable
      >
    </va-data-table>
  </va-card>
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
        isshowgrid: true,
        perPage: '10',
        perPageOptions: ['4', '6', '10', '20'],
      }
    },
    computed: {
      fields () {
      return [{
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
      var data = [{
        username:'Vengatesh',
        roles:'Admin',
        phone_number:'8989898989'
      },{
        username:'Alagarsamy',
        roles:'Sales',
        phone_number:'9090909090'
      }]
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
