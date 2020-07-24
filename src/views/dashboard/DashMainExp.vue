<template>
  <div class="dash-main">
    <div class="dash-header">
      <chart-card class="dash-header-item" :total="expCount" title="异常未处理">
        <el-tooltip slot="cardTitle" class="item" effect="dark" content="异常说明" placement="right-start">
          <i class="el-icon-chat-dot-round"></i>
        </el-tooltip>        
        <span slot="footerSlot">{{ `当日异常总数：${expOrderQty}` }}</span>
      </chart-card>
      <chart-card class="dash-header-item" :total="`${recPercentage}`" title="当日收货总数">
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
      <chart-card class="dash-header-item" :total="`${pickPercentage}`" title="当日发货总数">
        <el-tooltip slot="cardTitle" class="item" effect="dark" content="指标说明" placement="right-start">
          <i class="el-icon-chat-dot-round"></i>
        </el-tooltip>
        
        <span slot="footerSlot">{{ `当日发货单：${pickOrderQty}` }}</span>
      </chart-card>
      <!-- <chart-card class="dash-header-item" :total="`${reviPercentage}`" title="未完成质检单">
        <el-tooltip slot="cardTitle" class="item" effect="dark" content="指标说明" placement="right-start">
          <i class="el-icon-chat-dot-round"></i>
        </el-tooltip>
        
        <span slot="footerSlot">{{ `当日质检单：${reviOrderQty}` }}</span>
      </chart-card> -->
    </div>

    <!-- <div class="dash-body">
      <el-tabs v-model="recmonth">
        <el-tab-pane class="dash-body-tab-pane" label="月入库情况分析" name="recmonth">
          <el-card body-style="padding:0;" class="dash-header-item">
            <ve-histogram colors="#60ACFC" height="330px" :data="chartData" :settings="chartSettings"></ve-histogram>
          </el-card>
          <el-card class="dash-header-item">
            <ve-histogram colors="#e6a23c" height="330px" :data="chartData1" :settings="chartSettings1"></ve-histogram>
          </el-card>
          <el-card class="dash-header-item">
            <ve-pie :data="chartData3"></ve-pie>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="月出库情况分析" name="outmobth"> </el-tab-pane>
      </el-tabs>      
    </div> -->
  </div>
</template>

<script>
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
    components: {
      chartCard,
      OutstockChart
    },
    data() {
      this.chartSettings = {
        yAxisName: ["总数量"]
      };
      this.chartSettings1 = {
        yAxisName: ["总数量"]
      };
      return {
        recmonth: "recmonth",
        outStockData,
        chartData: {
          columns: ["日期", "总入库数量"],
          rows: [{
              日期: "1",
              总入库数量: 10,
              同期入库数量: 66
            },
            {
              日期: "2",
              总入库数量: 20,
              同期入库数量: 55
            },
            {
              日期: "3",
              总入库数量: 30,
              同期入库数量: 44
            },
            {
              日期: "4",
              总入库数量: 40,
              同期入库数量: 55
            },
            {
              日期: "5",
              总入库数量: 50,
              同期入库数量: 22
            },
            {
              日期: "6",
              总入库数量: 60,
              同期入库数量: 66
            },
            {
              日期: "7",
              总入库数量: 55,
              同期入库数量: 66
            },
            {
              日期: "8",
              总入库数量: 77,
              同期入库数量: 66
            },
            {
              日期: "9",
              总入库数量: 34,
              同期入库数量: 66
            },
            {
              日期: "10",
              总入库数量: 67,
              同期入库数量: 66
            },
            {
              日期: "11",
              总入库数量: 34,
              同期入库数量: 66
            },
            {
              日期: "12",
              总入库数量: 87,
              同期入库数量: 0
            }
          ]
        },
        chartData1: {
          columns: ["仓库", "入库数量"],
          rows: [{
              仓库: "成品仓库1",
              入库数量: 55
            },
            {
              仓库: "成品仓库2",
              入库数量: 77
            },
            {
              仓库: "成品仓库3",
              入库数量: 88
            },
            {
              仓库: "成品仓库4",
              入库数量: 22
            }
          ]
        },
        chartData3: {
          columns: ['SKU', '总数量'],
          rows: [{
              'SKU': '酸梅膏',
              '总数量': 1393
            },
            {
              'SKU': '酸多多糖浆',
              '总数量': 3530
            },
            {
              'SKU': '牛奶',
              '总数量': 2923
            },
            {
              'SKU': '纸杯',
              '总数量': 1723
            },
            {
              'SKU': '冰淇淋专用植脂末',
              '总数量': 3792
            },
            {
              'SKU': '核桃豆味粉',
              '总数量': 4593
            }
          ]
        }
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
