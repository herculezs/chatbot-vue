import http from '@utils/http';
import notifyError from '@helpers';


export default {
  getCompanyEmployee(page, search) {
    return new Promise((resolve, reject) => {
      http.post(`manage/get-company-employee?page=${page}`, { surName: search })
        .then(
          ({ data }) => {
            resolve(data);
          },
        ).catch((error) => {
          notifyError(error);
          reject(error);
        });
    });
  },
  saveDepartment(department, departmentId) {
    return new Promise((resolve, reject) => {
      http.post(`manage/save-department?department=${department}&departmentId=${departmentId}`)
        .then(
          ({ data }) => {
            resolve(data);
          },
        ).catch((error) => {
          notifyError(error);
          reject(error);
        });
    });
  },
  saveEmployeeToManager(department, idsEmployee) {
    return new Promise((resolve, reject) => {
      http.post('manage/save-employee-to-manager', { idsEmployee, department })
        .then(
          ({ data }) => {
            resolve(data);
          },
        ).catch((error) => {
          notifyError(error);
          reject(error);
        });
    });
  },
  getDataAdminPanel(department) {
    return new Promise((resolve, reject) => {
      http.post(`manage/get-data-admin-panel?department=${department}`)
        .then(
          ({ data }) => {
            resolve(data);
          },
        ).catch((error) => {
          notifyError(error);
          reject(error);
        });
    });
  },
  getDepartments() {
    return new Promise((resolve, reject) => {
      http.post('manage/get-all-departments')
        .then(
          ({ data }) => {
            resolve(data);
          },
        ).catch((error) => {
          notifyError(error);
          reject(error);
        });
    });
  },
};
