import {COMPANY_GET, LOADING_START, ERROR, SOCIALS_GET, HOURS_GET} from '../reducers/company';
import {companyService} from '../services/CompanyService';
import { successAlert } from '../utils/sweetalert';

export const companyActions = {
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
  return dispatch => {
    dispatch(start());
    companyService.get(company_id)
      .then(
        company => {
          if(company&&company.data)
            dispatch(success(company.data));
        },
        error => {
          console.log(error);
          dispatch(stop(error));
        }
      );
  };
}

function update(newCompanyData) {
  return dispatch => {
    dispatch(start());

    companyService.update(newCompanyData)
    .then(
      company => {
        dispatch(success(company.data));
        successAlert();
      },
      error => {
        dispatch(stop(error));
      }
    );
  };
}

function updateMedia(companyId, images) {
  return dispatch => {
    dispatch(start());
    
    companyService.updateMedia(companyId, images)
    .then(
      company => {
        dispatch(success(company.data));
        successAlert();
      },
      error => {
        dispatch(stop(error));
      }
    );
  };
}

function getSocials(company_id){
  return dispatch => {
    companyService.getSocials(company_id)
      .then(
        socials => {
          if(socials&&socials.data){
            dispatch(socialsSuccess(socials.data));
          }
        },
        error => {
          console.log(error);
          dispatch(stop(error));
        }
      );
    dispatch(start());
  }
}

function createSocial(data){
  return dispatch => {
    companyService.createSocial(data)
      .then(
        socials => {
          if(socials&&socials.data){
            dispatch(socialsSuccess(socials.data));
          }
        },
        error => {
          console.log(error);
          dispatch(stop(error));
        }
      );
    dispatch(start());
  }
}

function updateSocial(social_id, data){
  return dispatch => {
    companyService.updateSocial(social_id, data)
      .then(
        socials => {
          if(socials&&socials.data){
            dispatch(socialsSuccess(socials.data));
          }
        },
        error => {
          console.log(error);
          dispatch(stop(error));
        }
      );
    dispatch(start());
  }
}

function deleteSocial(social_id){
  return dispatch => {
    companyService.deleteSocial(social_id)
      .then(
        socials => {
          if(socials&&socials.data){
            dispatch(socialsSuccess(socials.data));
          }
        },
        error => {
          console.log(error);
          dispatch(stop(error));
        }
      );
    dispatch(start());
  }
}

function getHours(company_id){
  return dispatch => {
    companyService.getHours(company_id)
      .then(
        hours => {
          console.log(hours.data)
          if(hours&&hours.data){
            dispatch(hoursSuccess(hours.data));
          }
        },
        error => {
          console.log(error);
          dispatch(stop(error));
        }
      );
    dispatch(start());
  }
}

function updateHours(company_id, day_index, data){
  return dispatch => {
    companyService.updateHours(company_id, day_index, data)
      .then(
        hours => {
          console.log(hours.data)
          if(hours&&hours.data){
            dispatch(hoursSuccess(hours.data));
          }
        },
        error => {
          console.log(error);
          dispatch(stop(error));
        }
      );
    dispatch(start());
  }
}

function start() { return { type: LOADING_START } }
function success(company) { return { type: COMPANY_GET, company } }
function socialsSuccess(socials) { return { type: SOCIALS_GET, socials } }
function hoursSuccess(hours) { return { type: HOURS_GET, hours } }
function stop(error) { return { type: ERROR, error } }