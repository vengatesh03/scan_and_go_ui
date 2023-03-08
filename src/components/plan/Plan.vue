k<template>
  <div class="dashboard">
    <va-card align="center" justify="center">
      <h1>Welcome To plan</h1>
    </va-card>
    <va-card class="mt-3">
      <label class="va-form-required-label va-form-label text-size">Select Pack</label>
      <!-- <va-select v-model="pack" :options="packArr" @input="dropDown(pack)" :error="!PackErrors.length"
                :error-messages="PackErrors" textBy="Package" multiple searchable /> -->
      <multiselect placeholder="Search Pack" v-model="pack" :close-on-select="false" :clear-on-select="false"
        :preserve-search="true" :hide-selected="false" :taggable="false" track-by="id" id="example"
        :multiple="true" label="pack_with_cost" :options="packArr" @input="dropDown(pack)" />
      <div>
        <label class="text-size">Selected Packages</label>
        <va-button style="float: right;" @click="download_csv_file_package()">Package Export</va-button>
        <textarea v-model="packncost" style="margin-bottom: 50px; min-width: 100%; min-height: 100px; max-width: 100%; max-height: 100px;"></textarea>
      </div>
      <div>
        <label class="text-size">Included Channels</label>
        <va-button style="float: right;" @click="download_csv_file_channel()">Channels Export</va-button>
        <textarea v-model="pack_cha" style="margin-bottom: 25px; min-width: 100%; min-height: 100px; max-width: 100%; max-height: 100px;"></textarea>
      </div>
      <div v-if="this.pack.length>0">
        <label>Total Package Cost : {{ tot_pac_cos }}</label><br/>
        <label>Total Channel Cost : {{ tot_cha_cos }}</label><br/>
        <label>MSO Cost : {{ tot_pac_cos*0.8}} </label><br/>
      </div>  <br/>

      <div v-if="this.pack.length>0">
        <label class="va-form-required-label va-form-label text-size" v-if="show_bundle">Bundle Name</label>
        <!-- <label class="text-size" v-if="show_bundle">Bundle Name *</label><br/> -->
        <va-button style="float: right;"  v-if="save" @click="saveEntry()">Save</va-button>
      </div>
      <div >
        <va-input type="textbox" placeholder="Enter Bundle Name" v-model="bundlename" v-if="go"></va-input>
        <va-button style="float: right;" v-if="go" @click="createBundle()">Go</va-button>
      </div>
    </va-card>
  </div>
