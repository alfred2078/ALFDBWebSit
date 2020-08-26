<template>
  <div>
    <el-card>
      <el-form  size="small"  :model="queryParam"  @keyup.enter.native="SelectList">
        <el-row>
          <el-col :span="6">
            <el-form-item label="">
              <el-input v-model="queryParam.Erpvoucherno" placeholder="杂入单号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="">
              <el-input v-model="queryParam.Materialno" placeholder="物料编码" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item>
              <el-button icon="el-icon-search" type="primary"  @click="SelectList()">查询</el-button>
              <el-button icon="el-icon-refresh-right" type="primary">重置</el-button>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
    </el-card>

    <el-card body-style="padding:2px;">
      <el-table border :data="DataList" :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" v-loading="loading"
        :cell-style="{ padding: '2px' }" style="width: 100%;">
        <template v-for="item in columns">
          <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
            v-if="item.colvisible" show-overflow-tooltip>
          </el-table-column>
       
        </template>
        <el-table-column width="100" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="PrintLabel(scope.row)" type="text" size="small">打印</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>   
      <purchaseLabel ref="purchaseDialog"></purchaseLabel>
  </div>
</template>

<script>
import {
    getOtherOrderList
  } from "@/api/api";

import  purchaseLabel from  "./PurchaseLabelDialog"
  export default {
    name: "purchase",
     components:{
      getOtherOrderList:getOtherOrderList,
    purchaseLabel:purchaseLabel
     },
    data() {
      return {
        dialogtitle:"杂入标签打印",
        queryParam: {
          Erpvoucherno: "",
          Vouchertype:44,
          Materialno:""
        },
        DataList:[],
        // idshow: false,
        // apiUrl: {
        //   query: "/Purchase/GetT_PurchaseOrderListADFAsync",
        //   save: "",
        //   update: ""
        // },
            columns: [{
            label: "Id",
            prop: "Id",
            colvisible: false
            },{
              
            label: "杂入订单号",
            prop: "Erpvoucherno",
            colvisible: true
            },{
            label: "物料编码",
            prop: "Materialno",
            colvisible: true
            }
            ,{
            label: "物料名称",
            prop: "Materialdesc",
            colvisible: true
            }
            ,{
            label: "规格型号",
            prop: "Spec",
            colvisible: true
            }
            ,{
            label: "订单数量",
            prop: "Voucherqty",
            colvisible: true
            } ,{
            label: "已收数量",
            prop: "Receiveqty",
            colvisible: true
            },{
            label: "未收数量",
            prop: "Remainqty",
            colvisible: true
            },{
            label:"包装量",
              prop:"Packqty",
              colvisible:false
            },{
               label:"批次",
              prop:"Batchno",
              colvisible:false
            },
            {label:"打印数量",
              prop:"Printqty",
              colvisible:false
            }, {
              label:"单据类型",
              prop:"Vouchertype",
              colvisible:false
            },{
                 label:"本次打印数量",
              prop:"PrintRemainqty",
              colvisible:false
            }
            ]
      }
    },methods:{
   SelectList() {
           if(this.queryParam.Materialno==""&&this.queryParam.Erpvoucherno==""){
      }else{
         var json= JSON.stringify(this.queryParam);
            getOtherOrderList(json).then(res => {
              debugger;
            if (res.Result === 1) {
              this.DataList = res.Data[0].Detail;
            }else{
              alert(res.ResultValue);
            }
        });}
      },
      PrintLabel:function (record) {
        //打印
      record.Vouchertype=44;
        //打印
      if(record.PackQty==0){
            record.Printqty=record.Remainqty;
        }else{
           record.Printqty=record.Remainqty%record.Packqty;
        }
        record.Printqty=record.Remainqty%record.Packqty;
        record.PrintRemainqty=record.Remainqty;
        this.$refs.purchaseDialog.print(record,this.dialogtitle);
      }
    }
  }

</script>

<style lang="scss" scoped>
>>>.el-dialog{
  margin:5vh auto 50px !important;
}
>>>.el-dialog__title{
  font-size: 14px;
  color: #fff;
}
>>>.el-dialog__header{
  background-color:#3b9bf5e6;
}
.el-form-item{
  margin: 10px;
}
</style>
