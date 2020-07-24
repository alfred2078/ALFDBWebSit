<template>
  <div>
    <el-card >
      <el-form :model="sizeForm" size="small ">
        <el-row>
          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="sizeForm.name" placeholder="盘点单号" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="sizeForm.name" placeholder="物料编码" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="sizeForm.name" placeholder="库位" clearable></el-input>
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
          <el-button size="small" icon="" type="primary">盈亏处理</el-button>
        </el-col>

        <el-col :span="2">
          <el-button size="small" icon="" type="primary">差异复盘</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small" icon="" type="primary">导出</el-button>
        </el-col>

      </el-row>
    </el-card>

    <el-card body-style="padding:2px;">
      <el-table border :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
        :header-row-style="{ height: '30', font: 'normal' }"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" style="width: 100%" row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="code" label="盈亏情况"> </el-table-column>
        <el-table-column prop="code" label="仓库编码"> </el-table-column>
        <el-table-column prop="depcode" label="实盘物料编码"> </el-table-column>
        <el-table-column prop="depname" label="实盘物料名称"> </el-table-column>
        <el-table-column prop="status" label="实盘库位"> </el-table-column>
        <el-table-column prop="creater" label="实盘数量"></el-table-column>
        <el-table-column prop="createtime" label="帐存库位"></el-table-column>
        <el-table-column prop="createtime" label="帐存数量"></el-table-column>
        <el-table-column prop="createtime" label="盘盈数量"></el-table-column>
        <el-table-column prop="createtime" label="盘亏数量"></el-table-column>
        <el-table-column prop="createtime" label="盘点人"></el-table-column>
        <el-table-column prop="createtime" label="盘点时间"></el-table-column>


      </el-table>
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
