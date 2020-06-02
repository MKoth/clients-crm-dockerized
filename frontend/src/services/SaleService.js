import axios from 'axios';
import urls from '../api/ApiUrl';

export const saleService={
  getSale,
  getAll,
  updateSale,
  createSale,
  deleteSale
}

function getAll(company_id) {
  return axios.get(urls.saleGetAllUrl+company_id+"/");
}

function getSale(sale_id) {
  return axios.get(urls.saleGetUrl+sale_id+"/");
}

function updateSale(sale_id, data) {
  return axios.put(urls.saleUpdateUrl+sale_id+"/", data);
}

function createSale(company_id, data) {
  return axios.post(urls.saleCreateUrl+company_id+"/", data);
}

function deleteSale(sale_id) {
  return axios.get(urls.saleDeleteUrl+sale_id+"/");
}