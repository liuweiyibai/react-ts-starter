import { FC, lazy } from 'react';
import { PartialRouteObject } from 'react-router';
import { useRoutes } from 'react-router-dom';
import Home from 'pages/home';
import Login from 'pages/login';
import NoMatchPage from 'pages/404';
import BasicLayout from 'layout/BasicLayout';
import WrapperRouteComponent from './config';

const Dashboard = lazy(() => import('pages/dashboard'));

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
        path: '/dashboard',
        element: (
          <WrapperRouteComponent
            element={<Dashboard />}
            titleId="title.dashboard"
          />
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
];

const RenderRouter: FC = () => {
  return useRoutes(routeList);
};

export default RenderRouter;
