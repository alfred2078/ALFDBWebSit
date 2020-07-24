<template>
  <el-dialog :title='title' :show-close="true" :visible.sync="visible">
    <div :style="{
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff'
        }">
      <el-form ref="tempForm" :model="tempForm" :rules="rules" label-width="80px">
        <el-form-item label="用户编号" prop="Userno">
          <el-input v-model="tempForm.Userno" clearable placeholder="用户编号"></el-input>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="tempForm.Username" clearable placeholder="用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户简称">
          <el-input v-model="tempForm.Pinyin" clearable placeholder="用户简称"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="tempForm.Tel" clearable placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="tempForm.Mobile" clearable placeholder="手机"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="tempForm.Email" clearable placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select style="width:100%" v-model="ruleListSelect" multiple placeholder="请选择">
            <el-option v-for="item in ruleListAll" :key="item.Id" :label="item.Ruleno" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属仓库">
          <el-select style="width:100%" v-model="warehouseListSelect" multiple placeholder="请选择">
            <el-option v-for="item in warehouseListAll" :key="item.Id" :label="item.Warehouseno" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录密码" prop="Password">
          <el-input type="password" v-model="tempForm.Password" clearable placeholder="登录密码"></el-input>
        </el-form-item>
        <el-form-item label="密码确认" prop="RePassword">
          <el-input type="password" v-model="tempForm.RePassword" clearable placeholder="密码确认"></el-input>
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
    saveUser,
    updateUser,
    getWarehouseListAll,
    getWarehouseListByUserID,
    getRuleListAll,
    getRuleListByUserID
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
        warehouseListAll: [], //所有的仓库
        warehouseListSelect: [], //选择的仓库ID
        ruleListAll: [], //所有权限
        ruleListSelect: [], //选择的权限ID
        tempForm: {
          Id: "",
          Userno: "",
          Username: "",
          Pinyin: "",
          Tel: "",
          Mobile: "",
          Email: "",
          Password: "",
          RePassword: "",
          Strongholdcode: "YL",
          Creater: "",
          Modifyer: "",
          warehouseListSelect: [], //选择的仓库ID
          ruleListSelect: [] //选择的权限ID
        },
        rules: {
          Userno: [{
            required: true,
            message: "请输入人员编码",
            trigger: "blur"
          }],
          Password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }],
          RePassword: [{
              required: true,
              message: "请输入确认密码",
              trigger: "blur"
            },
            {
              validator: this.compareToRePassword,
              trigger: 'blur'
            }
          ],
          //   Houseno: [{
          //     required: true,
          //     message: "请输入库区编码",
          //     trigger: "blur"
          //   }],          
        }
      };
    },
    methods: {
      resetTempForm() {
        this.warehouseListAll = [],
          this.warehouseListSelect = [], //选择的仓库ID
          this.ruleListAll = [], //所有权限
          this.ruleListSelect = [], //选择的权限ID
          this.tempForm = {
            Id: "",
            Userno: "",
            Username: "",
            Pinyin: "",
            Tel: "",
            Mobile: "",
            Email: "",
            Strongholdcode: "YL",
            Creater: "",
            Modifyer: "",
            warehouseListSelect: [], //选择的仓库ID
            ruleListSelect: [] //选择的权限ID
          };
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
        this.getWarehouseListAll();
        this.getWarehouseListByUserID(this.tempForm);
        this.getRuleListAll();
        this.getRuleListByUserID(this.tempForm);
        this.$nextTick(() => {
          this.$refs["tempForm"].clearValidate();
        });
      },
      SaveModel() {
        this.$refs["tempForm"].validate(valid => {
          if (valid) {
            let postObj;
            if (!this.tempForm.Id) {              
              //创建人
              this.tempForm.Creater = Vue.ls.get(USER_NAME);
              this.tempForm.warehouseListSelect = this.warehouseListSelect;
              this.tempForm.ruleListSelect = this.ruleListSelect;
              
              postObj = saveUser(this.tempForm);
            } else {
              //修改人              
              this.tempForm.Modifyer = Vue.ls.get(USER_NAME);
              this.tempForm.warehouseListSelect = this.warehouseListSelect;
              this.tempForm.ruleListSelect = this.ruleListSelect;
              console.log(this.tempForm)
              postObj = updateUser(this.tempForm);
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
      },
      compareToRePassword(rule, value, callback) {
        if (this.tempForm.Password && this.tempForm.Password !== this.tempForm.RePassword) {
          callback('两次输入的密码不一致！');
        } else {
          callback()
        }
      },
      getWarehouseListAll() {
        getWarehouseListAll().then(res => {
          if (res.Result === 1) {
            this.warehouseListAll = res.Data
          }
          // else {
          //   this.$message.error(res.ResultValue);
          // }
        });
      },
      getWarehouseListByUserID(record) {
        getWarehouseListByUserID(record).then(res => {
          if (res.Result === 1) {
            this.warehouseListSelect = res.Data.map(item => item.Warehouseid)
          }
          // else {
          //   this.$message.error(res.ResultValue);
          // }
        });
      },
      getRuleListAll() {
        getRuleListAll().then(res => {
          if (res.Result === 1) {
            this.ruleListAll = res.Data
          }
        });
      },
      getRuleListByUserID(record) {
        getRuleListByUserID(record).then(res => {
          if (res.Result === 1) {
            this.ruleListSelect = res.Data.map(item=>item.Ruleid)
          }
        });
      }

    }
  }

</script>


<style lang="scss" scoped>
  .el-form-item {
    margin: 20px;
  }

</style>
