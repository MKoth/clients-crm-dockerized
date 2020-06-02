import {GETSALEALL_FAILURE, GETSALEALL_REQUEST, GETSALEALL_SUCCESS,
  GETSALE_SUCCESS, GETSALE_FAILURE, GETSALE_REQUEST,
CREATESALE_SUCCESS, CREATESALE_REQUEST, CREATESALE_FAILURE,
UPDATESALE_REQUEST, UPDATESALE_SUCCESS, UPDATESALE_FAILURE,
DELETESALE_REQUEST, DELETESALE_SUCCESS, DELETESALE_FAILURE} from '../reducers/sale';
  import {saleService} from '../services/SaleService';
  import {history} from '../utils/history';

  export const saleActions = {
    getAll,
    getSale,
    createSale,
    updateSale,
    deleteSale
  }

  function getAll(company_id) {
    return dispatch => {
      dispatch(request());
  
      saleService.getAll(company_id)
        .then(
            sales => dispatch(success(sales.data)),
            error => { 
              dispatch(failure(error));
              //dispatch(alertActions.error(error))
            }
        );
    };
  
    function request() { return { type: GETSALEALL_REQUEST } }
    function success(sales) { return { type: GETSALEALL_SUCCESS, sales } }
    function failure(error) { return { type: GETSALEALL_FAILURE, error } }
  }

  function getSale(sale_id) {
    return dispatch => {
      dispatch(request());
  
      saleService.getSale(sale_id)
        .then(
          sale => dispatch(success(sale.data)),
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: GETSALE_REQUEST } }
    function success(sale) { return { type: GETSALE_SUCCESS, sale } }
    function failure(error) { return { type: GETSALE_FAILURE, error } }
  }

  function createSale(company_id, data) {
    return dispatch => {
      dispatch(request());
  
      saleService.createSale(company_id, data)
        .then(
          sales => {dispatch(success(sales.data));},
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: CREATESALE_REQUEST } }
    function success(sales) { return { type: CREATESALE_SUCCESS, sales } }
    function failure(error) { return { type: CREATESALE_FAILURE, error } }
  }

  function updateSale(sale_id, data) {
    return dispatch => {
      dispatch(request());
  
      saleService.updateSale(sale_id, data)
        .then(
          sale => {dispatch(success(sale.data))},
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: UPDATESALE_REQUEST } }
    function success(sale) { return { type: UPDATESALE_SUCCESS, sale } }
    function failure(error) { return { type: UPDATESALE_FAILURE, error } }
  }

  function deleteSale(sale_id) {
    return dispatch => {
      dispatch(request());
  
      saleService.deleteSale(sale_id)
        .then(
          sale => {dispatch(success());},
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: DELETESALE_REQUEST } }
    function success() { return { type: DELETESALE_SUCCESS } }
    function failure(error) { return { type: DELETESALE_FAILURE, error } }
  }