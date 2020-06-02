//const baseUrl = process.env.API_URL;
const baseUrl = window.location.protocol+"//"+window.location.hostname+":8000";
const api = '/api/v1/';
export default {
  baseUrl,
  timetableUrl: `${baseUrl+api}appointment/timetable/`,
  staffsUrl: `${baseUrl+api}appointment/staffs/`,
  servicesUrl: `${baseUrl+api}appointment/services/`,
  createUrl: `${baseUrl+api}appointment/create/`,
}