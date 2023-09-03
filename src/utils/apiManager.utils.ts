import Cookies from 'universal-cookie';
import { apiUrls } from './properties';
import axios from 'axios';

export const Method = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete'
};

function addParamsToURL(url: string, params: any) {
  if (params) {
    let temp = url;
    temp = temp + '/' + params;
    return temp;
  }
  return url;
}

const getHeaders = async (token: string, adHeaders: object) => {
  const cookies = new Cookies();
  let validToken;
  if (cookies.get('token')) {
    validToken = await cookies.get('token');
  }

  if (token !== null) {
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${validToken}`,
        ...adHeaders
      }
    };
  } else {
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...adHeaders
      }
    };
  }
};

export default async function api(
  method: string,
  header: object | null,
  endPoint: string,
  token?: any,
  body?: any | null,
  params?: any
) {
  let customURL = addParamsToURL(apiUrls.BASEURL + endPoint, params);
  let headers = await getHeaders(token, header === null ? {} : header);

  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: customURL,
      data: body === '' ? undefined : body,
      headers: headers.headers
    })
      .then(function (response: any) {
        resolve(response);
      })
      .catch(function (error: any) {
        reject(error.response);
      });
  });
}
