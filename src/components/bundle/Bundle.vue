<template>
  <div v-if="isshowgrid">
    <va-card title="Bundle List">
      <va-data-table
        :fields="fields"
        :data="filteredData"
        :per-page="parseInt(perPage)"
        clickable
      >
        <template slot="packagelist" slot-scope="props">
          <img src="@/assets/GridBundle.png" title="Click to view!" @click="packagelist(props.rowData)" style="width: 20px; height: 20px; margin-top: 2px; cursor: pointer;" />
          </template>
          <template slot="channellist" slot-scope="props">
          <img src="@/assets/Group 108.png" title="Click to view!" @click="channellist(props.rowData)" style="width: 20px; height: 20px; margin-top: 2px; cursor: pointer;" />
          </template>
          <template slot="export" slot-scope="props">
          <img src="@/assets/export.png" title="Click to view!" @click="exportRow(props.rowData)" style="width: 20px; height: 20px; margin-top: 2px; cursor: pointer;" />
          </template>
          <template slot="actions" slot-scope="props">
            <va-button flat small color="red" icon="fa fa-times" @click="removeBundle(props.rowData)" class="ma-0"></va-button>
        </template>
      </va-data-table>
    </va-card>
    <va-modal
        v-model="isChannel"
        size="small"
        noEscDismiss
        noOutsideDismiss
        @ok="list()"
        cancelText=""
        class="flex md12"
      >
        <template #header><h2>Channel List</h2></template><br>
        <div class="ml-4">
          <span class="pre-formatted">{{channelData}}</span>
        </div>
      </va-modal>
      <va-modal
        v-model="isPackage"
        size="small"
        noEscDismiss
        noOutsideDismiss
        @ok="list()"
        cancelText=""
        class="flex md12"
      >
        <template #header><h2>Package List</h2></template><br>
        <div class="ml-4">
          <span class="pre-formatted">{{packageData}}</span>
        </div>
      </va-modal>
    <va-modal
      v-model="showRemoveModal"
      title="Remove Bundle"
      size='small'
      :message="message"
      okText="Confirm"
      cancelText="Cancel"
      @ok="deleteBundle(removed_bundle)"
      @cancel="list()">
    </va-modal>
  </div>
  <div v-else-if='isshowForm'>
    <div>
      <va-card :title="title">
        <template slot="actions">
          <va-button color="gray" @click="list()">List</va-button>
        </template>

      </va-card>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import vueResource from 'vue-resource'
import config from '../../i18n/en.json'
import { search } from '../../i18n/search'
import { exportToFile } from '../../i18n/exportToFile'
import { debounce } from 'lodash'
Vue.use(vueResource)
export default {
  name: 'bundle',
  created () {
    this.getAllBundle()
  },
  data () {
    return {
      term: null,
      isChannel: false,
      isPackage: false,
      perPage: '10',
      perPageOptions: ['4', '6', '10', '20'],
      isshowgrid: true,
      bundleData: [],
      showRemoveModal: false,
      message: '',
      bundleData: '',
      packageData: '',
      channelData:[]
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
        name: 'bundle_name',
        title: 'Bundle',
      },
      {
        name: 'subscription_cost',
        title: 'Subscription Fee',
      },
      {
        name: 'box_fee_qty_1000_boxes',
        title: 'Box Price - 1000',
      },
      {
        name: 'box_fee_qty_500_boxes',
        title: 'Box Price - 500',
      },
      {
        name: 'box_fee_qty_300_boxes',
        title: 'Box Price - 300',
      },
      {
        name: 'box_fee_qty_100_boxes',
        title: 'Box Price - 100',
      },
      {
        name: '__slot:packagelist',
        title: 'Package',
      },
      {
        name: '__slot:channellist',
        title: 'Channel',
      },
      {
        name: '__slot:export',
        title: 'Export',
      },
      {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
    filteredData () {
      return search(this.term, this.bundleData)
    },
  },
  methods: {
    list (){
      this.isChannel = false
      this.isPackage = false
      this.getAllBundle()
    },
    dataFormat(dataToArray){
      var arr = []
      dataToArray = dataToArray.map(function (item, i) {
        var entry = item.split(':').toString()
        var datas = (i+1)+'.  '+entry
        arr.push(datas)
      })

      return arr.join("\n");
    },
    channellist (row){
      var vm=this;
      function replaceCommaLine(data) {
        let dataToArray = typeof(data) == 'string' ? data.split(',') : data
        return vm.dataFormat(dataToArray)
      }
      this.isChannel = true;
      let availableData = row.pack_details
      this.channelData = replaceCommaLine(availableData);
    },
    packagelist(row){
      var vm=this;
      function replaceCommaLine(data) {
        let dataToArray = typeof(data) == 'string' ? data.split(',') : data
        return vm.dataFormat(dataToArray)
      }
      this.isPackage = true;
      let availableData = row.selected_packages
      this.packageData = replaceCommaLine(availableData);
    },
    exportRow (row){
      var vm=this;
      var array = [];
      function replaceCommaLine(data) {
       let dataToArray = typeof(data) == 'string' ? data.split(',') : data
        dataToArray.map(function(mapped_data) {
          var object = {};
          let map_data = mapped_data.split(':')
          object.Channel = map_data[0]
          object.Genre = map_data[1]
          object.Language = map_data[2]
          array.push(object)
        })
       }
      let availableData = row.pack_details
      this.exportData = replaceCommaLine(availableData);
        var rowKeys = {
        Channel: 'Channel',
        Genre: 'Genre',
        Language: 'Language',
      }
      exportToFile(array, rowKeys, 'Channel', 'CSV')
    },
    getAllBundle () {
      const loader = Vue.$loading.show({ width: 40, height: 40 })
	    this.$http.get(config.menu.host + '/bundle').then(response => {
        loader.hide()
        this.bundleData = response.body.map(function (bundle) {
          bundle.selected_packages =bundle.selected_packages !=null  ?  JSON.parse(bundle.selected_packages) : bundle.selected_packages
          bundle.pack_details = bundle.pack_details !=null  ? JSON.parse(bundle.pack_details).toString() : bundle.pack_details
          return bundle
        })
	    }, error => {
        loader.hide()
        if (error && error.body) {
          Vue.notify({ text: error.body, type: 'error' })
        }
      })
	   },
    removeBundle (rowData) {
      this.message = 'Are you sure to delete ' + rowData.bundle_name + ' bundle ?'
      this.showRemoveModal = true
      this.removed_bundle = rowData
    },
    deleteBundle (rowData) {
      const loader = Vue.$loading.show({ width: 40, height: 40 })
      this.$http.delete(config.menu.host + '/bundle/' + rowData.bundle_id).then(response => {
        loader.hide()
        if (response && response.body) {
          Vue.notify({ text: response.body, type: 'success' })
        }
        this.getAllBundle()
      }, error => {
        loader.hide()
        if (error && error.body) {
          Vue.notify({ text: error.body, type: 'error' })
        }
      })
    },
    search: debounce(function (term) {
	    	this.term = term
	    }, 400),
  },
}
</script>
<style>
  .pre-formatted {
    white-space: pre;
    font-size: 15px;
  }
</style>
