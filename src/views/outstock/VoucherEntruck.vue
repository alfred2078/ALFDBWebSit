<template>
  <div class="layout">
    <el-row>
      <el-card ref="refForm" type="flex">
        <el-form :model="queryParam" size="small "  @keyup.enter.native="getModelListPage">
          <el-row>
            <el-col :span="5">
              <el-form-item label-width label>
                <el-input v-model="queryParam.Arrvoucherno" placeholder="发货通知单号" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label-width label>
                <el-input v-model="queryParam.Erpvoucherno" placeholder="托运单号" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label-width label>
                <el-input v-model="queryParam.Customerno" placeholder="客户编码" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width label>
                <el-input v-model="queryParam.Customername" placeholder="客户名称" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label-width label>
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
            <el-col :span="3">
              <el-form-item label>
                <el-input v-model="queryParam.Materialno" clearable placeholder="物料编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label>
                <el-input v-model="queryParam.Materialdesc" clearable placeholder="物料名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label>
                <el-input v-model="queryParam.Trackingnumber" clearable placeholder="物流单号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label>
                <el-input v-model="queryParam.LogisticsCompany" clearable placeholder="物流公司"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Creater"
                  placeholder="创建人"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-select
                  style="width:100%"
                  v-model="queryParam.SettlementMethod"
                  clearable
                  placeholder="结算方式"
                >
                  <el-option
                    v-for="item in SettlementMethodListAll"
                    :key="item.Parameterid"
                    :label="item.Parametername"
                    :value="item.Parameterid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-select
                  style="width:100%"
                  v-model="queryParam.SendMethod"
                  clearable
                  placeholder="提货方式"
                >
                  <el-option
                    v-for="item in SendMethodListAll"
                    :key="item.Parameterid"
                    :label="item.Parametername"
                    :value="item.Parameterid"
                  ></el-option>
                </el-select>
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
            <el-button size="small" icon type="primary" @click="PrintClick">单据打印</el-button>
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
            :data="Data"
            v-loading="loading"
            @selection-change="GetCheckChange"
            ref="Table"
            @current-change="chooseMcaterialChange"
            :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
            height="330"
            style="width: 100%"
            row-key="id"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column type="selection" width="55" height="auto" class="layout-table"></el-table-column>
            <el-table-column prop="Erpvoucherno" label="托运单号" width="180"></el-table-column>
            <el-table-column prop="Arrvoucherno" label="发货通知单号" width="180"></el-table-column>
            <el-table-column prop="Customerno" label="客户编码" width="120"></el-table-column>
            <el-table-column prop="Customername" label="客户名称" width="180"></el-table-column>
            <el-table-column prop="Trackingnumber" label="物流单号" width="180"></el-table-column>
            <el-table-column prop="LogisticsCompany" label="发货物流" width="200"></el-table-column>
            <el-table-column prop="Address" label="到站" width="250"></el-table-column>
            <el-table-column prop="Contacts" label="收货人" width="100"></el-table-column>
            <el-table-column prop="Tel" label="收货电话" width="120"></el-table-column>
            <el-table-column prop="Note" label="备注" width="120"></el-table-column>
            <el-table-column prop="Creater" label="装车发货人" width="100"></el-table-column>
            <el-table-column prop="PrePrice" label="单价" width="80"></el-table-column>
            <el-table-column prop="WeightTotal" label="重量" width="80"></el-table-column>
            <el-table-column prop="InsuranceCost" label="保费" width="80"></el-table-column>
            <el-table-column prop="OutCostTotal" label="送货费" width="80"></el-table-column>
            <el-table-column prop="CostTotal" label="运费" width="80"></el-table-column>
            <el-table-column prop="SettlementMethodName" label="结算方式" width="100"></el-table-column>
            <el-table-column prop="SumPackageNum" label="总件数" width="80"></el-table-column>
            <el-table-column prop="SendMethodName" label="提货方式" width="100"></el-table-column>
            <el-table-column prop="Creater" label="创建人" width="100"></el-table-column>
            <el-table-column sortable prop="Createtime" label="创建时间" width="190"></el-table-column>

            <el-table-column fixed="right" label="操作" :render-header="renderHeader">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small" idth="80">详情</el-button>
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
    <el-dialog title="托运单---详情" width="70%" :show-close="true" :visible.sync="outerVisible">
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
          :data="WayBillDetaillList"
          :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
          style="width: 100%"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
        <el-table-column prop="Arrvoucherno" label="发货通知单号" width="180"></el-table-column>
        <el-table-column prop="Materialno" label="物料编码"  width="120"></el-table-column>
          <el-table-column prop="Materialdesc" label="物料名称" width="220"></el-table-column>
          <el-table-column prop="Sumqty" label="件数" width="80"></el-table-column>
          <el-table-column prop="Parametername" label="业务类型" width="120"></el-table-column>
          <el-table-column prop="ProvinceName" label="所属省" width="100"></el-table-column>
          <el-table-column prop="CityName" label="所属市" width="100"></el-table-column>
          <el-table-column prop="RegionName" label="所属区" width="140"></el-table-column>
          <el-table-column prop="Qty" label="数量"></el-table-column>
          <el-table-column prop="Rowno" label="项次" width="80"></el-table-column>
          <el-table-column prop="Rownodel" label="项序" width="80"></el-table-column>
          <el-table-column prop="OutCostTotal" label="送货费" width="80"></el-table-column>
          <el-table-column prop="CostTotal" label="运费" width="80"></el-table-column>
           <el-table-column prop="FreightProfit" label="运费盈利" width="100"></el-table-column>
          <el-table-column prop="WeightPrice" label="单价" width="80"></el-table-column>
         
          <el-table-column prop="SullpierSettlementFreight" label="供应商结算运费" width="140"></el-table-column>
          <el-table-column prop="PreWeight" label="商品重量" width="100"></el-table-column>
          <el-table-column prop="Creater" label="配货人" width="100"></el-table-column>
          <el-table-column prop="Postuser" label="过账人" width="100"></el-table-column>
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
import { getWayBillDetailHeaderidsub, getWayBillDetail,windowpost ,getParameterList} from "@/api/api";
import Vue from "vue";
import store from "@/store";
export default {
  name: "outstock-voucherentruck",
  mixins: [ALFModelListMixins],

  components: {
    Pagination,
    windowpost
  },
  data() {
    return {
      xlsname: "托运单",
      queryParam: {
        Arrvoucherno:"",
        Erpvoucherno: "",
        Customerno: "",
        Createtime: "",
        Towarehouseno: "",
        Customername:"",
        Materialno:"",
        Materialdesc:"",
        LogisticsCompany:"",
        Trackingnumber:"",
        SettlementMethod:"",
        SendMethod:""
      },
      SettlementMethodListAll:[],
      SendMethodListAll:[],
      Arrvoucherno: "",
      Operate: {Arrvoucherno:9, Erpvoucherno: 9, customerno: 9 ,Customername:9,LogisticsCompany:9},
      apiUrl: {
        query: "/WayBill/Get_WayBillListByPage",
        exportXls: "/WayBill/GetWayBillDetailExp"
      },
      outerVisible: false,
      WayBillDetaillList: [],
      CheckChangeData: {}, // 当前选中的值
      tHeader: [
        "发货通知单号",
        "托运单号",
        "客户编码",
        "客户名称",
        "件数",
        "总件数",
        "所属省",
        "所属市",
        "所属区",
        "物流单号",
        "发货物流",
        "到站",
        "收货人",
        "收货电话",
        "备注",
        "装车发货人",
        "单价",
        "重量",
        "保费",
        "送货费",
        "运费",
        "运费盈利",
        "供应商结算运费",
        "结算方式",
        "提货方式",
        "物料编码",
        "物料名称",
        "业务类型",
        "数量",
        "项次",
        "项序",
        
        "配货人",
        "过账人",
        "创建时间"
      ],
      filterVal: [
        "Arrvoucherno",
        "Erpvoucherno",
        "Customerno",
        "Customername",
        "Sumqty",
        "SumPackageNum",
        "ProvinceName",
        "CityName",
        "RegionName",
        "Trackingnumber",
        "LogisticsCompany",
        "Address",
        "Contacts",
        "Tel",
        "Note",
        "Creater",
        "WeightPrice",
        "PreWeight",
        "InsuranceCost",
        "OutCostTotal",
        "CostTotal",
        "FreightProfit",
        "SullpierSettlementFreight",
        "SettlementMethodNames",
        "SendMethodNames",
        "Materialno",
        "Materialdesc",
        "Parametername",
        "Qty",
        "Rowno",
        "Rownodel",
        
        "Creater",
        "Postuser",
        "Createtime"
      ]
    };
  },
  created() {
    this.getSettlementMethodListAll();
    this.getSendMethodListAll();
  },
  methods: {
    getSettlementMethodListAll() {
      // queryParam.Groupname = "VoucherRec_Type"
      let type = "WayBill_SettlementMethod_Name";
      getParameterList({ Groupname: type }).then(res => {
        if (res.Result === 1) {
          // this.ruleListSelect = res.Data.map(item=>item.Ruleid)
          this.SettlementMethodListAll = res.Data;
        }
      });
    },
    getSendMethodListAll() {
      // queryParam.Groupname = "VoucherRec_Type"
      let type = "WayBill_SendMethod_Name";
      getParameterList({ Groupname: type }).then(res => {
        if (res.Result === 1) {
          // this.ruleListSelect = res.Data.map(item=>item.Ruleid)
          this.SendMethodListAll = res.Data;
        }
      });
    },
    getInfo(){
      this.PageData.currentPage=1;
      this.search();
    },
    search() {
      var min = this;
      if (
        min.Arrvoucherno != "" &&
        min.Arrvoucherno != null &&
        min.Arrvoucherno != undefined
      ) {
        var model = {};
        model.Arrvoucherno = min.Arrvoucherno;
        getWayBillDetailHeaderidsub(model).then(res => {
          debugger;
          if (res.Result == 1) {
            if (res.Data != undefined) {
              min.queryParam.Id = res.Data.Headeridsub;
              min.getModelList();
              delete min.queryParam.Id;
            } else {
              min.Data = [];
            }
          } else {
            min.$message.error(res.ResultValue);
          }
        });
      } else {
        min.getModelList();
      }
    },
    handleClick(val) {
      var min = this;
      min.outerVisible = true;

      var model = {};
      //model = val;
     // delete model.Createtime;
     model.Erpvoucherno = val.Erpvoucherno;
      getWayBillDetail(model).then(res => {
        debugger;
        if (res.Result == 1) {
          min.WayBillDetaillList = res.Data;
        } else {
          min.$message.error(res.ResultValue);
        }
      });
    },
    //table选中，只能选中一行 不能多选
    GetCheckChange(val) {
      debugger;
      if (val.length > 1) {
        this.$refs.Table.clearSelection();
        this.$refs.Table.toggleRowSelection(val.pop());
        //return;
      } else {
        this.CheckChangeData = {};
        this.CheckChangeData = val;
        console.log(this.CheckChangeData);
      }
    },
    chooseMcaterialChange(val) {
      this.$refs.Table.toggleRowSelection(val);
    },
    PrintClick() {
      debugger;
      if (this.CheckChangeData.length == 1) {
        var Erpvoucherno = this.CheckChangeData[0].Erpvoucherno;
        windowpost(Erpvoucherno, "TWayBill");
      }
    },
    expOutStock(expType){
      debugger;
      if(expType==1){
        this.apiUrl.exportXls="/WayBill/Get_WayBillExp";
        this.tHeader=[
        "发货通知单号",
        "托运单号",
        "客户编码",
        "客户名称",
        "物流单号",
        "发货物流",
        "到站",
        "收货人",
        "收货电话",
        "备注",
        "装车发货人",
        "单价",
        "重量",
        "保费",
        "送货费",
        "运费",
        "总件数",
        "结算方式",
        "提货方式",
        "创建人",
        "创建时间"
        ];
        this.filterVal=[
        "Arrvoucherno",
        "Erpvoucherno",
        "Customerno",
        "Customername",
        
        "Trackingnumber",
        "LogisticsCompany",
        "Address",
        "Contacts",
        "Tel",
        "Note",
        "Creater",
        "PrePrice",
        "WeightTotal",
        "InsuranceCost",
        "OutCostTotal",
        "CostTotal",
        "SumPackageNum",
        "SettlementMethodName",
        "SendMethodName",   
        "Creater",
        "Createtime"
      
        ];
      }else{
        this.apiUrl.exportXls="/WayBill/GetWayBillDetailExp";
        this.tHeader=[
        "发货通知单号",
        "托运单号",
        "客户编码",
        "客户名称",
        /* "件数", */
        "总件数",
        "所属省",
        "所属市",
        "所属区",
        "物流单号",
        "发货物流",
        "到站",
        "收货人",
        "收货电话",
        "备注",
        "装车发货人",
        "单价",
        "重量",
        "保费",
        "送货费",
        "运费",
        "运费盈利",
        "供应商结算运费",
        "结算方式",
        "提货方式",
        "物料编码",
        "物料名称",
        "业务类型",
        "数量",
        "项次",
        "项序",
        
        "配货人",
        "过账人",
        "创建时间"
        ];
        this.filterVal=[
        "Arrvoucherno",
        "Erpvoucherno",
        "Customerno",
        "Customername",
        /* "Sumqty", */
        "SumPackageNum",
        "ProvinceName",
        "CityName",
        "RegionName",
        "Trackingnumber",
        "LogisticsCompany",
        "Address",
        "Contacts",
        "Tel",
        "Note",
        "Creater",
        "WeightPrice",
        "PreWeight",
        "InsuranceCost",
        "OutCostTotal",
        "CostTotal",
        "FreightProfit",
        "SullpierSettlementFreight",
        "SettlementMethodNames",
        "SendMethodNames",
        "Materialno",
        "Materialdesc",
        "Parametername",
        "Qty",
        "Rowno",
        "Rownodel",
        
        "Creater",
        "Postuser",
        "Createtime"
        
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
