<template>
  <div class="layout">
    <el-row>
      <el-card type="flex">
        <el-form :model="queryParam" size="small " @keyup.enter.native="getModelListPage">
          <el-row>
            <el-col :span="5">
              <el-form-item label>
                <el-input v-model="queryParam.Erpvoucherno" placeholder="调拨单号" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Towarehouseno"
                  placeholder="仓库"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Creater"
                  placeholder="创建人"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label>
                <el-select v-model="queryParam.PostStatus" placeholder="过账状态" clearable>
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
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

  
          </el-row>
          <el-row>

            <el-col :span="4">
              <el-form-item label>
                <el-input v-model="queryParam.Materialno" clearable placeholder="物料编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label>
                <el-input v-model="queryParam.Materialdesc" clearable placeholder="物料名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label>
                <el-date-picker
                  v-model="queryParam.Postdate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="过账日期"
                  end-placeholder="过账结束日期"
                  value-format="yyyy-MM-dd"
                 
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="1">
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
            height="auto"
            class="layout-table"
            :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
            style="width: 100%"
            row-key="id"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
          <el-table-column prop="Fromwarehouseno" label="拨出仓库" width="100"></el-table-column>

          <el-table-column prop="Towarehouseno" label="拨入仓库" width="100"></el-table-column>
            <el-table-column prop="Erpvoucherno" label="调拨单号" width="180"></el-table-column>
            <el-table-column prop="Parametername" label="单据名称"></el-table-column>
            <!--  <el-table-column prop="code" label="单据日期"> </el-table-column> -->
            <el-table-column prop="Departmentcode" label="部门编码"></el-table-column>
            <el-table-column prop="Departmentname" label="部门名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="Erpnote" label="备注"></el-table-column>
            <el-table-column prop="Creater" label="创建人"></el-table-column>
            <el-table-column sortable prop="Createtime" label="创建时间" width="180"></el-table-column>
            <el-table-column  label="操作">
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

    <el-dialog title="调拨单---详情" width="80%" :show-close="true" :visible.sync="outerVisible">
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
          :data="TransferoutDetail"
          :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
          style="width: 100%"
          row-key="id"
          
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="Fromwarehouseno" label="拨出仓库" width="100"></el-table-column>
          <el-table-column prop="Fromwarehousename" label="拨出仓库名称" width="120"></el-table-column>
          <el-table-column prop="Towarehouseno" label="拨入仓库" width="100"></el-table-column>
          <el-table-column prop="Towarehousename" label="拨入仓库名称" width="120"></el-table-column>
          <el-table-column prop="Rowno" label="项次"></el-table-column>
          <el-table-column prop="Rownodel" label="项序"></el-table-column>
          <el-table-column prop="Materialno" label="物料编码" width="100"></el-table-column>
          <el-table-column prop="Materialdesc" label="物料名称" width="180"></el-table-column>
          <el-table-column prop="Unitname" label="单位名称" width="100"></el-table-column>
          <el-table-column prop="Spec" label="物料规格"  width="120"></el-table-column>
          <el-table-column prop="Voucherqty" label="调拨数量" width="100"></el-table-column>
          <el-table-column prop="Outstockqty" label="实际调拨数量" width="120"></el-table-column>
          <el-table-column prop="Postqty" label="过账数量" width="100"></el-table-column>
          <el-table-column prop="Batchno" label="拨入批次" width="100"></el-table-column>
          <el-table-column prop="Batchno" label="拨出批次" width="100"></el-table-column>
          <el-table-column sortable prop="Postdate" label="过账时间" width="220"></el-table-column>
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
import { getVTransferoutDetail } from "@/api/api";
import Vue from "vue";
import store from "@/store";
export default {
  name:"transfer-vouchertransferout",
  mixins: [ALFModelListMixins],

  components: {
    Pagination
  },
  data() {
    return {
      xlsname: "调拨出单",
 

      queryParam: {
        Erpvoucherno: "",
        Createtime: "",
        Towarehouseno:"",
        Creater:"",
        PostStatus:"",
        Materialno:"",
        Materialdesc:"",
        Postdate:"",
   
      },
      options: [{
          id: '0',
          value: '未过账'
        }, {
          id: '2',
          value: '部分过账'
        }, {
          id: '3',
          value: '已过帐'
        }],
      Operate: { Erpvoucherno: 9 },
      apiUrl: {
        query: "/TransferOut/Get_VTransferoutListByPage",
        exportXls: "/TransferOut/Get_TransferoutdetailListByExp"
      },
      outerVisible: false,
      TransferoutDetail: [],
      tHeader: [
        "调拨单号",
        "单据名称",
        "部门编码",
        "部门名称",
        "备注",
        "拨出仓库",
        "拨出仓库名称",
        "拨入仓库",
        "拨出仓库名称",
        "项次",
        "项序",
        "物料编码",
        "物料名称",
        "单位名称",
        "物料规格",
        "调拨数量",
        "实际调拨数量",
        "过账数量",
        "拨入批次",
        "拨出批次",
        "创建人",
        "创建时间",
        "过账时间"
      ],
      filterVal: [
        "Erpvoucherno",
        "Parametername",
        "Departmentcode",
        "Departmentname",
        "Erpnote",
        "Fromwarehouseno",
        "Fromwarehousename",
        "Towarehouseno",
        "Towarehousename",
        "Rowno",
        "Rownodel",
        "Materialno",
        "Materialdesc",
        "Unitname",
        "Spec",
        "Voucherqty",
        "Outstockqty",
        "Postqty",
        "Batchno",
        "Batchno",
        "Creater",
        "Createtime",
        "Postdate"
      ]
    };
  },
  methods: {
    handleClick(val) {
      var min = this;
      min.outerVisible = true;

      var model = {};
      model.Erpvoucherno = val.Erpvoucherno;

      getVTransferoutDetail(model).then(res => {
        debugger;
        if (res.Result == 1) {
          min.TransferoutDetail = res.Data;
        } else {
          min.$message.error(res.ResultValue);
        }
      });
    },

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
