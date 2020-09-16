<template>
  <div class="layout">
    <el-row>
      <el-card ref="refForm" type="flex">
        <el-form :model="queryParam" size="small " @keyup.enter.native="getModelListPage">
          <el-row>
            <el-col :span="5">
              <el-form-item label>
                <el-input v-model="queryParam.Materialno" placeholder="物料编码" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label>
                <el-input v-model="queryParam.Materialdesc" placeholder="物料名称" clearable></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="5">
          <el-form-item label="规格型号">
            <el-input v-model="sizeForm.name" placeholder="规格型号"></el-input>
          </el-form-item>
            </el-col>-->
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
                <el-button icon="el-icon-search" type="primary" @click="getModelListPage">查询</el-button>
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
          </el-row>-->
        </el-form>
      </el-card>
    </el-row>
    <el-row>
      <el-card ref="refButton" body-style="padding:10px;" type="flex">
        <el-col :span="2">
          <!--  <el-button @click="newAdd" size="small " icon="el-icon-download" type="primary">导出</el-button> -->
        </el-col>
      </el-card>
    </el-row>
    <el-row type="flex" class="layout" body-style="padding:2px;">
      <el-main class="layout-main">
        <el-container class="layout-main-container">
          <el-table
            :data="Data"
            :row-style="{height:'30'}"
            :cell-style="{padding:'2px'}"
            :header-row-style="{height:'30'}"
            :header-cell-style="{padding:'2px',background:'#f6f6f6'}"
            border
            :fit="true"
            style="width: 100%;"
            height="auto"
            class="layout-table"
            ref="table"
          >
            <el-table-column
              prop="Strongholdcode"
              label="据点编号"
              width="120"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="Strongholdname"
              label="据点名称"
              width="120"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="Materialno"
              label="物料编码"
              width="120"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="Materialdesc"
              label="物料名称"
              width="150"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column prop="Spec" label="规格型号" width="150" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="Unit" label="库存单位" width="120"></el-table-column>
            <el-table-column prop="Packqty" label="包装数量" width="120"></el-table-column>
            <el-table-column
              prop="Maintypecode"
              label="产品分类码"
              width="120"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="Maintypename"
              label="产品分类名称"
              width="150"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column prop="Qualityday" label="保质期(天)" width="120"></el-table-column>
            <el-table-column prop="Qualitymon" label="保质期(月)" width="120"></el-table-column>
            <el-table-column prop="ImpDay" label="临期天数" width="120"></el-table-column>
            <el-table-column
              prop="Checktypecode"
              label="盘点分类"
              width="120"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="Checktypename"
              label="盘点分类名称"
              width="150"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="Createtime"
              label="创建日期"
              width="150"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
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
    <el-dialog
      title="物料管理---编辑"
      :show-close="true"
      :visible.sync="outerVisible"
      width="75%"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-button size="small" type="primary" @click="AddRow">新增69码</el-button>
      <el-button size="small" type="primary" @click="SaveMaterialPack">保存</el-button>

      <div
        :style="{          
          border: '1px solid #e9e9e9',
          padding: '5px 10px',
          background: '#fff'
        }"
      >
        <el-table
          :data="materialPackData"
          border
          :row-style="{ height: '30' }"
          :cell-style="{ padding: '2px' }"
          :header-row-style="{ height: '30', font: 'normal' }"
          :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
          style="width: 100%"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column
            prop="Strongholdcode"
            label="据点编号"
            width="120"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="Strongholdname"
            label="据点名称"
            width="120"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="Materialno" label="物料编码" width="120" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            prop="Materialdesc"
            label="物料名称"
            width="120"
            :show-overflow-tooltip="true"
          ></el-table-column>

          <el-table-column label="外69码" width="220">
            <template slot-scope="scope">
              <el-input
                v-show="doubleclick==scope.$index+1"
                placeholder="请输入内容"
                v-model.number="scope.row.OuterWatercode"
                size="mini"
                width="220"
                clearable
              ></el-input>
              <span v-show="doubleclick!=scope.$index+1">{{scope.row.OuterWatercode}}</span>
            </template>
          </el-table-column>

          <el-table-column label="69码" width="220">
            <template slot-scope="scope">
              <el-input
                v-show="doubleclick==scope.$index+1"
                placeholder="请输入内容"
                v-model.number="scope.row.Watercode"
                size="mini"
                width="220"
                clearable
              ></el-input>
              <span v-show="doubleclick!=scope.$index+1">{{scope.row.Watercode}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width>
            <template slot-scope="scope">
              <el-popconfirm title="确定删除吗" @onConfirm="deleteClick(scope.row)">
                <el-button slot="reference" type="text" size="small">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
@import "@/styles/layout.scss";
</style>

<script>
import { ALFModelListMixins } from "@/mixins/ALFModelListMixins";
import Pagination from "@/components/Pagination";
import {
  getMaterialPack,
  saveMaterialPack,
  deleteMaterialPack
} from "@/api/api";
import { USER_NAME } from "@/store/mutation-types";
import Vue from "vue";
export default {
  name: "Materia",
  mixins: [ALFModelListMixins],
  components: {
    Pagination
  },
  data() {
    return {
      sizeForm: {
        name: ""
      },
      screenHeight: null,
      queryParam: {
        Materialno: "",
        Materialdesc: "",
        Createtime: ""
      },
      Operate: { Materialno: 9,Materialdesc:9 },
      apiUrl: {
        query: "/Material/GetT_MaterialListByPage"
      },

      outerVisible: false,
      materialPackData: [],
      materialModel: {},
      doubleclick: null, // 记录当前编辑行序号
      addList: []
    };
  },
  mounted() {},
  methods: {
    handleClick(val) {
      var min = this;
      min.outerVisible = true;
      min.materialModel = val;
      getMaterialPack(val).then(res => {
        if (res.Result == 1) {
          min.doubleclick = null;
          min.materialPackData = res.Data;
          console.log(min.materialPackData);
        } else {
          min.$message.error(res.ResultValue);
        }
      });
    },
    AddRow() {
      debugger;
      var min = this;
      if (
        min.materialPackData.length != 0 &&
        min.materialPackData[min.materialPackData.length - 1].Watercode == ""
      ) {
        min.$message({
          message: "请输入上一行的69码",
          type: "warning"
        });
        return;
      }
      var addmodel = {};
      addmodel.Strongholdcode = min.materialModel.Strongholdcode;
      addmodel.Strongholdname = min.materialModel.Strongholdname;
      addmodel.Materialno = min.materialModel.Materialno;
      addmodel.Materialdesc = min.materialModel.Materialdesc;
      addmodel.Headerid = min.materialModel.Id;
      addmodel.OuterWatercode = "";
      addmodel.Watercode = "";
      min.materialPackData.push(addmodel); //模态所有的数据
      min.addList.push(addmodel); //仅限用户此模态新增
      min.doubleclick = min.materialPackData.length;
    },
    SaveMaterialPack() {
      var min = this;
      var aData = new Date();
      debugger;
      min.addList.forEach(t => {
        t.Creater = Vue.ls.get(USER_NAME);
        t.Createtime = aData;
        t.Watercode =
          t.Watercode == null || t.Watercode == "" ? null : t.Watercode + "";
        t.OuterWatercode = t.OuterWatercode =
          null || t.OuterWatercode == "" ? null : t.OuterWatercode + "";
      });
      //判断当前页面是否输入了重复的69码
      var find = false;
      for (var i = 0; i < min.materialPackData.length; i++) {
        for (var j = i + 1; j < min.materialPackData.length; j++) {
          if (
            min.materialPackData[i].Watercode ==
            min.materialPackData[j].Watercode
          ) {
            find = true;
            break;
          }
        }
        if (find) break;
      }
      if (find) {
        min.$message({
          message: "页面输入了重复的69码",
          type: "warning"
        });
        return;
      }

      //只提交用户新增的
      saveMaterialPack(min.addList).then(res => {
        if (res.Result == 1) {
          min.$message({
            message: "保存成功",
            type: "success"
          });
          min.doubleclick = null;
          min.addList = [];
        } else {
          min.$message.error(res.ResultValue);
        }
      });
    },
    deleteClick(val) {
      var min = this;
      deleteMaterialPack(val).then(res => {
        if (res.Result == 1) {
          min.$message({
            message: "删除成功",
            type: "success"
          });
          min.handleClick(val);
        } else {
          min.$message.error(res.ResultValue);
        }
      });
    },
    //重置按钮
    reset() {
      var min = this;
      min.queryParam = {
        Materialno: "",
        Materialdescen: "",
        Createtime: ""
      };
    },
    //模态关闭
    handleClose(done) {
      this.addList = [];
      done();
    }
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
  margin: 3px;
}

</style>
