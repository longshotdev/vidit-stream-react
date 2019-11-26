import userConstants from "../constants/user";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case userConstants.CHANGE_AVATAR_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.CHANGE_AVATAR_SUCCCESS:
      return {
        loggingIn: true,
        user: action.user
      };
    default:
      return state;
  }
};
