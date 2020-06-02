import {GETSTAFFALL_FAILURE, GETSTAFFALL_REQUEST, GETSTAFFALL_SUCCESS,
  GETSTAFF_SUCCESS, GETSTAFF_FAILURE, GETSTAFF_REQUEST,
CREATESTAFF_SUCCESS, CREATESTAFF_REQUEST, CREATESTAFF_FAILURE,
UPDATESTAFF_REQUEST, UPDATESTAFF_SUCCESS, UPDATESTAFF_FAILURE,
DELETESTAFF_REQUEST, DELETESTAFF_SUCCESS, DELETESTAFF_FAILURE} from '../reducers/staff';
import {staffService} from '../services/StaffService';
import {history} from '../utils/history';
import {successAlert} from '../utils/sweetalert'

export const staffActions = {
  getAll,
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff
}

function getAll(company_id) {
  return dispatch => {
    dispatch(request());

    staffService.getAll(company_id)
      .then(
          staffs => dispatch(success(staffs.data)),
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
      );
  };

  function request() { return { type: GETSTAFFALL_REQUEST } }
  function success(staffs) { return { type: GETSTAFFALL_SUCCESS, staffs } }
  function failure(error) { return { type: GETSTAFFALL_FAILURE, error } }
}

function getStaff(staff_id) {
  return dispatch => {
    dispatch(request());

    staffService.getStaff(staff_id)
      .then(
        staff => dispatch(success(staff.data)),
        error => { 
          dispatch(failure(error));
          //dispatch(alertActions.error(error))
        }
      );
  };

  function request() { return { type: GETSTAFF_REQUEST } }
  function success(staff) { return { type: GETSTAFF_SUCCESS, staff } }
  function failure(error) { return { type: GETSTAFF_FAILURE, error } }
}

function createStaff(company_id, data) {
  return dispatch => {
    dispatch(request());

    staffService.createStaff(company_id, data)
      .then(
        staff => {dispatch(success()); history.push('/dashboard/staff');},
        error => { 
          dispatch(failure(error));
          //dispatch(alertActions.error(error))
        }
      );
  };

  function request() { return { type: CREATESTAFF_REQUEST } }
  function success() { return { type: CREATESTAFF_SUCCESS } }
  function failure(error) { return { type: CREATESTAFF_FAILURE, error } }
}

function updateStaff(staff_id, data) {
  return dispatch => {
    dispatch(request());

    staffService.updateStaff(staff_id, data)
      .then(
        staff => {
          dispatch(success())
          successAlert();
        },
        error => { 
          dispatch(failure(error));
          //dispatch(alertActions.error(error))
        }
      );
  };

  function request() { return { type: UPDATESTAFF_REQUEST } }
  function success(staff) { return { type: UPDATESTAFF_SUCCESS, staff } }
  function failure(error) { return { type: UPDATESTAFF_FAILURE, error } }
}

function deleteStaff(staff_id) {
  return dispatch => {
    dispatch(request());

    staffService.deleteStaff(staff_id)
      .then(
        staff => {dispatch(success()); history.push('/dashboard/staff');},
        error => { 
          dispatch(failure(error));
          //dispatch(alertActions.error(error))
        }
      );
  };

  function request() { return { type: DELETESTAFF_REQUEST } }
  function success() { return { type: DELETESTAFF_SUCCESS } }
  function failure(error) { return { type: DELETESTAFF_FAILURE, error } }
}