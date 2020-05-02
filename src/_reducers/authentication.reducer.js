import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: false, user } : {};

export function authentication(state = initialState, action) {
  //
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: true,
        token: action.token
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.RELOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.RELOGIN_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: true,
        redirectPage: action.redirectPage
      };
    case userConstants.RELOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}