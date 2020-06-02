import {GETSERVICEALL_FAILURE, GETSERVICEALL_REQUEST, GETSERVICEALL_SUCCESS,
  GETSERVICE_SUCCESS, GETSERVICE_FAILURE, GETSERVICE_REQUEST,
CREATESERVICE_SUCCESS, CREATESERVICE_REQUEST, CREATESERVICE_FAILURE,
UPDATESERVICE_REQUEST, UPDATESERVICE_SUCCESS, UPDATESERVICE_FAILURE,
DELETESERVICE_REQUEST, DELETESERVICE_SUCCESS, DELETESERVICE_FAILURE} from '../reducers/service';
  import {serviceService} from '../services/ServiceService';
  import {history} from '../utils/history';
  import {successAlert} from '../utils/sweetalert'

  export const serviceActions = {
    getAll,
    getService,
    createService,
    updateService,
    deleteService
  }

  function getAll(company_id) {
    return dispatch => {
      dispatch(request());
  
      serviceService.getAll(company_id)
        .then(
            services => dispatch(success(services.data)),
            error => { 
              dispatch(failure(error));
              //dispatch(alertActions.error(error))
            }
        );
    };
  
    function request() { return { type: GETSERVICEALL_REQUEST } }
    function success(services) { return { type: GETSERVICEALL_SUCCESS, services } }
    function failure(error) { return { type: GETSERVICEALL_FAILURE, error } }
  }

  function getService(service_id) {
    return dispatch => {
      dispatch(request());
  
      serviceService.getService(service_id)
        .then(
          service => dispatch(success(service.data)),
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: GETSERVICE_REQUEST } }
    function success(service) { return { type: GETSERVICE_SUCCESS, service } }
    function failure(error) { return { type: GETSERVICE_FAILURE, error } }
  }

  function createService(company_id, data) {
    return dispatch => {
      dispatch(request());
  
      serviceService.createService(company_id, data)
        .then(
          service => {dispatch(success()); history.push('/dashboard/services');},
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: CREATESERVICE_REQUEST } }
    function success() { return { type: CREATESERVICE_SUCCESS } }
    function failure(error) { return { type: CREATESERVICE_FAILURE, error } }
  }

  function updateService(service_id, data) {
    return dispatch => {
      dispatch(request());
  
      serviceService.updateService(service_id, data)
        .then(
          service => {dispatch(success()); successAlert();},
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: UPDATESERVICE_REQUEST } }
    function success() { return { type: UPDATESERVICE_SUCCESS } }
    function failure(error) { return { type: UPDATESERVICE_FAILURE, error } }
  }

  function deleteService(service_id) {
    return dispatch => {
      dispatch(request());
  
      serviceService.deleteService(service_id)
        .then(
          service => {dispatch(success()); history.push('/dashboard/services');},
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: DELETESERVICE_REQUEST } }
    function success() { return { type: DELETESERVICE_SUCCESS } }
    function failure(error) { return { type: DELETESERVICE_FAILURE, error } }
  }