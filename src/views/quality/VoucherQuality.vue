<template>
  <div class="layout">
    <el-row>
      <el-card ref="refForm" type="flex">
        <el-form :model="queryParam" size="small " @keyup.enter.native="getModelListPage">
          <el-row>
            <el-col :span="5">
              <el-form-item label>
                <el-input v-model="queryParam.Qualityno" placeholder="检验单号" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label>
                <el-input v-model="queryParam.Erpvoucherno" placeholder="采购订单号" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label>
                <el-input v-model="queryParam.Arrvoucherno" placeholder="到货单号" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label>
                <el-input v-model="queryParam.Materialno" placeholder="物料编码" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label>
                <el-select v-model="queryParam.Erpstatuscode" placeholder="单据状态" clearable>
                  <el-option
                    v-for="item in options"
                    :key="item.Parameterid"
                    :label="item.Parametername"
                    :value="item.Parameterid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label>
                <el-date-picker
                  v-model="queryParam.Createtime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="创建开始日期"
                  end-placeholder="创建结束日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label-width="0">
                <el-button icon="el-icon-search" type="primary" @click="getModelListPage">查询</el-button>
                <!--  <el-button icon="el-icon-refresh-right" type="primary">重置</el-button> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-row>
    <el-row>
      <el-card body-style="padding:10px;" type="flex">
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
            :data="Data"
            :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
            style="width: 100%"
            row-key="id"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            height="auto"
            class="layout-table"
          >
            <el-table-column prop="Qualityno" label="检验单号" width="180"></el-table-column>
            <el-table-column prop="Arrvoucherno" label="到货单号" width="180"></el-table-column>
            <el-table-column prop="Erpvoucherno" label="采购订单号" width="180"></el-table-column>
            <el-table-column prop="Parametername" label="单据名称" width="120"></el-table-column>
            <el-table-column prop="Voucherqty" label="送验量" width="120"></el-table-column>
            <el-table-column prop="Createtime" label="到货日期" width="190"></el-table-column>
            <el-table-column prop="Materialno" label="物料编码" width="120"></el-table-column>
            <el-table-column prop="Materialdesc" label="物料名称" width="150"></el-table-column>

            <el-table-column prop="Sampuserno" label="抽检人" width="120"></el-table-column>
            <el-table-column prop="Sampqty" label="抽检数量" width="120"></el-table-column>
            <el-table-column prop="Sampdate" label="抽检时间" width="190"></el-table-column>

            <el-table-column prop="Qualityqty" label="合格数量" width="120"></el-table-column>
            <el-table-column prop="Unqualityqty" label="不合格数量" width="120"></el-table-column>
            <el-table-column prop="Batchno" label="批次" width="150"></el-table-column>
            <el-table-column prop="Erpstatuscodedesc" label="判断结果" width="120"></el-table-column>

            <el-table-column prop="Creater" label="创建人"></el-table-column>
            <el-table-column sortable prop="Createtime" label="创建时间" width="190"></el-table-column>
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
import { getTParameterList } from "@/api/api";
import Vue from "vue";
import store from "@/store";
export default {
  name: "quality-voucherquality",
  mixins: [ALFModelListMixins],

  components: {
    Pagination
  },
  data() {
    return {
      xlsname: "质检单",
      queryParam: {
        Erpvoucherno: "",
        Qualityno: "",
        Arrvoucherno: "",
        Materialno: "",
        Erpstatuscode: "",
        Createtime: "",
        Towarehouseno:""
      },
      Operate: {
        Erpvoucherno: 9,
        Qualityno: 9,
        Arrvoucherno: 9,
        Materialno: 9
      },
      apiUrl: {
        query: "/Quality/GetT_QualityDetailListByPage",
        exportXls: "/Quality/GetT_QualityDetailExp"
      },
      outerVisible: false,
      tableData: [
        {
          code: "PO01",
          name: "采购订单",
          depcode: "01",
          depname: "采购部",
          status: "10001",
          role: "测试供应商",
          people: "测试账户",
          warehouse: "成品仓",
          creater: "admin",
          createtime: "2020-01-02"
        }
      ],
      options: [],
      tHeader: [
        "检验单号",
        "到货单号",
        "采购订单号",
        "单据名称",
        "送验量",
        "到货日期",
        "物料编码",
        "物料名称",
        "抽检人",
        "抽检数量",
        "抽检时间",
        "合格数量",
        "不合格数量",
        "批次",
        "判断结果",
        "创建人",
        "创建时间"
      ],
      filterVal: [
        "Qualityno",
        "Arrvoucherno",
        "Erpvoucherno",
        "Parametername",
        "Voucherqty",
        "Createtime",
        "Materialno",
        "Materialdesc",
        "Sampuserno",
        "Sampqty",
        "Sampdate",
        "Qualityqty",
        "Unqualityqty",
        "Batchno",
        "Erpstatuscodedesc",
        "Creater",
        "Createtime"
      ]
    };
  },
  created() {
    this.getTParameter();
  },
  methods: {
    //状态下拉框
    getTParameter() {
      debugger;
      var min = this;
      min.model = {};
      min.model.Groupname = "Linestatus";
      getTParameterList(min.model).then(sres => {
        if (sres.Result == 1) {
          min.options = sres.Data;
          min.options.forEach(t => {
            t.Parameterid = t.Parameterid + "";
          });
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
