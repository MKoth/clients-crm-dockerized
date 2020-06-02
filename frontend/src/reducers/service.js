export const GETSERVICEALL_FAILURE = 'GETSERVICEALL_FAILURE'; 
export const GETSERVICEALL_REQUEST = 'GETSERVICEALL_REQUEST'; 
export const GETSERVICEALL_SUCCESS = 'GETSERVICEALL_SUCCESS';
export const GETSERVICE_SUCCESS = 'GETSERVICE_SUCCESS'; 
export const GETSERVICE_FAILURE = 'GETSERVICE_FAILURE'; 
export const GETSERVICE_REQUEST = 'GETSERVICE_REQUEST';
export const UPDATESERVICE_SUCCESS = 'UPDATESERVICE_SUCCESS'; 
export const UPDATESERVICE_FAILURE = 'UPDATESERVICE_FAILURE'; 
export const UPDATESERVICE_REQUEST = 'UPDATESERVICE_REQUEST';
export const CREATESERVICE_SUCCESS = 'CREATESERVICE_SUCCESS'; 
export const CREATESERVICE_FAILURE = 'CREATESERVICE_FAILURE'; 
export const CREATESERVICE_REQUEST = 'CREATESERVICE_REQUEST';
export const DELETESERVICE_SUCCESS = 'DELETESERVICE_SUCCESS'; 
export const DELETESERVICE_FAILURE = 'DELETESERVICE_FAILURE'; 
export const DELETESERVICE_REQUEST = 'DELETESERVICE_REQUEST';

export default function reducer(
  state = {
    loading: false,
    service: {},
    services:[]
  },
  action
) {
  switch (action.type) {
    case GETSERVICEALL_REQUEST:
    case GETSERVICE_REQUEST:
    case UPDATESERVICE_REQUEST:
    case CREATESERVICE_REQUEST:
    case DELETESERVICE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GETSERVICEALL_FAILURE:
    case GETSERVICE_FAILURE:
    case UPDATESERVICE_FAILURE:
    case CREATESERVICE_FAILURE:
    case DELETESERVICE_FAILURE:
      return {
        ...state,
        loading: false
      };
    
    case CREATESERVICE_SUCCESS:
    case DELETESERVICE_SUCCESS:
    case UPDATESERVICE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case GETSERVICE_SUCCESS:
      return {
        ...state,
        service: action.service,
        loading: false
      };
    case GETSERVICEALL_SUCCESS:
      return {
        ...state,
        services: action.services,
        loading: false
      };
  }
  return state;
}