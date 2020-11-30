<template>
  <el-dialog :title="title" :show-close="true" :visible.sync="visible">
    <div :style="{
        border: '1px solid #e9e9e9',
        padding: '5px 10px',
        background: '#fff'
      }">
      <el-form ref="tempForm" :model="tempForm" :rules="rules" label-width="80px">
        <el-form-item label="仓库编码" prop="Warehouseno">
          <el-input v-model="tempForm.Warehouseno" placeholder="仓库编码" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="库区编码" prop="Houseno">
          <el-input v-model="tempForm.Houseno" placeholder="库区编码"></el-input>
        </el-form-item>
        <el-form-item label="库位编码" prop="Areano">
          <el-input v-model="tempForm.Areano" placeholder="库位编码"></el-input>
        </el-form-item>
        <el-form-item label="库位名称" prop="Areaname">
          <el-input v-model="tempForm.Areaname" placeholder="库位名称"></el-input>
        </el-form-item>
        <el-form-item label="库位描述" >
          <el-input v-model="tempForm.Locationdesc" placeholder="库位描述"></el-input>
        </el-form-item>
        <el-form-item label="默认库位" >
          <el-checkbox v-model="checked">默认库位</el-checkbox>
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
    saveArea,
    updateArea
  } from "@/api/api";
  import {
    USER_NAME
  } from "@/store/mutation-types";
  import Vue from "vue";

  export default {
    data() {
      return {
        title: "操作",
        visible: false,
        disabled: false,   
        checked: false,     
        tempForm: {
          Id: "",
          Warehouseno: "",
          Warehouseid: "",
          Houseno: "",
          Houseid: "",
          Areano: "",
          Areaname: "",
          Locationdesc: "",                   
          Strongholdcode: "YL",          
          Creater: "",
          Modifyer: "",
          Isdefault:""
        },
        rules: {
          Warehouseno: [{
            required: true,
            message: "请输入仓库编码",
            trigger: "blur"
          }],
        //   Houseno: [{
        //     required: true,
        //     message: "请输入库区编码",
        //     trigger: "blur"
        //   }],
          Areano: [{
            required: true,
            message: "请输入库位编码",
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
          Warehouseid: "",
          Houseno: "",
          Houseid: "",
          Areano: "",
          Areaname: "",
          Locationdesc: "",                   
          Strongholdcode: "YL",          
          Creater: "",
          Modifyer: "",
          Isdefault:""
        };
        this.disabled = false;
        this.checked=false;
      },
      add() {
        this.resetTempForm();
        this.edit({
          Strongholdcode: "YL"
        });
      },
      edit(record) {
        
        
        this.tempForm = Object.assign({}, record);        
        this.$nextTick(() => {
          this.$refs["tempForm"].clearValidate();
        });
        this.checked = this.tempForm.Isdefault == 2 ? true : false;
        this.visible = true;
      },
      SaveModel() {
        debugger;
        delete this.tempForm.Createtime; 
        this.$refs["tempForm"].validate(valid => {
          if (valid) {
            let postObj;
            this.tempForm.Isdefault = this.checked === true ? 2 : 1;         
            if (!this.tempForm.Id) {
              //创建人
              this.tempForm.Creater = Vue.ls.get(USER_NAME);
              postObj = saveArea(this.tempForm);
            } else {
              //修改人              
              this.tempForm.Modifyer = Vue.ls.get(USER_NAME);
              postObj = updateArea(this.tempForm);
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