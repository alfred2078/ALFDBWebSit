<template>
  <div>
    <el-card>
      <el-form label-width="" :model="queryParam" size="small " @keyup.enter.native="getModelList">
        <el-row>
          <el-col :span="4">
            <el-form-item label="">
              <el-input v-model="queryParam.Warehouseno" placeholder="仓库编码" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="">
              <el-input v-model="queryParam.Warehousename" placeholder="仓库名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="">
              <el-input v-model="queryParam.Areano" placeholder="库位编码" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="">
              <el-input v-model="queryParam.Areaname" placeholder="库位名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getModelList">查询</el-button>
              <!-- <el-button icon="el-icon-refresh-right" type="primary">重置</el-button> -->
            </el-form-item>
            <!-- <el-form-item>
              <el-button icon="el-icon-refresh-right" type="primary">重置</el-button>
            </el-form-item>            -->
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card body-style="padding:5px;">
      <el-row>
        <el-col :span="2">
          <el-button @click="handleAdd" size="small " icon="el-icon-plus" type="primary">新增</el-button>
        </el-col>
        <!-- <el-col :span="2">
          <el-button size="small " icon="el-icon-upload2" type="primary">导入</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small " icon="el-icon-download" type="primary">导出</el-button>
        </el-col> -->
      </el-row>
    </el-card>

    <el-card body-style="padding:2px;">
      <el-table border :data="Data" :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" v-loading="loading"
        :cell-style="{ padding: '2px' }" style="width: 100%;">
        <template v-for="item in columns">
          <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
            v-if="item.colvisible" show-overflow-tooltip>
          </el-table-column>
        </template>
        <el-table-column width="100" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)">
              <el-button slot="reference" type="text" size="small" class="del-btn">删除</el-button>
              <!-- <el-button slot="reference">删除</el-button> -->
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-table :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
        :header-row-style="{ height: '30', font: 'normal' }"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" :data="Data" style="width: 100%"
        row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :fit="true">
        <el-table-column prop="name" label="仓库编码"> </el-table-column>
        <el-table-column prop="type" label="仓库名称"> </el-table-column>
        <el-table-column prop="type" label="库区编码"> </el-table-column>
        <el-table-column prop="type" label="库区名称"> </el-table-column>
        <el-table-column prop="Areano" label="库位编码"> </el-table-column>
        <el-table-column prop="Areaname" label="库位名称"> </el-table-column>
        <el-table-column prop="sort" label="库位状态"> </el-table-column>
        <el-table-column prop="sort" label="库位类型"> </el-table-column>
        <el-table-column prop="Creater" label="创建人"> </el-table-column>
        <el-table-column sortable prop="Createtime" label="创建时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作" :render-header="renderHeader">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            
          </template>
        </el-table-column>
      </el-table> -->
    </el-card>

    <!-- 分页区域 -->
    <pagination :total="PageData.totalCount" :fpage-size.sync="PageData.pageSize"
      :fcurrent-page.sync="PageData.currentPage" @pagination="getModelList" />

      <area-dialog ref="dialogForm" @ok="getModelList"></area-dialog>
    <!-- <el-card body-style="padding:0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="0">
      </el-pagination>
    </el-card> -->

    <!-- <el-dialog title="仓库管理---新增" :show-close="true" :visible.sync="outerVisible">
      <div :style="{          
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff'
        }">
        <el-form :model="sizeForm" label-width="80px">
          <el-form-item label="仓库名称">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="库区名称">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="库位编码">
            <el-input v-model="sizeForm.name" placeholder="库位编码"></el-input>
          </el-form-item>
          <el-form-item label="库位名称">
            <el-input v-model="sizeForm.name" placeholder="库位名称"></el-input>
          </el-form-item>
          <el-form-item label="库位类型">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>        

          <el-form-item label="库位状态">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

           <el-form-item label="排序编码">
            <el-input v-model="sizeForm.name" placeholder="排序编码"></el-input>
          </el-form-item>

           <el-form-item label="库位描述">
            <el-input v-model="sizeForm.name" placeholder="库位描述"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button type="primary">关闭</el-button>
          </el-form-item>


        </el-form>
      </div>



    </el-dialog> -->
  </div>
</template>

<script>
  import {
    ALFModelListMixins
  } from "@/mixins/ALFModelListMixins";
  import Pagination from "@/components/Pagination";
  import AreaDialog from "./AreaDialog";

  export default {
    mixins: [ALFModelListMixins],
    components: {
      Pagination,
      AreaDialog
    },
    data() {
      return {
        queryParam: {
          Warehouseno: "",
          Warehousename: "",
          Areano: "",
          Areaname: ""
        },
        apiUrl: {
          query: "/Area/GetT_AreaListByPage",
          delete: "/Area/DeleteT_AreaAsync"
        },
        columns: [{
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
            label: "库区编码",
            prop: "Houseno",
            colvisible: true
          },
          {
            label: "库区名称",
            prop: "Housename",
            colvisible: true
          },
          {
            label: "库位编码",
            prop: "Areano",
            colvisible: true
          },
          {
            label: "库位名称",
            prop: "Areaname",
            colvisible: true
          },
          {
            label: "库位类型",
            prop: "StrAreatype",
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
  >>>.element.style {
    margin: 0;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }

  .el-icon-arrow-down {
    font-size: 12px;
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
    margin: 10px;
  }

</style>
