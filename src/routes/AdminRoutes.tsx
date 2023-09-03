import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router';
import LayoutComponent from 'src/components/Layout';
import ConsultantManagement from 'src/pages/Admin/consultant';

const adminRoutes: RouteObject[] = [
  {
    path: 'admin-management',
    element: <LayoutComponent />,
    children: [
      {
        path: '',
        element: <Navigate to="consultant" replace />
      },
      {
        path: 'consultant',
        element: (
          <Suspense fallback={<>...</>}>
            <ConsultantManagement />
          </Suspense>
        )
      }
    ]
  }
];

export default adminRoutes;
