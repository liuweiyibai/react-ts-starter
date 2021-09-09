import axios, { AxiosRequestConfig } from 'axios';
import { message as $message } from 'antd';
import { stores } from 'store/hooks';

export type { AxiosRequestConfig, Method } from 'axios';

interface AjaxResponse<T> {
  ret: number;
  result: T;
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  resp => {
    // if (resp?.data?.message) {
    //   // $message.success(config.data.message)
    // }

    switch (resp.status) {
      case 401:
        stores.userStore.loginOutAction();
        window.location.reload();
        break;
    }
    return resp?.data;
  },
  error => {
    let errorMessage = '系统异常';
    if (error?.message?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络';
    } else {
      errorMessage = error?.message;
    }
    console.dir(error);
    error.message && $message.error(errorMessage);
    return {
      status: false,
      message: errorMessage,
      result: null,
    };
  },
);

// export interface Response<T = any> {
//   status: boolean;
//   message: string;
//   result: T;
// }

// export type MyResponse<T = any> = Promise<Response<T>>;

/**
 * 封装通用请求方法
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T = any>(params: AxiosRequestConfig) =>
  axiosInstance.request<{}, AjaxResponse<T>>(params);
