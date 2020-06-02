import axios from 'axios';

//change all api urls if in production mode to api url provided in init function config argument
function setInterceptors(api){
  axios.interceptors.request.use(function(config) {
    console.log(api);
    const urlData = config.url.split('api')
    config.url = api+'/api'+urlData[1]
    console.log(config.url);
    return config;
  }, function(err) {
    return Promise.reject(err);
  });
}
export default setInterceptors;