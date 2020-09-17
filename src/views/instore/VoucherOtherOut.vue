<template>
  <div class="layout">
    <el-row>
      <el-card ref="refForm" type="flex">
        <el-form :model="queryParam" size="small " @keyup.enter.native="getModelListPage">
          <el-row>
            <el-col :span="5">
              <el-form-item label-width label>
                <el-input v-model="queryParam.Erpvoucherno" placeholder="杂出单号" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="9">
              <el-form-item label-width label>
                <el-date-picker
                  v-model="queryParam.Createtime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder=" 创建开始日期"
                  end-placeholder="创建结束日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label-width="0">
                <el-button icon="el-icon-search" type="primary" @click="getModelListPage">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-row>
    <el-row>
      <el-card ref="refButton" body-style="padding:10px;" type="flex">
        <el-row>
          <el-col :span="2">
            <el-button size="small" type="primary" @click="handleExportXls">
              导出
              <i class="el-icon-download"></i>
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row type="flex" class="layout" body-style="padding:2px;">
      <el-main class="layout-main">
        <el-container class="layout-main-container">
          <el-table
            border
            :row-style="{ height: '30' }"
            :cell-style="{ padding: '2px' }"
            :header-row-style="{ height: '30', font: 'normal' }"
            :data="Data"
            :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
            style="width: 100%"
            row-key="id"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            height="auto"
            class="layout-table"
          >
            <!--  <el-table-column type="selection" width="55"> </el-table-column> -->
            <el-table-column prop="Erpvoucherno" label="杂出单号"></el-table-column>
            <el-table-column prop="Parametername" label="单据名称"></el-table-column>
            <!--  <el-table-column prop="depname" label="单据日期"> </el-table-column> -->
            <el-table-column prop="Departmentcode" label="部门编码"></el-table-column>
            <el-table-column prop="Departmentname" label="部门名称"></el-table-column>
            <el-table-column prop="Creater" label="创建人"></el-table-column>
            <el-table-column prop="Createtime" label="创建时间"></el-table-column>
            <el-table-column fixed="right" label="操作" :render-header="renderHeader">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
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
    <el-dialog title="杂出单---详情" width="70%" :show-close="true" :visible.sync="outerVisible">
      <div
        :style="{          
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff'
        }"
      >
        <el-table
          border
          :row-style="{ height: '30' }"
          :cell-style="{ padding: '2px' }"
          :header-row-style="{ height: '30', font: 'normal' }"
          :data="OtherinorderList"
          :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
          style="width: 100%"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="Towarehouseno" label="仓库"></el-table-column>
          <el-table-column prop="Materialno" label="物料编码"></el-table-column>
          <el-table-column prop="Materialdesc" label="物料名称" width="180"></el-table-column>
          <el-table-column prop="Batchno" label="批次"></el-table-column>
          <el-table-column prop="Voucherqty" label="杂出数量"></el-table-column>
          <el-table-column prop="Unitname" label="单位"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/layout.scss";
</style>

<script>
import { ALFModelListMixins } from "@/mixins/ALFModelListMixins";
import Pagination from "@/components/Pagination";
import { getVOtherOutDetail } from "@/api/api";
import Vue from "vue";
import store from "@/store";
export default {
  mixins: [ALFModelListMixins],

  components: {
    Pagination
  },
  data() {
    return {
      xlsname: "杂出单",
      queryParam: {
        Erpvoucherno: "",
        Createtime: ""
      },
      Operate: { Erpvoucherno: 11 },
      apiUrl: {
        query: "/OtherOut/Get_VOtherOutListByPage",
        exportXls: "/OtherOut/Get_VOtherOutDetailListByExp"
      },
      outerVisible: false,
      OtherinorderList: [],
      WorkOrderdateilDateilList: [],
      tHeader: [
        "杂出单号",
        "单据名称",
        "部门编码",
        "部门名称",
        "仓库",
        "物料编码",
        "物料名称",
        "批次",
        "杂出数量",
        "单位",
        "创建人",
        "创建时间"
      ],
      filterVal: [
        "Erpvoucherno",
        "Parametername",
        "Departmentcode",
        "Departmentname",
        "Towarehouseno",
        "Materialno",
        "Materialdesc",
        "Batchno",
        "Voucherqty",
        "Unitname",
        "creater",
        "createtime"
      ]
    };
  },
  methods: {
    handleClick(val) {
      var min = this;
      min.outerVisible = true;

      var model = {};
      model.Erpvoucherno = val.Erpvoucherno;
      debugger;
      getVOtherOutDetail(model).then(res => {
        debugger;
        if (res.Result == 1) {
          min.OtherinorderList = res.Data;
        } else {
          min.$message.error(res.ResultValue);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
>>> .element.style {
  margin: 0;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

>>> .el-dialog {
  margin: 5vh auto 50px !important;
}

>>> .el-dialog__title {
  font-size: 14px;
  color: #fff;
}

>>> .el-dialog__header {
  background-color: #3b9bf5e6;
}

.el-form-item {
  margin: 10px;
}
</style>
