import axios, { AxiosRequestConfig } from 'axios';
import { message as $message } from 'antd';

export type { AxiosRequestConfig, Method } from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
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
  config => {
    if (config?.data?.message) {
      // $message.success(config.data.message)
    }
    return config?.data;
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

export interface Response<T = any> {
  status: boolean;
  message: string;
  result: T;
}

export type MyResponse<T = any> = Promise<Response<T>>;
/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T = any>({
  url,
  method,
  params,
  data,
}: AxiosRequestConfig) =>
  axiosInstance.request<T>({
    url,
    method,
    params,
    data,
  });
