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
              <el-input v-model="sizeForm.name" placeholder="仓库" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="sizeForm.name" placeholder="库区" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="sizeForm.name" placeholder="库位" clearable></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="5">
            <el-form-item label-width="70px" label="盘存分类">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

<el-col :span="5">
            <el-form-item label-width="70px" label="物料编码">
              <el-input v-model="sizeForm.name" placeholder="物料编码"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="9">
            <el-form-item label-width="70px" label="库存异动">
              <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="50px" label="备注">
              <el-input v-model="sizeForm.name" placeholder="备注"></el-input>
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
          <el-button size="small" icon="el-icon-plus" type="primary">保存</el-button>
        </el-col>
        
      </el-row>
    </el-card>

    <el-card body-style="padding:2px;">
      <el-table border :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
        :header-row-style="{ height: '30', font: 'normal' }"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"  style="width: 100%" row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="code" label="仓库编码"> </el-table-column>
        <el-table-column prop="depcode" label="仓库名称"> </el-table-column>
        <el-table-column prop="depname" label="库区编码"> </el-table-column>
        <el-table-column prop="status" label="库区名称"> </el-table-column>
        <el-table-column prop="creater" label="库位编码"></el-table-column>
        <el-table-column  prop="createtime" label="库位名称"></el-table-column>

        
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
