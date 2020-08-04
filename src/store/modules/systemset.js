/*系统参数的设置*/
import { SYS_LANGUAGE } from "@/store/mutation-types";
import Vue from 'vue'
import Cookies from 'js-cookie'

const systemset = {
    state: {
        language: '',
        Erpvoucherno:''
    },
    actions: {
        getLange({ commit }, language) { 
            Cookies.set(SYS_LANGUAGE,language)
            commit("SET_LANGUAGE", language);
        },
        getErpvoucherno ({ commit },Erpvoucherno) { 
            debugger;
            commit('Erpvoucherno',Erpvoucherno)
          },
    },
    mutations: {
        SET_LANGUAGE: (state, language) => {
            
            state.language = language
        },
        Erpvoucherno : (state,Erpvoucherno) =>  {
            debugger;
            state.Erpvoucherno=Erpvoucherno
           
          }
    }
}

export default systemset