<template>
  <div>
    <el-card>
      <el-form :model="queryParam" label-width="0px" size="small " @keyup.enter.native="getModelList">
        <el-row>
          <el-col :span="4">
            <el-form-item label="">
              <el-input v-model="queryParam.Strongholdcode" placeholder="工厂" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="">
              <el-input v-model="queryParam.Towarehouseno" placeholder="仓库编码" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="">
              <el-input v-model="queryParam.Materialno" placeholder="物料编码" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="">
              <el-input v-model="queryParam.Batchno" placeholder="批次" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="0">
              <el-button icon="el-icon-search" type="primary" @click="getModelList">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card body-style="padding:5px;">
      <el-row>
        <!-- <el-col :span="2">
          <el-button size="small " icon="el-icon-upload2" type="primary">导入</el-button>
        </el-col> -->
        <el-col :span="2">
          <el-button @click="handleExportXls" size="small " icon="el-icon-download" type="primary">导出</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- table区域 -->
    <el-card body-style="padding:2px;">
      <el-table border :data="Data" :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" v-loading="loading"
        :cell-style="{ padding: '2px' }" style="width: 100%;" show-summary>
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
  } from "@/mixins/ALFModelListMixins";
  import Pagination from "@/components/Pagination";
  export default {
    mixins: [ALFModelListMixins],
    components: {
      Pagination
    },
    data() {
      return {
        xlsname:"库存汇总",
        queryParam: {
          Strongholdcode: "",
          Towarehouseno: "",
          Materialno: "",
          Batchno: ""
        },
        apiUrl: {
          query: "/Stock/GetT_StockListGroup",
          exportXls: "/Stock/GetT_StockListByExp"
        },
        columns: [{
            label: "工厂",
            prop: "Strongholdcode",
            colvisible: true
          },
          {
            label: "仓库编码",
            prop: "Towarehouseno",
            colvisible: true
          },
          {
            label: "仓库名称",
            prop: "Warehousename",
            colvisible: true
          },
          {
            label: "物料编码",
            prop: "Materialno",
            colvisible: true
          },
          {
            label: "客户件号",
            prop: "Cusmaterialno",
            colvisible: true
          },          
          {
            label: "物料描述",
            prop: "Materialdesc",
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
          }
        ],
        tHeader: ['工厂', '仓库编码', '仓库名称', '物料编码','客户件号',
          '物料描述', '批次', '数量', '寄售'
        ],
        filterVal: ['Strongholdcode', 'Towarehouseno', 'Warehousename', 'Materialno',
          'Cusmaterialno','Materialdesc', 'Batchno', 'Qty', 'Specialstock'
        ]
      };
    }
  };

</script>

<style lang="scss" scoped>
  >>>.element.style {
    margin: 0;
  }

  .el-form-item {
    margin: 10px;
  }

</style>
