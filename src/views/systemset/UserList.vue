<template>
  <div class="layout">
    <!-- 查询区域 -->
    <el-row>
      <el-card type="flex">
        <el-form :model="queryParam" size="small " @keyup.enter.native="getModelList">
          <el-row>
            <el-col :span="5">
              <el-form-item label>
                <el-input v-model="queryParam.Userno" placeholder="用户编码" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label>
                <el-input v-model="queryParam.Username" placeholder="用户名称" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="9">
              <el-form-item label>
                <el-date-picker
                  v-model="queryParam.Createtime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item label-width="0">
                <el-button icon="el-icon-search" type="primary" @click="getModelList">查询</el-button>
                <!-- <el-button icon="el-icon-refresh-right" type="primary">重置</el-button> -->
              </el-form-item>
            </el-col>
            <!-- <el-col :span="2">
            <el-form-item label-width="0">              
              <el-button icon="el-icon-refresh-right" type="primary">重置</el-button>
            </el-form-item>
            </el-col>-->
          </el-row>
        </el-form>
      </el-card>
    </el-row>
    <el-row>
      <!-- 按钮区域 -->
      <el-card body-style="padding:10px;" type="flex">
        <!-- <el-row>
        <el-col :span="2">
          <el-button @click="handleAdd" size="small" icon="el-icon-plus" type="primary">新增</el-button>
        </el-col>
        </el-row>-->
      </el-card>
    </el-row>
    <el-row type="flex" class="layout" body-style="padding:2px;">
      <el-main class="layout-main">
        <el-container class="layout-main-container">
          <el-table
            border
            :data="Data"
            height="auto"
            class="layout-table"
            :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
            v-loading="loading"
            :cell-style="{ padding: '2px' }"
            style="width: 100%;"
          >
            <template v-for="item in columns">
              <el-table-column
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                v-if="item.colvisible"
                show-overflow-tooltip
              ></el-table-column>
            </template>
            <el-table-column width="100" fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                <!-- <el-popconfirm title="确定删除吗？"  @onConfirm="handleDelete(scope.row)">
              <el-button slot="reference" type="text" size="small" class="del-btn">删除</el-button>              
                </el-popconfirm>-->
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-table border :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
        :header-row-style="{ height: '30', font: 'normal' }"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"  :data="Data"
        style="width: 100%" row-key="id" >
        <el-table-column prop="Id" label="ID" v-if="idshow"> </el-table-column>
        <el-table-column prop="Userno" label="用户编码"> </el-table-column>
        <el-table-column prop="Username" label="用户名称"> </el-table-column>
        <el-table-column prop="Departmentcode" label="部门编码"> </el-table-column>
        <el-table-column prop="" label="部门名称"> </el-table-column>        
        <el-table-column prop="role" label="角色分配"> </el-table-column>
        <el-table-column prop="warehouse" label="负责仓库"> </el-table-column>
        <el-table-column prop="Creater" label="创建人"></el-table-column>
        <el-table-column sortable prop="Createtime" label="创建时间"></el-table-column>

        <el-table-column fixed="right" label="操作" :render-header="renderHeader">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small" class="del-btn">删除</el-button>
           
          </template>
        </el-table-column>
          </el-table>-->

          <!-- 分页区域 -->
          <pagination
            :total="PageData.totalCount"
            :fpage-size.sync="PageData.pageSize"
            :fcurrent-page.sync="PageData.currentPage"
            @pagination="getModelList"
          />
          <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PageData.currentPage"
        :page-sizes="pageSizeArr" :page-size="PageData.pageSize" :layout="layout" :total="PageData.totalCount">
          </el-pagination>-->
        </el-container>
      </el-main>
    </el-row>
    <!-- model区域 -->
    <user-dialog ref="dialogForm" @ok="getModelList"></user-dialog>
    <!-- <el-dialog title="用户管理---编辑" :show-close="true" :visible.sync="outerVisible">
      <div :style="{
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff'
        }">
        <el-form :model="loginForm" label-width="80px">
          <el-form-item label="用户编号">
            <el-input v-model="loginForm.name" placeholder="用户编号"></el-input>
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input v-model="loginForm.name" placeholder="用户名称"></el-input>
          </el-form-item>
          <el-form-item label="部门编码">
            <el-input v-model="loginForm.name" placeholder="部门编码"></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="loginForm.name" placeholder="部门名称"></el-input>
          </el-form-item>
          <el-form-item label="角色分配">
            <el-input v-model="loginForm.name" placeholder="角色分配"></el-input>
          </el-form-item>
          <el-form-item label="负责仓库">
            <el-input v-model="loginForm.name" placeholder="负责仓库"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input v-model="loginForm.name" placeholder="登录密码"></el-input>
          </el-form-item>
          <el-form-item label="密码确认">
            <el-input v-model="loginForm.name" placeholder="密码确认"></el-input>
          </el-form-item>
          <el-form-item label="用户状态">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button type="primary">关闭</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-dialog>-->
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/layout.scss";
</style>

<script>
import { ALFModelListMixins } from "@/mixins/ALFModelListMixins";
import Pagination from "@/components/Pagination";
import UserDialog from "./UserDialog";

export default {
  mixins: [ALFModelListMixins],
  components: {
    Pagination,
    UserDialog
  },
  data() {
    return {
      queryParam: {
        Userno: "",
        Username: "",
        Createtime: ""
      },
      columns: [
        {
          label: "Id",
          prop: "Id",
          colvisible: false
        },
        {
          label: "用户编码",
          prop: "Userno",
          colvisible: true
        },
        {
          label: "用户名称",
          prop: "Username",
          colvisible: true
        },
        {
          label: "角色分配",
          prop: "role",
          colvisible: true
        },
        {
          label: "负责仓库",
          prop: "warehouse",
          colvisible: true
        },
        {
          label: "创建时间",
          prop: "Createtime",
          colvisible: true
        }
      ],
      apiUrl: {
        query: "/user/GetT_UserListByPage",
        delete: "/User/DeleteT_UserAsync"
      }
    };
  }
  // methods: {
  //   getMaxLength(arr) {
  //     return arr.reduce((acc, item) => {
  //       if (item) {
  //         let calcLen = this.getTextWidth(item)
  //         if (acc < calcLen) {
  //           acc = calcLen
  //         }
  //       }
  //       return acc
  //     }, 0)
  //   },
  //   getTextWidth(str) {
  //     let width = 0;
  //     let html = document.createElement('span');
  //     html.innerText = str;
  //     html.className = 'getTextWidth';
  //     document.querySelector('body').appendChild(html);
  //     width = document.querySelector('.getTextWidth').offsetWidth;
  //     document.querySelector('.getTextWidth').remove();
  //     return width;
  //   }
  // },
  // watch: {
  //   Data(valArr) {
  //     const _this = this
  //     this.columns = this.columns.map(function (value) {
  //       const arr = valArr.map(x => x[value.prop])
  //       arr.push(value.label)
  //       value.width = _this.getMaxLength(arr) + 20
  //       return value
  //     })
  //   }
  // },
};
</script>

<style lang="scss" scoped>
>>> .element.style {
  margin: 0;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

>>> .el-dialog {
  margin: 5vh auto 50px !important;
}

>>> .el-dialog__title {
  font-size: 14px;
  color: #fff;
}

>>> .el-dialog__header {
  background-color: #3b9bf5e6;
}

.el-form-item {
  margin: 10px;
}
</style>
