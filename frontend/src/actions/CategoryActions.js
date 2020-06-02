import { GETCATEGORYALL_FAILURE, GETCATEGORYALL_REQUEST, GETCATEGORYALL_SUCCESS,
  GETCATEGORY_SUCCESS, GETCATEGORY_FAILURE, GETCATEGORY_REQUEST,
CREATECATEGORY_SUCCESS, CREATECATEGORY_REQUEST, CREATECATEGORY_FAILURE,
UPDATECATEGORY_REQUEST, UPDATECATEGORY_SUCCESS, UPDATECATEGORY_FAILURE,
DELETECATEGORY_REQUEST, DELETECATEGORY_SUCCESS, DELETECATEGORY_FAILURE } from '../reducers/category';
  import { categoryService } from '../services/CategoryService';
  import { history } from '../utils/history';
  import {successAlert} from '../utils/sweetalert'

  export const categoryActions = {
    getAll,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
  }

  function getAll(company_id) {
    return dispatch => {
      dispatch(request());
  
      categoryService.getAll(company_id)
        .then(
            categories => dispatch(success(categories.data)),
            error => { 
              dispatch(failure(error));
              //dispatch(alertActions.error(error))
            }
        );
    };
  
    function request() { return { type: GETCATEGORYALL_REQUEST } }
    function success(categories) { return { type: GETCATEGORYALL_SUCCESS, categories } }
    function failure(error) { return { type: GETCATEGORYALL_FAILURE, error } }
  }

  function getCategory(category_id) {
    return dispatch => {
      dispatch(request());
  
      categoryService.getCategory(category_id)
        .then(
          category => dispatch(success(category.data)),
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: GETCATEGORY_REQUEST } }
    function success(category) { return { type: GETCATEGORY_SUCCESS, category } }
    function failure(error) { return { type: GETCATEGORY_FAILURE, error } }
  }

  function createCategory(company_id, data) {
    return dispatch => {
      dispatch(request());
  
      categoryService.createCategory(company_id, data)
        .then(
          category => {dispatch(success()); history.push('/dashboard/services'); },
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: CREATECATEGORY_REQUEST } }
    function success() { return { type: CREATECATEGORY_SUCCESS } }
    function failure(error) { return { type: CREATECATEGORY_FAILURE, error } }
  }

  function updateCategory(category_id, data) {
    return dispatch => {
      dispatch(request());
  
      categoryService.updateCategory(category_id, data)
        .then(
          category => {dispatch(success(category.data));  successAlert(); },
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: UPDATECATEGORY_REQUEST } }
    function success(category) { return { type: UPDATECATEGORY_SUCCESS, category } }
    function failure(error) { return { type: UPDATECATEGORY_FAILURE, error } }
  }

  function deleteCategory(category_id) {
    return dispatch => {
      dispatch(request());
  
      categoryService.deleteCategory(category_id)
        .then(
          category => {dispatch(success()); history.push('/dashboard/services');},
          error => { 
            dispatch(failure(error));
            //dispatch(alertActions.error(error))
          }
        );
    };
  
    function request() { return { type: DELETECATEGORY_REQUEST } }
    function success() { return { type: DELETECATEGORY_SUCCESS } }
    function failure(error) { return { type: DELETECATEGORY_FAILURE, error } }
  }