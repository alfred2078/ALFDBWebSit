<template>
  <div class="dash-main">
    <div class="dash-header">
      <chart-card class="dash-header-item" :total="expCount" title="异常未处理"  >
        <el-tooltip slot="cardTitle" class="item" effect="dark" content="异常说明" placement="right-start">
          <i class="el-icon-chat-dot-round"></i>
        </el-tooltip>        
        <span slot="footerSlot">{{ `当日凭证总数：${expOrderQty}` }}</span>
      </chart-card>
      <chart-card class="dash-header-item-receivetran" :total="`${recPercentage}`" title="当日收货总数">
        <el-tooltip slot="cardTitle" class="item" effect="dark" content="指标说明" placement="right-start">
          <i class="el-icon-chat-dot-round"></i>
        </el-tooltip>        
        <span slot="footerSlot">{{ `当日收货订单：${recOrderQty}` }}</span>
      </chart-card>
      <!-- <chart-card class="dash-header-item" :total="`${shefPercentage}`" title="当日上架总数">
        <el-tooltip slot="cardTitle" class="item" effect="dark" content="指标说明" placement="right-start">
          <i class="el-icon-chat-dot-round"></i>
        </el-tooltip>       
        <span slot="footerSlot">{{ `当日上架任务：${shefOrderQty}` }}</span>
      </chart-card> -->
      <chart-card class="dash-header-item-receivetran" :total="`${pickPercentage}`" title="当日发货总数">
        <el-tooltip slot="cardTitle" class="item" effect="dark" content="指标说明" placement="right-start">
          <i class="el-icon-chat-dot-round"></i>
        </el-tooltip>
        
        <span slot="footerSlot">{{ `当日发货单：${pickOrderQty}` }}</span>
      </chart-card>
      <chart-card class="dash-header-item" :total="`${reviPercentage}`" title="未完成质检单">
        <el-tooltip slot="cardTitle" class="item" effect="dark" content="指标说明" placement="right-start">
          <i class="el-icon-chat-dot-round"></i>
        </el-tooltip>
        
        <span slot="footerSlot">{{ `当日质检单：${reviOrderQty}` }}</span>
      </chart-card>
    </div>

    <div class="dash-body">
      <el-tabs v-model="recmonth">
      
        <el-tab-pane class="dash-body-tab-pane" label="月入库情况分析" name="recmonth">
          <el-card body-style="padding:0;" class="dash-header-item" v-if="recmonth=='recmonth'">
            <ve-histogram colors="#60ACFC"  :data="chartData" :grid="grid" :settings="chartSettings"></ve-histogram>
          </el-card>
          <el-card class="dash-header-item" v-if="recmonth=='recmonth'">
            <ve-histogram colors="#e6a23c"  :data="chartData1" :grid="grids" :settings="chartSettings1" :extend="chartSettings1.extend"></ve-histogram>
          </el-card>
          <el-card class="dash-header-item" v-if="recmonth=='recmonth'">
            <ve-pie :data="chartData3" :settings="piechartSettings"></ve-pie>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="月出库情况分析" name="outmobth" class="dash-body-tab-pane" @click="outmobthClick">
            <el-card body-style="padding:0;" class="dash-header-item" v-if="recmonth=='outmobth'">
              <ve-histogram colors="#60ACFC"  :data="outchartData" :grid="grid" :settings="outchartSettings"></ve-histogram>
            </el-card>
            <el-card class="dash-header-item" v-if="recmonth=='outmobth'">
              <ve-histogram colors="#e6a23c"  :data="outchartData1" :grid="grids" :settings="outchartSettings1" :extend="chartSettings1.extend"></ve-histogram>
            </el-card>
            <el-card class="dash-header-item" v-if="recmonth=='outmobth'">
              <ve-pie :data="outchartData3" :settings="outpiechartSettings"></ve-pie>
            </el-card>
    
        </el-tab-pane>
      </el-tabs>      
    </div>
  </div>
</template>

<script>
 import {
    getMaterialDocPoststatuse,
    getReceiveSumQty,
    getOutStockTranSumQty,
    getQualityDetailLinestatus,
    getReceiveTranGroupByMonth,
    getReceiveTranGroupByWarehou,
    getReceiveTranGroupByMaterialno,
    getOutStockGroupByMonth,
    getOutStockGroupByWarehou,
    GetOutStockGroupByMaterialno
  } from "@/api/api";
