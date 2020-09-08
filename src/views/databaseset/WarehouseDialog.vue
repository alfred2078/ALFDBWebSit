<template>
  <el-dialog :title="title" :show-close="true" :visible.sync="visible">
    <div :style="{
        border: '1px solid #e9e9e9',
        padding: '5px 10px',
        background: '#fff'
      }">
      <el-form ref="tempForm" :model="tempForm" :rules="rules" label-width="80px">
        <el-form-item label="据点编号" prop="Strongholdcode">
          <el-input v-model="tempForm.Strongholdcode" placeholder="据点编号"></el-input>
        </el-form-item>
        <el-form-item label="据点名称" prop="Strongholdname">
          <el-input v-model="tempForm.Strongholdname" placeholder="据点名称"></el-input>
        </el-form-item>
        <el-form-item label="仓库编码" prop="Warehouseno">
          <el-input v-model="tempForm.Warehouseno" placeholder="仓库编码" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="仓库名称" prop="Warehousename">
          <el-input v-model="tempForm.Warehousename" placeholder="仓库名称"></el-input>
        </el-form-item>
        <el-form-item label="客户编号" prop="WCustomerno" v-if="false">
          <el-input v-model="tempForm.WCustomerno" placeholder="客户编号" ></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="tempForm.Contactuser" placeholder="联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="tempForm.Contactphone" placeholder="联系电话"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址">
          <el-input v-model="tempForm.Address" placeholder="仓库地址"></el-input>
        </el-form-item>
        <el-form-item label="仓库描述">
          <el-input v-model="tempForm.Locationdesc" placeholder="仓库描述"></el-input>
        </el-form-item>
      

        <el-form-item label="发货规则">
          <el-checkbox v-model="checked">强制先进先出</el-checkbox>
        </el-form-item>

        <el-form-item label="打印">
          <el-checkbox v-model="Isprint">是否打印拼箱</el-checkbox>
          
        </el-form-item>

        <el-form-item label="调拨">
          <el-checkbox v-model="Istransfer">是否调拨</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button @click="SaveModel" type="primary">保存</el-button>
          <el-button @click="visible = false" type="primary">关闭</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  import {
    saveWarehouse,
    updateWarehouse
  } from "@/api/api";
  import {
    USER_NAME
  } from "@/store/mutation-types";
  import Vue from "vue";
/* import { delete } from 'vue/types/umd'; */

  export default {
    data() {
      return {
        title: "操作",
        visible: false,
        disabled: false,
        checked: false,
        Isprint:false,
        Istransfer:false,
        tempForm: {
          Id: "",
          Warehouseno: "",
          Warehousename: "",
          WCustomerno:"",
          Contactuser: "",
          Contactphone: "",
          Locationdesc: "",
          Strongholdcode:"",
          Strongholdname:"",
          Address: "",
          Isfifo: "",
          Strongholdcode: "YL",
          Isfifo: "",
          Creater: "",
          Modifyer: "",
          Isprint:"",
          Istransfer:""
        },
        rules: {
          Strongholdcode: [{
            required: true,
            message: "请输入据点编号",
            trigger: "blur"
          }],
          Strongholdname: [{
            required: true,
            message: "请输入据点名称",
            trigger: "blur"
          }],
          Warehouseno: [{
            required: true,
            message: "请输入仓库编码",
            trigger: "blur"
          }],
          Warehousename: [{
            required: true,
            message: "请输入仓库名称",
            trigger: "blur"
          }],
          WCustomerno:[{
            required: true,
            message: "请输入客户编号",
            trigger: "blur"
          }]
        }
      };
    },
    methods: {
      resetTempForm() {
        this.tempForm = {
          Id: "",
          Warehouseno: "",
          Warehousename: "",
          WCustomerno:"",
          Contactuser: "",
          Contactphone: "",
          Locationdesc: "",
          Strongholdcode:"",
          Strongholdname:"",
          Address: "",
          Isfifo: "",
          Strongholdcode: "",
          Creater: "",
          Modifyer: ""
        };
        this.disabled = false
      },
      add() {
        this.resetTempForm();
        this.edit({
        //  Strongholdcode: "YL"
        });
      },
      edit(record) {
        this.visible = true;
        this.tempForm = Object.assign({}, record);
        this.checked = this.tempForm.Isfifo == 2 ? true : false;
        this.Isprint=this.tempForm.Isprint ==2?true:false;
        this.Istransfer=this.tempForm.Istransfer ==2?true:false;
        this.$nextTick(() => {
          this.$refs["tempForm"].clearValidate();
        });
      },
      SaveModel() {
        this.$refs["tempForm"].validate(valid => {
          if (valid) {
            let postObj;
            this.tempForm.Isfifo = this.checked === true ? 2 : 1;
            this.tempForm.Isprint = this.Isprint ===true?2:1;
            this.tempForm.Istransfer = this.Istransfer ===true?2:1;
            console.log(this.tempForm);
            delete this.tempForm.Createtime;
            if (!this.tempForm.Id) {
              //创建人
              this.tempForm.Creater = Vue.ls.get(USER_NAME);
              postObj = saveWarehouse(this.tempForm);
            } else {
              //修改人
              this.tempForm.Modifyer = Vue.ls.get(USER_NAME);
              postObj = updateWarehouse(this.tempForm);
            }

            postObj.then(res => {
              if (res.Result === 1) {
                this.visible = false;
                this.$message({
                  message: res.ResultValue,
                  type: "success"
                });
                this.$emit("ok");
              } else {
                this.$message.error(res.ResultValue);
              }
            });
          }
        });
      }
    }
  };

</script>
<style lang="scss" scoped>
  .el-form-item {
    margin: 20px;
  }

</style>
