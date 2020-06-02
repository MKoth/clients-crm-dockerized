import {GETSCHEDULEALL_FAILURE, GETSCHEDULEALL_REQUEST, GETSCHEDULEALL_SUCCESS,
  GETSCHEDULE_SUCCESS, GETSCHEDULE_FAILURE, GETSCHEDULE_REQUEST,
CREATESCHEDULE_SUCCESS, CREATESCHEDULE_REQUEST, CREATESCHEDULE_FAILURE,
UPDATESCHEDULE_REQUEST, UPDATESCHEDULE_SUCCESS, UPDATESCHEDULE_FAILURE,
DELETESCHEDULE_REQUEST, DELETESCHEDULE_SUCCESS, DELETESCHEDULE_FAILURE} from '../reducers/schedule';
  import {scheduleService} from '../services/ScheduleService';
  import {history} from '../utils/history';

  export const scheduleActions = {
    getAll,
    getSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule
  }

  function getAll(company_id) {
    return dispatch => {
      dispatch(request());
  
      scheduleService.getAll(company_id)
        .then(
          schedules => dispatch(success(schedules.data)),
            error => { 
              dispatch(failure(error));
              //dispatch(alertActions.error(error))
            }
        );
    };
  
    function request() { return { type: GETSCHEDULEALL_REQUEST } }
    function success(schedules) { return { type: GETSCHEDULEALL_SUCCESS, schedules } }
    function failure(error) { return { type: GETSCHEDULEALL_FAILURE, error } }
  }

  function getSchedule(schedule_id) {
    return dispatch => {
      dispatch(request());
  
      scheduleService.getSchedule(schedule_id)
        .then(
          schedule => dispatch(success(schedule.data)),
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: GETSCHEDULE_REQUEST } }
    function success(schedule) { return { type: GETSCHEDULE_SUCCESS, schedule } }
    function failure(error) { return { type: GETSCHEDULE_FAILURE, error } }
  }

  function createSchedule(company_id, data) {
    return dispatch => {
      dispatch(request());
  
      scheduleService.createSchedule(company_id, data)
        .then(
          schedules => {dispatch(success(schedules.data));},
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: CREATESCHEDULE_REQUEST } }
    function success(schedules) { return { type: CREATESCHEDULE_SUCCESS, schedules } }
    function failure(error) { return { type: CREATESCHEDULE_FAILURE, error } }
  }

  function updateSchedule(schedule_id, data) {
    return dispatch => {
      dispatch(request());
  
      scheduleService.updateSchedule(schedule_id, data)
        .then(
          schedule => {dispatch(success(schedule.data))},
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: UPDATESCHEDULE_REQUEST } }
    function success(schedule) { return { type: UPDATESCHEDULE_SUCCESS, schedule } }
    function failure(error) { return { type: UPDATESCHEDULE_FAILURE, error } }
  }

  function deleteSchedule(schedule_id) {
    return dispatch => {
      dispatch(request());
  
      scheduleService.deleteSchedule(schedule_id)
        .then(
          schedule => {dispatch(success());},
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: DELETESCHEDULE_REQUEST } }
    function success() { return { type: DELETESCHEDULE_SUCCESS } }
    function failure(error) { return { type: DELETESCHEDULE_FAILURE, error } }
  }