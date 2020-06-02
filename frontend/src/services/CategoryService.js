import axios from 'axios';
import urls from '../api/ApiUrl';

export const categoryService={
  getCategory,
  getAll,
  updateCategory,
  createCategory,
  deleteCategory
}

function getAll(company_id) {
  return axios.get(urls.categoryGetAllUrl+company_id+"/");
}

function getCategory(category_id) {
  return axios.get(urls.categoryGetUrl+category_id+"/");
}

function updateCategory(category_id, data) {

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

  return axios.put(urls.categoryUpdateUrl+category_id+"/", formdata, config);
}

function createCategory(company_id, data) {

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

  return axios.post(urls.categoryCreateUrl+company_id+"/", formdata, config);
}

function deleteCategory(category_id) {
  return axios.get(urls.categoryDeleteUrl+category_id+"/");
}