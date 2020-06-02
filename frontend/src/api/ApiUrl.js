
//const url = "http://0.0.0.0:80";
const url = window.location.protocol+"//"+window.location.hostname+(process.env.NODE_ENV === 'production'?"":":8000");
console.log(url);
console.log('hello1');
const api = "/api/v1";

export default {
  url,
  //loginUrl: `${url}/rest-auth/login/`,
  loginUrl: `${url}/api/login/`,
  getByToken: `${url}/api/me/`,
  logoutUrl: `${url+api}/rest-auth/logout/`,
  //company related urls
  companyUrl: `${url+api}/company/get/`,
  companyUpdateMediaUrl: `${url+api}/company/media/`,
  companyCreateUrl: `${url+api}/company/create/`,
  companyUpdateUrl: `${url+api}/company/update/`,
  companySocialsUrl: `${url+api}/company/socials/`,
  companySocialUpdateUrl: `${url+api}/company/socials/update/`,
  companySocialCreateUrl: `${url+api}/company/socials/create/`,
  companySocialDeleteUrl: `${url+api}/company/socials/delete/`,
  companyHoursUrl: `${url+api}/company/hours/`,
  companyUpdateHoursUrl: `${url+api}/company/hours/update/`,
  //users related
  userListUrl: `${url+api}/users/list/`,
  userUpdateUrl: `${url+api}/users/update/`,
  userGetUrl: `${url+api}/users/get/`,
  userDeleteUrl: `${url+api}/users/delete/`,
  //permission users related
  permissionUserGetUrl: `${url+api}/users/get/`,
  permissionUserGetAllUrl: `${url+api}/users/list/`,
  permissionUserUpdateUrl: `${url+api}/users/update/`,
  permissionUserCreateUrl: `${url+api}/users/list/`,
  //groups related
  groupsListUrl: `${url+api}/users/groups/list/`,
  groupsUpdateUrl: `${url+api}/users/groups/update/`,
  groupsCreateUrl: `${url+api}/users/groups/create/`,
  groupsGetUrl: `${url+api}/users/groups/get/`,
  groupsDeleteUrl: `${url+api}/users/groups/delete/`,
  //category related
  categoryCreateUrl: `${url+api}/service/category/create/`,
  categoryDeleteUrl: `${url+api}/service/category/delete/`,
  categoryUpdateUrl: `${url+api}/service/category/update/`,
  categoryGetUrl: `${url+api}/service/category/get/`,
  categoryGetAllUrl: `${url+api}/service/category/list/`,
  //service related
  serviceCreateUrl: `${url+api}/service/create/`,
  serviceDeleteUrl: `${url+api}/service/delete/`,
  serviceUpdateUrl: `${url+api}/service/update/`,
  serviceGetUrl: `${url+api}/service/get/`,
  serviceGetAllUrl: `${url+api}/service/list/`,
  //staff related
  staffCreateUrl: `${url+api}/staff/create/`,
  staffDeleteUrl: `${url+api}/staff/delete/`,
  staffUpdateUrl: `${url+api}/staff/update/`,
  staffGetUrl: `${url+api}/staff/get/`,
  staffGetAllUrl: `${url+api}/staff/list/`,
  //sale related
  saleCreateUrl: `${url+api}/sale/create/`,
  saleDeleteUrl: `${url+api}/sale/delete/`,
  saleUpdateUrl: `${url+api}/sale/update/`,
  saleGetUrl: `${url+api}/sale/get/`,
  saleGetAllUrl: `${url+api}/sale/list/`,
  //schedule related
  scheduleCreateUrl: `${url+api}/staff/schedule/create/`,
  scheduleDeleteUrl: `${url+api}/staff/schedule/delete/`,
  scheduleUpdateUrl: `${url+api}/staff/schedule/update/`,
  scheduleGetUrl: `${url+api}/staff/schedule/get/`,
  scheduleGetAllUrl: `${url+api}/staff/schedule/list/`,

  //unused yet urls
  registrationUrl: `${url+api}/rest-auth/registration/`,
  resetPasswordUrl: `${url+api}/rest-auth/password/reset/`,
  checkEmailUrl: `${url+api}/rest-auth/registration/verify-email/`,
  userUrl: `${url+api}/api/v1/user/`,
  servicesUrl: `${url+api}/service/service/`,
};

/* 
path('socials/update/<social_id>/', SocialLinkUpdate.as_view(), name="socials_single_update"),
path('socials/delete/<social_id>/', SocialLinkDelete.as_view(), name="socials_single_update"),
path('socials/create/<company_id>', SocialLinkCreate.as_view(), name="socials_single_create"),
*/
