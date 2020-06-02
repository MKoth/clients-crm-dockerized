import ApiUrl from "./ApiUrl";
import { reactLocalStorage } from "reactjs-localstorage";

var API = {
  login: function(forms) {
    return fetch(ApiUrl.login, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(forms)
    });
  },
  registration: function(forms) {
    return fetch(ApiUrl.registration, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(forms)
    });
  },
  resetPassword: function(forms) {
    return fetch(ApiUrl.resetPassword, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(forms)
    });
  },
  checkEmail: function(forms) {
    return fetch(ApiUrl.checkEmail, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(forms)
    });
  },
  getUser: function() {
    return fetch(ApiUrl.user, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + reactLocalStorage.get("token")
      }
    });
  }
};

export { API as default };
