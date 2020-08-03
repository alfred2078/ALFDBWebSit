<template>
  <div>
    <el-card >
      <el-form :model="Checkrefserial" size="small ">
        <el-row>
          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="Checkrefserial.Erpvoucherno" placeholder="盘点单号" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="Checkrefserial.Materialno" placeholder="物料编码" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="Checkrefserial.Areano" placeholder="库位" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="0">
              <el-button icon="el-icon-search" @click="getInfo" type="primary">查询</el-button>
              <el-button icon="el-icon-refresh-right" type="primary">重置</el-button>
              
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>

    <el-card body-style="padding:10px;">
      <el-row>
        <el-col :span="2">
          <el-popconfirm
             title="确认要进行盈亏处理操作？" @onConfirm="delClo"
          >
              <el-button size="small" icon=""  type="primary" slot="reference">盈亏处理</el-button>
          </el-popconfirm>
        </el-col>

        
        <el-col :span="2">
          <el-button size="small" icon="" type="primary" @click="exportToExcel">导出</el-button>
        </el-col>

      </el-row>
    </el-card>

    <el-card body-style="padding:2px;">
      <el-table :data="tableData" border :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
        :header-row-style="{ height: '30', font: 'normal' }"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" style="width: 100%" row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="Remarks" label="盈亏情况" fixed> </el-table-column>
        <el-table-column prop="Warehouseno" label="仓库编码" fixed> </el-table-column>
        <el-table-column prop="Materialno" label="物料编码" fixed> </el-table-column>
        <el-table-column prop="Materialdesc" label="物料名称"> </el-table-column>
        <el-table-column prop="Strongholdcode" label="据点"> </el-table-column>
        <el-table-column prop="Serialno" label="序列号"> </el-table-column>
        <el-table-column prop="Areano" label="实盘库位"> </el-table-column>
        <el-table-column prop="Qty" label="实盘数量"></el-table-column>
        <el-table-column prop="Sareano" label="帐存库位"></el-table-column>
        <el-table-column prop="Bqty" label="帐存数量"></el-table-column>
        <el-table-column prop="Yqty" label="盘盈数量"></el-table-column>
        <el-table-column prop="Kqty" label="盘亏数量"></el-table-column>
        <el-table-column prop="Creater" label="盘点人"></el-table-column>
        <el-table-column prop="Createtime" label="盘点时间"></el-table-column>


      </el-table>
    </el-card>
  </div>
</template>

<script>
  import {
    getTCheckAnalyze,
    delCloTCheck
  } from "@/api/api";
  import {
  postAction
  } from "@/api/manage";
  import {
    USER_NAME
  } from "@/store/mutation-types";
  import Vue from "vue";

  export default {
    data() {
      return {
        Checkrefserial: {
          Erpvoucherno:"",
          Materialno:"",
          Areano:""
        },
        outerVisible: true,
        tableData: [],
        filterVal: ['Remarks', 'Warehouseno', 'Materialno', 'Materialdesc',
          'Strongholdcode', 'Serialno', 'Areano', 'Qty', 'Sareano', 'Bqty', 'Yqty'
          , 'Kqty', 'Creater', 'Createtime'
        ],
        tHeader: ['盈亏情况', '仓库编码', '物料编码', '物料名称',
          '据点', '序列号', '实盘库位', '实盘数量', '帐存库位', '帐存数量', '盘盈数量'
          , '盘亏数量', '盘点人', '盘点时间'
        ],
        xlsname:"盘点分析汇总",
      }
    },
    created(){
      this.geteParams();
    },
    beforeRouteEnter(to, from, next){
      next(vm=>{
          console.log(vm)
          // 每次进入路由执行
          vm.geteParams()
      })
    },
     mounted:{
     
    },
    methods:{
        geteParams(){
        
          this.Checkrefserial.Erpvoucherno=this.$store.getters.Erpvoucherno;
        
        },
        getInfo(){
            var min = this;
            if(this.Checkrefserial.Erpvoucherno=="")
            {
              min.$message({
                message: '请输入盘点单号',
                type: 'warning'
              });
              return;
            }
            getTCheckAnalyze(min.Checkrefserial).then(res=>{
              debugger;
              if (res.Result === 1) {
              min.tableData=res.Data;
              }
              else {
                min.$message.error(res.ResultValue);
              }

            })
        },       
        delClo(){
          var min = this;
          delCloTCheck(min.Checkrefserial).then(res=>{
              debugger;
              if (res.Result === 1) {
                  min.$message({
                  message: '处理成功',
                  type: 'success'
                  });
                  min.getInfo();
              }
              else {
                min.$message.error(res.ResultValue);
              }

            })

        },
        exportToExcel() {
          debugger;
          require.ensure([], () => {
            const {
              export_json_to_excel
            } = require("exportexcel/Export2Excel");

            const xlsdata = this.formatJson(this.filterVal, this.tableData);
            console.log(this.exportList)

            export_json_to_excel(this.tHeader, xlsdata, this.xlsname);

          });      
        },
        formatJson(filterVal, jsonData) {
          debugger;
          return jsonData.map(v => filterVal.map(j => v[j]));
        }

    }
  }

</script>

<style lang="scss" scoped>
  >>>.element.style {
    margin: 0;
    ;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  >>>.el-dialog {
    margin: 5vh auto 50px !important;
  }

  >>>.el-dialog__title {
    font-size: 14px;
    color: #fff;
  }

  >>>.el-dialog__header {
    background-color: #3b9bf5e6;
  }

  .el-form-item {
    margin: 10px;
  }

</style>