</template>
<script>
import Vue from 'vue'
import vueResource from 'vue-resource'
import config from '../../i18n/en.json'
Vue.use(vueResource)
export default {
  name: 'plan',
  beforeCreate () {
    this.$http.get(config.menu.host + '/csvdata').then(resp => {
      this.packArr = resp.body
    })
  },
  data () {
    return {
      pack: [],
      packArr: [],
      PackErrors: [],
      pack_cha: [],
      packncost: [],
      last_index: [],
      tot_pac_cos: '',
      tot_cha_cos: '',
      save: true,
      go: false,
      bundlename: [],
      show_bundle : false

    }
  },
  methods: {
    saveEntry () {
      this.save = false,
      this.go = true,
      this.show_bundle = true
    },
    createBundle () {
      console.log("this.pack_details",JSON.stringify(this.pack_details))
      if(!this.bundlename){
        return Vue.notify({ text: "Please fill the form correctly", type: 'error' })
      }
      var payload = {
        bundle_name: this.bundlename,
        selected_packages: this.packncost,
        selected_channels: this.pack_cha,
        total_package_cost: this.tot_pac_cos,
        total_channel_cost: this.tot_cha_cos,
        mso_cost: this.tot_pac_cos * 0.8,
        pack_details:this.pack_details
      }
      const loader = Vue.$loading.show({ width: 40, height: 40 })
      this.$http.post(config.menu.host + '/bundle', payload).then(function(resp) {
        loader.hide()
        Vue.notify({ text: resp.body, type: 'success' })
      	this.clearText()
      },function(resp) {
        loader.hide()
        Vue.notify({ text: error.body, type: 'error' })
      })
    },
    clearText() {
      this.pack= []
      this.packArr= []
      this.PackErrors= []
      this.pack_cha= []
      this.packncost= []
      this.last_index= []
      this.tot_pac_cos= ''
      this.tot_cha_cos= ''
      this.save= true
      this.go= false
      this.bundlename= []
      this.show_bundle = false
    },
    dropDown (pack) {
      if (pack.length >= 2) {
        this.last_index = pack[pack.length - 1]
        if (this.last_index.Package.includes('AlaCarte')) {
          for (let i = 0; i < pack.length; i++) {
            for (let j = 0; j < pack[i].Channels.length; j++) {
              if ((pack.length - 1) != i) {
                if ((pack[i].Channels[j].Channel.toLowerCase()) == this.last_index.Channels[0].Channel.toLowerCase()) {
                  Vue.notify({ text: 'This channel is already available', type: 'error' })
                  this.pack.pop(pack[pack.length - 1])
                }
              }
            }
          }
        }
        if (!this.last_index.Package.includes('AlaCarte')) {
          for (let i = 0; i < pack.length; i++) {
            for (let j = 0; j < this.last_index.Channels.length; j++) {
              if ((pack.length - 1) != i) {
                if (pack[i].Package.includes('AlaCarte')) {
                  if ((pack[i].Channels[0].Channel.toLowerCase()) == this.last_index.Channels[j].Channel.toLowerCase()) {
                    this.pack.splice(i, 1)
                  }
                }
              }
            }
          }
        }
      }

      var package_cost = []
      var total_cost = []
      this.pack.map(function (data) {
        if (data.Package.includes('AlaCarte')) {
          package_cost.push(data.Package + ':' + data.Channels.map(val => val.Pack_Cost))
          total_cost.push(data.Channels[0].Cost)
        } else {
          data.Channels.map(function (val) {
            if (!package_cost.includes(data.Package + ':' + val.Pack_Cost)) {
              package_cost.push(data.Package + ':' + val.Pack_Cost)
              total_cost.push(val.Pack_Cost)
            }
          })
        }
      })
      if (total_cost.length > 0) {
        this  .tot_pac_cos = total_cost.reduce(addpack)
        function addpack (tot, val) {
          tot = Number(tot)
          val = Number(val)
          return tot + val
        }
      }
      this.packncost = package_cost
      
      var unique = []
      var package_details = []
      var channel_cost = []
      this.pack.map(function (data) {
        data.Channels.map(function (val) {
	      val.Cost = val.Cost ? val.Cost : 0
          if (!unique.includes(val.Channel + ':' + val.Cost)) {
            unique.push(val.Channel + ':' + val.Cost)
            package_details.push(val.Channel + ':' + val.Genre + ':' + val.Language)
            channel_cost.push(val.Cost)
          }
        })
      })
      this.pack_cha = unique
      this.pack_details = package_details
      if (channel_cost.length > 0) {
        this.tot_cha_cos = channel_cost.reduce(addchan)
        function addchan (tot, val) {
          tot = Number(tot)
          val = Number(val)
          return tot + val
        }
      }
      this.tot_pac_cos = Number(this.tot_pac_cos).toFixed(2)
      this.tot_cha_cos = Number(this.tot_cha_cos).toFixed(2)
    },
    download_csv_file_channel () {
      var csv = 'Channels,Cost\n'
      this.pack_cha.forEach(function (row) {
        csv += row.split(':')
        csv += '\n'
      })
      var hiddenElement = document.createElement('a')
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
      hiddenElement.target = '_blank'
      hiddenElement.download = 'ChannelsList.csv'
      hiddenElement.click()
    },
    download_csv_file_package () {
      var csv = 'Package,Cost\n'
      this.packncost.forEach(function (row) {
        csv += row.split(':')
        csv += '\n'
      })
      var hiddenElement = document.createElement('a')
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
      hiddenElement.target = '_blank'
      hiddenElement.download = 'PackageList.csv'
      hiddenElement.click()
    },
  },
}
</script>
<style>
.text-size {
  font-size: medium;
}
</style>

