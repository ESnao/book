import axios from 'axios';
import { Message, Loading } from 'element-ui';
// import userInfoHelper from 'common/userInfo';
import qs from 'qs';
// import * as Cookies from "js-cookie";

const METHODS = ['get', 'delete'];
const BODY_METHODS = ['post', 'put', 'patch'];
const http = {};
const axiosInstance = axios.create({
  headers: {
    'content-type': 'application/json'
  }
});
// const userInfoHelper = Cookie.get('token')
let loadingInstance;
let requestQueue = 0;

axiosInstance.interceptors.request.use(function(request) {
  if (!requestQueue) {
    loadingInstance = Loading.service({
      fullscreen: true,
      background: 'rgba(0, 0, 0, .8)'
    });
  }
  requestQueue++;

  return request;
});

axiosInstance.interceptors.response.use(
  function(response) {
    requestQueue--;
    if (!requestQueue) {
      loadingInstance.close();
    }
    if (response.data.status === 405 && response.data.msg === 'UNAUTHORIZED') {
      userInfoHelper.clear();
      window.location.href = '/';
      return;
    }

    if (
      response.status !== 200 ||
      (response.data.status && response.data.status !== 200) ||
      response.data.code === -1
    ) {
      handleError(response);
      return Promise.reject(response.data.msg);
    }

    return response.data;
  },
  function(error) {
    requestQueue--;
    if (!requestQueue) {
      loadingInstance.close();
    }

    handleError(error.response);

    return Promise.reject(error);
  }
);

function handleError(res) {
  Message({
    type: 'error',
    message: res.data
      ? res.data.message || res.data.msg || '系统错误'
      : '未知错误！'
  });
}

function request(method, url, params, headers = {}, options = {}) {
  return axiosInstance.request({
    method,
    url,
    params,
    data: {},
    headers: {
      Authorization: userInfoHelper.get().accessToken,
      ...headers
    },
    ...options
  });
}

function requestWithBody(method, url, data = {}, headers = {}, options = {}) {
  return axiosInstance.request({
    method,
    url,
    data,
    headers: {
      Authorization: userInfoHelper.get().accessToken,
      ...headers
    },
    ...options
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
