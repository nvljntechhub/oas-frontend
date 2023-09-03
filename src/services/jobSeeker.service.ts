import api, { Method } from 'src/utils/apiManager.utils';
import { apiUrls } from 'src/utils/properties';

const createJobSeeker = async (data: Object) => {
  return new Promise((resolve, reject) => {
    api(Method.POST, null, apiUrls.JOB_SEEKER, '', data, '')
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const updateJobSeeker = async (data: Object, id: number) => {
  return new Promise((resolve, reject) => {
    api(Method.PUT, null, apiUrls.JOB_SEEKER, '', data, id)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const listJobSeeker = async () => {
  return new Promise((resolve, reject) => {
    api(Method.GET, null, apiUrls.JOB_SEEKER)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const deleteJobSeeker = async (id: number) => {
  return new Promise((resolve, reject) => {
    api(Method.DELETE, null, apiUrls.JOB_SEEKER, '', '', id)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export { createJobSeeker, updateJobSeeker, listJobSeeker, deleteJobSeeker };
