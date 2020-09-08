<template>
  <div class="layout">
    <!-- 查询区域 -->
    <el-row>
      <el-card type="flex">
        <el-form
          :model="queryParam"
          label-width="0px"
          size="small "
          @keyup.enter.native="getModelList"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item label>
                <el-input v-model="queryParam.Warehouseno" placeholder="仓库编码" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label>
                <el-input v-model="queryParam.Warehousename" placeholder="仓库名称" clearable></el-input>
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
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label-width="0">
                <el-button icon="el-icon-search" type="primary" @click="getModelList">查询</el-button>
                <!-- <el-button icon="el-icon-refresh-right" type="primary">重置</el-button> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-row>
    <el-row>
      <!-- 按钮区域 -->
      <el-card body-style="padding:10px;" type="flex" >
        <el-row>
          <el-col :span="2">
            <el-button @click="handleAdd" size="small " icon="el-icon-plus" type="primary">新增</el-button>
          </el-col>
          <!-- <el-col :span="2">
          <el-button size="small " icon="el-icon-upload2" type="primary">导入</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small " icon="el-icon-download" type="primary">导出</el-button>
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
            <el-table-column width="100"  label="操作">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)">
                  <el-button slot="reference" type="text" size="small" class="del-btn">删除</el-button>
                  <!-- <el-button slot="reference">删除</el-button> -->
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

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
    <!-- <el-card body-style="padding:2px;">
      <el-table :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
        :header-row-style="{ height: '30', font: 'normal' }"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" :data="Data" style="width: 100%"
        row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :fit="true">
        <el-table-column prop="Warehouseno" label="仓库编码"> </el-table-column>
        <el-table-column prop="Warehousename" label="仓库名称"> </el-table-column>
        <el-table-column prop="Locationdesc" label="仓库描述"> </el-table-column>
        <el-table-column prop="Housecount" label="库区总数"> </el-table-column>
        <el-table-column prop="Houseusingcount" label="库区使用数"> </el-table-column>
        <el-table-column prop="Contactuser" label="联系人"> </el-table-column>
        <el-table-column prop="Contactphone" label="联系电话"> </el-table-column>        
        <el-table-column prop="Address" label="仓库地址"> </el-table-column>
        <el-table-column sortable prop="Createtime" label="创建时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作" :render-header="renderHeader">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            <el-dropdown>
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>                
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>-->

    <!-- <el-card body-style="padding:0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="0">
      </el-pagination>
    </el-card>-->

    <!-- <el-dialog title="仓库管理---新增" :show-close="true" :visible.sync="outerVisible">
      <div :style="{          
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff'
        }">
        <el-form :model="sizeForm" label-width="80px">
          <el-form-item label="仓库编码">
            <el-input v-model="sizeForm.name" placeholder="仓库编码"></el-input>
          </el-form-item>
          <el-form-item label="仓库名称">
            <el-input v-model="sizeForm.name" placeholder="仓库名称"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="sizeForm.name" placeholder="联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="sizeForm.name" placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item label="仓库地址">
            <el-input v-model="sizeForm.name" placeholder="仓库地址"></el-input>
          </el-form-item>
          <el-form-item label="仓库描述">
            <el-input v-model="sizeForm.name" placeholder="仓库描述"></el-input>
          </el-form-item>

          <el-form-item label="仓库状态">
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
    <warehouse-dialog ref="dialogForm" @ok="getModelList"></warehouse-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/layout.scss";
</style>

<script>
import { ALFModelListMixins } from "@/mixins/ALFModelListMixins";
import Pagination from "@/components/Pagination";
import WarehouseDialog from "./WarehouseDialog";
export default {
  mixins: [ALFModelListMixins],
  components: {
    Pagination,
    WarehouseDialog
  },
  data() {
    return {
      queryParam: {
        Warehouseno: "",
        Warehousename: "",
        Createtime: ""
      },
      apiUrl: {
        query: "/Warehouse/GetT_WarehouseListByPage",
        delete: "/Warehouse/DeleteT_WarehouseAsync"
      },
      columns: [
        {
          label: "Id",
          prop: "Id",
          colvisible: false
        },
        {
          label: "仓库编码",
          prop: "Warehouseno",
          colvisible: true
        },
        {
          label: "仓库名称",
          prop: "Warehousename",
          colvisible: true
        },
        {
          label: "仓库描述",
          prop: "Locationdesc",
          colvisible: true
        },
        {
          label: "联系人",
          prop: "Contactuser",
          colvisible: true
        },
        {
          label: "联系电话",
          prop: "Contactphone",
          colvisible: true
        },
        {
          label: "地址",
          prop: "Address",
          colvisible: true
        },
        {
          label: "先进先出",
          prop: "StrFifo",
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
