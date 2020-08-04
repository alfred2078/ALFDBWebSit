

const getters = {
    listmenu:(state)=> state.loginusers.listmenu,    
    addRouters:(state) => state.menuuser.addRouters,
    isCollap:(state) => state.menuuser.isCollap,
    Erpvoucherno:(state) => state.systemset.Erpvoucherno,
    language:(state)=>state.systemset.language
}

export default getters 