

import { postAction } from '@/api/manage'
//20200804wu01666
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
const updateUserPwd = (params)=>postAction("User/UpdateT_UserPwd",params);
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

//物料管理
const getMaterialPack =(params)=>postAction("Material/GetT_MaterialPack",params);//查询69码列表
const saveMaterialPack =(params)=>postAction("Material/SaveT_MaterialPack",params);//批量保存69码列表
const deleteMaterialPack =(params)=>postAction("Material/DeleteT_MaterialPack",params);//删除69码列表
//首页图表
const getMaterialDocPoststatuse =(params)=>postAction("MaterialDoc/GetT_MaterialDocPoststatuse",params);//首页异常未处理
const getReceiveSumQty =(params)=>postAction("ReceiveTran/GetT_ReceiveSumQty",params);//首页收货总数
const getOutStockTranSumQty =(params)=>postAction("OutStockTran/GetV_OutStockTranSumQty",params);//首页发货总数
const getQualityDetailLinestatus =(params)=>postAction("Quality/GetT_QualityDetailLinestatus",params);//首页未完成质检单
const getReceiveTranGroupByMonth =(params)=>postAction("ReceiveTran/GetT_ReceiveTranGroupByMonth",params);//首页年入库分组
const getReceiveTranGroupByWarehou =(params)=>postAction("ReceiveTran/GetT_ReceiveTranGroupByWarehou",params);//首页仓库入库分组
const getReceiveTranGroupByMaterialno =(params)=>postAction("ReceiveTran/GetT_ReceiveTranGroupByMaterialno",params);//首页统计入库前10的物料数量
const getOutStockGroupByMonth =(params)=>postAction("OutStockTran/GetT_OutStockGroupByMonth",params);//首页年出库分组
const getOutStockGroupByWarehou =(params)=>postAction("OutStockTran/GetT_OutStockGroupByWarehou",params);//首页仓库出库分组
const GetOutStockGroupByMaterialno =(params)=>postAction("OutStockTran/GetT_OutStockGroupByMaterialno",params);//首页统计出库前10的物料数量
//盘点管理
const getTCheckListByPage =(params)=>postAction("Check/GetT_CheckListByPage",params);//查询盘点
const getTCheckDetails =(params)=>postAction("Check/GetT_CheckDetails",params);//查询盘点详细
const reSaveTCheck =(params)=>postAction("Check/ReSaveT_Check",params);//新增复盘
const updateTCheckAsync =(params)=>postAction("Check/UpdateT_CheckAsync",params);//修改
const getTParameterList =(params)=>postAction("Parameter/GetT_ParameterList",params);//获取参数记录列表
//新增盘点管理
const getTCheckArea =(params)=>postAction("Check/GetT_CheckArea",params);//查询新增盘点界面
const getTCHECKERPVOUCHERNO =(params)=>postAction("Check/GetT_CHECKERPVOUCHERNO",params);//查询当前盘点单号
const getGroupTMaterial =(params)=>postAction("Check/GroupT_Material",params);//查询物料分类
const saveTCheck =(params)=>postAction("Check/SaveT_Check",params);//保存盘点单
//盈亏管理
const getTCheckAnalyze =(params)=>postAction("Check/GetT_CheckAnalyze",params);//查询盈亏
const delCloTCheck =(params)=>postAction("Check/DelCloT_Check",params);//盈亏处理


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
    UploadFile,
  getTCheckArea,
    getTCHECKERPVOUCHERNO,
    getGroupTMaterial,
    saveTCheck,
    getTCheckAnalyze,
    delCloTCheck,
    getTCheckListByPage,
    reSaveTCheck,
    getTCheckDetails,
    updateTCheckAsync,
    getTParameterList,
    getPurchasList,
    getMaterilOrderList,
    getSaleReturnOrderList,
    getOtherOrderList,
    getWorkOrderList,
    windowpost,
    getMaterialPack,
    saveMaterialPack,
    deleteMaterialPack,
    updateUserPwd,
    getMaterialDocPoststatuse,
    getReceiveSumQty,
    getOutStockTranSumQty,
    getQualityDetailLinestatus,
    getReceiveTranGroupByMonth,
    getReceiveTranGroupByWarehou,
    getReceiveTranGroupByMaterialno,
    getOutStockGroupByMonth,
    getOutStockGroupByWarehou,
    GetOutStockGroupByMaterialno
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

