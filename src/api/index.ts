import { request, AxiosRequestConfig } from 'utils/axios';

export const userLogin = <R = {}>(data: any) => {
  const params: AxiosRequestConfig = {
    url: '/user/login',
    method: 'post',
    data,
  };
  return request<R>(params);
};

export const getMe = <R = {}>() => request<R>({ url: '/user/me', params: {} });
