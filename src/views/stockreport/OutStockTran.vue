<template>
  <div class="layout">
    <el-row>
      <el-card ref="refForm" type="flex">
        <el-form :model="queryParam" size="small " @keyup.enter.native="getModelListPage">
          <el-row>
            <el-col :span="3">
              <el-form-item>
                <el-select
                  style="width:100%"
                  v-model="queryParam.Vouchertype"
                  clearable
                  placeholder="单据名称"
                >
                  <el-option
                    v-for="item in voucherTyleListAll"
                    :key="item.Parameterid"
                    :label="item.Parametername"
                    :value="item.Parameterid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label>
                <el-input v-model="queryParam.Strongholdcode" placeholder="据点" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label>
                <el-input v-model="queryParam.Towarehouseno" placeholder="仓库" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label>
                <el-input v-model="queryParam.Erpvoucherno" placeholder="ERP单号" clearable></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="4">
              <el-form-item label>
                <el-input v-model="queryParam.Materialno" placeholder="物料编码" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label>
                <el-input v-model="queryParam.Batchno" placeholder="批次" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
           
            <el-col :span="4">
              <el-form-item label>
                <el-input v-model="queryParam.Barcode" placeholder="条码" clearable></el-input>
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

            <el-col :span="3">
              <el-form-item>
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
            <el-button
              @click="handleExportXls"
              size="small "
              icon="el-icon-download"
              type="primary"
            >导出</el-button>
          </el-col>
          <!-- <el-col :span="2">
            <el-button
              @click="iscolumn=true"
              size="small "
              icon="el-icon-view"
              type="primary"
            >自定义列</el-button>
          </el-col> -->
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
            height="auto"
            class="layout-table"
            :cell-style="{ padding: '2px' }"
            style="width: 100%;"
            ref="multipleTable"
          >
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
<el-dialog title="自定义列"  :show-close="true"  :visible.sync="iscolumn">
  <el-card
        :style="{          
          padding: '10px 50px',
          background: '#fff'
        }" 
      >
    <el-transfer
      
        v-model="concealData"
       
        :titles="['显示列', '隐藏列']"
        @change="handleChange"
        :data="showData"
    ></el-transfer>
  </el-card>
   <div slot="footer" class="dialog-footer">
    <el-button @click="iscolumn = false">取 消</el-button>
    <el-button type="primary" @click="saveColumn">保 存</el-button>
  </div>
</el-dialog>

  </div>
</template>
<style lang="scss" scoped>
@import "@/styles/layout.scss";
</style>
<script>
import { ALFModelListMixins } from "@/mixins/ALFModelListMixins";

import { getParameterList } from "@/api/api";

import Pagination from "@/components/Pagination";
export default {
  mixins: [ALFModelListMixins],
  components: {
    Pagination
  },
  data() {
    return {
      iscolumn:false,
      showData: [],
      concealData: [],
      xlsname: "出库记录",
      queryParam: {
        Strongholdcode: "",
        Towarehouseno: "",
        Erpvoucherno: "",
   
        Materialno: "",
        Batchno: "",
        Barcode: "",
        Createtime: "",
        Vouchertype: ""
      },
      Operate: { Erpvoucherno: 9, Materialno: 9, Batchno: 9, Barcode: 9 },
      voucherTyleListAll: [],
      voucherTyleListSelect: [],
      apiUrl: {
        query: "/OutStockTran/GetT_OutStockTranListByPage",
        save: "",
        update: "",
        exportXls: "/OutStockTran/GetT_OutStockTranListExp"
      },
      columns: [
        {
         
          label: "据点",
          prop: "Strongholdcode",
          colvisible: true,
          width: 60
        },
        {
         
          label: "仓库",
          prop: "Towarehouseno",
          colvisible: true,
          width: 80
        },
        {
          
          label: "库位",
          prop: "Toareano",
          colvisible: true,
          width: 80
        },
        {
          key:4,
          label: "单据名称",
          prop: "Strvouchertype",
          colvisible: true,
          width: 120
        },
        {
         
          label: "ERP单号",
          prop: "Erpvoucherno",
          colvisible: true,
          width: 145
        },
        {
         
          label: "客户编码",
          prop: "Customerno",
          colvisible: true,
          width: 100
        },
        {
         
          label: "客户名称",
          prop: "Customername",
          colvisible: true,
          width: 270
        },
        {
         
          label: "物料编码",
          prop: "Materialno",
          colvisible: true,
          width: 120
        },
        {
        
          label: "客户件号",
          prop: "Cusmaterialno",
          colvisible: true,
          width: 120
        },
        {
         
          label: "物料描述",
          prop: "Materialdesc",
          colvisible: true,
          width: 200
        },
        {
         
          label: "条码",
          prop: "Barcode",
          colvisible: true,
          width: 450
        },
        {
         
          label: "批次",
          prop: "Batchno",
          colvisible: true,
          width: 100
        },
        {
          
          label: "数量",
          prop: "Qty",
          colvisible: true,
          width: 60
        },
       
        {
         
          label: "出库人",
          prop: "Struserno",
          colvisible: true,
          width: 90
        },
        {
          
          label: "出库时间",
          prop: "Createtime",
          colvisible: true,
          width: 200
        }
      ],
      tHeader: [
        "据点",
        "仓库",
        "库位",
        "单据名称",
        "ERP单号",
        "客户编码",
        "客户名称",
        "物料编码",
        "客户件号",
        "物料描述",
        "条码",
        "批次",
        "数量",
      
        "出库人",
        "出货时间"
      ],
      filterVal: [
        "Strongholdcode",
        "Towarehouseno",
        "Toareano",
        "Strvouchertype",
        "Erpvoucherno",
        "Customerno",
        "Customername",
        "Materialno",
        "Cusmaterialno",
        "Materialdesc",
        "Barcode",
        "Batchno",
        "Qty",
     
        "Struserno",
        "Createtime"
      ]
    };
  },

  methods: {
    getParameterList() {
      // queryParam.Groupname = "VoucherRec_Type"
      let type = "VoucherOut_Name";
      getParameterList({ Groupname: type }).then(res => {
        if (res.Result === 1) {
          // this.ruleListSelect = res.Data.map(item=>item.Ruleid)
          this.voucherTyleListAll = res.Data;
        }
      });
    },
    customColumns(){
      this.showData=[];
      var keyList ={};
      this.columns.forEach(t => {
        keyList.key = t.label;
        this.showData.push(keyList);
        keyList={};
      });
    },
    saveColumn(){
      
      this.columns.forEach(t => {
       if(this.concealData.length==0)
       {
         if(!t.colvisible)
         t.colvisible=true;
       }
       this.concealData.every(ts=>{
          debugger;
          if(t.label==ts)
          {
            t.colvisible=false;
            return false;
          }else
          {
            t.colvisible=true;
            return true;
          }
        });
      });
      this.$nextTick(()=>{ this.$refs.multipleTable.doLayout() })
      this.iscolumn=false;

    }
  },
  created() {
    this.getParameterList();
    this.customColumns();
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
