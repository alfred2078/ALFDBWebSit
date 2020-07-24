<template>
  <div>
    <el-card>
      <el-form :model="sizeForm" label-width="70px" size="small ">
        <el-row>
          <el-col :span="5">
            <el-form-item label="接口名称">
              <el-input v-model="sizeForm.name" placeholder="接口名称"></el-input>
            </el-form-item>
          </el-col>
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
      </el-form>
    </el-card>

    <el-card body-style="padding:10px;">
      <el-row>
        <el-col :span="2">
          <el-dropdown>
            <el-button size="small" type="primary">
              导出<i class="el-icon-download"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>导出当前页</el-dropdown-item>
              <el-dropdown-item>导出查询结果</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown></el-col>
      </el-row>
    </el-card>
    <el-card body-style="padding:2px;">
      <el-table :row-style="{height:'30'}" :cell-style="{padding:'2px'}" :header-row-style="{height:'30'}"
        :header-cell-style="{padding:'2px',background:'#f6f6f6'}" height="350" border :data="tableData"
        style="width: 100%">
        <el-table-column sortable prop="date" label="WRS时间">
        </el-table-column>
        <el-table-column sortable prop="name" label="WRE时间">
        </el-table-column>
        <el-table-column sortable prop="date" label="ERS时间">
        </el-table-column>
        <el-table-column sortable prop="name" label="ERE时间">
        </el-table-column>
        <el-table-column prop="name" label="W接口">
        </el-table-column>
        <el-table-column prop="name" label="E接口">
        </el-table-column>
        <el-table-column sortable prop="name" label="W响应">
        </el-table-column>
        <el-table-column sortable prop="name" label="E响应">
        </el-table-column>
        <el-table-column prop="name" label="请求参数">
        </el-table-column>
        <el-table-column prop="name" label="E返回参数">
        </el-table-column>
        <el-table-column prop="name" label="异常信息">
        </el-table-column>
        <el-table-column sortable prop="address" label="创建时间"> </el-table-column>
        <el-table-column prop="name" label="用户名称">
        </el-table-column>
        <el-table-column prop="name" label="GUID">
        </el-table-column>


      </el-table>
    </el-card>

    <el-card body-style="padding:0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
        :total="0">
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
        
      };
    }
  };

</script>

<style lang="scss">


</style>
