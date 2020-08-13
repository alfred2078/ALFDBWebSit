<template>
  <div>
    <el-card>
      <el-form :model="queryParam" size="small " @keyup.enter.native="getModelList">
        <el-row>
          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="queryParam.Erpvoucherno" placeholder="领料单号" clearable></el-input>
            </el-form-item>
          </el-col>

         
          <el-col :span="9">
            <el-form-item label-width="" label="">
              <el-date-picker v-model="queryParam.Createtime" type="daterange" range-separator="至" start-placeholder="创建开始日期"
                end-placeholder="创建结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="0">
              <el-button icon="el-icon-search" type="primary"  @click="getModelList">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>


          
        </el-row>
      </el-form>
    </el-card>

    <el-card body-style="padding:10px;">
      <el-row>
        <el-col :span="2">
          <!-- <el-button size="small" icon="el-icon-plus" type="primary">新增</el-button> -->
        </el-col>
        <!-- <el-col :span="2">
          <el-button size="small" icon="el-icon-edit" type="primary">编辑</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small" icon="el-icon-plus" type="danger">删除</el-button>
        </el-col> -->
        <el-col :span="2">
          <!-- <el-button size="small" icon="el-icon-upload2" type="primary">导入</el-button> -->
        </el-col>
        <el-col :span="2">
          <!-- <el-button size="small " icon="el-icon-download" type="primary">导出</el-button> -->
           <el-button size="small" type="primary" @click="handleExportXls">
              导出<i class="el-icon-download"></i>
            </el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card body-style="padding:2px;">
      <el-table border :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
        :header-row-style="{ height: '30', font: 'normal' }" :data="Data"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"  style="width: 100%" row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column prop="Erpvoucherno" label="领料单号" width='180'> </el-table-column>
        <el-table-column prop="Parametername" label="单据名称" width= '120'> </el-table-column>
        <el-table-column prop="Createtime" label="单据日期" width='180'> </el-table-column>
        <el-table-column prop="Departmentcode" label="部门编码" width='100'> </el-table-column>
        <el-table-column prop="Departmentname" label="部门名称" width='120'> </el-table-column>
        <el-table-column prop="Erpnote" label="备注" width='180'> </el-table-column>
        <el-table-column prop="Creater" label="创建人" width='120'></el-table-column>
        <el-table-column sortable prop="Createtime" label="创建时间" width='180'></el-table-column>
        <el-table-column fixed="right" label="操作" >
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
            </el-dropdown> -->
          </template>
        </el-table-column>

      </el-table>
    </el-card>

    <!-- 分页区域 -->
    <pagination :total="PageData.totalCount" :fpage-size.sync="PageData.pageSize"
      :fcurrent-page.sync="PageData.currentPage" @pagination="getModelList" />


    <el-dialog title="领料单---详情" width="70%" :show-close="true" :visible.sync="outerVisible">
      <div :style="{          
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff'
        }">
        <el-table border :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
          :header-row-style="{ height: '30', font: 'normal' }" :data="RawmaterialOutDetailList"
          :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" style="width: 100%" row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
          <el-table-column prop="Towarehouseno" label="仓库编码"> </el-table-column>
          <el-table-column prop="Arrvoucherno" label="生产订单号" width='200'> </el-table-column>
          <el-table-column prop="Materialno" label="物料编码"> </el-table-column>
          <el-table-column prop="Materialdesc" label="物料名称"> </el-table-column>
          <el-table-column prop="Unitname" label="单位名称"> </el-table-column>
          <el-table-column prop="Voucherqty" label="领料数量"> </el-table-column>
          <el-table-column prop="Outstockqty" label="实际领料数量"> </el-table-column>
          <el-table-column prop="Postqty" label="过账数量"> </el-table-column>

        </el-table>
      </div>



    </el-dialog>

  </div>
</template>

<script>
import {
    ALFModelListMixins
  } from '@/mixins/ALFModelListMixins';
import Pagination from "@/components/Pagination";
import {
        getRawmaterialOutDetail,
        
        } from "@/api/api";
import Vue from "vue";
import store from "@/store";
  export default {
    mixins: [ALFModelListMixins],
   
    components: {
      Pagination
    },
    data() {
      return {
         xlsname:"领料单",
        queryParam: {
          Erpvoucherno:"",
          Createtime:""
        },
        Operate:{Erpvoucherno:11},
        apiUrl: {
          query: "/RawMaterialOut/Get_RawMaterialOutListByPage",
          exportXls: "/RawMaterialOut/Get_VRawMaterialOutDetailListExp"
        },
        RawmaterialOutDetailList:[],
        outerVisible: false,
        tHeader: ['领料单号', '单据名称', '单据日期', '部门编码','部门名称','备注',
                  '仓库编码', '生产订单号', '物料编码', '物料名称', '单位名称', '领料数量', '实际领料数量', '过账数量', '创建人', '创建时间'
        ],
        filterVal: ['Erpvoucherno', 'Parametername', 'Createtime', 'Departmentcode','Departmentname','Erpnote',
                    'STowarehouseno', 'Arrvoucherno', 'Materialno', 'SMaterialdesc', 'SUnitname', 'Voucherqty', 'Outstockqty', 'Postqty', 'SCreater', 'SCreatetime'
        ]
      }
    },
    methods:{
      handleClick(val)
      {
        var min = this;
        min.outerVisible=true;
        
        var model ={};
        model.Erpvoucherno = val.Erpvoucherno;
      
        getRawmaterialOutDetail(model).then(res=>{
        
          if (res.Result == 1) {
   
             min.RawmaterialOutDetailList=res.Data;

            }
            else {
              min.$message.error(res.ResultValue);
            }
        })
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
