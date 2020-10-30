<template>
  <div class="layout">
    <el-row>
      <el-card ref="refForm" type="flex">
        <el-form :model="queryParam" size="small "  @keyup.enter.native="getModelListPage">
          <el-row>
            <el-col :span="4
            ">
              <el-form-item label-width label>
                <el-input v-model="queryParam.Erpvoucherno" placeholder="发货通知单号" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width label>
                <el-input v-model="queryParam.PackageCode" placeholder="拼箱码" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label-width label>
                <el-input v-model="queryParam.Customerno" placeholder="客户编码" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item label-width label>
                <el-input v-model="queryParam.PackageSeq" placeholder="箱号" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label-width label>
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

            <el-col :span="1">
              <el-form-item label-width="0">
                <el-button icon="el-icon-search" type="primary" @click="getModelListPage">查询</el-button>
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
            <el-table-column prop="Erpvoucherno" label="发货通知单号" width="180"></el-table-column>
            <el-table-column prop="PackageSeq" label="箱号" width="80"></el-table-column>
            <el-table-column prop="Customerno" label="客户编码" width="120"></el-table-column>
            <el-table-column prop="Customername" label="客户名称" width="180"></el-table-column>
            <el-table-column prop="Materialno" label="物料编码" width="120"></el-table-column>
            <el-table-column prop="Materialdesc" label="物料名称" width="200"></el-table-column>
            <el-table-column prop="Batchno" label="批次" width="120"></el-table-column>
            <el-table-column prop="Qty" label="数量" width="80"></el-table-column>
            <el-table-column prop="ZQty" label="整箱个数" width="100"></el-table-column>
            <el-table-column prop="SQty" label="散箱个数" width="100"></el-table-column>
            <el-table-column prop="Creater" label="创建人" width="100"></el-table-column>
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

import Vue from "vue";
import store from "@/store";
export default {
  name: "outstock-voucherlcl",
  mixins: [ALFModelListMixins],

  components: {
    Pagination
  },
  data() {
    return {
      xlsname: "发货通知单",
      queryParam: {
        Erpvoucherno: "",
        PackageCode:"",
        Customerno: "",
        Createtime: "",
        PackageSeq:"",
        Towarehouseno:""
      },
      Operate: { Erpvoucherno: 9,PackageCode:9, Customerno: 9 },
      apiUrl: {
        query: "/PackageCarton/Get_PackageCartonListByPage",
        exportXls: "/PackageCarton/Get_PackageCartonListExp"
      },
      tHeader: [
        "发货通知单号",
        "箱号",
        "客户编码",
        "客户名称",
        "物料编码",
        "物料名称",
        "批次",
        "数量",
        "创建人",
        "创建时间"
      ],
      filterVal: [
        "Erpvoucherno",
        "PackageSeq",
        "Customerno",
        "Customername",
        "Materialno",
        "Materialdesc",
        "Batchno",
        "Qty",
        "Creater",
        "Createtime"
      ]
    };
  },
  methods:{
    /* getSummaries(param) {
      debugger;
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }

        const values = data.map(item => Number(item[column.property]))
        if (column.property === 'ZQty' || column.property === 'SQty' ) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)          
        }
      });

      return sums;
    } */
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
