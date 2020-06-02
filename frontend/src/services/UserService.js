import axios from 'axios';
import urls from '../api/ApiUrl';

export const userService={
  login,
  getMe,
  logout,
  register,
  getAll,
  getUser
}

function login(email, password) {
  return axios.post(urls.loginUrl, {
    email,
    password
  });
}

function getMe(){
  return axios.get(urls.getByToken);
}

function register(jsondata) {
  const json = JSON.stringify(jsondata);
  const blob = new Blob([json], {
    type: 'application/json'
  });
  const data = new FormData();
  data.append("document", blob);
  if(jsondata.cover)
    data.append('cover',jsondata.cover)
  if(jsondata.logo)
    data.append('logo',jsondata.logo)
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }

  delete jsondata.cover;
  delete jsondata.logo;
  return axios.post(urls.companyCreateUrl, data, config);
}

function logout() {
  return axios.post(urls.logoutUrl);
}

function getAll(company_id) {
  return axios.get(urls.userListUrl+company_id+"/");
}

function getUser(user_id) {
  return axios.get(urls.userGetUrl+user_id+"/");
}