import {  USER_INFO } from "@/store/mutation-types";
 import Vue from 'vue'
  import chartCard from "@/components/card";
  import OutstockChart from "@/components/chart/OutstockChart.vue";
  const outStockData = [];
  for (let i = 0; i < 12; i += 1) {
    outStockData.push({
      x: `${i + 1}月`,
      y: Math.floor(Math.random() * 1000) + 200
    });
  }

  export default {
    name:"dashboard-dashmain",
    components: {
      chartCard,
      OutstockChart
      
    },
    data() {
      this.chartSettings = {
        yAxisName: "总数量",
        labelMap: {
          'month': '日期',
          'sum': '入库数量'
        },
      };
      this.chartSettings1 = {
        yAxisName: "总数量",
        labelMap: {
          'warehousename': '仓库',
          'sum': '入库数量'
        },
        extend: {
          xAxis:{
            axisLabel:{
                showMaxLabel:true,
                showMinLabel:true,
                color:'#3a3a3a',
                rotate:270, //刻度文字旋转，防止文字过多不显示
                //margin:50,//文字离x轴的距离
                boundaryGap:true,
                // backgroundColor:'#0f0',
                formatter:(v)=>{
                  // console.log('x--v',v)
                  if(v.length>3){
                    return v.substring(0,3)+'...'
                  }
                  return v
                },
              }
          }
        }
      };
      this.piechartSettings = {
          radius: 120,
          offsetY: 230,
          labelMap: {
          'materialdesc': '物料名称',
          'sum': '入库数量'
          },
      };
      this.outchartSettings = {
        yAxisName: "总数量",
        labelMap: {
          'month': '日期',
          'sum': '出库数量'
        },
      };
      this.outchartSettings1 = {
        yAxisName: "总数量",
        labelMap: {
          'warehousename': '仓库',
          'sum': '出库数量'
        },
        
      };
      this.outpiechartSettings = {
          radius: 120,
          offsetY: 230,
          labelMap: {
          'materialdesc': '物料名称',
          'sum': '出库数量'
          },
      };
      return {
        grid:{
          top:80,
          bottom:50
        },
        grids:{
          top:80,
          bottom:20
        },
        recmonth: "recmonth",
        outStockData,
        chartData: {
          columns: ["month", "sum"],
       
          rows: [{
              month: 1,
              sum: 0
            },
            {
              month: 2,
              sum: 0
            },
            {
              month: 3,
              sum: 0
            },
            {
              month: 4,
              sum: 0
            },
            {
              month: 5,
              sum: 0
            },
            {
              month: 6,
              sum: 0
            },
            {
              month: 7,
              sum: 0
            },
            {
              month: 8,
              sum: 0
            },
            {
              month: 9,
              sum: 0
            },
            {
              month: 10,
              sum: 0
            },
            {
              month: 11,
              sum: 0
            },
            {
              month: 12,
              sum: 0
            }
          ]
        },
        chartData1: {
          columns: ["warehousename", "sum"],
          rows: []
        },
        chartData3: {
          columns: ['materialdesc', 'sum'],
          rows: []
        },
        outchartData: {
          columns: ["month", "sum"],
       
          rows: [{
              month: 1,
              sum: 0
            },
            {
              month: 2,
              sum: 0
            },
            {
              month: 3,
              sum: 0
            },
            {
              month: 4,
              sum: 0
            },
            {
              month: 5,
              sum: 0
            },
            {
              month: 6,
              sum: 0
            },
            {
              month: 7,
              sum: 0
            },
            {
              month: 8,
              sum: 0
            },
            {
              month: 9,
              sum: 0
            },
            {
              month: 10,
              sum: 0
            },
            {
              month: 11,
              sum: 0
            },
            {
              month: 12,
              sum: 0
            }]
        },
        outchartData1: {
          columns: ["warehousename", "sum"],
          rows: []
        },
        outchartData3: {
          columns: ['materialdesc', 'sum'],
          rows: []
        },
        modelListWarehouse:{}
      };
    },
    props: {
        expCount: {
        type: String,
        default: "3"
      },
      expOrderQty: {
        type: String,
        default: "0"
      },
      recPercentage: {
        type: String,
        default: "50000"
      },
      recOrderQty: {
        type: String,
        default: "10"
      },
      shefPercentage: {
        type: String,
        default: "40000"
      },
      shefOrderQty: {
        type: String,
        default: "20"
      },
      pickPercentage: {
        type: String,
        default: "60000"
      },
      pickOrderQty: {
        type: String,
        default: "100"
      },
      reviPercentage: {
        type: String,
        default: "2"
      },
      reviOrderQty: {
        type: String,
        default: "10"
      }
    },
    created(){
      this.exp();
      this.outmobthClick()
    },
    methods:{
      exp(){
         
        var min = this;
     

        var user = Vue.ls.get(USER_INFO);
        min.modelListWarehouse =user.modelListWarehouse;
        console.log(1+'--begin---'+new Date());
        getMaterialDocPoststatuse(min.modelListWarehouse).then(res=>{
          console.log(1+'--end---'+new Date());
          if (res.Result === 1) {
             
          
                  min.expCount=res.Data.Poststatus;
                  min.expOrderQty = res.Data.newPoststatus;
              }
              else {
                min.$message.error(res.ResultValue);
              }

        })
        getReceiveSumQty(min.modelListWarehouse).then(res=>{
          if (res.Result === 1) {
               
              console.log(2);
                  min.recPercentage=res.Data.Qty;
                  min.recOrderQty = res.Data.Count;
              }
              else {
                min.$message.error(res.ResultValue);
              } 

        })
     console.log(3+'--begin---'+new Date());
     getOutStockTranSumQty(min.modelListWarehouse).then(res=>{
       
          if (res.Result === 1) {
               
              console.log(3+'--end---'+new Date());
                  min.pickPercentage=res.Data.Qty;
                  min.pickOrderQty = res.Data.Count;
              }
              else {
                min.$message.error(res.ResultValue);
              }

        })
        console.log(4+'--begin---'+new Date());
       getQualityDetailLinestatus(min.modelListWarehouse).then(res=>{
          
          if (res.Result === 1) {
               
               console.log(4+'--end---'+new Date());
                  min.reviPercentage=res.Data.Linestatus;
                  min.reviOrderQty = res.Data.newLinestatus;
              }
              else {
                min.$message.error(res.ResultValue);
              }

        })
        console.log(5+'--begin---'+new Date());
        getReceiveTranGroupByMonth(min.modelListWarehouse).then(res=>{
      
            if (res.Result === 1) {
               
              console.log(5+'--end---'+new Date());
                  min.chartData.rows.forEach(t=>{
                    res.Data.forEach(d=>{
                      if(t.month==d.month)
                      {
                        t.sum=d.sum;
                      }
                    })
                  })       
              }
              else {
                min.$message.error(res.ResultValue);
              }

        })
        console.log(6+'--begin---'+new Date());
        getReceiveTranGroupByWarehou(min.modelListWarehouse).then(res=>{
        
            if (res.Result === 1) {
               
              console.log(6+'--end---'+new Date());
                  min.chartData1.rows=res.Data;
            }
            else {
                min.$message.error(res.ResultValue);
            }
 
        })  
      console.log(7+'--begin---'+new Date());
        getReceiveTranGroupByMaterialno(min.modelListWarehouse).then(res=>{
           
            if (res.Result === 1) {
               
              console.log(7+'--end---'+new Date());
                  min.chartData3.rows=res.Data;
            }
            else {
                min.$message.error(res.ResultValue);
            }

        })
      
      },
      outmobthClick()
      {
        var min = this;


        var user = Vue.ls.get(USER_INFO);
        min.modelListWarehouse =user.modelListWarehouse;
        console.log(5+'--begin---'+new Date());
        getOutStockGroupByMonth(min.modelListWarehouse).then(res=>{
      
            if (res.Result === 1) {
               
              console.log(5+'--end---'+new Date());
                  min.outchartData.rows.forEach(t=>{
                    res.Data.forEach(d=>{
                      if(t.month==d.month)
                      {
                        t.sum=d.sum;
                      }
                    })
                  })       
              }
              else {
                min.$message.error(res.ResultValue);
              }

        })
        console.log(6+'--begin---'+new Date());
        getOutStockGroupByWarehou(min.modelListWarehouse).then(res=>{
        
            if (res.Result === 1) {
            
              console.log(6+'--end---'+new Date());
                  min.outchartData1.rows=res.Data;
            }
            else {
                min.$message.error(res.ResultValue);
            }

        })  
      console.log(7+'--begin---'+new Date());
        GetOutStockGroupByMaterialno(min.modelListWarehouse).then(res=>{
           
            if (res.Result === 1) {
            
              console.log(7+'--end---'+new Date());
                  min.outchartData3.rows=res.Data;
            }
            else {
                min.$message.error(res.ResultValue);
            }

        })

      }
      
    }
  
    
  };

</script>

<style lang="scss">
  .dash-main {
    .dash-header {
      display: flex;
      justify-content: space-between;

      .dash-header-item {
        flex-grow: 1;
        width: 0;
        margin: 5px 5px;
        background-color: #f3ee40f2;
      };
      .dash-header-item-receivetran{
        flex-grow: 1;
        width: 0;
        margin: 5px 5px;
        background-color: #66b1ff;
      }
    }

    .dash-body-tab-pane {
      display: flex;
      justify-content: space-between;

      .dash-header-item {
        flex-grow: 1;
        width: 0;
 
        // margin: 5px 5px;      
      }
    }
  }

</style>
