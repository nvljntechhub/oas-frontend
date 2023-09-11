import api, { Method } from 'src/utils/apiManager.utils';
import { apiUrls } from 'src/utils/properties';

const createAppointment = async (data: Object) => {
  return new Promise((resolve, reject) => {
    api(Method.POST, null, apiUrls.APPOINTMENT, '', data, '')
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const updateAppointment = async (data: Object, id: number) => {
  return new Promise((resolve, reject) => {
    api(Method.PUT, null, apiUrls.APPOINTMENT, '', data, id)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const acceptAppointment = async (id: number) => {
  return new Promise((resolve, reject) => {
    api(Method.PUT, null, apiUrls.APPOINTMENT + '/accept', '', '', id)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const declineAppointment = async (id: number) => {
  return new Promise((resolve, reject) => {
    api(Method.PUT, null, apiUrls.APPOINTMENT + '/decline', '', '', id)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const listAppointment = async () => {
  return new Promise((resolve, reject) => {
    api(Method.GET, null, apiUrls.APPOINTMENT)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const deleteAppointment = async (id: number) => {
  return new Promise((resolve, reject) => {
    api(Method.DELETE, null, apiUrls.APPOINTMENT, '', '', id)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export {
  createAppointment,
  updateAppointment,
  acceptAppointment,
  declineAppointment,
  listAppointment,
  deleteAppointment
};
