<template>
  <div class="layout">
    <el-row>
      <el-card ref="refForm" type="flex">
        <el-form :model="queryParam" size="small " @keyup.enter.native="getModelListPage">
          <el-row>
            <el-col :span="4">
              <el-form-item label-width label>
                <el-input v-model="queryParam.Erpvoucherno" placeholder="ERP单号" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width label>
                <el-input v-model="queryParam.Materialdoc" placeholder="凭证号" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label-width label>
                <el-input v-model="queryParam.Towarehouseno" placeholder="仓库" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label-width label>
                <el-input v-model="queryParam.GUID" placeholder="GUID" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-select
                  style="width:100%"
                  v-model="queryParam.Vouchertype"
                  clearable
                  placeholder="单据名称"
                >
                  <el-option
                    v-for="item in voucherTyleListAll"
                    :key="item.Parameterid"
                    :label="item.Parametername"
                    :value="item.Parameterid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-select
                  style="width:100%"
                  v-model="queryParam.Poststatus"
                  clearable
                  placeholder="过账状态"
                >
                  <el-option
                    v-for="item in postStatusListAll"
                    :key="item.Parameterid"
                    :label="item.Parametername"
                    :value="item.Parameterid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Materialno"
                  placeholder="物料编码"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label>
                <el-input
                  v-model="queryParam.Batchno"
                  placeholder="批次"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label-width="0">
                <el-button icon="el-icon-search" type="primary" @click="getModelListPage">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-row>
    <el-row>
      <el-card ref="refButton" body-style="padding:10px;" type="flex">
        <el-row>
          <el-col :span="2"></el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row type="flex" class="layout" body-style="padding:2px;">
      <el-main class="layout-main">
        <el-container class="layout-main-container">
          <el-table
            border
            :data="Data"
            :header-cell-style="{ padding: '2px', background: '#f6f6f6' }"
            v-loading="loading"
            :cell-style="{ padding: '2px' }"
            style="width: 100%;"
            height="auto"
            class="layout-table"
          >
            <template v-for="item in columns">
              <el-table-column
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                v-if="item.colvisible"
                show-overflow-tooltip
              ></el-table-column>
            </template>
          </el-table>

          <pagination
            :total="PageData.totalCount"
            :fpage-size.sync="PageData.pageSize"
            :fcurrent-page.sync="PageData.currentPage"
            @pagination="getModelList"
          />
        </el-container>
      </el-main>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/layout.scss";
</style>

<script>
import { ALFModelListMixins } from "@/mixins/ALFModelListMixins";
import Pagination from "@/components/Pagination";
import { getParameterList } from "@/api/api";

export default {
  name: "materialdoc-mdoclist",
  mixins: [ALFModelListMixins],
  components: {
    Pagination
  },
  data() {
    return {
      queryParam: {
        Erpvoucherno: "",
        Materialdoc: "",
        GUID: "",
        Towarehouseno: "",
        Vouchertype: "",
        Poststatus: "",
        Materialno:"",
        Batchno:""
      },
      splace: "",
      voucherTyleListAll: [],
      postStatusListAll: [],
      outerVisible: false,
      idshow: false,
      apiUrl: {
        query: "/MaterialDoc/GetV_MaterialDocListByPage",
        save: "",
        update: ""
      },
      columns: [
        {
          label: "据点",
          prop: "Strongholdcode",
          colvisible: true,
          width: 60
        },
        {
          label: "仓库",
          prop: "Towarehouseno",
          colvisible: true,
          width: 60
        },
        {
          label: "单据名称",
          prop: "StrVoucherType",
          colvisible: true,
          width: 120
        },
        {
          label: "ERP单号",
          prop: "Erpvoucherno",
          colvisible: true,
          width: 200
        },
        {
          label: "行号",
          prop: "Rowno",
          colvisible: true,
          width: 80
        },
        {
          label: "物料号",
          prop: "Materialno",
          colvisible: true,
          width: 120
        },
        {
          label: "物料描述",
          prop: "Materialdesc",
          colvisible: true,
          width: 260
        },
        // {
        //   label: "客户料号",
        //   prop: "Cusmaterialno",
        //   colvisible: true
        // },
        {
          label: "批号",
          prop: "Batchno",
          colvisible: true,
          width: 100
        },
        {
          label: "凭证号",
          prop: "Materialdoc",
          colvisible: true,
          width: 200
        },
        {
          label: "数量",
          prop: "Qty",
          colvisible: true,
          width: 60
        },
        {
          label: "状态",
          prop: "StrPostStatus",
          colvisible: true,
          width: 60
        },
        {
          label: "GUID",
          prop: "Guid",
          colvisible: true,
          width: 300
        },
        {
          label: "错误信息",
          prop: "Errormsg",
          colvisible: true,
          width: 300
        },
        {
          label: "过账人",
          prop: "Creater",
          colvisible: true,
          width: 100
        },
        {
          label: "过账时间",
          prop: "Createtime",
          colvisible: true,
          width: 200
        }
      ]
    };
  },
  methods: {
    getParameterList() {
      // queryParam.Groupname = "VoucherRec_Type"
      let type = "VoucherAll_Type";
      getParameterList({ Groupname: type }).then(res => {
        if (res.Result === 1) {
          // this.ruleListSelect = res.Data.map(item=>item.Ruleid)
          this.voucherTyleListAll = res.Data;
        }
      });

      getParameterList({ Groupname: "PostStatus_Type" }).then(res => {
        if (res.Result === 1) {
          // this.ruleListSelect = res.Data.map(item=>item.Ruleid)
          this.postStatusListAll = res.Data;
        }
      });
    }
  },
  created() {
    this.getParameterList();
  }
};
</script>

<style lang="scss" scoped>
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
  margin: 10px;
}
</style>
