import axios from 'axios';
import { history } from './utils/history';

function setInterceptors(){
  axios.interceptors.request.use(function(config) {
    const token = JSON.parse(localStorage.getItem('key'));
  
    if ( token ) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  }, function(err) {
    return Promise.reject(err);
  });

  axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log(response);
    return response;
  }, function (error) {
    if (401 === error.response.status) {
      console.log('Unauthorized 401');
      console.log(error);
      localStorage.removeItem('key');
    }
    // Do something with response error
    return Promise.reject(error);
  });
}
export default setInterceptors;