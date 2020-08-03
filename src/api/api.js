

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
    getParameterList
}

