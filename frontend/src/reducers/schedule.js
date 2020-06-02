export const GETSCHEDULEALL_FAILURE = 'GETSCHEDULEALL_FAILURE'; 
export const GETSCHEDULEALL_REQUEST = 'GETSCHEDULEALL_REQUEST'; 
export const GETSCHEDULEALL_SUCCESS = 'GETSCHEDULEALL_SUCCESS';
export const GETSCHEDULE_SUCCESS = 'GETSCHEDULE_SUCCESS'; 
export const GETSCHEDULE_FAILURE = 'GETSCHEDULE_FAILURE'; 
export const GETSCHEDULE_REQUEST = 'GETSCHEDULE_REQUEST';
export const UPDATESCHEDULE_SUCCESS = 'UPDATESCHEDULE_SUCCESS'; 
export const UPDATESCHEDULE_FAILURE = 'UPDATESCHEDULE_FAILURE'; 
export const UPDATESCHEDULE_REQUEST = 'UPDATESCHEDULE_REQUEST';
export const CREATESCHEDULE_SUCCESS = 'CREATESCHEDULE_SUCCESS'; 
export const CREATESCHEDULE_FAILURE = 'CREATESCHEDULE_FAILURE'; 
export const CREATESCHEDULE_REQUEST = 'CREATESCHEDULE_REQUEST';
export const DELETESCHEDULE_SUCCESS = 'DELETESCHEDULE_SUCCESS'; 
export const DELETESCHEDULE_FAILURE = 'DELETESCHEDULE_FAILURE'; 
export const DELETESCHEDULE_REQUEST = 'DELETESCHEDULE_REQUEST';

export default function reducer(
  state = {
    loading: false,
    schedule: {},
    schedules:[]
  },
  action
) {
  switch (action.type) {
    case GETSCHEDULEALL_REQUEST:
    case GETSCHEDULE_REQUEST:
    case UPDATESCHEDULE_REQUEST:
    case CREATESCHEDULE_REQUEST:
    case DELETESCHEDULE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GETSCHEDULEALL_FAILURE:
    case GETSCHEDULE_FAILURE:
    case UPDATESCHEDULE_FAILURE:
    case CREATESCHEDULE_FAILURE:
    case DELETESCHEDULE_FAILURE:
      return {
        ...state,
        loading: false
      };
    case DELETESCHEDULE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case GETSCHEDULE_SUCCESS:
    case UPDATESCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: action.schedule,
        loading: false
      };
    case CREATESCHEDULE_SUCCESS:
    case GETSCHEDULEALL_SUCCESS:
      return {
        ...state,
        schedules: action.schedules,
        loading: false
      };
  }
  return state;
}