<template>
  <div>
    <el-card>
      <el-form :model="sizeForm"  size="small ">
        <el-row>
          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="sizeForm.name" placeholder="仓库" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="sizeForm.name" placeholder="库位" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="sizeForm.name" placeholder="物料编码" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="sizeForm.name" placeholder="批次" clearable></el-input>
            </el-form-item>
          </el-col>          
        </el-row>

        <el-row>
            <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="sizeForm.name" placeholder="69码" clearable></el-input>
            </el-form-item>
          </el-col>            

          <el-col :span="9">
            <el-form-item  label="">
              <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="入库开始日期"
                end-placeholder="入库结束日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="9">
            <el-form-item label-width="" label="">
              <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="出库开始日期"
                end-placeholder="出库结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="0">
              <el-button icon="el-icon-search" type="primary">查询</el-button>
              <el-button icon="el-icon-refresh-right" type="primary">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>

    <el-card body-style="padding:10px;">
      <el-row>
        <el-col :span="2">
          <!-- <el-button size="small" icon="el-icon-plus" type="primary">新增</el-button> -->
        </el-col>
        <!-- <el-col :span="2">
          <el-button size="small" icon="el-icon-edit" type="primary">编辑</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small" icon="el-icon-plus" type="danger">删除</el-button>
        </el-col> -->
        <el-col :span="2">
          <!-- <el-button size="small" icon="el-icon-upload2" type="primary">导入</el-button> -->
        </el-col>
        <el-col :span="2">
          <!-- <el-button size="small " icon="el-icon-download" type="primary">导出</el-button> -->
          <el-dropdown>
            <el-button size="small" type="primary">
              导出<i class="el-icon-download"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>导出当前页</el-dropdown-item>
              <el-dropdown-item>导出查询结果</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-card>

    <el-card body-style="padding:2px;">
      <el-table border :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
        :header-row-style="{ height: '30', font: 'normal' }"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" height="330" 
        style="width: 100%" row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column prop="code" label="仓库编码"> </el-table-column>
        <el-table-column prop="name" label="仓库名称"> </el-table-column>        
        <el-table-column prop="depname" label="物料编码"> </el-table-column> 
        <el-table-column prop="depname" label="物料名称"> </el-table-column>        
        <el-table-column prop="note" label="入库数量"> </el-table-column>
        <el-table-column prop="note" label="入库时间"> </el-table-column>
        <el-table-column prop="note" label="出库数量"> </el-table-column>
        <el-table-column prop="note" label="出库时间"> </el-table-column>
        <el-table-column prop="note" label="结存数量"> </el-table-column>
        
        
      </el-table>
    </el-card>

    <el-card body-style="padding:0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="1">
      </el-pagination>
    </el-card>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        sizeForm: {
          name: ""
        },
        outerVisible: true,
        tableData: [{
          code: "PO01",
          name: "采购订单",
          depcode: "01",
          depname: "采购部",
          status: "10001",
          role: "测试供应商",
          people: "测试账户",
          warehouse: "成品仓",
          creater: "admin",
          createtime: "2020-01-02"
        }]
      }
    }
  }

</script>

<style lang="scss" scoped>
  >>>.element.style {
    margin: 0;
    ;
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
