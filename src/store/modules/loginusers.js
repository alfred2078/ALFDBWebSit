import Vue from "vue";
import { UserLogin, GetMenuListByUserRuleID } from "@/api/apiloginusers";
import { ACCESS_TOKEN, USER_NAME, USER_INFO ,UserLoginIs} from "@/store/mutation-types";
import VueRouter from "vue-router";

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
              debugger;
              // Vue.ls.set(ACCESS_TOKEN, "");
              const userInfo = response.Data;
              Vue.ls.set(USER_NAME, userInfo.Username, 7 * 24 * 60 * 60 * 1000);
              Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000);
              Vue.ls.set(UserLoginIs, true,7 * 24 * 60 * 60 * 1000);
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
