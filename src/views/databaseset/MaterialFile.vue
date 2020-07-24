<template>
  <div>
    <el-card >
      <el-form :model="sizeForm" size="small ">
        <el-row>
          <el-col :span="5">
            <el-form-item label-width="70px" label="据点编号">
              <el-input v-model="sizeForm.name" placeholder="据点编号" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="70px" label="据点名称">
              <el-input v-model="sizeForm.name" placeholder="据点名称" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="70px" label="物料编号">
              <el-input v-model="sizeForm.name" placeholder="物料编号" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="70px" label="物料名称">
              <el-input v-model="sizeForm.name" placeholder="物料名称" clearable></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="5">
            <el-form-item label-width="70px" label="规格型号">
              <el-input v-model="sizeForm.name" placeholder="规格型号" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="70px" label="库存单位">
              <el-input v-model="sizeForm.name" placeholder="库存单位" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="70px" label="产品分类">
              <el-input v-model="sizeForm.name" placeholder="产品分类" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="70px" label="分类名称">
              <el-input v-model="sizeForm.name" placeholder="分类名称" clearable></el-input>
            </el-form-item>
          </el-col>


        </el-row>

         <el-row>
          <el-col :span="5">
            <el-form-item label-width="80px" label="保质期(天)">
              <el-input v-model="sizeForm.name" placeholder="保质期(天)" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="80px" label="保质期(月)">
              <el-input v-model="sizeForm.name" placeholder="保质期(月)" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="70px" label="盘点分类">
              <el-input v-model="sizeForm.name" placeholder="盘点分类" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="100px" label="盘点分类名称" >
              <el-input v-model="sizeForm.name" placeholder="盘点分类名称" clearable></el-input>
            </el-form-item>
          </el-col>


        </el-row>

        <el-row>
          <el-col :span="5">
            <el-form-item label-width="70px" label="包装数量" >
              <el-input v-model="sizeForm.name" placeholder="包装数量" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="70px" label="净重">
              <el-input v-model="sizeForm.name" placeholder="净重" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="70px" label="毛重">
              <el-input v-model="sizeForm.name" placeholder="毛重" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="70px" label="理论数量">
              <el-input v-model="sizeForm.name" placeholder="理论数量" clearable></el-input>
            </el-form-item>
          </el-col>


        </el-row>

        <el-row>
          <el-col :span="5">
            <el-form-item label-width="70px" label="临近天数">
              <el-input v-model="sizeForm.name" placeholder="临近天数" clearable></el-input>
            </el-form-item>
          </el-col>


        </el-row>



      </el-form>
    </el-card>

    <el-card body-style="padding:10px;">
      <el-row>
        <el-col :span="2">
          <el-button size="small" icon="el-icon-plus" type="primary">新增</el-button>
        </el-col>

      </el-row>
    </el-card>

    <el-card body-style="padding:2px;">
      <el-table border :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
        :header-row-style="{ height: '30', font: 'normal' }"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" style="width: 100%" row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="code" label="据点编码"> </el-table-column>
        <el-table-column prop="depcode" label="据点名称"> </el-table-column>
        <el-table-column prop="depname" label="物料编码"> </el-table-column>
        <el-table-column prop="status" label="物料名称"> </el-table-column>
        <el-table-column prop="creater" label="外69码"></el-table-column>
        <el-table-column prop="createtime" label="69码"></el-table-column>


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
