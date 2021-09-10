import {} from 'moment';
import { request, AxiosRequestConfig } from 'utils/axios';

/**
 * 用户登录
 * @param data
 * @returns
 */
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

/**
 * 获取某月课表
 */
export const getCalendars = <R = {}>(data: {
  beginTime: string;
  endTime: string;
}) =>
  request<R>({
    method: 'post',
    url: '/lumi/desktop/v1/live/calendar',
    data,
  });

/**
 * 获取某天的课表
 */
export const getDayCourses = <R = {}>({
  flag = -1,
  ...data
}: {
  beginTime: string;
  endTime: string;
  flag?: number;
}) =>
  request<R>({
    method: 'post',
    url: '/lumi/desktop/v1/live/calendar/search',
    data: { ...data, flag },
  });
