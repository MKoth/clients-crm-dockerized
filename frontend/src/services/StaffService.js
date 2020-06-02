import axios from 'axios';
import urls from '../api/ApiUrl';

export const staffService={
  getStaff,
  getAll,
  updateStaff,
  createStaff,
  deleteStaff
}

function getAll(company_id) {
  return axios.get(urls.staffGetAllUrl+company_id+"/");
}

function getStaff(staff_id) {
  return axios.get(urls.staffGetUrl+staff_id+"/");
}

function updateStaff(staff_id, data) {

  const json = JSON.stringify(data);
  const blob = new Blob([json], {
    type: 'application/json'
  });
  const formdata = new FormData();
  formdata.append("document", blob);
  if(data.image)
    formdata.append('image',data.image)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  return axios.put(urls.staffUpdateUrl+staff_id+"/", formdata, config);
}

function createStaff(company_id, data) {
  const json = JSON.stringify(data);
  const blob = new Blob([json], {
    type: 'application/json'
  });
  const formdata = new FormData();
  formdata.append("document", blob);
  if(data.image)
    formdata.append('image',data.image)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  return axios.post(urls.staffCreateUrl+company_id+"/", formdata, config);
}

function deleteStaff(staff_id) {
  return axios.get(urls.staffDeleteUrl+staff_id+"/");
}