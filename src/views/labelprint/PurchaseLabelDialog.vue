
<template>
  <el-dialog :title='title' :show-close="true" :visible.sync="visible">
    <div :style="{
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff'
        }">
      <el-form ref="purchaseForm"   label-width="80px">
        <el-form-item label="采购订单"  v-if="ismaterial">
          <el-input v-model="purchaseForm.Erpvoucherno" clearable placeholder="采购订单" readonly></el-input>
        </el-form-item>
        <el-form-item label="物料编码">
          <el-input v-model="purchaseForm.Materialno" clearable placeholder="物料编码" readonly ></el-input>
        </el-form-item>
        <el-form-item label="物料名称">
          <el-input v-model="purchaseForm.Materialdesc" clearable placeholder="物料名称" readonly></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="purchaseForm.Spec" clearable placeholder="规格" readonly></el-input>
        </el-form-item>
        <el-form-item label="批次"    v-if="dispaly">
          <el-input v-model="purchaseForm.Batchno" clearable placeholder="批次" ></el-input>
        </el-form-item>
         <el-form-item label="机台"  v-if="dispaly" >
          <el-input v-model="purchaseForm.Machine" clearable placeholder="机台" ></el-input>
        </el-form-item>
         <el-form-item label="检验"  v-if="dispaly" >
          <el-input v-model="purchaseForm.Check" clearable placeholder="检验" ></el-input>
        </el-form-item>
         <el-form-item label="班别"   v-if="dispaly" > 
          <el-input v-model="purchaseForm.Team" clearable placeholder="班别" ></el-input>
        </el-form-item>
        <el-form-item label="未收数量"  v-if="ismaterial" >
          <el-input v-model="purchaseForm.Remainqty" clearable placeholder="未收数量" readonly></el-input>
        </el-form-item>
         <el-form-item label="打印数量">
          <el-input v-model="purchaseForm.PrintRemainqty" clearable placeholder="打印数量" ></el-input>
        </el-form-item>
        <el-form-item label="包装量">
           <el-input v-model="purchaseForm.PackQty" clearable placeholder="包装量"></el-input>
        </el-form-item>
        <el-form-item label="打印张数">
           <el-input v-model="purchaseForm.Printqty" clearable placeholder="打印张数"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="printLabel()" type="primary">打印</el-button>
          <el-button @click="visible=false" type="primary">关闭</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script >
import Vue from "vue";
  import store from "@/store";
import {
    getPurchasList,
    windowpost
  } from "@/api/api";
  import request from "@/api/request";

  export default {
    name:"purchaseLabelDialog",
    components:{
      getPurchasList:getPurchasList,
      request:request,
    },
    data(){
      return{
        dispaly:false,
        ismaterial:true,
        title: "",
        purchaseForm:{
           Id:0,
           Erpvoucherno:"",
           Materialno:"",
           Materialdesc:"",
           Spec:"",
           Batchno:"",
           Remainqty:0,
           PrintRemainqty:0,
           PackQty:0,
           Printqty:0,
           Vouchertype:0,
           UserName:"",
           Check:"",
           Team:"",
           Machine:""
          },
          visible:false
        }
      },methods:{
         print(record,text){
           debugger;
          this.visible = true;  
          this.title=text;  
          this.purchaseForm = Object.assign({}, record);
          if(this.purchaseForm.Vouchertype=="45"){
           this.dispaly=true;
          }else{
             this.dispaly=false;
          }
           if(this.purchaseForm.Vouchertype=="1"){
             this.ismaterial=false;
           }
         },
         printLabel:function(){
           debugger;
           if(this.purchaseForm.PackQty==0||this.purchaseForm.PackQty==""){
             alert("请输入包装量");
             return;
           }else if(this.purchaseForm.Printqty==0||this.purchaseForm.Printqty==""){
             alert("请输入打印数量");
             return;
           }
           var data=JSON.stringify(this.purchaseForm);
           debugger;
           this.purchaseForm.Vouchertype=1;
           windowpost(data,"data");
         }
      }
  }
</script>
<style>
  .el-form-item {
    margin: 20px;
  }

 .hideClass {
  display: none;
 }
 .showClass{
 display: block;
 }


</style>