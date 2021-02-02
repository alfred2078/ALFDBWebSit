<template>
  <div class="layout">
    <el-row>
      <el-card ref="refForm" type="flex">
        <el-form
          :model="queryParam"
          size="small "
          @keyup.enter.native="getModelListPage"
        >
          <el-row>
            <el-col :span="3">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Strongholdcode"
                  placeholder="据点"
                  clearable
                ></el-input>
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
                  v-model="queryParam.Areano"
                  placeholder="库位"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Materialno"
                  placeholder="物料编码"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Batchno"
                  placeholder="批次"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Qualityno"
                  placeholder="检验单号"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            
          </el-row>
          <el-row>
            <el-col :span="3">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Checktypecode"
                  placeholder="盘点分类"
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
            <el-col :span="9">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Barcode"
                  placeholder="条码"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Serialno"
                  placeholder="序列号"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-button
                  icon="el-icon-search"
                  type="primary"
                  @click="getModelListPage"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-row>
    <el-row>
      <el-card ref="refButton" body-style="padding:10px;" type="flex">
        <el-row>
          <el-col :span="3">
            <el-select
              style="width:90%"
              v-model="printType"
              placeholder="单据名称"
            >
              <el-option
                v-for="item in printTypeList"
                :key="item.printTypeid"
                :label="item.printTypename"
                :value="item.printTypeid"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button
              @click="print"
              size="small "
              icon="el-icon-download"
              type="primary"
              >批量打印</el-button
            >
          </el-col>

        <el-col :span="2">
          <el-button
            @click="Exp"
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
            ref="table"

            :max-height="screenHeight"
            height="auto"
            class="layout-table"
            @selection-change="changeFun"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <template v-for="item in columns">
              <el-table-column
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :sortable="item.sortable"
                v-if="item.colvisible"
                show-overflow-tooltip
              ></el-table-column>
            </template>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="detail(scope.row)" type="text" size="mini">详情</el-button>
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
    <el-dialog title="盘点单---详情" width="90%"  :show-close="true" :visible.sync="outerVisible">
      <div
        :style="{          
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff',
          
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
          height="500"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >

          <el-table-column prop="Rowno" label="行号"></el-table-column>
          <el-table-column prop="Towarehouseno" label="仓库编号" width="100"></el-table-column>
          <el-table-column prop="Materialno" label="物料编码" width="120"></el-table-column>
          <el-table-column prop="Materialdesc" label="物料名称" width="120"></el-table-column>
          <el-table-column prop="Batchno" label="批次" width="120"></el-table-column>
          <el-table-column prop="Barcode" label="条码" width="280"></el-table-column>
          <el-table-column prop="Serialno" label="序列号" width="120"></el-table-column>
          <el-table-column prop="Erpvoucherno" label="单号" width="180"></el-table-column>
          <el-table-column prop="Parametername" label="单据类型" width="120"></el-table-column>
          <el-table-column prop="Qty" label="数量" width="80"></el-table-column>
          
          <el-table-column prop="Strongholdcode" label="据点编号" width="120"></el-table-column>
          <el-table-column prop="Strongholdname" label="据点名称" width="120"></el-table-column>
          
          <el-table-column prop="Unit" label="单位" width="80"></el-table-column>
          <el-table-column prop="Spec" label="规格" width="120"></el-table-column>
          <el-table-column prop="Edate" label="有效期" width="120"></el-table-column>
          <el-table-column prop="Username" label="创建人" width="120"></el-table-column>
          <el-table-column prop="Createtime" label="创建时间" width="220"></el-table-column>
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
import { windowpost,getTScanDetailSub } from "@/api/api";
export default {
  name: "stockreport-stockdetail",
  mixins: [ALFModelListMixins],
  components: {
    Pagination,
    windowpost
  },
  data() {
    return {
      detailsData:[],
      outerVisible: false,
      xlsname: "库存明细",
      queryParam: {
        Towarehouseno: "",
        Areano: "",
        Materialno: "",
        Batchno: "",
        Createtime: "",
        Cusmaterialno: "",
        Strongholdcode: "",
        Serialno:"",
        Barcode:"",
        Checktypecode:"",
        Creater:""
      },
      Operate: { Areano: 9,Towarehouseno: 9, Materialno: 9, Batchno: 9, Cusmaterialno: 9,Serialno:9 },
      outerVisible: false,
      screenHeight: null,
      idshow: false,

      apiUrl: {
        query: "/Stock/GetV_StockListByPage",
        save: "",
        update: "",
        exportXls: "/Stock/GetV_StockListExp"
      },
      printTypeList: [
        { printTypeid: 1, printTypename: "激光打印机" },
        { printTypeid: 2, printTypename: "台式打印机" }
      ],
      printType: 1,
      tHeader: [
        "据点",
        "仓库",
        "库位",
        "物料编码",
        "物料描述",       
        "条码",
        "批次",
        "序列号",
        "数量",
        "单位",
        "单位名称",
        "规格",
        "效期",
        "69码",
        "质检状态",
        "限制性",
        "供应商",       
        "供应商名称",
        "拣货数量",
        "检验单号",
        "到货单号",
        "盘点分类编号",
        "盘点分类名称",
        "创建人",
        "创建时间",
      ],
      filterVal: [
        "Strongholdcode",
        "Towarehouseno",
        "Areano",
        "Materialno",
        "Materialdesc",
        "Barcode",
        "Batchno",
        "Serialno",
        "Qty",
        "Unit",
        "Unitname",
        "Spec",
        "Edate",
        "Watercode",
        "Strstatus",
        "StrIslimitstock",
        "Supplierno",
        "Suppliername",
        "TaskQty",
        "Qualityno",
        "Arrvoucherno",
        "Checktypecode",
        "Checktypename",
        "Creater",
        "Createtime",
      ],
      columns: [
        {
          label: "据点",
          prop: "Strongholdcode",
          colvisible: true,
          width: 80
        },
        {
          label: "仓库",
          prop: "Towarehouseno",
          colvisible: true,
          width: 100
        },
        {
          label: "库位",
          prop: "Areano",
          colvisible: true,
          width: 120
        },
        // {
        //   label: "仓库名称",
        //   prop: "Warehousename",
        //   colvisible: true
        // },
        {
          label: "物料编码",
          prop: "Materialno",
          sortable:true,
          colvisible: true,
          width: 150
        },
        // {
        //   label: "客户件号",
        //   prop: "Cusmaterialno",
        //   colvisible: true
        // },
        {
          label: "物料描述",
          prop: "Materialdesc",
          colvisible: true,
          width: 150
        },
        {
          label: "条码",
          prop: "Barcode",
          colvisible: true,
          width: 330
        },
        {
          label: "批次",
          prop: "Batchno",
          colvisible: true,
          width: 120
        },
        {
          label: "序列号",
          prop: "Serialno",
          colvisible: true,
          width: 150
        },
        {
          label: "数量",
          prop: "Qty",
          colvisible: true,
          width: 100
        },
        {
          label: "单位",
          prop: "Unit",
          colvisible: true,
          width: 100
        },
        {
          label: "单位名称",
          prop: "Unitname",
          colvisible: true,
          width: 100
        },
        {
          label: "规格",
          prop: "Spec",
          colvisible: true,
          width: 150
        },
        {
          label: "效期",
          prop: "Edate",
          colvisible: true,
          width: 110
        },
        {
          label: "69码",
          prop: "Watercode",
          colvisible: true,
          width: 140
        },
        {
          label: "质检状态",
          prop: "Strstatus",
          colvisible: true,
          width: 100
        },
        {
          label: "限制性",
          prop: "StrIslimitstock",
          colvisible: true,
          width: 100
        },
        {
          label: "供应商",
          prop: "Supplierno",
          colvisible: true,
          width: 100
        },
        {
          label: "供应商名称",
          prop: "Suppliername",
          colvisible: true,
          width: 150
        },
        {
          label: "拣货数量",
          prop: "TaskQty",
          colvisible: true,
          width: 100
        },
        {
          label: "检验单号",
          prop: "Qualityno",
          colvisible: true,
          width: 180
        },
        {
          label: "到货单号",
          prop: "Arrvoucherno",
          colvisible: true,
          width: 180
        },
        {
          label: "盘点分类编号",
          prop: "Checktypecode",
          colvisible: true,
          width: 120
        },
        {
          label: "盘点分类名称",
          prop: "Checktypename",
          colvisible: true,
          width: 120
        },
        {
          label: "创建人",
          prop: "Creater",
          colvisible: true,
          width: 120
        },
        {
          label: "创建时间",
          prop: "Createtime",
          sortable:true,
          colvisible: true,
          width: 180
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
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
        if (column.property === 'Qty' || column.property === 'TaskQty' ) {
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
this.$nextTick(() => {
        this.$refs.table.doLayout();
      });
      return sums;
    }, */
    //详情
    detail(val) {
       
      var min = this;
      min.outerVisible = true;
      min.detailsData = [];
      min.model = {};
      min.model.Towarehouseno = val.Towarehouseno;
      min.model.Materialno = val.Materialno;
      getTScanDetailSub(min.model).then(res => {
        if (res.Result == 1) {
          min.detailsData = res.Data;
          console.log(min.detailsData);
        } else {
          min.$message.error(res.ResultValue);
        }
      });
    },
    changeFun(val) {
      this.multipleSelection = val;
    },
    print() {
      this.multipleSelection[0].Printertype = this.printType;
      console.log(this.multipleSelection);
      if (this.multipleSelection.length > 0) {
        windowpost(JSON.stringify(this.multipleSelection), "PalletList");
      }
    },
    Exp(){

      if(this.queryParam.Towarehouseno=='' 
        && this.queryParam.Areano==''
        && this.queryParam.Materialno==''
        && this.queryParam.Batchno==''
        && this.queryParam.Createtime==''
        && this.queryParam.Cusmaterialno==''
        && this.queryParam.Strongholdcode==''
        && this.queryParam.Serialno==''
        && this.queryParam.Barcode==''
        && this.queryParam.Checktypecode==''
        && this.queryParam.Creater=='' )
      {
         this.$message({
          message: "请输入条件后，在进行导出！",
          type: "warning"
         });
         return;
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
