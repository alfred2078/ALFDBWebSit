<template>
  <div class="layout">
    <el-row>
      <el-card ref="refForm" type="flex">
        <el-form :model="queryParam" size="small " @keyup.enter.native="getModelListPage">
          <el-row>
            <el-col :span="5">
              <el-form-item label>
                <el-input v-model="queryParam.Erpvoucherno" placeholder="发货通知单号" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item label-width label>
                <el-input v-model="queryParam.Customerno" placeholder="客户编码" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width label>
                <el-input v-model="queryParam.Customername" placeholder="客户名称" clearable></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="3">
              <el-form-item label-width label>
                <el-input v-model="queryParam.Contacts" placeholder="客户联络人姓名" clearable></el-input>
              </el-form-item>
            </el-col>
            <!--  <el-col :span="3">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Towarehousenodecs"
                  placeholder="仓库"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="9">
              <el-form-item label-width label>
                <el-date-picker
                  v-model="queryParam.Createtime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="配货开始时间"
                  end-placeholder="配货结束时间"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Creater"
                  placeholder="配货人"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          <el-col :span="4">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Postuser"
                  placeholder="过账人"
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
                  v-model="queryParam.Postdate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="过账日期"
                  end-placeholder="过账结束日期"
                  value-format="yyyy-MM-dd"
                  
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">
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
            <el-button size="small" type="primary" @click="expOutStock(1)">
              导出表头
              <i class="el-icon-download"></i>
            </el-button>
          </el-col>
          <el-col :span="2">
            <!-- <el-button size="small " icon="el-icon-download" type="primary">导出</el-button> -->
            <el-button size="small" type="primary" @click="expOutStock(2)">
              导出表体
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
            <el-table-column prop="Erpvoucherno" label="发货通知单号" width="180" fixed></el-table-column>
            <el-table-column prop="Parametername" label="单据名称" width="120" ></el-table-column>
            <el-table-column prop="Customerno" label="客户编码" width="120" ></el-table-column>
            <!-- <el-table-column prop="Customername" label="客户名称" width="180" ></el-table-column>
            <el-table-column prop="Voudate" label="通知日期" width="180" ></el-table-column> -->
            <el-table-column prop="Erpnote" label="备注" width="180" ></el-table-column>
            <el-table-column prop="Address" label="送货地址" width="250" ></el-table-column>
            <el-table-column prop="Contacts" label="客户联络人姓名" width="150"></el-table-column>
            <el-table-column prop="Tel" label="联络人电话" width="150"></el-table-column>
            <el-table-column prop="LineNo" label="月台" width="150"></el-table-column>
            <el-table-column prop="WeightTotal" label="总重量" width="100"></el-table-column>
            <el-table-column prop="CostTotal" label="总费用" width="100"></el-table-column>
            <el-table-column prop="OutCostTotal" label="送货上门费" width="100"></el-table-column>
            <el-table-column prop="Statusname" label="配货状态" width="100"></el-table-column>
            <el-table-column prop="Creater" label="配货人" width="100"></el-table-column>
            <el-table-column sortable prop="Createtime" label="配货时间" width="180"></el-table-column>
            <el-table-column prop="Poststatusname" label="过账状态" width="100"></el-table-column>
            <el-table-column prop="Postuser" label="过账人" width="100"></el-table-column>
            <el-table-column sortable prop="Postdate" label="过账时间" width="180"></el-table-column>

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
    <el-dialog title="发货通知单---详情" width="70%" :show-close="true" :visible.sync="outerVisible">
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
          :data="OutStockDetailList"
          style="width: 100%"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          max-height="500"
        >
          <el-table-column prop="Arrvoucherno" label="发货通知单号" width="200"></el-table-column>
          <el-table-column prop="Towarehouseno" label="仓库" width="80"></el-table-column>
          <el-table-column prop="Rowno" label="项次" width="80"></el-table-column>
          <el-table-column prop="Rownodel" label="项序" width="80"></el-table-column>
          <el-table-column prop="Materialno" label="物料编码" width="100"></el-table-column>
          <el-table-column prop="Materialdesc" label="物料名称" width="250"></el-table-column>
          <el-table-column prop="Batchno" label="批次" width="120"></el-table-column>
          <el-table-column prop="Voucherqty" label="订单数量" width="100"></el-table-column>
          <el-table-column prop="Remainqty" label="未发货数量" width="100"></el-table-column>
          <el-table-column prop="Postqty" label="已发货数量" width="100"></el-table-column>
          <el-table-column prop="Outstockqty" label="已拣货数量" width="100"></el-table-column>
          <el-table-column prop="PackageNum" label="总件数" width="100"></el-table-column>
          <el-table-column prop="SystemCartonNum" label="整箱数" width="100"></el-table-column>
          <el-table-column prop="SystemPackageCartonNum" label="散件数" width="100"></el-table-column>
          <el-table-column prop="PackageCode" label="拼箱码" width="155"></el-table-column>
          <el-table-column prop="Unit" label="单位"></el-table-column>
          <el-table-column prop="Spec" label="规格型号" width="100"></el-table-column>
          <el-table-column prop="Creater" label="创建人" width="120"></el-table-column>
          <el-table-column sortable prop="Createtime" label="创建时间" width="210"></el-table-column>
          <el-table-column prop="Postuser" label="过账人" width="100"></el-table-column>
          <el-table-column sortable prop="Postdate" label="过账时间" width="210"></el-table-column>
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
import { getOutStockDetail } from "@/api/api";
import Vue from "vue";
import store from "@/store";
export default {
  name: "outstock-voucherdelivery",
  mixins: [ALFModelListMixins],

  components: {
    Pagination
  },
  data() {
    return {
      xlsname: "发货通知单",
      queryParam: {
        Erpvoucherno: "",
        Customerno: "",
        Customername:"",
        Createtime: "",
        Postuser:"",
        PostStatus:"",
        Postdate:"",
        Towarehousenodecs:"",
        Contacts:"",
        Creater:""
      },
      Operate: { Erpvoucherno: 9, Customerno: 9 ,Customername:9},
      apiUrl: {
        query: "/OutStock/GetV_OutStockListByPage",
        exportXls: "/OutStock/GetV_OutStockDetailListExp"
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
      OutStockDetailList: [],
      outerVisible: false,

      tHeader: [
   
      ],
      filterVal: [
    
      ]
    };
  },
  methods: {
    handleClick(val) {
      var min = this;
      min.outerVisible = true;

      var model = {};
      model.Erpvoucherno = val.Erpvoucherno;

      getOutStockDetail(model).then(res => {
        debugger;
        if (res.Result == 1) {
          debugger;
          min.OutStockDetailList = res.Data;
        } else {
          min.$message.error(res.ResultValue);
        }
      });
    },
    expOutStock(expType){
      debugger;
      if(expType==1){
        this.apiUrl.exportXls="/OutStock/Get_VOutstockExp";
        this.tHeader=[
        "发货通知单号",
        "单据名称",
        "客户编码",
        /* "客户名称",
        "通知日期", */
        "备注",
        "送货地址",
        "客户联络人姓名",
        "联络人电话",
        "月台",
        "总重量",
        "总费用",
        "送货上门费",
        "配货状态",
        "配货人",
        "配货时间",
        "过账状态",
        "过账人",
        "过账时间",
        
        ];
        this.filterVal=[
        "Erpvoucherno",
        "Parametername",
        "Customerno",
       /*  "Customername",
        "Voudate", */
        "Erpnote",
        "Address",
        "Contacts",
        "Tel",
        "LineNo",
        "WeightTotal",
        "CostTotal",
        "OutCostTotal",
        "Statusname",
        "Creater",
        "Createtime",
        "Poststatusname",
        "Postuser",
        "Postdate"
        
        ];
      }else{
        this.apiUrl.exportXls="/OutStock/GetV_OutStockDetailListExp";
        this.tHeader=[
        "发货通知单号",
        "单据名称",
        "客户编码",
        /* "客户名称",
        "通知日期", */
        "备注",
        "送货地址",
        "客户联络人姓名",
        "联络人电话",
        "月台",
        "总重量",
        "总费用",
        "送货上门费",
        "仓库",
        "项次",
        "项序",
        "物料编码",
        "物料名称",
        "批次",
        "订单数量",
        "未发货数量",
        "已发货数量",
        "已拣货数量",
        "总件数", 
        "整箱数",
        "散件数",
        "拼箱码",
        "单位",
        "规格型号",
        "配货人",
        "配货时间",
        "过账人",
        "过账时间"
        ];
        this.filterVal=[
        "Erpvoucherno",
        "Parametername",
        "Customerno",
       /*  "Customername",
        "Voudate", */
        "Erpnote",
        "Address",
        "Contacts",
        "Tel",
        "LineNo",
        "WeightTotal",
        "CostTotal",
        "OutCostTotal",
        "Towarehouseno",
        "Rowno",
        "Rownodel",
        "Materialno",
        "Materialdesc",
        "Batchno",
        "Voucherqty",
        "Remainqty",
        "Postqty",
        "Outstockqty",
        "PackageNum",
        "SystemCartonNum",
        "SystemPackageCartonNum",
        "PackageCode",
        "Unit",
        "Spec",
        "Creater",
        "Createtime",
        "Postuser",
        "Postdate"
        
        ];
      }
      this.handleExportXls();

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
