<template>
  <div>
    <el-card >
      <el-form :model="checkFrom" size="small" >
        <el-row>
          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="checkFrom.Erpvoucherno" placeholder="盘点单号" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="checkFrom.Remarks" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
         

        </el-row>
      </el-form>
    </el-card>

    <el-card shadow="hover" class="box-card">
     <!--  <el-tag type="success"  effect="plain">查询条件</el-tag> -->
        <el-form :model="TStock" size="small ">
          <el-row>
            

            <el-col :span="5">
              <el-form-item label-width="" label="">
                <el-input v-model="TStock.Materialno" placeholder="物料编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label-width="" label="">
                <el-input v-model="TStock.Towarehouseno" placeholder="仓库" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label-width="" label="">
                <el-input v-model="TStock.Houseno" placeholder="库区" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label-width="" label="">
                <el-input v-model="TStock.Areano" placeholder="库位" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
            <el-form-item label-width="" label="">
                         
                 <el-select
                    class="input"
                    :disabled="true" 
                    v-model="multipleSelection"
                    multiple
                    collapse-tags
                    placeholder="盘点分类">                  
                  </el-select>

              <el-button  icon="el-icon-search" @click="dialogData"></el-button>
            </el-form-item>
          </el-col>
            <el-col :span="9">
             <!--  <el-form-item label-width="" label="库存异动">
                <el-date-picker  type="daterange" range-separator="至" start-placeholder="开始日期"
                  end-placeholder="结束日期" v-model="datetime">
                </el-date-picker>
              </el-form-item> -->
            </el-col>

            

            <el-col :span="5">
              <el-form-item label-width="0">
                <el-button icon="el-icon-search" @click="getInfo" type="primary">查询</el-button>
                <el-button icon="el-icon-refresh-right" type="primary" @click="reset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>



        </el-form>
      </el-card>

    <el-card body-style="padding:5px;" class="box-card">
      <el-row>
        <el-col :span="2">
          <el-button size="small" icon="el-icon-plus" @click="save" type="primary">保存</el-button>
        </el-col>
        
      </el-row>
    </el-card>

    <el-card body-style="padding:2px;" >
      <el-table :data="GetCheckArea"  @selection-change="GetCheckAreaChange"  border :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
        :header-row-style="{ height: '30', font: 'normal' }"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" style="width: 100%" row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="Warehouseno" label="仓库编码"> </el-table-column>
        <el-table-column prop="Warehousename" label="仓库名称"> </el-table-column>
        <el-table-column prop="Houseno" label="库区编码"> </el-table-column>
        <el-table-column prop="Housename" label="库区名称"> </el-table-column>
        <el-table-column prop="Areano" label="库位编码"></el-table-column>
        <el-table-column  prop="Areaname" label="库位名称"></el-table-column>

        
      </el-table>
    </el-card>
    <el-dialog  title="盘点分类" width="70%" :show-close="true" :visible.sync="outerVisible">
        <el-card body-style="padding:2px;" >
          <el-input  placeholder="盘点分类" v-model="Materialmodel.Checktypename" style="width: 200px"></el-input>
          <el-button icon="el-icon-search" @click="getGroupTMaterial"  type="primary">查询</el-button>
        </el-card>
        <el-card body-style="padding:2px;" >
          <el-table :data="GroupTMaterial" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" > </el-table-column>
            <el-table-column prop="Checktypename" label="盘点分类"> </el-table-column>
          </el-table>
      </el-card>

      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
 import {
    getTCHECKERPVOUCHERNO,
    getTCheckArea,
    getGroupTMaterial,
    saveTCheck
  } from "@/api/api";
  import {
    USER_NAME
  } from "@/store/mutation-types";
  import Vue from "vue";
  export default {
    data() {
      return {
        checkFrom: {
          Erpvoucherno: "",
          Remarks:""
        },
        TStock:{
          Materialno:"",
          Towarehouseno:"",
          Houseno:"",
          Areano:""

        },
        outerVisible: false,
        tableData: [{
          code: "PO01",
          name: "采购订单",
          depcode: "01",
          depname: "采购部",
          status: "10001",
          role: "测试供应商",
          people: "测试账户",
          warehouse: "成品仓",
          creater: "admin",
          createtime: "2020-01-02"
        }],
        Materialmodel:{checktypename:""},
        GroupTMaterial:[],
        GetCheckArea:[],
        filtrateCheckTypeName:{
          name:"",
          code:""
          
        },
        multipleSelection:[],
        multipleSelectionChange:[],
        datetime:[],
        /* beginTime:'',
        endTime:'', */
        Checktypecode:[],
        ChecktypecodeChange:[],
        pageModel:{},
        pageCheckModel:{},
        areaList:[]
        
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm=>{
          console.log(vm)
          // 每次进入路由执行
          vm.getTCHECKERPVOUCHERNO()
      })
    },
    watch:function(){

      
    },
    mounted:function(){
      this.getTCHECKERPVOUCHERNO();
    },
    methods: {
      
     //获取盘点单号
      getTCHECKERPVOUCHERNO(){
        var min = this;
        getTCHECKERPVOUCHERNO().then(res=>
          {
          
            if (res.Result === 1) {
              let data = new Date();
              let y = data.getFullYear();
              let m = data.getMonth() +1; 
              let d = data.getDate();
              let newTime=y+min.DateAdd(m)+min.DateAdd(d);
              let oldTime=res.Data.Erpvoucherno.substr(0,8);
              let erpSub;
              if(newTime==oldTime)
              {
                erpSub=min.StingAdd(res.Data.Erpvoucherno.substr(res.Data.Erpvoucherno.length-5));
              }
              else
              {
                 erpSub= '00001' ;
              }
              
              min.checkFrom.Erpvoucherno =newTime+ erpSub;
            }
            else {
              min.$message.error(res.ResultValue);
            }
          }
          
        );
      },
      getInfo(){
        var min = this;
        min.pageModel.TStock=min.TStock;
        min.pageModel.Checktypecode =min.Checktypecode;
       /*  min.pageModel.BeginTime=min.datetime[0];
        min.pageModel.EndTime=min.datetime[1]; */
        getTCheckArea(min.pageModel).then(res=>{
          debugger;
            if (res.Result === 1) {
             min.GetCheckArea=res.Data;
            }
            else {
              min.$message.error(res.ResultValue);
            }
        });
      },
      //监听table是否选中
      GetCheckAreaChange(val){
        debugger;
        this.areaList=val;
      },
      save(){
        var min = this;
        debugger;
        min.pageCheckModel.T_Check=min.checkFrom;
        min.pageCheckModel.T_Check.Creater=Vue.ls.get(USER_NAME);
        min.pageCheckModel.V_Area=min.areaList;
        saveTCheck(min.pageCheckModel).then(res=>{
            if (res.Result === 1) {
              min.$message({
                message: '保存成功',
                type: 'success'
              });
              min.getTCHECKERPVOUCHERNO();
            }
            else {
              min.$message.error(res.ResultValue);
            }

        });
      },
      reset(){
        var min = this;
        min.checkFrom.Erpvoucherno=1;
        console.log('开始时间')
        console.log(min.datetime[0]);
        console.log('结束时间')
        console.log(min.datetime[1]);


      },
      dialogData(){
        var min = this;
        min.outerVisible=true;
        min.getGroupTMaterial();

      },
      //获取物料分类
      getGroupTMaterial(){
        var min = this;
        getGroupTMaterial(min.Materialmodel).then(res=>{
          if (res.Result === 1) {
            min.GroupTMaterial = res.Data;
          }
          else 
          {
              min.$message.error(res.ResultValue);
          }

        });

      },
      //盘点单号自加1
      StingAdd (str)
      {
          return str.replace(/\d+$/,function(n){
              var nc = parseInt(n, 10)+1+"";
              var s0 = n.replace(/\d/g,"0").substr(0,n.length-nc.length);
              return s0+nc;
          });
      },
      //监听表格，给盘点分类赋值选中的值
      handleSelectionChange(val){
        var min = this;
        min.multipleSelectionChange=[];
        min.ChecktypecodeChange=[];
        debugger;
         val.forEach(t => {
           min.multipleSelectionChange.push(t.Checktypename);
           min.ChecktypecodeChange.push(t.Checktypecode);
         });

         console.log(this.ChecktypecodeChange);
        
      },
      confirm(){
        var min = this;
        debugger;
        min.multipleSelection=min.multipleSelectionChange;
        min.Checktypecode =min.ChecktypecodeChange;
        min.outerVisible = false;
     
      },
      //月，日补0
      DateAdd(n){
        if(n<=9){
            return `0${n}`
        }
        return n
      }


    }
  }

</script>

<style lang="scss" scoped>
  >>>.element.style {
    margin: 0; 
    ;
  }
  .box-card{
    margin-top: 5px;
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
  .input{
    width: 79%;

  }

</style>
