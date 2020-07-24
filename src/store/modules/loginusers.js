import Vue from "vue";
import { UserLogin, GetMenuListByUserRuleID } from "@/api/apiloginusers";
import { ACCESS_TOKEN, USER_NAME, USER_INFO } from "@/store/mutation-types";

const loginusers = {
  state: {
    token: "",
    userinfo: {},
    listmenu: []
  },

  mutations: {
    SET_PERMISSIONLIST: (state, listmenu) => {
      state.listmenu = listmenu;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERINFO: (state, userinfo) => {
      state.userinfo = userinfo;
    }
  },

  actions: {
    GetMenuListByUser({ commit }) {
      return new Promise((resolve, reject) => {
      //   const listmenu= [
      //     {
      //         "Id": 1,
      //         "Menuno": "1001",
      //         "title": "首页",
      //         "Menutype": 1,
      //         "path": "/dashboard/dashmain",
      //         "component": "dashboard/DashMainExp",
      //         "icon": null,
      //         "Nodelevel": "1",
      //         "Nodesort": "1",
      //         "Parentid": 1,
      //         "name": "dashboard-dashmain",
      //         "children": null,
      //         "meta": {
      //             "Id": 1,
      //             "keepalive": false,
      //             "internalOrExternal": false,
      //             "title": "首页",
      //             "icon": null
      //         }
      //     },
      //     {
      //         "Id": 2,
      //         "Menuno": "1002",
      //         "title": "系统管理",
      //         "Menutype": 1,
      //         "path": "/systemset",
      //         "component": "layouts/RouteView",
      //         "icon": null,
      //         "Nodelevel": "1",
      //         "Nodesort": "2",
      //         "Parentid": 2,
      //         "name": "systemset",
      //         "children": [
      //             {
      //                 "Id": 3,
      //                 "path": "/systemset/user",
      //                 "component": "systemset/UserList",
      //                 "name": "systemset-user",
      //                 "icon": null,
      //                 "title": "用户管理",
      //                 "meta": {
      //                     "Id": 3,
      //                     "keepalive": false,
      //                     "internalOrExternal": false,
      //                     "title": "用户管理",
      //                     "icon": null
      //                 }
      //             },
      //             {
      //                 "Id": 4,
      //                 "path": "/systemset/role",
      //                 "component": "systemset/RoleList",
      //                 "name": "systemset-role",
      //                 "icon": null,
      //                 "title": "角色管理",
      //                 "meta": {
      //                     "Id": 4,
      //                     "keepalive": false,
      //                     "internalOrExternal": false,
      //                     "title": "角色管理",
      //                     "icon": null
      //                 }
      //             }
      //         ],
      //         "meta": {
      //             "Id": 2,
      //             "keepalive": false,
      //             "internalOrExternal": false,
      //             "title": "系统管理",
      //             "icon": null
      //         }
      //     },
      //     {
      //         "Id": 5,
      //         "Menuno": "1005",
      //         "title": "基础数据",
      //         "Menutype": 1,
      //         "path": "/databaseset",
      //         "component": "layouts/RouteView",
      //         "icon": null,
      //         "Nodelevel": "1",
      //         "Nodesort": "3",
      //         "Parentid": 5,
      //         "name": "databaseset",
      //         "children": [
      //             {
      //                 "Id": 6,
      //                 "path": "/databaseset/warehouse",
      //                 "component": "databaseset/WarehouseList",
      //                 "name": "database-warehouse",
      //                 "icon": null,
      //                 "title": "仓库管理",
      //                 "meta": {
      //                     "Id": 6,
      //                     "keepalive": false,
      //                     "internalOrExternal": false,
      //                     "title": "仓库管理",
      //                     "icon": null
      //                 }
      //             },
      //             {
      //                 "Id": 7,
      //                 "path": "/databaseset/house",
      //                 "component": "databaseset/HouseList",
      //                 "name": "databaseset-house",
      //                 "icon": null,
      //                 "title": "库区管理",
      //                 "meta": {
      //                     "Id": 7,
      //                     "keepalive": false,
      //                     "internalOrExternal": false,
      //                     "title": "库区管理",
      //                     "icon": null
      //                 }
      //             },
      //             {
      //                 "Id": 8,
      //                 "path": "/databaseset/area",
      //                 "component": "databaseset/AreaList",
      //                 "name": "databaseset-area",
      //                 "icon": null,
      //                 "title": "库位管理",
      //                 "meta": {
      //                     "Id": 8,
      //                     "keepalive": false,
      //                     "internalOrExternal": false,
      //                     "title": "库位管理",
      //                     "icon": null
      //                 }
      //             }
      //         ],
      //         "meta": {
      //             "Id": 5,
      //             "keepalive": false,
      //             "internalOrExternal": false,
      //             "title": "基础数据",
      //             "icon": null
      //         }
      //     },
      //     {
      //         "Id": 9,
      //         "Menuno": "1009",
      //         "title": "库内报表",
      //         "Menutype": 1,
      //         "path": "/stockreport",
      //         "component": "layouts/RouteView",
      //         "icon": null,
      //         "Nodelevel": "1",
      //         "Nodesort": "4",
      //         "Parentid": 9,
      //         "name": "stockreport",
      //         "children": [
      //             {
      //                 "Id": 10,
      //                 "path": "/stockreport/stockdetail",
      //                 "component": "stockreport/StockDetail",
      //                 "name": "stockreport-stockdetail",
      //                 "icon": null,
      //                 "title": "库存明细",
      //                 "meta": {
      //                     "Id": 10,
      //                     "keepalive": false,
      //                     "internalOrExternal": false,
      //                     "title": "库存明细",
      //                     "icon": null
      //                 }
      //             }
      //         ],
      //         "meta": {
      //             "Id": 9,
      //             "keepalive": false,
      //             "internalOrExternal": false,
      //             "title": "库内报表",
      //             "icon": null
      //         }
      //     },
      //     {
      //         "Id": 11,
      //         "Menuno": "1011",
      //         "title": "凭证管理",
      //         "Menutype": 1,
      //         "path": "/materialdoc",
      //         "component": "layouts/RouteView",
      //         "icon": null,
      //         "Nodelevel": "1",
      //         "Nodesort": "5",
      //         "Parentid": 11,
      //         "name": "materialdoc",
      //         "children": [
      //             {
      //                 "Id": 12,
      //                 "path": "/materialdoc/sapdoc",
      //                 "component": "materialdoc/MaterialdocList",
      //                 "name": "materialdoc-mdoclist",
      //                 "icon": null,
      //                 "title": "凭证管理",
      //                 "meta": {
      //                     "Id": 12,
      //                     "keepalive": false,
      //                     "internalOrExternal": false,
      //                     "title": "凭证管理",
      //                     "icon": null
      //                 }
      //             }
      //         ],
      //         "meta": {
      //             "Id": 11,
      //             "keepalive": false,
      //             "internalOrExternal": false,
      //             "title": "凭证管理",
      //             "icon": null
      //         }
      //     }
      // ]
      // commit("SET_PERMISSIONLIST", listmenu); 
      // resolve(listmenu);  
        

       let userinfo =  Vue.ls.get(USER_INFO);
       userinfo.Pcorpda = 1;
        GetMenuListByUserRuleID(userinfo)
          .then(response => {            
            if (response.Result === 1) {              
              const listmenu = response.Data; 
              console.log(listmenu)             
              commit("SET_PERMISSIONLIST", listmenu);              
              resolve(listmenu);
            } else {
              reject(listmenu);
            }
          })
          .catch(error => {
            reject(error);
          });
       });
    },
    UserLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        UserLogin(userInfo)
          .then(response => {
            if (response.Result === 1) {
              // Vue.ls.set(ACCESS_TOKEN, "");
              const userInfo = response.Data;
              Vue.ls.set(USER_NAME, userInfo.Username, 7 * 24 * 60 * 60 * 1000);
              Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000);
              commit("SET_USERINFO", userInfo);
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default loginusers;
