export const LOADING_START = "COMPANY_LOADING_START";
export const COMPANY_GET = "COMPANY_GET";
export const SOCIALS_GET = "SOCIALS_GET";
export const HOURS_GET = "HOURS_GET";
export const ERROR = "ERROR";

export default function reducer(
  state = {
    loading: false,
    error: '',
    company: {},
    socials: [],
    hours: [],
  },
  action
) {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true
      };
    case COMPANY_GET:
      return {
        ...state,
        company: action.company,
        error:'',
        loading: false
      };
    case SOCIALS_GET:
      return {
        ...state,
        socials: action.socials,
        error:'',
        loading: false
      };
    case HOURS_GET:
      return {
        ...state,
        hours: action.hours,
        error:'',
        loading: false
      };
    case ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      };
  }
  return state;
}
