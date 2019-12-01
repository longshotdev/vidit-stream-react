import userConstants from "../constants/user";
import { userService } from "../services/user";
import alertActions from "./alert";
import history from "../helpers/history";

export const userActions = {
  login,
  logout,
  register,
  changeAvatar,
  getAll,
  delete: _delete
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push("/profile");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  history.push("/logout");
  return dispatch => {
    dispatch({ type: userConstants.LOGOUT });
    dispatch(alertActions.success("Logged out!"));
  };
}
function changeAvatar(user, url) {
  return dispatch => {
    dispatch(request(user));
    userService
      .changeAvatar(user, url)
      .then(_user => {
        dispatch(success(_user));
        dispatch(alertActions.success("Avatar Changed Successfully"));
      })
      .catch(e => dispatch(alertActions.error(failure(e.toString()))));
  };
  function request(user) {
    return { type: userConstants.CHANGE_AVATAR_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.CHANGE_AVATAR_SUCCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.CHANGE_AVATAR_FAILURE, error };
  }
}
function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      user => {
        dispatch(success());
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll().then(
      users => dispatch(success(users)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService.delete(id).then(
      user => dispatch(success(id)),
      error => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
