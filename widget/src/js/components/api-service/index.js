import axios from 'axios';
import urls from './api-urls';

export const services={
  staffListGet,
  serviceListGet,
  timetableGet,
  createAppointment
}

export const baseUrl = urls.baseUrl;

function staffListGet(company_id) {
  return axios.post(urls.staffsUrl+company_id+"/");
}

function serviceListGet(company_id, staff_id) {
  return axios.post(urls.servicesUrl+company_id+"/", {staff: staff_id});
}

function timetableGet(staff, services, date) {
  return axios.post(urls.timetableUrl, {staff, services, date});
}

function createAppointment(company_id, data) {
  return axios.post(urls.createUrl+company_id+"/", data);
}