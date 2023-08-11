import { Suspense } from 'react';
import { RouteObject } from 'react-router';
import AdminSignIn from 'src/pages/Admin/auth/AdminSignIn';

const authenticationRoutes: RouteObject[] = [
  {
    path: '',
    children: [
      {
        path: '/admin-signin',
        element: (
          <Suspense fallback={<>...</>}>
            <AdminSignIn />
          </Suspense>
        )
      }
    ]
  }
];

export default authenticationRoutes;
