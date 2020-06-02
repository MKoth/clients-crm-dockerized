import {LOGIN_REQUEST,LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
GETUSERALL_FAILURE, GETUSERALL_REQUEST, GETUSERALL_SUCCESS,
GETUSER_SUCCESS, GETUSER_FAILURE, GETUSER_REQUEST} from '../reducers/user';
import {COMPANY_GET} from '../reducers/company';
import {userService} from '../services/UserService';
import {history} from '../utils/history';

export const userActions = {
  login,
  getMe,
  logout,
  getAll,
  getUser
}

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    userService.login(email, password)
      .then(
        user => {
          localStorage.setItem('key', JSON.stringify(user.data.key));
          dispatch(success(user.data.user));
          dispatch({type: COMPANY_GET, company: user.data.company});
          setTimeout(()=>{
            history.push('/dashboard');
          });
        },
        error => {
          localStorage.removeItem('key');
          console.log(error);
          dispatch(failure(error));
          //dispatch(alertActions.error(error));
        }
      );
  };

  function request(user) { return { type: LOGIN_REQUEST, user } }
  function success(user) { return { type: LOGIN_SUCCESS, user } }
  function failure(error) { return { type: LOGIN_FAILURE, error } }
}

function getMe() {
  return dispatch => {
    dispatch(request());

    userService.getMe()
      .then(
        user => {
          console.log(user);
          dispatch(success(user.data));
          dispatch({type: COMPANY_GET, company: user.data.company});
        },
        error => {
          console.log(error);
          dispatch(failure(error));
        }
      );
  };

  function request(user) { return { type: LOGIN_REQUEST, user } }
  function success(user) { return { type: LOGIN_SUCCESS, user } }
  function failure(error) { return { type: LOGIN_FAILURE, error } }
}

function logout() {
  userService.logout()
    .then(
      msg => {
        localStorage.removeItem('key');
        history.push('/login');
      },
      err => {
        localStorage.removeItem('key');
        history.push('/login');
      }
    );
  return { type: LOGOUT };
}

function getAll() {
  return dispatch => {
    const company_id = localStorage.getItem('current_company');
    dispatch(request());

    userService.getAll(company_id)
      .then(
          users => dispatch(success(users.data)),
          error => { 
            dispatch(failure(error));
          }
      );
  };

  function request() { return { type: GETUSERALL_REQUEST } }
  function success(users) { return { type: GETUSERALL_SUCCESS, users } }
  function failure(error) { return { type: GETUSERALL_FAILURE, error } }
}

function getUser(user_id) {
  return dispatch => {
    dispatch(request());

    userService.getUser(user_id)
      .then(
          user => dispatch(success(user.data)),
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
      );
  };

  function request() { return { type: GETUSER_REQUEST } }
  function success(user) { return { type: GETUSER_SUCCESS, user } }
  function failure(error) { return { type: GETUSER_FAILURE, error } }
}