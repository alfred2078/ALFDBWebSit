<template>
  <div class="layout">
    <el-row>
      <el-card ref="refForm" type="flex">
      <el-form
        :model="queryParam"
        label-width="0px"
        size="small "
        @keyup.enter.native="getInfo"
      >
        <el-row>
          

          <el-col :span="4">
            <el-form-item label="">
              <el-input
                v-model="queryParam.Towarehouseno"
                placeholder="仓库编码"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="">
              <el-input
                v-model="queryParam.Materialno"
                placeholder="物料编码"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="5">
            <el-form-item label="">
              <el-input
                v-model="queryParam.Batchno"
                placeholder="批次"
                clearable
              ></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="5">
              <el-form-item>
                <el-select v-model="Differencevalues" placeholder="盈亏类型" multiple clearable>
                  <el-option
                    v-for="item in DifferenceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
            <el-form-item label="">
              <el-checkbox v-model="Erpvoucherno" label="批次分组" border size="medium"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="0">
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="getInfo"
              >查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    </el-row>
    <el-row>
      <el-card ref="refButton" body-style="padding:10px;" type="flex">
      <el-row>
        <!-- <el-col :span="2">
          <el-button size="small " icon="el-icon-upload2" type="primary">导入</el-button>
        </el-col> -->
        <el-col :span="2">
          <el-button
            @click="exportToExcel"
            size="small "
            icon="el-icon-download"
            type="primary"
          >导出</el-button>
        </el-col>
      </el-row>
    </el-card>

    </el-row>
    <el-row type="flex" class="layout" body-style="padding:2px;">
      <el-main class="layout-main">
        <el-container class="layout-main-container">
      <el-table
        border
        :data="Data"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
        v-loading="loading"
        :cell-style="{ padding: '2px' }"
        style="width: 100%;"
        height="auto"
        class="layout-table"
        :row-class-name="tableRowClassName"
      
      >
      <el-table-column
        label="序号"
        type="index"
        width="60"
        align="center">
    <template slot-scope="scope">
        <span>{{scope.$index + 1}}</span>
    </template>
    </el-table-column>
        <el-table-column prop="Difference" width="80" :sortable="true" label="盈亏"> </el-table-column>
        <el-table-column prop="Strongholdcode" label="据点" width="80"> </el-table-column>
        <el-table-column prop="Towarehouseno" label="仓库编码" width="100"> </el-table-column>
        <el-table-column prop="Batchno" label="批次" width="100"> </el-table-column>
        <el-table-column prop="Materialno" label="物料编码" width="120"> </el-table-column>
        <el-table-column prop="Materialdesc" label="物料名称" width="300"> </el-table-column>
        <el-table-column prop="Wqty" label="WMS数量"></el-table-column>
        <el-table-column prop="Eqty" label="ERP数量"></el-table-column>
        <el-table-column prop="WEqty" label="差异数量"></el-table-column>
      </el-table>


    <!-- 分页区域 -->
 <!--    <pagination
      :total="PageData.totalCount"
      :fpage-size.sync="PageData.pageSize"
      :fcurrent-page.sync="PageData.currentPage"
      @pagination="getModelList"
    /> -->
   </el-container>
      </el-main>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
@import "@/styles/layout.scss";
</style>
<style>
  .warning-row {
    color: rgba(247, 7, 7, 0.685) !important;
  }
</style>
<script>
import {
  getStockDifferenceWmsAndErp
} from "@/api/api";
import { ALFModelListMixins } from "@/mixins/ALFModelListMixins";
import Pagination from "@/components/Pagination";
export default {
  name:"stockreport-StockDifference",
  mixins: [ALFModelListMixins],
  components: {
    Pagination
  },
  data() {
    return {
      loading: false,
      xlsname: "库存差异",
      queryParam: {
        
        Towarehouseno: "",
        Materialno: "",
        Difference:""
      },
      Erpvoucherno:false,
      Differencevalues:[],
      DifferenceList:[{
      
        id:1,
        name:'盈'
      },{
        id:2,
        name:'亏'
      },{
        id:3,
        name:'平'
      }],
     // Operate:{Materialno:9},
      apiUrl: {
        query: "/Stock/Get_StockDifferenceWmsAndErp",
        exportXls: "/Stock/Get_StockDifferenceWmsAndErp"
      },
      Data: [],
      tHeader: [
        "盈亏",
        "据点",
        "仓库编码",
        "物料编码",
        "物料名称",
        "WMS数量",
        "ERP数量",
      /*   "批次", */
        "差异数量"
      ],
      filterVal: [
        "Difference",
        "Strongholdcode",
        "Towarehouseno",
        "Materialno",
        "Materialdesc",
        "Wqty",
        /* "Batchno", */
        "Eqty",
        "WEqty"
      ]
    };
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
        if (row.Difference != "平") {
          return 'warning-row';
        } 
        return '';
      },
 
   //查询
    getInfo() {
       
     var min = this;
     if(min.queryParam.Towarehouseno==""){
       this.$message({
          message: "请输入仓库编码",
          type: "warning"
        });
        return;
     }
     if(min.Erpvoucherno)
     {
       min.queryParam.Erpvoucherno='1';
     }else
     {
       min.queryParam.Erpvoucherno='0';
     }
    min.queryParam.Difference = min.Differencevalues.join(',');
    min.loading=true;
     getStockDifferenceWmsAndErp(min.queryParam).then(res => {
        if (res.Result == 1) {
          min.loading=false;
         /*  res.Data.forEach(t => {
            if (t.Difference==0){
              t.Difference ="平"
            }else if(t.Difference==1){
               t.Difference ="盈"
            }else{
              t.Difference ="亏"
            }
            
          }); */
          min.Data = res.Data;
        } else {
          min.loading=false;
          min.$message.error(res.ResultValue);
        }
      });
   
    },
    exportToExcel() {
     // this.getInfo();
      debugger;
      this.loading=true;
      require.ensure([], () => {
        const { export_json_to_excel } = require("exportexcel/Export2Excel");

        const xlsdata = this.formatJson(this.filterVal, this.Data);
        console.log(this.exportList);

        export_json_to_excel(this.tHeader, xlsdata, this.xlsname);
      });
      this.loading=false;
    },
    formatJson(filterVal, jsonData) {
      debugger;
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>

<style lang="scss" scoped>
>>> .element.style {
  margin: 0;
}

.el-form-item {
  margin: 10px;
}
</style>
