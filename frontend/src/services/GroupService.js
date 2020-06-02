import axios from 'axios';
import urls from '../api/ApiUrl';

export const groupService={
  getGroup,
  getAll,
  updateGroup,
  createGroup,
  deleteGroup
}

function getAll(company_id) {
  return axios.get(urls.groupsListUrl+company_id+"/");
}

function getGroup(group_id) {
  return axios.get(urls.groupsGetUrl+group_id+"/");
}

function updateGroup(group_id, data) {
  return axios.put(urls.groupsUpdateUrl+group_id+"/", data);
}

function createGroup(company_id, data) {
  return axios.post(urls.groupsCreateUrl+company_id+"/", data);
}

function deleteGroup(group_id) {
  return axios.get(urls.groupsDeleteUrl+group_id+"/");
}