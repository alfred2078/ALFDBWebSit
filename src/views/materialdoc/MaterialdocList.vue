<template>
  <div>
    <el-card>
      <el-form :model="queryParam" size="small " @keyup.enter.native="getModelList">
        <el-row>
          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="queryParam.Erpvoucherno" placeholder="ERP单号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="queryParam.Materialdoc" placeholder="凭证号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="queryParam.Towarehouseno" placeholder="仓库" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="queryParam.GUID" placeholder="GUID" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="0">
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

    <pagination :total="PageData.totalCount" :fpage-size.sync="PageData.pageSize"
      :fcurrent-page.sync="PageData.currentPage" @pagination="getModelList" />

    <!-- <el-card body-style="padding:2px;">
      <el-table border :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
        :header-row-style="{ height: '30', font: 'normal' }"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" :data="Data" style="width: 100%" row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column prop="Erpvoucherno" label="ERP单号"> </el-table-column>
        <el-table-column prop="Rowno" label="行号"> </el-table-column>        
        <el-table-column prop="Materialno" label="物料号"> </el-table-column>
        <el-table-column prop="Materialdesc" label="物料描述"> </el-table-column>        
        <el-table-column prop="Cusmaterialno" label="客户料件"> </el-table-column>
        <el-table-column prop="Materialdoc" label="凭证"> </el-table-column>        
        <el-table-column prop="Qty" label="数量"> </el-table-column>
        <el-table-column prop="Poststatus" label="状态"> </el-table-column>
        <el-table-column prop="Guid" label="GUID"> </el-table-column>
        <el-table-column prop="Errormsg" label="错误信息"> </el-table-column>
        <el-table-column prop="note" label="69码"> </el-table-column>
        <el-table-column prop="note" label="效期"> </el-table-column>
        <el-table-column prop="note" label="临近期"> </el-table-column>       

      </el-table>
    </el-card> -->

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
          Erpvoucherno: '',
          Materialdoc: '',
          GUID: '',
          Towarehouseno: ''
        },
        outerVisible: false,
        idshow: false,
        apiUrl: {
          query: "/MaterialDoc/GetT_MaterialDocListByPage",
          save: "",
          update: ""
        },
        columns: [
          {
            label: "工厂",
            prop: "Strongholdcode",
            colvisible: true
          },
          {
            label: "仓库",
            prop: "Towarehouseno",
            colvisible: true
          },
          {
            label: "ERP单号",
            prop: "Erpvoucherno",
            colvisible: true
          },
          {
            label: "行号",
            prop: "Rowno",
            colvisible: true
          },
          {
            label: "物料号",
            prop: "Materialno",
            colvisible: true
          },
          {
            label: "物料描述",
            prop: "Materialdesc",
            colvisible: true
          },
          // {
          //   label: "客户料号",
          //   prop: "Cusmaterialno",
          //   colvisible: true
          // },
          {
            label: "凭证号",
            prop: "Materialdoc",
            colvisible: true
          },
          {
            label: "数量",
            prop: "Qty",
            colvisible: true
          },
          {
            label: "状态",
            prop: "Poststatus",
            colvisible: true
          },
          {
            label: "GUID",
            prop: "Guid",
            colvisible: true
          },
          {
            label: "错误信息",
            prop: "Errormsg",
            colvisible: true
          }
        ]
      }
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
