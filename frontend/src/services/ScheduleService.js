import axios from 'axios';
import urls from '../api/ApiUrl';

export const scheduleService={
  getSchedule,
  getAll,
  updateSchedule,
  createSchedule,
  deleteSchedule
}

function getAll(company_id) {
  return axios.get(urls.scheduleGetAllUrl+company_id+"/");
}

function getSchedule(schedule_id) {
  return axios.get(urls.scheduleGetUrl+schedule_id+"/");
}

function updateSchedule(schedule_id, data) {
  return axios.put(urls.scheduleUpdateUrl+schedule_id+"/", data);
}

function createSchedule(company_id, data) {
  return axios.post(urls.scheduleCreateUrl+company_id+"/", data);
}

function deleteSchedule(schedule_id) {
  return axios.get(urls.scheduleDeleteUrl+schedule_id+"/");
}