import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router';
import AdminSignIn from 'src/pages/Admin/auth/AdminSignIn';
import ConsultantSignIn from 'src/pages/Consultant/auth/ConsultantSignIn';
import ConsultantSignUp from 'src/pages/Consultant/auth/ConsultantSignup';
import StatusComingSoon from 'src/pages/Status/ComingSoon';
import StatusMaintenance from 'src/pages/Status/Maintenance';
import Status404 from 'src/pages/Status/Status404';
import Status500 from 'src/pages/Status/Status500';
import { isLoggedIn } from 'src/utils/function.util';
import { routesURLs } from 'src/utils/properties';

const authenticationRoutes: RouteObject[] = [
  {
    path: '',
    children: [
      {
        path: '',
        element: <Navigate to="/admin-signin" replace />
      },
      {
        path: '/admin-signin',
        element: (
          <Suspense fallback={<>...</>}>
            <AdminSignIn />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/consultant-signin',
    element: (
      <Suspense fallback={<>...</>}>
        <ConsultantSignIn />
      </Suspense>
    )
  },
  {
    path: '/consultant-signup',
    element: (
      <Suspense fallback={<>...</>}>
        <ConsultantSignUp />
      </Suspense>
    )
  },
  {
    path: 'status',
    children: [
      {
        path: '',
        element: <Navigate to="404" replace />
      },
      {
        path: '404',
        element: <Status404 />
      },
      {
        path: '500',
        element: <Status500 />
      },
      {
        path: 'maintenance',
        element: <StatusMaintenance />
      },
      {
        path: 'coming-soon',
        element: <StatusComingSoon />
      }
    ]
  },
  {
    path: '*',
    element: isLoggedIn().status ? (
      <Status404 />
    ) : (
      <Navigate to="/consultant-signin" replace />
    )
  }
];

export default authenticationRoutes;
