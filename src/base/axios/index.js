import axios from 'axios';
import { Message, Loading } from 'element-ui';
import qs from 'qs';
import Cookies from "js-cookie";

const METHODS = ['get', 'delete'];
const BODY_METHODS = ['post', 'put', 'patch'];
const http = {};

axios.defaults.timeout = 2000

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if ( response.data.code === -1 ) {
        handleError(response);
        return Promise.reject(response.data.msg);
      } else if(response.data.code === -2){
        Message({
          type: 'error',
          message:'你当前没有这个权限哦'
        });
        window.location.href = '/';
      }
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
   error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 405:
          Message({
            type: 'error',
            message:'当前登录已失效，请重新登录'
          });
          window.location.href = '/#/login';
          break
        default:
            Message({
              type: 'error',
              message:error.response.data.msg
            });
      }
      return Promise.reject(error.response)
    }
  }
)

function handleError(res) {
  Message({
    type: 'error',
    message: res.data
      ? res.data.message || res.data.msg || '系统错误'
      : '未知错误！'
  });
}
function init() {
  for (let method of METHODS) {
    http[method] = ({ url, data, headers, dataType, ...options }) => {
      let __data = data;
      let __headers = headers || {};

      if (dataType === 'form') {
        __data = qs.stringify(data);
        __headers = Object.assign(__headers, {
          'content-type': 'application/x-www-form-urlencoded'
        });
      }

      return request(method, url, __data, __headers, options);
    };
  }

  for (let method of BODY_METHODS) {
    http[method] = ({ url, data, headers, dataType, ...options }) => {
      let __data = data;
      let __headers = headers || {};

      if (dataType === 'form') {
        __data = qs.stringify(data);
        __headers = Object.assign(__headers, {
          'content-type': 'application/x-www-form-urlencoded'
        });
      }

      if (dataType === 'file') {
        __data = new FormData();

        __data.append('file', data);
        __headers = Object.assign(__headers, {
          'content-type': 'multipart/form-data'
        });
      }

      return requestWithBody(method, url, __data, __headers, options);
    };
  }

  return http;
}

function createPlugin() { 
  return {
    install: Vue => {
      Object.defineProperty(Vue.prototype, '$axios', {
        get() {
          return init();
        }
      });
    }
  };
}

export const createAxiosPlugin = createPlugin;
export default init();
