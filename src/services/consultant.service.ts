import api, { Method } from 'src/utils/apiManager.utils';
import { apiUrls } from 'src/utils/properties';

const createConsultant = async (data: Object) => {
  return new Promise((resolve, reject) => {
    api(Method.POST, null, apiUrls.CONSULTANT, '', data, '')
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const updateConsultant = async (data: Object, id: number) => {
  return new Promise((resolve, reject) => {
    api(Method.PUT, null, apiUrls.CONSULTANT, '', data, id)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const listConsultant = async () => {
  return new Promise((resolve, reject) => {
    api(Method.GET, null, apiUrls.CONSULTANT)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const deleteConsultant = async (id: number) => {
  return new Promise((resolve, reject) => {
    api(Method.DELETE, null, apiUrls.CONSULTANT, '', '', id)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export { createConsultant, updateConsultant, listConsultant, deleteConsultant };
