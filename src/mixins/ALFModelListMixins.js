import {
  postAction
} from "@/api/manage";
import Vue from "vue";
import { USER_NAME,USER_INFO } from "@/store/mutation-types";
export const ALFModelListMixins = {
  data() {
    return {
      /*提交后台请求参数*/
      //   pageReuquest: {
      //     PageNumber: 0,
      //     PageSize: 0,
      //     FilterGroup: {}
      //   },
      /**分页参数 */
      PageData: {
        currentPage: 1,
        /**当前页数 */
        pageSize: 10,
        /**每页记录数 */
        totalPages: 0,
        /**总页数 */
        totalCount: 0
        /**总记录数 */
      },
      /*查询条件*/
      queryParam: {},
      Operate:{},
      /*后台返回数据 */
      Data: [],
      /**table查询加载 */
      loading: false,
      /**构造查询字段 */
      //   Rules: [],
      /**包含查询字段，可以嵌套字段查询 类似(m => m.userno =="1001" || m.username=="admin" && m.id==2 */
      //   FilterGroup: {}

      exportList:[]
    };
  },
  methods: {
    getModelListPage(){
      this.PageData.currentPage=1;
      this.getModelList();

    },
    /**查询 */
    getModelList() {
      if (!this.apiUrl.query) {
        this.$message({
          message: "请先配置查询url",
          type: "warning"
        });
        return;
      }
     
      var params = this.getQueryParams();

      this.loading = true;
    debugger;
      postAction(this.apiUrl.query, params)
        .then(res => {
     
          if (res.Result === 1) {
    
            
            res.Data.forEach(t => {
              if(t.hasOwnProperty('Createtime'))
              {
                t.Createtime =t.Createtime.replace("T", " "); 
              }
        
              if(t.hasOwnProperty('Sampdate')&&t.hasOwnProperty!=null &&t.hasOwnProperty!="")
              {
                t.Sampdate =t.Sampdate.replace("T", " "); 
              }
            });
            this.Data = res.Data;
            console.log("---Data----");
            console.log(this.Data);
            this.PageData = res.PageData;
            this.loading = false;
            
          } else {
            this.loading = false;
            this.$message({
              message: res.ResultValue,
              type: "warning"
            });
            this.Data=[];
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error("查询失败：" + error.ResultValue);
        });
    },
    getQueryParams() {
     
      let pageReuquest = {};
      let FilterGroup = {};      
      let arrRoles = this.getQueryField(this.queryParam);
      if (arrRoles.length > 0) {
        FilterGroup.Rules = arrRoles;
        pageReuquest.FilterGroup = FilterGroup;
      }
      pageReuquest.PageNumber = this.PageData.currentPage;
      pageReuquest.PageSize = this.PageData.pageSize;
      return pageReuquest;
    },
    getQueryField(queryParam) {      
      let Rules = [];
  debugger;
      let objKeys = Object.keys(queryParam);
      let OperateLike =  Object.keys(this.Operate);
      let userInfo =Vue.ls.get(USER_INFO);
      let modelListWarehouse = userInfo.modelListWarehouse;
      
      var Towarehouseno="";
      console.log(modelListWarehouse);
      for (let [index,key] of objKeys.entries()) {
    
        if (
          queryParam[key] !== null &&
          queryParam[key] !== undefined &&
          queryParam[key] !== ""
        ) {
        
          var Operates =3;
          for(let [LikeIndex,LikeKey] of OperateLike.entries())
          {
           
            if(LikeKey==key)
            {
              Operates=this.Operate[LikeKey]
              break;
            }
          }
          if(key=="Towarehouseno" || key=="Warehouseno")
          {
          
            let Warehouse =modelListWarehouse.map(t=>t.Warehouseno);
            let indexs = Warehouse.indexOf(queryParam[key]+'');
            if(indexs<0)
            {
              this.$message({
                message: "您没有此仓库权限！",
                type: "warning"
              });
              return;
              queryParam[key]='';
            }
           
            
          }
          if (key !== "Createtime" &&key !== "Postdate") {
            Rules.push({
              Field: key,
              Value: queryParam[key]+'',
              Operate: Operates

            });
          } else{
            let disArr = Array.from(queryParam[key]);
            for (let j = 0, len = disArr.length; j < len; j++) {
             debugger;
              if (j === 0) {
                Rules.push({
                  Field: key,
                  Value: queryParam[key][j]+'T00:00:00',
                  Operate: 8
                });
              } else {
                Rules.push({
                  Field: key,
                  Value: queryParam[key][j]+'T23:59:59',
                  Operate: 6
                });
              }
            }
          }
        }else
        {
         
          if(key=="Towarehouseno" || key=="Warehouseno")
          {
            Towarehouseno = modelListWarehouse.map(t=>t.Warehouseno).join(',');
            Rules.push({
              Field: key,
              Value: Towarehouseno+'',
              Operate: 3

            });
          }
        }
      }
      console.log(Rules)
      return Rules;
    },
    /**按钮区域新增,初始化dialog */
    handleAdd: function () {
      this.$refs.dialogForm.add();
      this.$refs.dialogForm.title = "新增";
    },
    handleEdit: function (record) {
      this.$refs.dialogForm.edit(record);
      this.$refs.dialogForm.title = "编辑";
      this.$refs.dialogForm.disabled = true;
    },
    handleDelete: function (record) {
      if (!this.apiUrl.delete) {
        this.$message.error("请先配置删除URL");
        return;
      }
      delete record.Createtime; 
      postAction(this.apiUrl.delete, record)
        .then(res => {
          if (res.Result === 1) {
            this.getModelList();
            this.$message({
              message: res.ResultValue,
              type: "success"
            });
          } else {
            this.$message({
              message: res.ResultValue,
              type: "warning"
            });
          }
        })
        .catch(error => {
          this.$message.error("删除失败：" + error.ResultValue);
        });
    },
    handleGrant: function (record) {
      this.$refs.drawerForm.grant(record);
    },
    handleExportXls() {
      if (!this.apiUrl.exportXls) {
        this.$message.error("请先配置导出URL");
        return;
      }
      debugger;
      var params = this.getQueryParams();
      postAction(this.apiUrl.exportXls, params)
        .then(res => {
          debugger
          if (res.Result === 1) {
            this.exportList = res.Data;
          } else {
            this.$message({
              message: res.ResultValue,
              type: "warning"
            });
          }
          this.exportToExcel();
        })
        .catch(error => {
          this.$message.error("查询失败：" + error.ResultValue);
        });
       
    },
    exportToExcel() {
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("exportexcel/Export2Excel");

        const xlsdata = this.formatJson(this.filterVal, this.exportList);
        console.log(this.exportList)

        export_json_to_excel(this.tHeader, xlsdata, this.xlsname);

      });      
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
