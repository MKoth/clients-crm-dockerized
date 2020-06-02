export const GETSTAFFALL_FAILURE = 'GETSTAFFALL_FAILURE'; 
export const GETSTAFFALL_REQUEST = 'GETSTAFFALL_REQUEST'; 
export const GETSTAFFALL_SUCCESS = 'GETSTAFFALL_SUCCESS';
export const GETSTAFF_SUCCESS = 'GETSTAFF_SUCCESS'; 
export const GETSTAFF_FAILURE = 'GETSTAFF_FAILURE'; 
export const GETSTAFF_REQUEST = 'GETSTAFF_REQUEST';
export const UPDATESTAFF_SUCCESS = 'UPDATESTAFF_SUCCESS'; 
export const UPDATESTAFF_FAILURE = 'UPDATESTAFF_FAILURE'; 
export const UPDATESTAFF_REQUEST = 'UPDATESTAFF_REQUEST';
export const CREATESTAFF_SUCCESS = 'CREATESTAFF_SUCCESS'; 
export const CREATESTAFF_FAILURE = 'CREATESTAFF_FAILURE'; 
export const CREATESTAFF_REQUEST = 'CREATESTAFF_REQUEST';
export const DELETESTAFF_SUCCESS = 'DELETESTAFF_SUCCESS'; 
export const DELETESTAFF_FAILURE = 'DELETESTAFF_FAILURE'; 
export const DELETESTAFF_REQUEST = 'DELETESTAFF_REQUEST';

export default function reducer(
  state = {
    loading: false,
    staff: {},
    staffs:[]
  },
  action
) {
  switch (action.type) {
    case GETSTAFFALL_REQUEST:
    case GETSTAFF_REQUEST:
    case UPDATESTAFF_REQUEST:
    case CREATESTAFF_REQUEST:
    case DELETESTAFF_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GETSTAFFALL_FAILURE:
    case GETSTAFF_FAILURE:
    case UPDATESTAFF_FAILURE:
    case CREATESTAFF_FAILURE:
    case DELETESTAFF_FAILURE:
      return {
        ...state,
        loading: false
      };
    case CREATESTAFF_SUCCESS:
    case DELETESTAFF_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case GETSTAFF_SUCCESS:
    case UPDATESTAFF_SUCCESS:
      return {
        ...state,
        staff: action.staff,
        loading: false
      };
    case GETSTAFFALL_SUCCESS:
      return {
        ...state,
        staffs: action.staffs,
        loading: false
      };
  }
  return state;
}