import { FC, lazy, Suspense } from 'react';
import type { PartialRouteObject } from 'react-router';
import { useRoutes } from 'react-router-dom';
import Home from 'pages/home';
import Login from 'pages/login';
import NoMatchPage from 'pages/404';
import BasicLayout from 'layout/BasicLayout';
import PageLoading from 'components/PageLoading';
import WrapperRouteComponent from './config';

const Dashboard = lazy(() => import('pages/dashboard'));
const Calendar = lazy(() => import('pages/calendar'));
const LiveRoom = lazy(() => import('pages/live-room'));

const routeList: PartialRouteObject[] = [
  {
    path: 'login',
    element: <WrapperRouteComponent element={<Login />} title="用户登录" />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<BasicLayout />} title="" auth />,
    children: [
      {
        path: '',
        element: <WrapperRouteComponent element={<Home />} title="首页" />,
      },

      {
        path: '/calendar',
        element: (
          <WrapperRouteComponent element={<Calendar />} title="课程表" />
        ),
      },
      {
        path: '*',
        element: (
          <WrapperRouteComponent element={<NoMatchPage />} title="页面未找到" />
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: <WrapperRouteComponent element={<Dashboard />} title="控制台" />,
  },
  {
    path: '/live-room/:courseId',
    element: <WrapperRouteComponent element={<LiveRoom />} title="直播间" />,
  },
];

const RenderRouter: FC = () => {
  return <Suspense fallback={<PageLoading />}>{useRoutes(routeList)}</Suspense>;
};

export default RenderRouter;
