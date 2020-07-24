<template>
  <div>
    <el-card >
      <el-form :model="sizeForm" :inline="true" size="small ">
        <el-row>
          <el-col :span="6">
            <el-form-item label="菜单名称">
              <el-input v-model="sizeForm.name" placeholder="菜单名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item>
              <el-button icon="el-icon-search" type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-refresh-right" type="primary">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card body-style="padding:10px;">
      <el-row>
        <el-col :span="2">
          <el-button size="small " icon="el-icon-plus" type="primary">新增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small " icon="el-icon-edit" type="primary">编辑</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small " icon="el-icon-plus" type="danger">删除</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small " icon="el-icon-upload2" type="primary">导入</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small " icon="el-icon-download" type="primary">导出</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card body-style="padding:2px;">
      <el-table :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
        :header-row-style="{ height: '30', font: 'normal' }"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" :data="tableData" style="width: 100%"
        row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :fit="true">
        <el-table-column prop="name" label="菜单名称"> </el-table-column>
        <el-table-column prop="type" label="菜单类型"> </el-table-column>
        <el-table-column prop="icon" label="菜单图标"> </el-table-column>
        <el-table-column prop="comp" label="组件"> </el-table-column>
        <el-table-column prop="route" label="路径"> </el-table-column>
        <el-table-column prop="sort" label="排序"> </el-table-column>
        <el-table-column sortable prop="date" label="创建时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作" :render-header="renderHeader">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-dropdown>
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>详情</el-dropdown-item>
                <el-dropdown-item>添加子菜单</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-drawer title="编辑" :visible.sync="drawer" size="50%">
      <div :style="{
          width: '100%',
          border: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff'
        }">
        <el-form label-width="120px" :model="sizeForm" size="small ">
          <el-form-item label="菜单类型">
            <el-radio-group v-model="radio">
              <el-radio :label="3">一级菜单</el-radio>
              <el-radio :label="6">子菜单</el-radio>
              <el-radio :label="9">按钮权限</el-radio>
            </el-radio-group>
          </el-form-item>


          <el-row>
            <el-col :span="18">
              <el-form-item :rules="[{ required: true, message: '菜单不能为空' }]" label="菜单名称">
                <el-input v-model="sizeForm.name" placeholder="请输入菜单名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="18">
              <el-form-item :rules="[{ required: true, message: '菜单不能为空' }]" label="上级菜单">
                <el-input v-model="sizeForm.name" placeholder="请输入菜单名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="18">
              <el-form-item :rules="[{ required: true, message: '菜单不能为空' }]" label="菜单路径">
                <el-input v-model="sizeForm.name" placeholder="请输入菜单路径"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="18">
              <el-form-item :rules="[{ required: true, message: '菜单不能为空' }]" label="前端组件">
                <el-input v-model="sizeForm.name" placeholder="请输入组件"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="18">
              <el-form-item label="菜单图标">
                <el-input v-model="sizeForm.name" placeholder="请输入组件"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="18">
              <el-form-item label="排序">
                <el-input v-model="sizeForm.name" placeholder="请输入组件"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="状态">
            <el-radio-group v-model="radio">
              <el-radio :label="3">有效</el-radio>
              <el-radio :label="6">无效</el-radio>

            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>



        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        radio: 3,
        drawer: true,
        sizeForm: {
          name: ""
        },
        tableData: [{
            id: "1",
            name: "首页",
            type: "菜单",
            icon: "home",
            comp: "dashboard/DashMain",
            route: "/dashboard/dashmain",
            sort: "0",
            date: "2020-04-24"
          },
          {
            id: "2",
            name: "系统管理",
            type: "菜单",
            icon: "home",
            comp: "systemset/menu",
            route: "systemset/menu",
            sort: "1",
            date: "2020-04-24",
            children: [{
                id: "2-1",
                name: "用户管理",
                type: "菜单",
                icon: "home",
                comp: "dashboard/DashMain",
                route: "/dashboard/dashmain",
                sort: "0",
                date: "2020-04-24"
              },
              {
                id: "2-2",
                name: "角色管理",
                type: "菜单",
                icon: "home",
                comp: "dashboard/DashMain",
                route: "/dashboard/dashmain",
                sort: "0",
                date: "2020-04-24"
              }
            ]
          }
        ]
      };
    }
  };

</script>

<style lang="scss" scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  >>>.el-drawer__header {
    border: 1px solid #e9e9e9;
    padding: 10px;
  }

  >>>.el-drawer__body {
    padding: 20px;
  }

</style>
