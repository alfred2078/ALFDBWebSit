import axios from "axios";

const service = new axios.create({
  // baseURL: "http://192.168.88.108:8080/api",
  baseURL: "https://localhost:44394/api",
  // baseURL: "http://wms.yinlun.cn:7002/api",
  // baseURL: "http://192.168.88.27:5001/api",
  timeout: 50000,
  withCredentials: false, 
  headers: {
    "Content-Type": "application/json"
  }
});

const err = error => {  
  if (error && error.response) {    
    let data = error.response.data;    
    console.log("------异常响应------", error.response.status);
    switch (error.response.status) {
      case 403:
        // notification.error({
        //   message: "系统提示",
        //   description: "拒绝访问",
        //   duration: 4
        // });
        break;
      case 500:
        
        break;
      case 404:
        
        break;
      case 504:
        
        break;
      case 401:
        
        break;
      default:
        
        break;
    }
  }
  else{
    error.ResultValue = "请检查网络连接"
  }
  return Promise.reject(error);
};

service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
    // }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(response => {
  return response.data;
}, err);

export default service;
