import { lazy, Suspense } from 'react';
import LoaderCenter from '../components/Loader';
import { createBrowserRouter } from 'react-router-dom';

const Users = lazy(() => import('../pages/Users'));
const Posts = lazy(() => import('../pages/Posts'));

const Router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoaderCenter />}>
        <Users />
      </Suspense>
    ),
  },
   {
    path: '/posts/:userId',
    element: (
      <Suspense fallback={<LoaderCenter />}>
        <Posts />
      </Suspense>
    ),
  },
  // {
  //   path: '*',
  //   element: (
  //     <Suspense fallback={<LoaderCenter />}>
  //       <Error404 />
  //     </Suspense>
  //   ),
  // },
]);

export default Router;