<template>
  <div>
    <el-link class="linkHelp mainMenu" icon="el-icon-question" ref="/">帮助</el-link>
    <el-dropdown>
      <span class="el-dropdown-link mainMenu">
        欢迎您,{{username}}
        <i class="el-icon-arrow-down el-icon--right "></i>
      </span>
      <el-dropdown-menu slot="dropdown" >
        <!-- <el-dropdown-item><i class="el-icon-user"></i>个人中心</el-dropdown-item>
        <el-dropdown-item><i class="el-icon-setting"></i>账户设置</el-dropdown-item>
        <el-dropdown-item><i class="el-icon-monitor"></i>系统设置</el-dropdown-item> -->
        <el-dropdown-item><span  @click="outerVisible=true"   class="el-icon-lollipop">密码修改</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-link class="linkHelp mainMenu" icon="el-icon-right" href="/">退出登录</el-link>
    <el-dialog title="用户密码修改" :visible.sync="outerVisible" :show-close="true">
     
      <el-form ref="tempForm" :model="tempForm" :rules="rules"  label-width="80px">
          <el-form-item label="修改密码"  prop="Password">
            <el-input type="password" v-model="tempForm.Password" clearable placeholder="登录密码"></el-input>
          </el-form-item>
          <el-form-item label="密码确认"  prop="RePassword">
            <el-input type="password" v-model="tempForm.RePassword" clearable placeholder="密码确认"></el-input>
          </el-form-item>
          
      </el-form>
    
       <div slot="footer" class="dialog-footer">
        <el-button @click="updatePwd" type="primary">保存</el-button>
        <el-button @click="outerVisible = false" type="primary">关闭</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
  import Vue from 'vue'
  import store from "@/store";
  import {  USER_NAME,USER_INFO } from "@/store/mutation-types";
  import {
    updateUserPwd
  } from "@/api/api";
  export default {
    data() {
      return {
        username: '',
        outerVisible:false,
        tempForm: {
          
          Password: "",
          RePassword: ""
        
        },
        rules: {
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
          ] 
        }
      }
    },
    created() {
      this.username =  Vue.ls.get(USER_NAME)           
    },
    methods:{
      updatePwd()
      {
        var min =this;
        if (this.tempForm.Password && this.tempForm.Password !== this.tempForm.RePassword) {
          return;
        }
        debugger;
        var userModel={};
        var user = Vue.ls.get(USER_INFO);
        var Userno =user.Userno;
        userModel.Userno = Userno;
        userModel.Password =this.tempForm.Password;
        updateUserPwd(userModel).then(res=>{
            if (res.Result == 1) {
              min.$message({
                message: '修改成功',
                type: 'success'
              });
              min.outerVisible=false;
             
            }
            else {
              min.$message.error(res.ResultValue);
            }

        })
        
      },
      compareToRePassword(rule, value, callback) {
        if (this.tempForm.Password && this.tempForm.Password !== this.tempForm.RePassword) {
          callback('两次输入的密码不一致！');
          return;
        } else {
          callback()
        }
      }
    }
  }

</script>

<style lang="scss" scope>
  .mainMenu {
    padding: 10px 5px;
  }

  .linkHelp {
    color: #ffffff !important;
    // color:#ffffff;
  }

  .linkHelp:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
  }

  .el-dropdown-link:hover {
    background-color: rgba(255, 255, 255, 0.2);
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
    margin: 20px;
  }
</style>
