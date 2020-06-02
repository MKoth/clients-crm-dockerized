export const GETGROUPALL_FAILURE = 'GETGROUPALL_FAILURE'; 
export const GETGROUPALL_REQUEST = 'GETGROUPALL_REQUEST'; 
export const GETGROUPALL_SUCCESS = 'GETGROUPALL_SUCCESS';
export const GETGROUP_SUCCESS = 'GETGROUP_SUCCESS'; 
export const GETGROUP_FAILURE = 'GETGROUP_FAILURE'; 
export const GETGROUP_REQUEST = 'GETGROUP_REQUEST';
export const UPDATEGROUP_SUCCESS = 'UPDATEGROUP_SUCCESS'; 
export const UPDATEGROUP_FAILURE = 'UPDATEGROUP_FAILURE'; 
export const UPDATEGROUP_REQUEST = 'UPDATEGROUP_REQUEST';
export const CREATEGROUP_SUCCESS = 'CREATEGROUP_SUCCESS'; 
export const CREATEGROUP_FAILURE = 'CREATEGROUP_FAILURE'; 
export const CREATEGROUP_REQUEST = 'CREATEGROUP_REQUEST';
export const DELETEGROUP_SUCCESS = 'DELETEGROUP_SUCCESS'; 
export const DELETEGROUP_FAILURE = 'DELETEGROUP_FAILURE'; 
export const DELETEGROUP_REQUEST = 'DELETEGROUP_REQUEST';

export default function reducer(
  state = {
    loading: false,
    group: {},
    groups:[]
  },
  action
) {
  switch (action.type) {
    case GETGROUPALL_REQUEST:
    case GETGROUP_REQUEST:
    case UPDATEGROUP_REQUEST:
    case CREATEGROUP_REQUEST:
    case DELETEGROUP_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GETGROUPALL_FAILURE:
    case GETGROUP_FAILURE:
    case UPDATEGROUP_FAILURE:
    case CREATEGROUP_FAILURE:
    case DELETEGROUP_FAILURE:
      return {
        ...state,
        loading: false
      };
    case CREATEGROUP_SUCCESS:
    case DELETEGROUP_SUCCESS:
    case UPDATEGROUP_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case GETGROUP_SUCCESS:
      return {
        ...state,
        group: action.group,
        loading: false
      };
    case GETGROUPALL_SUCCESS:
      return {
        ...state,
        groups: action.groups,
        loading: false
      };
  }
  return state;
}