<template>
  <div>
    <el-card>
      <el-form :model="sizeForm" size="small ">
        <el-row>
          <el-col :span="6">
            <el-form-item label="">
              <el-input v-model="sizeForm.name" placeholder="采购订单号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="">
              <el-input v-model="sizeForm.name" placeholder="物料编码" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item>
              <el-button icon="el-icon-search" type="primary">查询</el-button>
              <el-button icon="el-icon-refresh-right" type="primary">重置</el-button>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
    </el-card>

    <el-card body-style="padding:2px;">
      <el-table :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
        :header-row-style="{ height: '30', font: 'normal' }"
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" :data="tableData" style="width: 100%"
        row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :fit="true">
        <el-table-column prop="name" label="采购订单号"> </el-table-column>
        <el-table-column prop="type" label="物料编码"> </el-table-column>
        <el-table-column prop="icon" label="物料名称"> </el-table-column>
        <el-table-column prop="icon" label="规格型号"> </el-table-column>
        <el-table-column prop="icon" label="订单数量"> </el-table-column>
        <el-table-column prop="icon" label="已收数量"> </el-table-column>
        <el-table-column prop="comp" label="未收数量"> </el-table-column>
        <el-table-column prop="sort" label="打印"> </el-table-column>

      </el-table>
    </el-card>

    <el-dialog title="标签打印--采购标签" :show-close="true" :visible.sync="outerVisible">
      <div :style="{
          
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff'
        }">
        <el-form :model="sizeForm" label-width="80px">
          <el-form-item label="采购订单">
            <el-input v-model="sizeForm.name" placeholder="采购订单" clearable></el-input>
          </el-form-item>
          <el-form-item label="物料编码">
            <el-input v-model="sizeForm.name" placeholder="物料编码" clearable></el-input>
          </el-form-item>
          <el-form-item label="物料名称">
            <el-input v-model="sizeForm.name" placeholder="物料名称" clearable></el-input>
          </el-form-item> 
          <el-form-item label="规格">
            <el-input v-model="sizeForm.name" placeholder="规格" clearable></el-input>
          </el-form-item>    
          <el-form-item :rules="[
      { required: true, message: '年龄不能为空'},
      
    ]" label="批次">
            <el-input v-model="sizeForm.name" placeholder="批次" clearable></el-input>
          </el-form-item> 
          <!-- <el-form-item label="机台">
            <el-input v-model="sizeForm.name" placeholder="机台"></el-input>
          </el-form-item>
          <el-form-item label="班别">
            <el-input v-model="sizeForm.name" placeholder="班别"></el-input>
          </el-form-item>        -->
          <el-form-item :rules="[
      { required: true, message: '年龄不能为空'},
      
    ]" label="未收数量">
            <el-input v-model="sizeForm.name" placeholder="未收数量"></el-input>
          </el-form-item>
          <el-form-item label="包装量">
            <el-input v-model="sizeForm.name" placeholder="包装量" clearable></el-input>
          </el-form-item>
          <el-form-item label="打印张数">
            <el-input v-model="sizeForm.name" placeholder="打印张数" clearable></el-input>
          </el-form-item>

          <el-form-item >
            <el-button type="primary">打印</el-button>
            <el-button type="primary">关闭</el-button>
          </el-form-item>


        </el-form>
      </div>

     

    </el-dialog>

    <el-card body-style="padding:0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="0">
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
        outerVisible: true
      }
    }
  }

</script>

<style lang="scss" scoped>
>>>.el-dialog{
  margin:5vh auto 50px !important;
}
>>>.el-dialog__title{
  font-size: 14px;
  color: #fff;
}
>>>.el-dialog__header{
  background-color:#3b9bf5e6;
}
.el-form-item{
  margin: 10px;
}
</style>
