<template>
  <div class="layout">
    <!-- 查询区域 -->
    <el-row>
      <el-card type="flex">
        <el-form :model="queryParam" size="small " @keyup.enter.native="getModelListPage">
          <el-row>
            <el-col :span="4">
              <el-form-item label>
                <el-input v-model="queryParam.Ruleno" placeholder="角色编码" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label>
                <el-input v-model="queryParam.Rulename" placeholder="角色名称" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label>
                <el-date-picker
                  v-model="queryParam.Createtime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="创建开始日期"
                  end-placeholder="创建结束日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label-width="0">
                <el-button icon="el-icon-search" type="primary" @click="getModelListPage">查询</el-button>
                <!-- <el-button icon="el-icon-refresh-right" type="primary">重置</el-button> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-row>
    <el-row>
      <!-- 按钮区域 -->
      <el-card body-style="padding:10px;" type="flex">
        <el-row>
          <el-col :span="2">
            <el-button @click="handleAdd" size="small " icon="el-icon-plus" type="primary">新增</el-button>
          </el-col>
          <!-- <el-col :span="2">
          <el-button size="small " icon="el-icon-edit" type="primary">编辑</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small " icon="el-icon-plus" type="danger">删除</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small " icon="el-icon-upload2" type="primary">导入</el-button>
        </el-col>
        <el-col :span="2">
          <el-dropdown>
            <el-button size="small" type="primary">
              导出<i class="el-icon-download"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>导出当前页</el-dropdown-item>
              <el-dropdown-item>导出查询结果</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </el-col>-->
        </el-row>
      </el-card>
    </el-row>
    <el-row type="flex" class="layout" body-style="padding:2px;">
      <el-main class="layout-main">
        <el-container class="layout-main-container">
          <el-table
            border
            :data="Data"
            :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
            v-loading="loading"
            :cell-style="{ padding: '2px' }"
            style="width: 100%;"
            height="auto"
            class="layout-table"
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
            <el-table-column width="130"  label="操作">
              <template slot-scope="scope">
                <el-button @click="handleGrant(scope.row)" type="text" size="small">授权</el-button>
                <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)">
                  <el-button slot="reference" type="text" size="small" class="del-btn">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-table :row-style="{height:'30'}" :cell-style="{padding:'2px'}" :header-row-style="{height:'30'}"
        :header-cell-style="{padding:'2px',background:'#f6f6f6'}" height="350" border :data="tableData"
        style="width: 100%">
        <el-table-column prop="date" label="角色编码">
        </el-table-column>
        <el-table-column prop="name" label="角色名称">
        </el-table-column>
        <el-table-column sortable prop="address" label="创建时间"> </el-table-column>
        <el-table-column fixed="right" label="操作" :render-header="renderHeader">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" icon="el-icon-plus" >授权</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small" icon="el-icon-edit">编辑</el-button>
            <el-button style="color:red" @click="handleClick(scope.row)" type="text" size="small"  icon="el-icon-delete">删除</el-button>
            <el-dropdown>
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
        </el-container>
      </el-main>
    </el-row>
    <rule-dialog ref="dialogForm" @ok="getModelList"></rule-dialog>
    <rule-drawer ref="drawerForm"></rule-drawer>

    <!-- <el-card body-style="padding:0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="4">
      </el-pagination>
    </el-card>-->

    <!-- <el-dialog title="角色管理---新增" :show-close="true" :visible.sync="outerVisible">
      <div :style="{
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff'
        }">
        <el-form :model="sizeForm" label-width="80px">
          <el-form-item :rules="[{ required: true, message: '年龄不能为空' }]" label="角色编码">
            <el-input v-model="sizeForm.name" placeholder="角色编码"></el-input>
          </el-form-item>
          <el-form-item :rules="[{ required: true, message: '年龄不能为空' }]" label="角色名称">
            <el-input v-model="sizeForm.name" placeholder="角色名称"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="sizeForm.name" placeholder="备注"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button type="primary">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-drawer title="角色菜单配置" :visible.sync="drawer" size="50%">
      <div :style="{
          width: '100%',
          border: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff'
        }">
        <el-tree :data="treedata" show-checkbox node-key="id" :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]" :props="defaultProps">
        </el-tree>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </el-drawer>

    <el-drawer title="菜单按钮配置" :visible.sync="drawer1" size="25%">
      <div :style="{
          width: '100%',
          border: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff'
        }">
        <el-form :model="asd">
          <el-form-item>
            <el-checkbox v-model="checked">新增按钮</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked">编辑按钮</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked">删除按钮</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked">导入按钮</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked">导出按钮</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>-->
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/layout.scss";
</style>

<script>
import { ALFModelListMixins } from "@/mixins/ALFModelListMixins";
import Pagination from "@/components/Pagination";
import RuleDialog from "./RuleDialog";
import RuleDrawer from "./RuleDrawer";

export default {
  mixins: [ALFModelListMixins],
  components: {
    Pagination,
    RuleDialog,
    RuleDrawer
  },
  data() {
    return {
      queryParam: {
        Ruleno: "",
        Rulename: "",
        Createtime: ""
      },
      apiUrl: {
        query: "/Rule/GetT_RuleListByPage",
        delete: "/Rule/DeleteT_RuleAsync"
      },
      columns: [
        {
          label: "Id",
          prop: "Id",
          colvisible: false
        },
        {
          label: "角色编码",
          prop: "Ruleno",
          colvisible: true
        },
        {
          label: "角色名称",
          prop: "Rulename",
          colvisible: true
        },
        {
          label: "角色描述",
          prop: "Description",
          colvisible: true
        },
        {
          label: "创建人",
          prop: "Creater",
          colvisible: true
        },
        {
          label: "创建时间",
          prop: "Createtime",
          colvisible: true
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  // background-color: blue;
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  //   .el-main {
  //     background-color: #E9EEF3;
  //     color: #333;
  //     text-align: center;
  //     line-height: 160px;
  //   }
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-form-item {
  margin: 10px;
}

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
</style>
