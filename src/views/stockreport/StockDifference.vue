<template>
  <div class="layout">
    <el-row>
      <el-card ref="refForm" type="flex">
      <el-form
        :model="queryParam"
        label-width="0px"
        size="small "
        @keyup.enter.native="getModelListPage"
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
            <el-form-item label-width="0">
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="getModelListPage"
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
            @click="handleExportXls"
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
      >
        <template v-for="item in columns">
          <el-table-column
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            v-if="item.colvisible"
            show-overflow-tooltip
          >
          </el-table-column>
        </template>
      </el-table>


    <!-- 分页区域 -->
    <pagination
      :total="PageData.totalCount"
      :fpage-size.sync="PageData.pageSize"
      :fcurrent-page.sync="PageData.currentPage"
      @pagination="getModelList"
    />
   </el-container>
      </el-main>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
@import "@/styles/layout.scss";
</style>

<script>
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
      xlsname: "库存差异",
      queryParam: {
      
        Towarehouseno: "",
        Materialno: ""
      },
      Operate:{Materialno:9},
      apiUrl: {
        query: "/Stock/Get_StockDifferenceWmsAndErp",
        exportXls: "/Stock/GetT_StockListByExp"
      },
      columns: [
        {
          label: "据点",
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
        // {
        //   label: "客户件号",
        //   prop: "Cusmaterialno",
        //   colvisible: true
        // },
        {
          label: "物料描述",
          prop: "Materialdesc",
          colvisible: true
        },
       /*  {
          label: "批次",
          prop: "Batchno",
          colvisible: true
        }, */
        {
          label: "数量",
          prop: "Sumqty",
          colvisible: true
        }
        // {
        //   label: "寄售",
        //   prop: "Specialstock",
        //   colvisible: true
        // }
      ],
      tHeader: [
        "据点",
        "仓库编码",
        "仓库名称",
        "物料编码",
        "客户件号",
        "物料描述",
      /*   "批次", */
        "数量",
        "寄售"
      ],
      filterVal: [
        "Strongholdcode",
        "Towarehouseno",
        "Warehousename",
        "Materialno",
        "Cusmaterialno",
        "Materialdesc",
        /* "Batchno", */
        "Qty",
        "Specialstock"
      ]
    };
  },
  methods: {
   //查询
    getInfo() {
       
   
     /*  var min = this;
      min.model = {};
      var erpvoucherno = { Field: "Erpvoucherno", Value: min.Erpvoucherno };
      var checkstatus = { Field: "Checkstatus", Value: min.selectvalue };
      var cbegintime = { Field: "cbegintime", Value: min.datetime[0] };
      var cdonetime = { Field: "cdonetime", Value: min.datetime[1] };
      var Isdel = { Field: "Isdel", Value: 1 };
      min.Rules.push(erpvoucherno);
      min.Rules.push(checkstatus);
      min.Rules.push(cbegintime);
      min.Rules.push(cdonetime);
      min.Rules.push(Isdel);
      min.FilterGroup.Rules = min.Rules;
      min.pageReuquest.FilterGroup = min.FilterGroup;
      min.pageReuquest.PageNumber = 1;
      min.pageReuquest.PageSize = 10;
      min.model.pageReuquest = min.pageReuquest;
      getTCheckListByPage(min.model).then(res => {
        if (res.Result == 1) {
          min.model = {};
          min.model.Groupname = "Check_Status";
          res.Data.forEach(t => {
            min.options.forEach(it => {
              if (t.Checkstatus == it.Parameterid) {
                t.Checkstatus = it.Parametername;
              }
            });
          });

          min.GetCheck = res.Data;

          console.log(min.GetCheck);
        } else {
          min.$message.error(res.ResultValue);
        }
      }); */
    },
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
