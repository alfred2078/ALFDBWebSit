<template>
  <div>
    <el-card >
      <el-form :model="sizeForm" size="small ">
        <el-row>
          <el-col :span="5">
            <el-form-item label-width="" label="">
              <el-input v-model="sizeForm.name" placeholder="发货通知单号" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="70px" label="托运单号">
              <el-input v-model="sizeForm.name" placeholder="托运单号" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label-width="50px" label="客户">
              <el-input v-model="sizeForm.name" placeholder="客户" clearable></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label-width="80px" label="创建日期">
              <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          
        </el-row>
        <el-row>
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
          <el-button size="small" icon="" type="primary">单据打印</el-button>
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
        :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" height="330" style="width: 100%" row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="code" label="发货通知单号"> </el-table-column>
        <el-table-column prop="name" label="物流单号"> </el-table-column>
        <el-table-column prop="depcode" label="物流公司"> </el-table-column>
        <el-table-column prop="depname" label="地址"> </el-table-column>
        <el-table-column prop="status" label="发站"> </el-table-column>
        <el-table-column prop="role" label="发货人"> </el-table-column>
        <el-table-column prop="people" label="发货电话"> </el-table-column>
        <el-table-column prop="note" label="到站"> </el-table-column>
        <el-table-column prop="note" label="收货人"> </el-table-column>
        <el-table-column prop="note" label="收货电话"> </el-table-column>
        <el-table-column prop="note" label="备注"> </el-table-column>
        <el-table-column prop="note" label="装车发货人"> </el-table-column>
        <el-table-column prop="creater" label="创建人"></el-table-column>
        <el-table-column sortable prop="createtime" label="创建时间"></el-table-column>

        <el-table-column fixed="right" label="操作" :render-header="renderHeader">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
            <!-- <el-dropdown>
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>密码</el-dropdown-item>
                <el-dropdown-item>停用</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card body-style="padding:0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="1">
      </el-pagination>
    </el-card>
    <el-dialog title="托运单---详情" width="70%" :show-close="true" :visible.sync="outerVisible">
      <div :style="{          
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff'
        }">
        <el-table border :row-style="{ height: '30' }" :cell-style="{ padding: '2px' }"
          :header-row-style="{ height: '30', font: 'normal' }"
          :header-cell-style="{ padding: '2px', background: '#f6f6f6' }" style="width: 100%" row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
          <el-table-column prop="code" label="商品名称"> </el-table-column>
          <el-table-column prop="code" label="业务类型"> </el-table-column>
          <el-table-column prop="name" label="数量"> </el-table-column>
          <el-table-column prop="depcode" label="单价"> </el-table-column>
          <el-table-column prop="depname" label="重量/体积"> </el-table-column>
          <el-table-column prop="status" label="保费"> </el-table-column>
          <el-table-column prop="role" label="送货费"> </el-table-column>
          <el-table-column prop="people" label="运费"> </el-table-column>
          <el-table-column prop="note" label="结算方式"> </el-table-column>
          <el-table-column prop="note" label="提货方式"> </el-table-column>
          
        </el-table>
      </div>



    </el-dialog>

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
