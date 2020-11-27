<template>
  <div class="layout">
    <el-row>
      <el-card ref="refForm" type="flex">
        <el-form :model="queryParam" size="small" @keyup.enter.native="getModelListPage">
          <el-row>
            <el-col :span="5">
              <el-form-item>
                <el-input v-model="queryParam.Erpvoucherno" placeholder="ERP单号" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label>
                <el-input v-model="queryParam.Suppliername" placeholder="供应商名称" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label>
                <el-input v-model="queryParam.Supplierno" placeholder="供应商编号" clearable></el-input>
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
          <el-col :span="2"></el-col>
          <el-col :span="2"></el-col>
          <el-col :span="2">
            <el-button size="small" icon type="primary" @click="PrintClick()">单据打印</el-button>
          </el-col>
          <el-col :span="2">
           <!--  <el-dropdown>
              <el-button size="small" type="primary">
                导出
                <i class="el-icon-download"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>导出当前页</el-dropdown-item>
                <el-dropdown-item>导出查询结果</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
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
            @selection-change="GetCheckChange"
            ref="Table"
            @current-change="chooseMcaterialChange"
            height="auto"
            class="layout-table"
          >
            <!-- <el-table-column type="selection" width="55">
            </el-table-column>-->
            <el-table-column type="selection" width="55"></el-table-column>
            <template v-for="item in columns">
              <el-table-column
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                v-if="item.colvisible"
                show-overflow-tooltip
              ></el-table-column>
            </template>
            <el-table-column width="100" fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :total="PageData.totalCount"
            :fpage-size.sync="PageData.pageSize"
            :fcurrent-page.sync="PageData.currentPage"
            @pagination="getModelList"
          />
        </el-container>
      </el-main>
    </el-row>
    <el-dialog title="验退单---详情" width="70%" :show-close="true" :visible.sync="outerVisible">
      <div
        :style="{          
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff'
        }"
      >
        <el-table
          :data="detailsData"
          border
          :row-style="{ height: '30' }"
          :cell-style="{ padding: '2px' }"
          :header-row-style="{ height: '30', font: 'normal' }"
          :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
          style="width: 100%"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="Towarehouseno" label="仓库名称"></el-table-column>
          <el-table-column prop="Materialno" label="物料编码"></el-table-column>
          <el-table-column prop="Materialdesc" label="物料名称"></el-table-column>
          <el-table-column prop="Voucherqty" label="验退数量"></el-table-column>
          <el-table-column prop="Unitname" label="单位名称"></el-table-column>
          <el-table-column prop="Batchno" label="批次"></el-table-column>
          <el-table-column prop="Postuser" label="过账人"></el-table-column>
          <el-table-column prop="Postdate" label="过账时间"></el-table-column>
          <el-table-column prop="Poststatusname" label="过账状态"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
@import "@/styles/layout.scss";
</style>
<script>
import { windowpost, getInspecReturndetail } from "@/api/api";
import Pagination from "@/components/Pagination";

import { ALFModelListMixins } from "@/mixins/ALFModelListMixins";
export default {
  mixins: [ALFModelListMixins],
  name: "returnstock-VoucherInspecReturn",
  components: {
    Pagination,
    windowpost,
    getInspecReturndetail
  },
  data() {
    return {
      queryParam: {
        Erpvoucherno: "",
        Supplierno: "",
        Suppliername: "",
        Towarehouseno: ""
      },
      checked: null, // 如果使用单选框,定义一个model值
      currentSelectItem: {}, // 当前选中的值
      detailsData: [],
      outerVisible: false,
      columns: [
        {
          label: "Id",
          prop: "Id",
          colvisible: false
        },
        {
          label: "ERP单号",
          prop: "Erpvoucherno",
          colvisible: true
        },
        {
          label: "到货单号",
          prop: "Arrvoucherno",
          colvisible: true
        },
        {
          label: "检验单号",
          prop: "Qualityno",
          colvisible: true
        },
        {
          label: "验退单号",
          prop: "InSpecReturnNo",
          colvisible: true
        },
        {
          label: "供应商名称",
          prop: "Suppliername",
          colvisible: true
        },
        {
          label: "供应商编号",
          prop: "Supplierno",
          colvisible: true
        },
        {
          label: "创建时间",
          prop: "Createtime", 
          colvisible: true
        }
      ],
      apiUrl: {
        query: "/InspecReturn/GetT_InspecReturnListByPage"
      }
    };
  },
  methods: {
    PrintClick() {
      debugger;
      if (this.currentSelectItem.length == 1) {
        var Erpvoucherno = this.currentSelectItem[0].Erpvoucherno;
        windowpost(Erpvoucherno, "inspecReturn");
      }
    },
    handleClick(val) {
      this.outerVisible = true;
      this.queryParam.Erpvoucherno = val.Erpvoucherno;
      var json = JSON.stringify(this.queryParam);
      getInspecReturndetail(json).then(res => {
        if (res.Result == 1) {
          this.detailsData = res.Data;
        }
      });
    },
    GetCheckChange(val) {
      this.currentSelectItem = val;
      if (val.length > 1) {
        this.$refs.Table.clearSelection();
        this.$refs.Table.toggleRowSelection(val.pop());
        //return;
      } else {
        this.CheckChangeData = {};
        this.CheckChangeData = val;
        // console.log(this.CheckChangeData);
      }
    },
    chooseMcaterialChange(val) {
      this.currentSelectItem = val;
      this.$refs.Table.toggleRowSelection(val);
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
