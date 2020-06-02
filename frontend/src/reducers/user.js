export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const GETUSERALL_REQUEST = "GETUSERALL_REQUEST";
export const GETUSERALL_SUCCESS = "GETUSERALL_SUCCESS";
export const GETUSERALL_FAILURE = "GETUSERALL_FAILURE";
export const GETUSER_REQUEST = "GETUSER_REQUEST";
export const GETUSER_SUCCESS = "GETUSER_SUCCESS";
export const GETUSER_FAILURE = "GETUSER_FAILURE";

export default function reducer(
  state = {
    loading: false,
    loggedId: false,
    error: false,
    user: {},
    users:[]
  },
  action
) {
  switch (action.type) {
    case LOGIN_REQUEST:
    case GETUSERALL_REQUEST:
    case GETUSER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedId: true,
        loading: false
      };
    case LOGIN_FAILURE:
    case GETUSERALL_FAILURE:
    case GETUSER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case GETUSER_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false
      };
    case GETUSERALL_SUCCESS:
      return {
        ...state,
        users: action.users,
        loading: false
      };
    case LOGOUT:
      return {
        ...state,
        loading: false
      };
  }
  return state;
}
