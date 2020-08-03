

import { postAction } from '@/api/manage'
//20200802testsadsads
//基础数据模块
//仓库模块
const saveWarehouse = (params)=>postAction("Warehouse/SaveT_WarehouseAsync",params);
const updateWarehouse = (params)=>postAction("Warehouse/UpdateT_WarehouseAsync",params);
const saveHouse = (params)=>postAction("House/SaveT_HouseAsync",params);
const updateHouse = (params)=>postAction("House/UpdateT_HouseAsync",params);
const saveArea = (params)=>postAction("Area/SaveT_AreaAsync",params);
const updateArea = (params)=>postAction("Area/UpdateT_AreaAsync",params);
const getWarehouseListAll = (params)=>postAction("Warehouse/GetT_WarehouseListAll",params);
const getWarehouseListByUserID = (params)=>postAction("Warehouse/GetT_WarehouseListByUserIDAsync",params);

//角色管理
const saveRule = (params)=>postAction("Rule/SaveT_RuleAsync",params);
const updateRule = (params)=>postAction("Rule/UpdateT_RuleAsync",params);
const getMenuList = (params)=>postAction("Menu/GetT_MenuListAllAsync",params);
const getMenuListByRuleId = (params)=>postAction("Menu/GetT_MenuListByRuleIdAsync",params);
const SaveRuleMenu = (params)=>postAction("Menu/SaveT_MenuListByRuleIdAsync",params);
const getRuleListAll = (params)=>postAction("Rule/GetT_RuleListAll",params);
const getRuleListByUserID = (params)=>postAction("Rule/GetT_RuleListByUserIDAsync",params);

//用户管理
const saveUser = (params)=>postAction("User/SaveT_UserAsync",params);
const updateUser = (params)=>postAction("User/UpdateT_UserAsync",params);

//参数获取
const getParameterList = (params)=>postAction("Parameter/GetT_ParameterList",params);

//标签打印

const getPurchasList= (params)=>postAction("Purchase/GetT_PurchaseOrderListADFAsync",params); //采购入库单
const getMaterilOrderList= (params)=>postAction("Material/GetT_MaterialDetailList",params); //物料单
const getSaleReturnOrderList= (params)=>postAction("SaleReturn/GetT_SaleReturnDetailListADFAsync",params); //销退单
const getOtherOrderList= (params)=>postAction("Other/GetT_OtherHeadListADFAsync",params); //杂入单
const getWorkOrderList= (params)=>postAction("WorkOrder/GetT_WorkOrderHeadListADFAsync",params); //杂入单


const  UploadFile= (params)=>postAction("Print/InitialPrint",params); //期初打印
//const windowpost=(params,name)=>openPostWindow("http://172.19.106.230:8011/Main.aspx",params,name);//正式预览打印地址
const windowpost=(params,name)=>openPostWindow("http://localhost:34590/Main.aspx",params,name);// 本地预览打印地址
//const windowpost=(params,name)=>openPostWindow("http://172.19.106.230:8055/Main.aspx",params,name);// 用户测试预览打印地址


export{
    saveWarehouse,
    updateWarehouse,
    saveHouse,
    updateHouse,
    saveArea,
    updateArea,
    getWarehouseListAll,
    getWarehouseListByUserID,
    saveRule,
    updateRule,
    getMenuList,
    getMenuListByRuleId,
    SaveRuleMenu,
    getRuleListAll,
    getRuleListByUserID,
    saveUser,
    updateUser,
    getParameterList,
  	 getPurchasList,
    getMaterilOrderList,
    getSaleReturnOrderList,
    getOtherOrderList,
    getWorkOrderList,
    windowpost,
    UploadFile
}
//post 表单提交
function openPostWindow(url, data,name) { 
    //var winHeight = window.document.documentElement.clientHeight;
    var formStr = '<form style="visibility:hidden;" method="POST" action="' + url + '">' +
                            '<input type="hidden" name="'+name+'" value="' + encodeURI(data) + '" />' +
                            '</form>';
    var win = window.open("");
    win.document.body.innerHTML = formStr;
    win.document.forms[0].submit();
};

