import axios from 'axios';
import { apiUrls } from 'src/utils/properties';

const AUTH_API_URL = apiUrls.BASEURL + apiUrls.AUTH;

const SignIn = (credentials: Object) => {
  return axios.post(AUTH_API_URL + apiUrls.SIGN_IN, credentials, {
    withCredentials: true
  });
};

// const forgotPassword = (data) => {
//   return axios.post(AUTH_API_URL + '/forgot-password', data);
// };

// const verifyEmail = (data) => {
//   return axios.post(AUTH_API_URL + '/verify-email', data);
// };

// const resetPassword = (data) => {
//   return axios.post(AUTH_API_URL + '/reset-password', data);
// };

// const accessTokenGenerate = () => {
//   return axios.post(
//     AUTH_API_URL + `/refresh-access-token/${userType.loginType}`,
//     {
//       headers: refreshTokenHeader()
//     },
//     { withCredentials: true }
//   );
// };

const logout = () => {
  return axios.post(
    AUTH_API_URL + `/logout`,
    {
      headers: null
    },
    { withCredentials: true }
  );
};

export { SignIn, logout };
