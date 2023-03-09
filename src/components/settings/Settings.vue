<template>
  <va-card>
    <div class="ml-2 text-size row">
      <p><b>Welcome to Scan & Go,</b></p>
    </div>
  <div class="row row-equal">
    <div class="flex xs12 md6 xl6">
      <!-- <va-card title="Highly Profited Products"> -->
        <h1>Highly Profited Products</h1>
        <va-chart class="chart chart--donut" :data="donutChartData" type="donut"/>
      <!-- </va-card> -->
    </div>
    <div class="flex xs12 md6 xl6">
      <!-- <va-card title="Highly Profited Days"> -->
        <h1>Highly Profited Days</h1>
        <va-chart class="chart chart--donut" :data="verticalBarChartData" type="vertical-bar"/>
      <!-- </va-card> -->
    </div>
  </div><br>
   <div class="flex xs12 xl12">
      <!-- <va-card title="Over All Sales "> -->
        <h1>Over All Sales</h1>
        <va-chart class="chart" ref="lineChart" :data="lineChartData" type="line"/>
      <!-- </va-card> -->
    </div>
  </va-card>
</template>

<script>
  import Vue from 'vue'
  import vueResource from 'vue-resource'
  import config from '../../i18n/en.json'
  import { hex2rgb } from '../../services/vuestic-ui'
  Vue.use(vueResource)
  export default {
    name: 'dashboard',
    created() {
      this.getData();
    },
    data() {
      return {
        lineChartData: '',     
        donutChartData: '',   
        verticalBarChartData: '',
      }
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
    font-size: 35px;
  }

  .lable-size {
    font-size: 22px;
  }

  .chart {
    height: 200px;
    margin-top: 37px;
  }

  .header-size {
    font-size: 20px;
  }

  .card_set {
    max-width: 62.8909%;
  }

  .exp {
    font-size: 18px;
    background: #fcd6d6;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    color: #ff0800;
    height: fit-content;
    padding: 7px;
    margin-left: 100px;
  }

  .subcss {
    font-size: 18px;
    background: #f2f2f2;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    height: fit-content;
    padding: 4px;
  }

  .badge {
    height: 18px;
    margin-top: 4px;
  }

  .vl {
    border-left: 1px solid #c6c6c6;
    height: 200px;
    margin-top: 70px;
  }

  .card-radius {
    border-radius: 25px;
  }

  .va-chart {
    pointer-events: none;
  }

  .font-title {
    font-size: 19px;
  }

  .day {
    font-size: 17px;
  }

  .credit_btn {
    margin-bottom: 40px;
    font-weight: 700;
  }
</style>
s