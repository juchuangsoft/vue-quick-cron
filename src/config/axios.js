/*
 * axios定义与配置
 */
import axios from "axios";
import ElementUI from "element-ui";

// 创建单独的axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL // api的base_url
});
// axios添加一个请求拦截器
service.interceptors.request.use(
  // 这里需要根据项目目录结构来配置
  (config) => {
    // 如果设置了路径mode则替换基础请求路径baseURL
    if (config.mode) {
      config.baseURL = process.env[config.mode];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// axios添加一个响应拦截器
service.interceptors.response.use(
  (response) => {
    // 这里需要根据接口返回结构配置
    if (response.data.code === '200') {
      return response.data;
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    // 提示
    ElementUI.Message({
      message: '接口超时,请检查网络设置',
      dangerouslyUseHTMLString: true,
      type: "error"
    });
    return Promise.reject(error);
  }
);
export default service;