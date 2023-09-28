/*
 * @Copyright: 
 * @file name: File name
 * @Data: Do not edit
 * @LastEditor: 
 * @LastData: 
 * @Describe: 
 */
import rawAxios from "axios";
import Cookies from "js-cookie";
import router from "../router";
// 创建一个新的axios实例并设置请求超时为5000毫秒
const axios = rawAxios.create({
    timeout: 5000,
});

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // 在请求发送之前做些事情
    const token = Cookies.get("token");

    if (token){ 
        config.headers.Authorization = `Bearer ${token}`; // 如果token存在，将其含入Authorization头部
        
    } else { 
        router.push("/");
        console.log("错误：Cookie中不存在Token！"); // 如果不存在token，则在控制台中打印错误信息
        
    }

    return config;
  
}, function (error) {
    // 处理请求错误
    return Promise.reject(error);
});



export default axios;

