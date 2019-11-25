import { authHeader } from "../helpers/auth-header";
import axios from "axios";
export const userService = {
  login,
  logout,
  register
};

function login(username, password) {
  // const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ username, password })
  // };

  // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
  //     .then(handleResponse)
  //     .then(user => {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('user', JSON.stringify(user));

  //         return user;
  //     });
  const reqOpt = {
    method: "POST",
    url: "/api/users/login",
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      username: username,
      password: password
    }
  };
  console.log("YOU ARE NOW LOGGED IN.");
  return axios(reqOpt)
    .then(handleResponse)
    .catch(error => console.log(error));
}

function logout() {
  console.log("YOU ARE NOW LOGGED OUT");
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}
function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`/users/register`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript

function handleResponse(response) {
  console.log(response);
  if (response.status === 200) {
    if (response.data) {
      let constructObject = {
        token: response.data.data.token,
        user: response.data.data.userData
      };
      //
      return constructObject;
    }
  } else if (response.status === 400) {
    logout();
    window.location.reload(true);
  }
}
