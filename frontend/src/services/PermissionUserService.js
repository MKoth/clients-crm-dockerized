import axios from 'axios';
import urls from '../api/ApiUrl';

export const permissionUserService={
  getUser,
  getAll,
  updateUser,
  createUser
}

function getUser(user_id) {
  return axios.get(urls.permissionUserGetUrl+user_id+"/");
}

function getAll(company_id) {
  return axios.get(urls.permissionUserGetAllUrl+company_id+"/");
}

function updateUser(user_id, data) {

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

  return axios.put(urls.permissionUserUpdateUrl+user_id+"/", formdata, config);
}

function createUser(company_id, data) {
  const json = JSON.stringify(data);
  const blob = new Blob([json], {
    type: 'application/json'
  });
  const formdata = new FormData();
  formdata.append("document", blob);
  if(data.image){
    formdata.append('image',data.image)}
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  return axios.post(urls.permissionUserCreateUrl+company_id+"/", formdata, config);
}