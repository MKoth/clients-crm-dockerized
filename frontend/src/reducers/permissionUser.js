export const PERMISSION_USER_REQUEST = "PERMISSION_USER_REQUEST";
export const PERMISSION_USER_SUCCESS = "PERMISSION_USER_SUCCESS";
export const PERMISSION_USER_FAILURE = "PERMISSION_USER_FAILURE";
export const PERMISSION_USERALL_REQUEST = "PERMISSION_USERALL_REQUEST";
export const PERMISSION_USERALL_SUCCESS = "PERMISSION_USERALL_SUCCESS";
export const PERMISSION_USERALL_FAILURE = "PERMISSION_USERALL_FAILURE";
export const PERMISSION_USER_ADD_REQUEST = "PERMISSION_USER_ADD_REQUEST";
export const PERMISSION_USER_ADD_SUCCESS = "PERMISSION_USER_ADD_SUCCESS";
export const PERMISSION_USER_ADD_FAILURE = "PERMISSION_USER_ADD_FAILURE";
export const PERMISSION_USER_UPDATE_REQUEST = "PERMISSION_USER_UPDATE_REQUEST";
export const PERMISSION_USER_UPDATE_SUCCESS = "PERMISSION_USER_UPDATE_SUCCESS";
export const PERMISSION_USER_UPDATE_FAILURE = "PERMISSION_USER_UPDATE_FAILURE";

export default function reducer(
  state = {
    loading: false,
    user: {},
    users:[]
  },
  action
) {
  switch (action.type) {
    case PERMISSION_USER_REQUEST:
    case PERMISSION_USERALL_REQUEST:
    case PERMISSION_USER_ADD_REQUEST:
    case PERMISSION_USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case PERMISSION_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false
      };
    case PERMISSION_USERALL_SUCCESS:
      return {
        ...state,
        users: action.users,
        loading: false
      };
    case PERMISSION_USER_ADD_SUCCESS:
    case PERMISSION_USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case PERMISSION_USER_FAILURE:
    case PERMISSION_USERALL_FAILURE:
    case PERMISSION_USER_ADD_FAILURE:
    case PERMISSION_USER_UPDATE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
  }
  return state;
}