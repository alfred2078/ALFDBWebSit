<template>
  <el-drawer :title="title" :visible.sync="dvisible" size="50%">
    <div :style="{
          width: '100%',
          border: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff'
        }">
      <el-tree ref="treeMenu" :data="treeMenu" show-checkbox node-key="Id" :default-expanded-keys="defaultExpanded"
        :default-checked-keys="defaultChecked" :props="defaultProps">
      </el-tree>
      <el-button @click="SaveModel" type="primary">保存</el-button>
      <el-button @click="visible = false">取消</el-button>
    </div>
  </el-drawer>
</template>

<script>
  import {
    SaveRuleMenu,
    getMenuList,
    getMenuListByRuleId
  } from "@/api/api";
  import {
    USER_NAME
  } from "@/store/mutation-types";
  import Vue from "vue";

  export default {
    data() {
      return {
        title: "角色菜单配置",
        dvisible: false,
        treeMenu: [],
        defaultExpanded: [], //默认展开
        defaultChecked: [], //已经选择        
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        tempForm: {
          Id: "", //角色ID
          defaultChecked: [] //当前选中的菜单ID
        },
      };
    },
    methods: {
      resetTempForm() {
        this.tempForm = {
            Id: "", //角色ID
            defaultChecked: [] //当前选中的菜单ID
          },
          this.treeMenu = [],
          this.defaultExpanded = [], //默认展开
          this.defaultChecked = [] //已经选择 
        this.dvisible = false
      },
      grant(record) {
        this.resetTempForm();
        this.dvisible = true;
        this.tempForm = Object.assign({}, record);
        this.getMenuList();
        this.getMenuListByRuleId(this.tempForm.Id);
      },
      SaveModel() {
        // this.Currentruleid = this.$refs.treeMenu.getCheckedKeys().join(',');
        // console.log(this.Currentruleid)
        // this.tempForm.Currentruleid = this.Currentruleid;
        debugger;
        this.tempForm.defaultChecked = this.$refs.treeMenu.getCheckedKeys()
          .concat(this.$refs.treeMenu.getHalfCheckedKeys());
        delete this.tempForm.Createtime;
        SaveRuleMenu(this.tempForm).then(res => {
          if (res.Result === 1) {
            this.dvisible = false;
            this.$message({
              message: res.ResultValue,
              type: "success"
            });
          } else {
            this.$message.error(res.ResultValue);
          }
        });
      },
      getMenuList() {
        getMenuList().then(res => {
          if (res.Result === 1) {
            debugger;
            this.treeMenu = res.Data
            this.defaultExpanded = this.treeMenu.map(item => item.Id)            
          }
          // else {
          //   this.$message.error(res.ResultValue);
          // }
        });
      },
      getMenuListByRuleId(ruleId) {
        getMenuListByRuleId({
          "Id": ruleId
        }).then(res => {
          if (res.Result === 1) {
            debugger;
            this.defaultChecked = res.Data.map(item => item.Menuid)
            // console.log(this.defaultChecked)
          }
          // else {
          //   this.$message.error(res.ResultValue);
          // }
        });
      },
    }
  };

</script>

<style lang="scss" >
  .el-drawer {
    overflow: scroll
  }
</style>
