import request from '@/api/request.js'

//post
export function postAction(url,pageReuquest) {   
    return request({
      url: url,
      method:'post' ,
      data: pageReuquest
    })
  }

