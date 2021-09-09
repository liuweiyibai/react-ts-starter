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

export const getCourseInfo = <R = {}>(courseId: string) =>
  request<R>({ url: `/lumi/desktop/v1/live/course/${courseId}` });

export const getThirdToken = <R = string>(userId: string) =>
  request<R>({
    url: '/lumi/desktop/v1/live/rooms/third/token',
    params: { userId },
  });
