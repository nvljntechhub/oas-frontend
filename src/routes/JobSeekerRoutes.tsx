import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router';

import AppointmentManagement from 'src/pages/JobSeeker/appointments';

import JobSeekerDashboard from 'src/pages/JobSeeker';
import LayoutComponent from 'src/components/SidebarLayout/JobSeeker';

const jobSeekerRoutes: RouteObject[] = [
  {
    path: 'job-seeker-management',
    element: <LayoutComponent />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" replace />
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<>...</>}>
            <JobSeekerDashboard />
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

export default jobSeekerRoutes;
