export const GETCATEGORYALL_FAILURE = 'GETCATEGORYALL_FAILURE'; 
export const GETCATEGORYALL_REQUEST = 'GETCATEGORYALL_REQUEST'; 
export const GETCATEGORYALL_SUCCESS = 'GETCATEGORYALL_SUCCESS';
export const GETCATEGORY_SUCCESS = 'GETCATEGORY_SUCCESS'; 
export const GETCATEGORY_FAILURE = 'GETCATEGORY_FAILURE'; 
export const GETCATEGORY_REQUEST = 'GETCATEGORY_REQUEST';
export const UPDATECATEGORY_SUCCESS = 'UPDATECATEGORY_SUCCESS'; 
export const UPDATECATEGORY_FAILURE = 'UPDATECATEGORY_FAILURE'; 
export const UPDATECATEGORY_REQUEST = 'UPDATECATEGORY_REQUEST';
export const CREATECATEGORY_SUCCESS = 'CREATECATEGORY_SUCCESS'; 
export const CREATECATEGORY_FAILURE = 'CREATECATEGORY_FAILURE'; 
export const CREATECATEGORY_REQUEST = 'CREATECATEGORY_REQUEST';
export const DELETECATEGORY_SUCCESS = 'DELETECATEGORY_SUCCESS'; 
export const DELETECATEGORY_FAILURE = 'DELETECATEGORY_FAILURE'; 
export const DELETECATEGORY_REQUEST = 'DELETECATEGORY_REQUEST';

export default function reducer(
  state = {
    loading: false,
    category: {},
    categories:[]
  },
  action
) {
  switch (action.type) {
    case GETCATEGORYALL_REQUEST:
    case GETCATEGORY_REQUEST:
    case UPDATECATEGORY_REQUEST:
    case CREATECATEGORY_REQUEST:
    case DELETECATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GETCATEGORYALL_FAILURE:
    case GETCATEGORY_FAILURE:
    case UPDATECATEGORY_FAILURE:
    case CREATECATEGORY_FAILURE:
    case DELETECATEGORY_FAILURE:
      return {
        ...state,
        loading: false
      };
    case CREATECATEGORY_SUCCESS:
    case DELETECATEGORY_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case GETCATEGORY_SUCCESS:
    case UPDATECATEGORY_SUCCESS:
      return {
        ...state,
        category: action.category,
        loading: false
      };
    case GETCATEGORYALL_SUCCESS:
      return {
        ...state,
        categories: action.categories,
        loading: false
      };
  }
  return state;
}