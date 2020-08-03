<template>
  <div>
    <el-card >
      <el-form :model="queryParam" size="small "  @keyup.enter.native="getModelList">
        <el-row>
          <el-col :span="4">
            <el-form-item label-width="" label="">
              <el-input v-model="queryParam.Erpvoucherno" placeholder="盘点单号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="3" >
            <el-form-item >
              <el-select v-model="queryParam.Checkstatus" placeholder="请选择盘点状态" clearable>
                <el-option v-for="item in options" :key="item.Parameterid" :label="item.Parametername" :value="item.Parameterid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="3" >
            <el-form-item   >
              <el-select v-model="queryParam.Isdel" placeholder="是否删除" clearable >
                <el-option v-for="item in isdellist" :key="item.Parameterid" :label="item.Parametername" :value="item.Parameterid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label-width="" label="">
              <el-date-picker v-model="queryParam.Createtime" type="daterange" range-separator="至" start-placeholder="创建开始日期"
                end-placeholder="创建结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="0">
              <el-button icon="el-icon-search" type="primary" @click="getModelList">查询</el-button>
              <el-button icon="el-icon-refresh-right" type="primary" @click="reset">重置</el-button>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>
    </el-card>

    <el-card body-style="padding:10px;">
      <el-row>
       <!--  <el-col :span="2">
          <el-button size="small" icon="el-icon-plus" type="primary" >新增</el-button>
        </el-col> -->
        <!-- <el-col :span="2">
          <el-button size="small" icon="el-icon-edit" type="primary">编辑</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small" icon="el-icon-plus" type="danger">删除</el-button>
        </el-col> -->
        <el-col :span="2">
          <!-- <el-button size="small" icon="el-icon-upload2" type="primary">导入</el-button> -->
        </el-col>
        
        <!-- <el-col :span="2">
         
          <el-dropdown>
            <el-button size="small" type="primary">
              导出<i class="el-icon-download"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>导出当前页</el-dropdown-item>
              <el-dropdown-item>导出查询结果</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col> -->

        <el-col :span="2">
          <el-button size="small" icon="" type="primary" @click="Proloss" >盈亏分析</el-button>
        </el-col>
        <el-col :span="2">
          <el-popconfirm
             title="您确定要对此盘点单进行差异复盘吗？" @onConfirm="ReCheck"
            >
               <el-button size="small"  type="primary" slot="reference">差异复盘</el-button>
            </el-popconfirm>
         
        </el-col>
      </el-row>
    </el-card>

    <el-card body-style="padding:2px;">
      <el-table :data="Data"  @selection-change="GetCheckChange" ref="Table" @current-change="chooseMcaterialChange" border :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
        :header-row-style="{ height: '30', font: 'normal' }"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" height="330" style="width: 100%" row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column type="selection"  width="55"  > </el-table-column>
         <template v-for="item in columns">
          <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
            v-if="item.colvisible" show-overflow-tooltip>
          </el-table-column>
        </template>

        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
              <el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>
            <el-popconfirm
             title="确定终止吗" @onConfirm="updateCheck(scope.row)"
            >
              <el-button slot="reference" type="text" size="small">终止</el-button>
            </el-popconfirm>
            <el-popconfirm
             title="确定删除吗" @onConfirm="deleteCheck(scope.row)"
            >
              <el-button  slot="reference" type="text" size="small">删除</el-button>
            </el-popconfirm>
           
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页区域 -->
    <pagination :total="PageData.totalCount" :fpage-size.sync="PageData.pageSize"
      :fcurrent-page.sync="PageData.currentPage" @pagination="getModelList" />

  <el-dialog title="盘点单---详情" width="70%" :show-close="true" :visible.sync="outerVisible">
      <div :style="{          
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff'
        }">
        <el-table :data="detailsData" border :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
          :header-row-style="{ height: '30', font: 'normal' }"
          :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" style="width: 100%" row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
          <el-table-column prop="Warehouseno" label="仓库编码" > </el-table-column>
          <el-table-column prop="Houseno" label="库区编码"> </el-table-column>          
          <el-table-column prop="Areano" label="实盘库位"> </el-table-column>          
          <el-table-column prop="Qty" label="实盘数量"> </el-table-column>
          <el-table-column prop="Materialno" label="物料编码"> </el-table-column>
          <el-table-column prop="Materialdesc" label="物料名称"> </el-table-column>
          <el-table-column prop="Watercode" label="69码"> </el-table-column>
          <el-table-column prop="Batchno" label="批次"> </el-table-column>
          <el-table-column prop="Creater" label="创建人"> </el-table-column>
          <el-table-column prop="Createtime" label="创建时间"> </el-table-column>

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
        getTCheckListByPage,
        reSaveTCheck,
        getTCheckDetails,
        updateTCheckAsync,
        getTParameterList
        } from "@/api/api";
  import {
    USER_NAME
  } from "@/store/mutation-types";
  import Vue from "vue";
 import store from "@/store";
  export default {
    mixins: [ALFModelListMixins],
    name:"instore-inventory",
    components: {
      Pagination
    },
    data() {
      
      return {
        sizeForm: {
          name: ""
        },
        options: [],
        isdellist:[],
        isdelvalue:"",
        outerVisible: false,
        datetime:"",
        pageReuquest:{},
        FilterGroup:{},
        Rules:[],
        Erpvoucherno:"",
        selectvalue:"",
        model:{},
        GetCheck:[],
        detailsData:[],
        CheckChangeData:{},
        queryParam:{
          Erpvoucherno:"",
          Checkstatus:"",
          Isdel:"1",
          Createtime:""
        },
        apiUrl: {
          query: "/Check/GetT_CheckListByPage"
        },
        columns: [{
            label: "盘点单号",
            prop: "Erpvoucherno",
            colvisible: true,
            width: 145
          },
          {
            label: "仓库编码",
            prop: "Warehouseno",
            colvisible: true,
            width: 120
          },
          {
            label: "仓库名称",
            prop: "Warehousename",
            colvisible: true,
            width: 120
          },
          {
            label: "状态",
            prop: "Parametername",
            colvisible: true,
            width:120
          },
          {
            label: "备注",
            prop: "Remarks",
            colvisible: true,
            width: 145
          },
          {
            label: "创建人",
            prop: "Creater",
            colvisible: true,
            width: 100
          },
          {
            label: "创建时间",
            prop: "Createtime",
            colvisible: true,
            width: 180
          }
        ]
    
      }
    },
    created(){
      this.getTParameter();
      this.getTParameterIsDel();
    },

/*    beforeRouteLeave (to, from, next) {
     debugger;
   // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
   this.$destroy(true)
   next()
 }　　, */
    methods: {
      SaveT_Check()
      {
        

      },
      //重置
      reset(){
        this.isdelvalue="";
      },
      //盈亏分析跳转页面
      Proloss()
      {
        debugger;
        store.dispatch('getErpvoucherno',this.CheckChangeData[0].Erpvoucherno);
        this.$router.push({
          path: '/instore/inventoryproloss',
          /* name:'inventoryproloss',
          params:{
           Erpvoucherno:  this.CheckChangeData[0].Erpvoucherno
          } */

        })
       
       /*  let s = this.$route.params.Erpvoucherno;
        debugger; */
      },
      //查询
      getInfo()
      {
        debugger;
        var min = this;
        min.model={};
        var erpvoucherno ={Field:"Erpvoucherno",Value:min.Erpvoucherno};
        var checkstatus ={Field:"Checkstatus",Value:min.selectvalue};
        var cbegintime ={Field:"cbegintime",Value:min.datetime[0]};
        var cdonetime ={Field:"cdonetime",Value:min.datetime[1]};
        var Isdel ={Field:"Isdel",Value:1};
        min.Rules.push(erpvoucherno);
        min.Rules.push(checkstatus);
        min.Rules.push(cbegintime);
        min.Rules.push(cdonetime);
        min.Rules.push(Isdel);
        min.FilterGroup.Rules=min.Rules;
        min.pageReuquest.FilterGroup = min.FilterGroup;
        min.pageReuquest.PageNumber=1;
        min.pageReuquest.PageSize=10;
        min.model.pageReuquest = min.pageReuquest;
        getTCheckListByPage(min.model).then(res=>{
          if (res.Result == 1) {
             min.model={};
             min.model.Groupname="Check_Status";              
                 res.Data.forEach(t => {
                   min.options.forEach(it=>{
              
                      if(t.Checkstatus==it.Parameterid)
                      {
                        t.Checkstatus =it.Parametername;
                      }
                   })
                 });
               
                min.GetCheck=res.Data;
           
            
             console.log(min.GetCheck);
            }
            else {
              min.$message.error(res.ResultValue);
            }
        })
      },
      //状态下拉框
      getTParameter()
      {
        debugger;
        var min = this;
         min.model={};
         min.model.Groupname="Check_Status";
         getTParameterList(min.model).then(sres=>{             
            if(sres.Result == 1){
                 min.options = sres.Data;
                 min.options.forEach(t=>{
                   t.Parameterid= t.Parameterid+'';
                 });
            }            
          })
      },
      //删除下拉框
      getTParameterIsDel()
      {
        var min = this;
         min.model={};
         min.model.Groupname="Check_Isdel";
         getTParameterList(min.model).then(sres=>{             
            if(sres.Result == 1){
                 min.isdellist = sres.Data;
                  min.isdellist.forEach(t=>{
                   t.Parameterid= t.Parameterid+'';
                 });
            }            
          })
      },
      //详情
      detail(val)
      {
        debugger;
        var min = this;
        min.outerVisible=true;
        min.detailsData=[];
        min.model={};
        min.model.Erpvoucherno = val.Erpvoucherno;
        getTCheckDetails(min.model).then(res=>{
          if (res.Result == 1) {
   
             min.detailsData=res.Data;
             console.log(min.detailsData);
            }
            else {
              min.$message.error(res.ResultValue);
            }
        })
      },
      //终止
      updateCheck(val){
        debugger;
        var min = this;
         min.model={};
         min.model.Erpvoucherno = val.Erpvoucherno;
         min.model.Checkstatus =4;
         min.model.Isdel = val.Isdel;
         min.updateTCheckAsync(min.model);
         min.getModelList();
      },
      //删除
      deleteCheck(val){
        var min = this;
         min.model={};
         min.model.Erpvoucherno = val.Erpvoucherno;
         min.model.Checkstatus =val.checkstatus;
         min.model.Isdel = 2;
         min.updateTCheckAsync(min.model);
          min.getModelList();
      },
      updateTCheckAsync(model){
        debugger;
        var min = this;
        updateTCheckAsync(model).then(res=>{
          if (res.Result === 1) {
             min.$message({
                message: '修改成功',
                type: 'success'
              });
            }
            else {
              min.$message.error(res.ResultValue);
            }
        })
      },
      //table选中，只能选中一行 不能多选
      GetCheckChange(val)
      {
        debugger;
        if(val.length>1)
        {
    
          this.$refs.Table.clearSelection();
          this.$refs.Table.toggleRowSelection(val.pop());
              //return;
        }else
        {
          this.CheckChangeData={};
        this.CheckChangeData = val;
        console.log(this.CheckChangeData);
        }
        
      },
      chooseMcaterialChange(val){
         this.$refs.Table.toggleRowSelection(val)
       },
      //复盘
      ReCheck(){
        var min = this;
        debugger;
        var checkmodel={};
        //checkmodel.Erpvoucherno = 
        if(min.CheckChangeData.length==0||min.CheckChangeData.length==undefined)
        {
          min.$message({
                message: '请勾选复盘单号',
                type: 'warning'
              });
          return;
        }else if(min.CheckChangeData[0].checkstatus!=4&&min.CheckChangeData[0].checkstatus!=3)
        {
          min.$message({
                message: '只有完成或终止单据才能复盘',
                type: 'warning'
              });
          return;
        }
         min.CheckChangeData[0].Creater=Vue.ls.get(USER_NAME);
        reSaveTCheck(min.CheckChangeData[0]).then(res=>{
           if (res.Result === 1) {
             min.$message({
                message: '复盘成功',
                type: 'success'
              });
              min.getModelList();
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
