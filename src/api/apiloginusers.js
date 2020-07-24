import request from '@/api/request.js'

export  function UserLogin(userInfo){
    return request({
        url:'user/userlogin',
        method:'post',
        data:userInfo
    })
}

export  function GetMenuListByUserRuleID(userInfo){
    return request({
        url:'Menu/GetT_UserMenuListByRuleIdAsync',
        method:'post',
        data:userInfo
    })
}

