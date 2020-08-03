<template>
  <div>
 <el-card>
    <input type="file" ref="upload" accept=".xls,.xlsx" class="outputlist_upload" hidden>
    <el-button icon="el-icon-upload2" type="primary"  @click="ClickUpload()">上传</el-button>
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
      </div>
</template>
<script>
import Vue from "vue";
import store from "@/store";
import { USER_INFO } from "@/store/mutation-types";
import {
    UploadFile,
    windowpost
  } from "@/api/api";

import axios from "axios";
import XLSX from 'xlsx'
 export default {
    name: "loadfile",
     components:{
      UploadFile:UploadFile,
      axios:axios,
      XLSX:XLSX,
      USER_INFO:USER_INFO,
      windowpost:windowpost
    },data() {
    return {
        outputs: [],
        DataList:[],
            columns: [{
            label: "单位编号",
            prop: "Companycode",
            colvisible: true
            },{
            label: "据点编号",
            prop: "Strongholdcode",
            colvisible: true
            }
            ,{
            label: "据点名称",
            prop: "Strongholdname",
            colvisible: true
            }
            ,{
            label: "物料编号",
            prop: "Materialno",
            colvisible: true
            }
            ,{
            label: "物料名称",
            prop: "Materialdesc",
            colvisible: true
            } 
         
            ,{
            label:"批次",
              prop:"Batchno",
              colvisible:true
            },{
               label:"效期",
              prop:"Edate",
              colvisible:true
            },
            {label:"69码",
              prop:"Watercode",
              colvisible:true
            }, {
              label:"总数量",
              prop:"Voucherqty",
              colvisible:true
            },
             {
              label:"托/个数",
              prop:"singnqty",
              colvisible:true
            }, {
              label:"打印人",
              prop:"Creater",
              colvisible:true
            }
            ]
    }
},mounted() {
    this.$refs.upload.addEventListener('change', e => {//绑定监听表格导入事件
    this.readExcel(e);
    })
},
methods: {
    readExcel(e) {//表格导入
        var that = this;
        const files = e.target.files;
        console.log(files);
        if(files.length<=0){//如果没有文件名
        return false;
        }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
        this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
        return false;
        }
        debugger;
       
        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
        try {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {
            type: 'binary'
            });
            const wsname = workbook.SheetNames[0];//取第一张表
            const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
             var userinfo=Vue.ls.get(USER_INFO);
              var UserName=userinfo.Userno;
              for(i=0;i<ws.length;i++){
              ws[i].Companycode=ws[i].Companycode+'';
              ws[i].Strongholdcode=ws[i].Strongholdcode+'';
              ws[i].Materialno=ws[i].Materialno+'';
              ws[i].Batchno=ws[i].Batchno+'';
              ws[i].Watercode=ws[i].Watercode+'';
              ws[i].Creater=UserName;
              ws[i].qty=0;
              }
           // console.log(ws);
            that.DataList =  ws;
            that.outputs = [];//清空接收数据
            for(var i= 0;i<ws.length;i++){
            var sheetData = {
                address: ws[i].addr,
                value: ws[i].value
            }
            that.outputs.push(sheetData);
            }
            this.$refs.upload.value = '';
 
        } catch (e) {
            return false;
        }
        };
        fileReader.readAsBinaryString(files[0]);
    
    }, PrintLabel:function (record) {
      debugger;
      var data;
         var json= JSON.stringify(record);
            UploadFile(json).then(res => {
            if (res.Result === 1) {
             debugger
             //调用预览打印
               data= JSON.stringify(res.Data);
      

          }else{
              alert(res.ResultValue);
            }
            debugger;
           windowpost(data,"pallet");
        });
      //   var userinfo=Vue.ls.get(USER_INFO);
      //   record.UserName=userinfo.Userno;
      //   record.Remainqty=record.Voucherqty;
      //   record.Vouchertype=45;
      //   //打印
      // if(record.PackQty==0){
      //       record.Printqty=record.Remainqty;
      //   }else{
      //      record.Printqty=record.Remainqty%record.Packqty;
      //   }
      //   this.$refs.purchaseDialog.print(record,this.dialogtitle);
      },ClickUpload:function(){
       this.$refs.upload.click();
      }
  }
 }
    
 
</script>

<style lang="scss" scoped>
.el-card__body {
    padding: 7px;
}
</style>
