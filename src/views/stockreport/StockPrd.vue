<template>
  <div>
    <el-card>
      <el-form :model="queryParam" size="small " @keyup.enter.native="getModelList">
        <el-row>
          <!-- <el-col :span="4">
            <el-form-item>
              <el-select style="width:100%" v-model="voucherTyleListSelect" multiple placeholder="单据名称">
                <el-option v-for="item in voucherTyleListAll" :key="item.Parameterid" :label="item.Parametername"
                  :value="item.Parameterid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="4">
            <el-form-item label="">
              <el-input v-model="queryParam.Strongholdcode" placeholder="据点" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="">
              <el-input v-model="queryParam.Towarehouseno" placeholder="仓库" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="">
              <el-input v-model="queryParam.Erpvoucherno" placeholder="ERP单号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="">
              <el-input v-model="queryParam.CusMaterialno" placeholder="客户件号" clearable></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="4">
            <el-form-item label="">
              <el-input v-model="queryParam.Materialno" placeholder="物料编码" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="">
              <el-input v-model="queryParam.Batchno" placeholder="批次" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="">
              <el-input v-model="queryParam.Barcode" placeholder="条码" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="9">
            <el-form-item label="">
              <el-date-picker v-model="queryParam.Createtime" type="daterange" range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <el-form-item>
              <el-button icon="el-icon-search" type="primary" @click="getModelList">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>

    <el-card body-style="padding:2px;">
      <el-table border :data="Data" :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" v-loading="loading"
        :cell-style="{ padding: '2px' }" style="width: 100%;">
        <template v-for="item in columns">
          <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
            v-if="item.colvisible" show-overflow-tooltip>
          </el-table-column>
        </template>
      </el-table>
    </el-card>

    <!-- 分页区域 -->
    <pagination :total="PageData.totalCount" :fpage-size.sync="PageData.pageSize"
      :fcurrent-page.sync="PageData.currentPage" @pagination="getModelList" />


  </div>
</template>

<script>
  import {
    ALFModelListMixins
  } from '@/mixins/ALFModelListMixins';

  import {
    getParameterList
  } from "@/api/api";


  import Pagination from "@/components/Pagination";
  export default {
    mixins: [ALFModelListMixins],
    components: {
      Pagination
    },
    data() {
      return {
        queryParam: {
          Strongholdcode: '',
          Towarehouseno: '',
          Erpvoucherno: '',
          CusMaterialno: '',
          Materialno: '',
          Batchno: '',
          Barcode: '',
          Createtime: ''          
        },        
        apiUrl: {
          query: "/StockPrd/GetT_StockPrdListByPage",
          save: "",
          update: ""
        },
        columns: [{
            label: "据点",
            prop: "Strongholdcode",
            colvisible: true
          },
          {
            label: "调出仓库",
            prop: "Fromwarehouseno",
            colvisible: true,
            width: 90
          },
          {
            label: "调入仓库",
            prop: "Towarehouseno",
            colvisible: true,
            width: 90
          },
          // {
          //   label: "库位",
          //   prop: "Toareano",
          //   colvisible: true
          // },
          {
            label: "ERP单号",
            prop: "Erpvoucherno",
            colvisible: true,
            width: 150
          },
          // {
          //   label: "客户编码",
          //   prop: "Customerno",
          //   colvisible: true,
          //   width: 120
          // },
          // {
          //   label: "客户名称",
          //   prop: "Customername",
          //   colvisible: true,
          //   width: 120
          // },
          {
            label: "物料编码",
            prop: "Materialno",
            colvisible: true,
            width: 120
          },
          {
            label: "客户件号",
            prop: "Cusmaterialno",
            colvisible: true,
            width: 150
          },
          {
            label: "物料描述",
            prop: "Materialdesc",
            colvisible: true,
            width: 120
          },
          {
            label: "条码",
            prop: "Barcode",
            colvisible: true
          },
          {
            label: "批次",
            prop: "Batchno",
            colvisible: true
          },
          {
            label: "数量",
            prop: "Qty",
            colvisible: true
          },
          {
            label: "寄售",
            prop: "Specialstock",
            colvisible: true
          },
          // {
          //   label: "单据名称",
          //   prop: "Strvouchertype",
          //   colvisible: true,
          //   // width: 120
          // },
          {
            label: "调出人",
            prop: "Struserno",
            colvisible: true
          },
          {
            label: "调出时间",
            prop: "Createtime",
            colvisible: true,
            width: 200
          },
        ],
      }
    },   
  }

</script>

<style lang="scss" scoped>
  >>>.element.style {
    margin: 0;
    ;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  >>>.el-dialog {
    margin: 5vh auto 50px !important;
  }

  >>>.el-dialog__title {
    font-size: 14px;
    color: #fff;
  }

  >>>.el-dialog__header {
    background-color: #3b9bf5e6;
  }

  .el-form-item {
    margin: 10px;
  }

</style>
