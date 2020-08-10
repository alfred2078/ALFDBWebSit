
import {constantRouterMap } from '@/router/index'

const menuuser = {
    state:{
        isCollap:false,
        routers:constantRouterMap,
        addRouters:[]//父级路由+从后台取的子路由
    },
    mutations:{
        increment : state =>  {
            // 变更状态
            debugger;
            state.isCollap=!state.isCollap;
           // Vue.set(state,'isCollap',!state.isCollap)
          },
        SET_ROUTERS:(state,data)=>{               
            state.addRouters = data
            state.routers = constantRouterMap.concat(data)
        }
    },
    actions:{
        toggleCollapse ({ commit }) {
            commit('increment')
          },
        UpdateRouter({commit},routes){            
            return new Promise(resolve =>{                
                let routelist = routes.constRoute;                
                commit('SET_ROUTERS',routelist)
                resolve()
            })
        }
    }
}

export default menuuser;