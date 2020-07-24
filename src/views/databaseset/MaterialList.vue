<template>
  <div>
    <el-card >
      <el-form  :model="sizeForm" size="small ">
        <el-row>
          <el-col :span="5">
            <el-form-item label="物料编码">
              <el-input v-model="sizeForm.name" placeholder="物料编码" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="物料名称">
              <el-input v-model="sizeForm.name" placeholder="物料名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="5">
          <el-form-item label="规格型号">
            <el-input v-model="sizeForm.name" placeholder="规格型号"></el-input>
          </el-form-item>
        </el-col> -->
          <el-col :span="9">
            <el-form-item label="创建日期">
              <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期">
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
        <!-- <el-row>
          <el-col :span="2">
          <el-form-item>
            <el-button icon="el-icon-search" type="primary">查询</el-button>            
          </el-form-item>
        </el-col>
        <el-col :span="2">
            <el-form-item >
              <el-button icon="el-icon-refresh-right" type="primary">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
    </el-card>

    <el-card >
      <el-row>
        <el-col :span="2">
          <el-button @click="newAdd" size="small " icon="el-icon-download" type="primary">导出</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card body-style="padding:2px;">
      <el-table :row-style="{height:'30'}" :cell-style="{padding:'2px'}" :header-row-style="{height:'30'}"
        :header-cell-style="{padding:'2px',background:'#f6f6f6'}" height="300" border :data="tableData" :fit="true">
        <el-table-column prop="name" label="据点编号">
        </el-table-column>
        <el-table-column prop="name" label="据点名称">
        </el-table-column>
        <el-table-column prop="date" label="物料编码">
        </el-table-column>
        <el-table-column prop="name" label="物料名称">
        </el-table-column>
        <el-table-column prop="date" label="规格型号">
        </el-table-column>
        <el-table-column prop="name" label="库存单位">
        </el-table-column>

        <el-table-column prop="name" label="产品分类码">
        </el-table-column>
        <el-table-column prop="name" label="产品分类名称">
        </el-table-column>
        <el-table-column prop="name" label="保质期(天)">
        </el-table-column>
        <el-table-column prop="name" label="保质期(月)">
        </el-table-column>
        <el-table-column prop="name" label="临期天数">
        </el-table-column>
        <el-table-column prop="name" label="盘点分类">
        </el-table-column>
        <el-table-column prop="name" label="盘点分类名称">
        </el-table-column>
        <el-table-column prop="address" label="创建日期"> </el-table-column>
        <el-table-column fixed="right" label="操作" :render-header="renderHeader">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-dropdown>
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>详情</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card body-style="padding:0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="0">
      </el-pagination>
    </el-card>

    <el-dialog title="物料管理---编辑" :show-close="true" :visible.sync="outerVisible">
      <div :style="{
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff'
        }">
        <el-form :model="sizeForm" :label-position="right" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="据点编号">
                <el-input v-model="sizeForm.name" placeholder="据点编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="据点名称">
                <el-input v-model="sizeForm.name" placeholder="据点名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="物料编码">
                <el-input v-model="sizeForm.name" placeholder="物料编码"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="物料名称">
                <el-input v-model="sizeForm.name" placeholder="物料名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="规格型号">
                <el-input v-model="sizeForm.name" placeholder="规格型号"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="库存单位">
                <el-input v-model="sizeForm.name" placeholder="库存单位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="产品分类">
                <el-input v-model="sizeForm.name" placeholder="产品分类"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label-width="100px" label="产品分类名称">
                <el-input v-model="sizeForm.name" placeholder="产分类名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="保质期(天)">
                <el-input v-model="sizeForm.name" placeholder="保质期(天)"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="保质期(月)">
                <el-input v-model="sizeForm.name" placeholder="保质期(月)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="盘点分类">
                <el-input v-model="sizeForm.name" placeholder="盘点分类"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label-width="100px" label="盘点分类名称">
                <el-input v-model="sizeForm.name" placeholder="盘点分类名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="包装数量">
                <el-input v-model="sizeForm.name" placeholder="包装数量"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="净重">
                <el-input v-model="sizeForm.name" placeholder="净重"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="毛重">
                <el-input v-model="sizeForm.name" placeholder="毛重"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="理论重量">
                <el-input v-model="sizeForm.name" placeholder="理论重量"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="临近天数">
                <el-input v-model="sizeForm.name" placeholder="临近天数"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="69码">
                <el-input v-model="sizeForm.name" placeholder="69码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button type="primary">关闭</el-button>
          </el-form-item>
            </el-col>
          </el-row>





        </el-form>
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
        outerVisible: true
      };
    }
  };

</script>

<style lang="scss" scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

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
    margin: 3px;
  }

</style>
