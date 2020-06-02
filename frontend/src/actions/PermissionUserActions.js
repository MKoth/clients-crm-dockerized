import {PERMISSION_USER_REQUEST, PERMISSION_USER_SUCCESS, PERMISSION_USER_FAILURE,
  PERMISSION_USERALL_REQUEST, PERMISSION_USERALL_SUCCESS, PERMISSION_USERALL_FAILURE,
  PERMISSION_USER_ADD_REQUEST, PERMISSION_USER_ADD_SUCCESS, PERMISSION_USER_ADD_FAILURE,
  PERMISSION_USER_UPDATE_REQUEST, PERMISSION_USER_UPDATE_SUCCESS, PERMISSION_USER_UPDATE_FAILURE 
} from '../reducers/permissionUser';
import { history } from '../utils/history';
import { permissionUserService } from '../services/PermissionUserService'
import {successAlert} from '../utils/sweetalert'

export const permissionUsersActions = {
  getUsers,
  getUser,
  updateUser,
  createUser
}

function getUsers(company_id) {
  return dispatch => {
    dispatch(request());

    permissionUserService.getAll(company_id)
      .then(
        users => {
          dispatch(success(users.data));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() { return { type: PERMISSION_USERALL_REQUEST } }
  function success(users) { return { type: PERMISSION_USERALL_SUCCESS, users } }
  function failure(error) { return { type: PERMISSION_USERALL_FAILURE, error } }
}

function getUser(user_id) {
  return dispatch => {
    dispatch(request());

    permissionUserService.getUser(user_id)
      .then(
        user => {
          dispatch(success(user.data));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() { return { type: PERMISSION_USER_REQUEST } }
  function success(user) { return { type: PERMISSION_USER_SUCCESS, user } }
  function failure(error) { return { type: PERMISSION_USER_FAILURE, error } }
}

function updateUser(user_id, data) {
  return dispatch => {
    dispatch(request());

    permissionUserService.updateUser(user_id, data)
      .then(
        user => {
          dispatch(success());
          successAlert();
        },
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() { return { type: PERMISSION_USER_UPDATE_REQUEST } }
  function success() { return { type: PERMISSION_USER_UPDATE_SUCCESS } }
  function failure(error) { return { type: PERMISSION_USER_UPDATE_FAILURE, error } }
}

function createUser(company_id, data) {
  console.log(company_id);
  console.log(data);
  return dispatch => {
    dispatch(request());

    permissionUserService.createUser(company_id, data)
      .then(
        user => {
          dispatch(success());
          //dispatch(successUserAll(users.data))
          console.log(user);
          history.push('/dashboard/users')
        },
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() { return { type: PERMISSION_USER_ADD_REQUEST } }
  function success() { return { type: PERMISSION_USER_ADD_SUCCESS } }
  function successUserAll(users) { return { type: PERMISSION_USERALL_SUCCESS, users } }
  function failure(error) { return { type: PERMISSION_USER_ADD_FAILURE, error } }
}