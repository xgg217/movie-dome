// import axios, { AxiosResponse, AxiosRequestConfig, Method } from 'axios';

interface Data {
  code:number
  errMsg:string
  data:object
}

// export interface RequestResponse<T> {
//   code: number;
//   data: T;
//   errMsg: string;
// }

// const instance = axios.create({
//   timeout: 60000,
//   baseURL: "/"
// });

// // 添加请求拦截器
// instance.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// // 添加响应拦截器
// instance.interceptors.response.use( function(response:AxiosResponse<RequestResponse<T>>) {
//   // 对响应数据做点什么
//   const result = response.data;
//   if(result.code === 200) {
//     return result
//   }


//   return response.data;
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });

// export default instance;

// import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise,AxiosResponse } from 'axios'; // 引入axios和定义在node_modules/axios/index.ts文件里的类型声明

// const API = {
//   devApiBaseUrl: '/test/api/xxx',
//   proApiBaseUrl: '/api/xxx',
// };

// interface ResponseData {
//   code: number
//   data?: any
//   msg: string
// }


// class HttpRequest { // 定义一个接口请求类，用于创建一个axios请求实例
//   constructor(public baseUrl: string = "/") { // 这个类接收一个字符串参数，是接口请求的基本路径
//     this.baseUrl = baseUrl;
//   }
//   public request(options: AxiosRequestConfig): AxiosPromise { // 我们实际调用接口的时候调用实例的这个方法，他返回一个AxiosPromise
//     const instance: AxiosInstance = axios.create() // 这里使用axios.create方法创建一个axios实例，他是一个函数，同时这个函数包含多个属性
//     options = this.mergeConfig(options) // 合并基础路径和每个接口单独传入的配置，比如url、参数等
//     this.interceptors(instance, options.url) // 调用interceptors方法使拦截器生效
//     return instance(options) // 最后返回AxiosPromise
//   }
//   private interceptors(instance: AxiosInstance, url?: string) { // 定义这个函数用于添加全局请求和响应拦截逻辑
//     // 在这里添加请求和响应拦截
//     // 在这里添加请求和响应拦截
//     instance.interceptors.request.use((config: AxiosRequestConfig) => {
//       // 接口请求的所有配置，都在这个config对象中，他的类型是AxiosRequestConfig，你可以看到他有哪些字段
//       // 如果你要修改接口请求配置，需要修改 axios.defaults 上的字段值
//       return config
//     },
//     (error) => {
//       return Promise.reject(error)
//     })
//     instance.interceptors.response.use((res: AxiosResponse) => {
//       const { data } = res // res的类型是AxiosResponse<any>，包含六个字段，其中data是服务端返回的数据
//       const { code, msg } = data // 通常服务端会将响应状态码、提示信息、数据等放到返回的数据中
//       if (code !== 0) { // 这里我们在服务端将正确返回的状态码标为0
//         console.error(msg) // 如果不是0，则打印错误信息，我们后面讲到UI组件的时候，这里可以使用消息窗提示
//       }
//       return res // 返回数据
//     },
//     (error) => { // 这里是遇到报错的回调
//       return Promise.reject(error)
//     })
//   }
//   private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig { // 这个方法用于合并基础路径配置和接口单独配置
//     return Object.assign({ baseURL: this.baseUrl }, options);
//   }
// }
// export default HttpRequest;

// 默认利用axios的cancelToken进行防重复提交。
// 如需允许多个提交同时发出。则需要在请求配置config中增加 neverCancel 属性，并设置为true

import axios from 'axios';
// import store from '../store/index';
// import { getSessionId } from '@/utils/auth';

/* 防止重复提交，利用axios的cancelToken */
let pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken: any = axios.CancelToken;

const removePending: any = (config: any, f: any) => {
  // 获取请求的url
  const flagUrl = config.url;
  // 判断该请求是否在请求队列中
  if (pending.indexOf(flagUrl) !== -1) {
    // 如果在请求中，并存在f,f即axios提供的取消函数
    if (f) {
      f('取消重复请求'); // 执行取消操作
    } else {
      pending.splice(pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
    }
  } else {
    // 如果不存在在请求队列中，加入队列
    if (f) {
      pending.push(flagUrl);
    }
  }
};

/* 创建axios实例 */
const service = axios.create({
  timeout: 5000, // 请求超时时间
  // baseURL: process.env.BASE_URL, // 基础地址
});

/* request拦截器 */
service.interceptors.request.use((config: any) => {
  // neverCancel 配置项，允许多个请求
  if (!config.neverCancel) {
    // 生成cancelToken
    config.cancelToken = new CancelToken((c: any) => {
      removePending(config, c);
    });
  }
  // 在这里可以统一修改请求头，例如 加入 用户 token 等操作
  //   if (store.getters.sessionId) {
  //     config.headers['X-SessionId'] = getSessionId(); // 让每个请求携带token--['X-Token']为自定义key
  //   }
  return config;
}, (error: any) => {
  Promise.reject(error);
});

/* respone拦截器 */
service.interceptors.response.use(
  (response):any => {
    // 移除队列中的该请求，注意这时候没有传第二个参数f
    removePending(response.config);
    // 获取返回数据，并处理。按自己业务需求修改。下面只是个demo
    const res = response.data;
    if (res.code !== 200) {
      if (res.code === 401) {
        if (location.hash === '#/') {
          return res;
        } else {
          location.href = '/#/';
        }
      }
      return Promise.reject('error');
    } else {
      return response.data;
    }
  },
  (error: any) => {
    // 异常处理
    console.log(error)
    pending = [];
    if (error.message === '取消重复请求') {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default service;
