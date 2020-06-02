export const GETSALEALL_FAILURE = 'GETSALEALL_FAILURE'; 
export const GETSALEALL_REQUEST = 'GETSALEALL_REQUEST'; 
export const GETSALEALL_SUCCESS = 'GETSALEALL_SUCCESS';
export const GETSALE_SUCCESS = 'GETSALE_SUCCESS'; 
export const GETSALE_FAILURE = 'GETSALE_FAILURE'; 
export const GETSALE_REQUEST = 'GETSALE_REQUEST';
export const UPDATESALE_SUCCESS = 'UPDATESALE_SUCCESS'; 
export const UPDATESALE_FAILURE = 'UPDATESALE_FAILURE'; 
export const UPDATESALE_REQUEST = 'UPDATESALE_REQUEST';
export const CREATESALE_SUCCESS = 'CREATESALE_SUCCESS'; 
export const CREATESALE_FAILURE = 'CREATESALE_FAILURE'; 
export const CREATESALE_REQUEST = 'CREATESALE_REQUEST';
export const DELETESALE_SUCCESS = 'DELETESALE_SUCCESS'; 
export const DELETESALE_FAILURE = 'DELETESALE_FAILURE'; 
export const DELETESALE_REQUEST = 'DELETESALE_REQUEST';

export default function reducer(
  state = {
    loading: false,
    sale: {},
    sales:[]
  },
  action
) {
  switch (action.type) {
    case GETSALEALL_REQUEST:
    case GETSALE_REQUEST:
    case UPDATESALE_REQUEST:
    case CREATESALE_REQUEST:
    case DELETESALE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GETSALEALL_FAILURE:
    case GETSALE_FAILURE:
    case UPDATESALE_FAILURE:
    case CREATESALE_FAILURE:
    case DELETESALE_FAILURE:
      return {
        ...state,
        loading: false
      };
    case DELETESALE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case GETSALE_SUCCESS:
    case UPDATESALE_SUCCESS:
      return {
        ...state,
        sale: action.sale,
        loading: false
      };
    case CREATESALE_SUCCESS:
    case GETSALEALL_SUCCESS:
      return {
        ...state,
        sales: action.sales,
        loading: false
      };
  }
  return state;
}