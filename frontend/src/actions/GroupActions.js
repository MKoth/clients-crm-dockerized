import {GETGROUPALL_FAILURE, GETGROUPALL_REQUEST, GETGROUPALL_SUCCESS,
  GETGROUP_SUCCESS, GETGROUP_FAILURE, GETGROUP_REQUEST,
CREATEGROUP_SUCCESS, CREATEGROUP_REQUEST, CREATEGROUP_FAILURE,
UPDATEGROUP_REQUEST, UPDATEGROUP_SUCCESS, UPDATEGROUP_FAILURE,
DELETEGROUP_REQUEST, DELETEGROUP_SUCCESS, DELETEGROUP_FAILURE} from '../reducers/group';
  import {groupService} from '../services/GroupService';
  import {history} from '../utils/history';
  import {successAlert} from '../utils/sweetalert'

  export const groupActions = {
    getAll,
    getGroup,
    createGroup,
    updateGroup,
    deleteGroup
  }

  function getAll(company_id) {
    return dispatch => {
      dispatch(request());
  
      groupService.getAll(company_id)
        .then(
            groups => dispatch(success(groups.data)),
            error => { 
              dispatch(failure(error));
              //dispatch(alertActions.error(error))
            }
        );
    };
  
    function request() { return { type: GETGROUPALL_REQUEST } }
    function success(groups) { return { type: GETGROUPALL_SUCCESS, groups } }
    function failure(error) { return { type: GETGROUPALL_FAILURE, error } }
  }

  function getGroup(group_id) {
    return dispatch => {
      dispatch(request());
  
      groupService.getGroup(group_id)
        .then(
          group => dispatch(success(group.data)),
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: GETGROUP_REQUEST } }
    function success(group) { return { type: GETGROUP_SUCCESS, group } }
    function failure(error) { return { type: GETGROUP_FAILURE, error } }
  }

  function createGroup(company_id, data) {
    return dispatch => {
      dispatch(request());
  
      groupService.createGroup(company_id, data)
        .then(
          group => {dispatch(success()); history.push('/dashboard/users');},
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: CREATEGROUP_REQUEST } }
    function success() { return { type: CREATEGROUP_SUCCESS } }
    function failure(error) { return { type: CREATEGROUP_FAILURE, error } }
  }

  function updateGroup(group_id, data) {
    return dispatch => {
      dispatch(request());
  
      groupService.updateGroup(group_id, data)
        .then(
          group => {
            dispatch(success());
            successAlert();
          },
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: UPDATEGROUP_REQUEST } }
    function success() { return { type: UPDATEGROUP_SUCCESS } }
    function failure(error) { return { type: UPDATEGROUP_FAILURE, error } }
  }

  function deleteGroup(group_id) {
    return dispatch => {
      dispatch(request());
  
      groupService.deleteGroup(group_id)
        .then(
          group => {dispatch(success()); history.push('/dashboard/users');},
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: DELETEGROUP_REQUEST } }
    function success() { return { type: DELETEGROUP_SUCCESS } }
    function failure(error) { return { type: DELETEGROUP_FAILURE, error } }
  }