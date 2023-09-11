import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router';
import LayoutComponent from 'src/components/SidebarLayout/Admin';
import AppointmentManagement from 'src/pages/Admin/appointments';

import ConsultantManagement from 'src/pages/Admin/consultant';
import JobSeekerManagement from 'src/pages/Admin/jobSeeker';

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
      },
      {
        path: 'job-seeker',
        element: (
          <Suspense fallback={<>...</>}>
            <JobSeekerManagement />
          </Suspense>
        )
      },
      {
        path: 'appointment',
        element: (
          <Suspense fallback={<>...</>}>
            <AppointmentManagement />
          </Suspense>
        )
      }
    ]
  }
];

export default adminRoutes;
