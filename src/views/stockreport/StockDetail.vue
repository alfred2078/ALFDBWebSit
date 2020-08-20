<template>
  <div>
    <el-card  ref="refForm">
      <el-form :model="queryParam" size="small " @keyup.enter.native="getModelList">
        <el-row>
          <el-col :span="3">
            <el-form-item  label="">
              <el-input v-model="queryParam.Strongholdcode" placeholder="据点" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item  label="">
              <el-input v-model="queryParam.Towarehouseno" placeholder="仓库" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item  label="">
              <el-input v-model="queryParam.Areano" placeholder="库位" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item  label="">
              <el-input v-model="queryParam.Materialno" placeholder="物料编码" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item  label="">
              <el-input v-model="queryParam.Batchno" placeholder="批次" clearable></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="4">
            <el-form-item  label="">
              <el-input v-model="queryParam.Qualityno" placeholder="检验单号" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="3">
          <el-form-item >
              <el-button icon="el-icon-search" type="primary" @click="getModelList">查询</el-button>
              </el-form-item>
             </el-col>          
        </el-row>
      </el-form>
    </el-card>

    <el-card ref="refButton">
      <el-row>
        <el-col :span="2">
         <!--  <el-button @click="newAdd" size="small " icon="el-icon-download" type="primary">导出</el-button> -->
        </el-col>
      </el-row>
    </el-card>

    <el-card body-style="padding:2px;">
      <el-table border :data="Data" :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" v-loading="loading"
        :cell-style="{ padding: '2px' }" style="width: 100%;" :max-height="screenHeight">
        <template v-for="item in columns">
          <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
            v-if="item.colvisible" show-overflow-tooltip>
          </el-table-column>
        </template>
      </el-table>
    </el-card>

    <el-card body-style="padding:0;" ref="refPage">
      <!-- 分页区域 -->
    <pagination :total="PageData.totalCount" :fpage-size.sync="PageData.pageSize"
      :fcurrent-page.sync="PageData.currentPage" @pagination="getModelList" />
    </el-card>

  </div>
</template>

<script>
  import {
    ALFModelListMixins
  } from '@/mixins/ALFModelListMixins'
  import Pagination from "@/components/Pagination";
  export default {
    mixins: [ALFModelListMixins],
    components: {
      Pagination
    },
    data() {
      return {
        queryParam: {
          Towarehouseno: '',
          Areano: '',
          Materialno: '',
          Batchno: '',
          Createtime: '',
          Cusmaterialno:'',
          Strongholdcode:''
        },
        Operate:{Areano:11,Materialno:11,Batchno:11,Cusmaterialno:11},
        outerVisible: false,
        screenHeight:null,
        idshow: false,
        apiUrl: {
          query: "/Stock/GetV_StockListByPage",
          save: "",
          update: ""
        },
        
        columns: [{
            label: "据点",
            prop: "Strongholdcode",
            colvisible: true,
            width:80
          },
          {
            label: "仓库",
            prop: "Towarehouseno",
            colvisible: true,
            width:100
          },
          {
            label: "库位",
            prop: "Areano",
            colvisible: true,
            width:120
          },
          // {
          //   label: "仓库名称",
          //   prop: "Warehousename",
          //   colvisible: true
          // },
          {
            label: "物料编码",
            prop: "Materialno",
            colvisible: true,
            width:150
          },
          // {
          //   label: "客户件号",
          //   prop: "Cusmaterialno",
          //   colvisible: true
          // },
          {
            label: "物料描述",
            prop: "Materialdesc",
            colvisible: true,
            width:150
          },
          {
            label: "条码",
            prop: "Barcode",
            colvisible: true,
            width:330
          },
          {
            label: "批次",
            prop: "Batchno",
            colvisible: true,
            width:120
          },
          {
            label: "数量",
            prop: "Qty",
            colvisible: true,
            width:100
          },
          {
            label: "效期",
            prop: "Edate",
            colvisible: true,
            width:110
          },
          {
            label: "69码",
            prop: "watercode",
            colvisible: true,
            width:140
          },
          {
            label: "质检状态",
            prop: "Strstatus",
            colvisible: true,
            width:100
          },
          {
            label: "限制性",
            prop: "StrIslimitstock",
            colvisible: true,
            width:100
          },
          {
            label: "供应商",
            prop: "Supplierno",
            colvisible: true,
            width:100
          },
          {
            label: "供应商名称",
            prop: "Suppliername",
            colvisible: true,
            width:150
          },
          {
            label: "拣货数量",
            prop: "TaskQty",
            colvisible: true,
            width:100
          },
          {
            label: "检验单号",
            prop: "Qualityno",
            colvisible: true,
            width:180
          },
          {
            label: "到货单号",
            prop: "Arrvoucherno",
            colvisible: true,
            width:180
          },
          // {
          //   label: "锁定",
          //   prop: "StrIsretention",
          //   colvisible: true,
          //   width:100
          // },
        ],
      }
    },
    mounted(){
      debugger;
      let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
      let refForm = this.$refs.refForm.$el.offsetHeight;
      let refButton = this.$refs.refButton.$el.offsetHeight;
      let refPage = this.$refs.refPage.$el.offsetHeight;
      this.screenHeight = (h-refForm-refButton-refPage)-115;
    }
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
