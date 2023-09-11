import { useRoutes } from 'react-router';
import authenticationRoutes from './AuthenticationRoutes';
import adminRoutes from './AdminRoutes';
import { isLoggedIn } from 'src/utils/function.util';
import { userRoles } from 'src/utils/properties';
import consultantRoutes from './ConsultantRoutes';
import jobSeekerRoutes from './JobSeekerRoutes';

export default function AllRoutes() {
  // const loggedInStatus = isLoggedIn();

  // if (loggedInStatus?.status) {
  //   if (loggedInStatus?.role === userRoles.ADMIN) {
  //     return useRoutes([
  //       ...authenticationRoutes,
  //       ...adminRoutes,
  //       ...consultantRoutes
  //     ]);
  //   } else if (loggedInStatus?.role === userRoles.CONSULTANT) {
  //     return useRoutes([...authenticationRoutes, ...consultantRoutes]);
  //   }
  // } else {
  return useRoutes([
    ...authenticationRoutes,
    ...adminRoutes,
    ...consultantRoutes,
    ...jobSeekerRoutes
  ]);
  // }
}
