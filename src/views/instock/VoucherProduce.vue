<template>
  <div class="layout">
    <el-row>
      <el-card ref="refForm" type="flex">
        <el-form :model="queryParam" size="small " @keyup.enter.native="getModelListPage">
          <el-row>
            <el-col :span="5">
              <el-form-item label>
                <el-input v-model="queryParam.Erpvoucherno" placeholder="生产订单号" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="9">
              <el-form-item label>
                <el-date-picker
                  v-model="queryParam.Createtime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
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
            <!-- <el-button size="small" icon="el-icon-plus" type="primary">新增</el-button> -->
          </el-col>
          <!-- <el-col :span="2">
          <el-button size="small" icon="el-icon-edit" type="primary">编辑</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small" icon="el-icon-plus" type="danger">删除</el-button>
          </el-col>-->
          <el-col :span="2">
            <!-- <el-button size="small" icon="el-icon-upload2" type="primary">导入</el-button> -->
          </el-col>
          <el-col :span="2">
            <!-- <el-button size="small " icon="el-icon-download" type="primary">导出</el-button> -->
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
            :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
            :data="Data"
            style="width: 100%"
            row-key="id"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            height="auto"
            class="layout-table"
          >
            <el-table-column prop="Erpvoucherno" label="生产订单号"></el-table-column>
            <el-table-column prop="Parametername" label="单据名称"></el-table-column>
            <el-table-column prop="Vouuser" label="ERP制单人"></el-table-column>
            <el-table-column prop="Creater" label="创建人"></el-table-column>
            <el-table-column sortable prop="Createtime" label="创建时间"></el-table-column>

            <el-table-column  label="操作" :render-header="renderHeader">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                <!-- <el-dropdown>
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>密码</el-dropdown-item>
                <el-dropdown-item>停用</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
                </el-dropdown>-->
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
    <el-dialog title="生产订单---详情" width="70%" :show-close="true" :visible.sync="outerVisible">
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
          :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
          :data="WorkOrderdateilDateilList"
          style="width: 100%"
          row-key="id"
          height="500"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="Towarehouseno" label="仓库编码"></el-table-column>
          <el-table-column prop="Materialno" label="物料编码"></el-table-column>
          <el-table-column prop="Materialdesc" label="物料名称"></el-table-column>

          <el-table-column prop="Voucherqty" label="订单数量"></el-table-column>
          <el-table-column prop="Receiveqty" label="已入库数量"></el-table-column>
          <el-table-column prop="Remainqty" label="未入库数量"></el-table-column>
          <el-table-column prop="Creater" label="创建人"></el-table-column>
          <el-table-column sortable prop="Createtime" label="创建时间" width="180"></el-table-column>
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
import { getWorkOrderDetailList } from "@/api/api";
import Vue from "vue";
import store from "@/store";
export default {
  name: "instock-voucherproduce",
  mixins: [ALFModelListMixins],

  components: {
    Pagination
  },
  data() {
    return {
      xlsname: "生产订单",
      queryParam: {
        Erpvoucherno: "",
        Createtime: "",
        Towarehouseno:""
      },
      Operate: { Erpvoucherno: 9 },
      apiUrl: {
        query: "/WorkOrder/GetV_WorkOrderListByPage",
        exportXls: "/WorkOrder/GetV_WorkOrderDetailListExp"
      },
      outerVisible: false,
      tableData: [
        {
          code: "WO01",
          name: "生产订单",
          depcode: "01",
          depname: "部",
          status: "10001",
          role: "测试供应商",
          people: "测试账户",
          warehouse: "成品仓",
          creater: "admin",
          createtime: "2020-01-02"
        }
      ],
      WorkOrderdateilDateilList: [],
      tHeader: [
        "采购订单号",
        "单据名称",
        "ERP制单人",
        "仓库",
        "物料编码",
        "物料名称",
        "订单数量",
        "已收数量",
        "未收数量",
        "创建人",
        "创建时间"
      ],
      filterVal: [
        "Erpvoucherno",
        "Parametername",
        "Vouuser",
        "Towarehouseno",
        "Materialno",
        "Materialdesc",
        "Voucherqty",
        "Receiveqty",
        "Remainqty",
        "Screater",
        "Screatetime"
      ]
    };
  },
  methods: {
    handleClick(val) {
      var min = this;
      min.outerVisible = true;

      var model = {};
      model.Erpvoucherno = val.Erpvoucherno;

      getWorkOrderDetailList(model).then(res => {
        debugger;
        if (res.Result == 1) {
          min.WorkOrderdateilDateilList = res.Data;
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
