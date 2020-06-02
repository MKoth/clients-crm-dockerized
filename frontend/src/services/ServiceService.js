import axios from 'axios';
import urls from '../api/ApiUrl';

export const serviceService={
  getService,
  getAll,
  updateService,
  createService,
  deleteService
}

function getAll(company_id) {
  return axios.get(urls.serviceGetAllUrl+company_id+"/");
}

function getService(service_id) {
  return axios.get(urls.serviceGetUrl+service_id+"/");
}

function updateService(service_id, data) {

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

  return axios.put(urls.serviceUpdateUrl+service_id+"/", formdata, config);
}

function createService(company_id, data) {

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

  return axios.post(urls.serviceCreateUrl+company_id+"/", formdata, config);
}

function deleteService(service_id) {
  return axios.get(urls.serviceDeleteUrl+service_id+"/");
}