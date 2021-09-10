import axios, { AxiosRequestConfig } from 'axios';
import { message as $message } from 'antd';
import { stores } from 'store/hooks';
import { getTimeZone } from './tool';

export type { AxiosRequestConfig, Method } from 'axios';

interface AjaxResponse<T> {
  ret: number;
  result: T;
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  timeout: 6000,
  headers: {
    apiKey: 'v2',
    timeZone: getTimeZone(),
  },
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${stores.userStore.token}`;
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  resp => {
    const text = resp?.data?.msg;
    switch (resp.data?.ret) {
      case 40000:
        text && $message.warn(text);
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
