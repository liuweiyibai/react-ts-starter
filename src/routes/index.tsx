import { FC, lazy, Suspense } from 'react';
import { PartialRouteObject } from 'react-router';
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
    element: (
      <WrapperRouteComponent element={<Login />} titleId="title.login" />
    ),
  },
  {
    path: '/',
    element: (
      <WrapperRouteComponent element={<BasicLayout />} titleId="" auth />
    ),
    children: [
      {
        path: '',
        element: (
          <WrapperRouteComponent element={<Home />} titleId="title.home" />
        ),
      },

      {
        path: '/calendar',
        element: (
          <WrapperRouteComponent element={<Calendar />} titleId="课程表" />
        ),
      },
      {
        path: '*',
        element: (
          <WrapperRouteComponent
            element={<NoMatchPage />}
            titleId="title.dashboard"
          />
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <WrapperRouteComponent
        element={<Dashboard />}
        titleId="title.dashboard"
      />
    ),
  },
  {
    path: '/live-room',
    element: (
      <WrapperRouteComponent element={<LiveRoom />} titleId="title.liveRoom" />
    ),
  },
];

const RenderRouter: FC = () => {
  return <Suspense fallback={<PageLoading />}>{useRoutes(routeList)}</Suspense>;
};

export default RenderRouter;
