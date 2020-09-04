<template>
  <el-dialog :title="title" :show-close="true" :visible.sync="visible">
    <div :style="{
        border: '1px solid #e9e9e9',
        padding: '5px 10px',
        background: '#fff'
      }">
      <el-form ref="tempForm" :model="tempForm" :rules="rules" label-width="80px">
        <el-form-item label="角色编码" prop="Ruleno">
          <el-input v-model="tempForm.Ruleno" placeholder="角色编码" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="Rulename">
          <el-input v-model="tempForm.Rulename" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="tempForm.Description" placeholder="角色描述"></el-input>
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
    saveRule,
    updateRule
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
        tempForm: {
          Id: "",
          Ruleno: "",
          Rulename: "",
          Description: "",          
          Strongholdcode: "YL",         
          Creater: "",
          Modifyer: ""
        },
        rules: {
          Ruleno: [{
            required: true,
            message: "请输入角色编码",
            trigger: "blur"
          }],
          Rulename: [{
            required: true,
            message: "请输入角色名称",
            trigger: "blur"
          }]
        }
      };
    },
    methods: {
      resetTempForm() {        
        this.tempForm = {
          Id: "",
          Ruleno: "",
          Rulename: "",
          Description: "",          
          Strongholdcode: "YL",         
          Creater: "",
          Modifyer: "",          
        };
        this.disabled = false
      },
      add() {
        this.resetTempForm();
        this.edit({
          Strongholdcode: "YL"
        });
      },
      edit(record) {
        this.visible = true;
        this.tempForm = Object.assign({}, record);        
        this.$nextTick(() => {
          this.$refs["tempForm"].clearValidate();
        });
      },
      SaveModel() {
        this.$refs["tempForm"].validate(valid => {
          if (valid) {
            let postObj;  
           delete this.tempForm.Createtime; 
            if (!this.tempForm.Id) {
              //创建人
              this.tempForm.Creater = Vue.ls.get(USER_NAME);
              postObj = saveRule(this.tempForm);
            } else {
              //修改人
              this.tempForm.Modifyer = Vue.ls.get(USER_NAME);
              postObj = updateRule(this.tempForm);
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
