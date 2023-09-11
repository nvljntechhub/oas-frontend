import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router';
import AppointmentManagement from 'src/pages/Consultant/appointments';

import JobSeekerManagement from 'src/pages/Admin/jobSeeker';
import ConsultantDashboard from 'src/pages/Consultant';
import LayoutComponent from 'src/components/SidebarLayout/Consultant';
import JobSeekerView from 'src/pages/Consultant/appointments/jobSeeker/View';

const consultantRoutes: RouteObject[] = [
  {
    path: 'consultant-management',
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
            <ConsultantDashboard />
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
        ),
        children: [
          {
            path: 'job-seeker/view',
            element: (
              <Suspense fallback={<>...</>}>
                <JobSeekerView />
              </Suspense>
            )
          }
        ]
      }
    ]
  }
];

export default consultantRoutes;
