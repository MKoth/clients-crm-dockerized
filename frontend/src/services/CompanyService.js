import axios from 'axios';
import urls from '../api/ApiUrl';

export const companyService = {
  get,
  update,
  updateMedia,
  getSocials,
  createSocial,
  updateSocial,
  deleteSocial,
  getHours,
  updateHours
}

function get(company_id) {
  return axios.get(urls.companyUrl+company_id+'/');
}

function update(company) {
  return axios.put(urls.companyUpdateUrl+company.id+"/", company);
}

function updateMedia(company_id, images) {
  console.log(images);
  const data = new FormData();
  images.forEach(image=>{
    data.append(image.name, image.file)
  });
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }
  console.log(data);
  return axios.post(urls.companyUpdateMediaUrl+company_id+"/", data, config);
}

function getSocials(company_id) {
  return axios.get(urls.companySocialsUrl+company_id+'/');
}

function createSocial(data) {
  return axios.post(urls.companySocialCreateUrl, data);
}

function updateSocial(social_id, data) {
  return axios.post(urls.companySocialUpdateUrl+social_id+'/', data);
}

function deleteSocial(social_id) {
  return axios.get(urls.companySocialDeleteUrl+social_id+'/');
}

function getHours(company_id) {
  return axios.get(urls.companyHoursUrl+company_id+'/');
}

function updateHours(company_id, day_index, data) {
  return axios.post(urls.companyUpdateHoursUrl+company_id+'/'+day_index+'/', data);
}