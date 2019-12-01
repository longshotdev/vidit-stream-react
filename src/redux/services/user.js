import { authHeader } from "../helpers/auth-header";
import axios from "axios";
export const userService = {
  login,
  logout,
  register,
  changeAvatar
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
    .catch(error => {
      return Promise.reject("Wrong Username / Password.");
    });
}

function logout() {
  console.log("YOU ARE NOW LOGGED OUT");
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function register(user) {
  const reqOpt = {
    method: "POST",
    url: "/api/users/signup",
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      username: user.username,
      password: user.password
    }
  };
  console.log("registering");
  return axios(reqOpt)
    .then(handleResponse)
    .catch(error => Promise.reject("el stupidido"));
}
function changeAvatar(user, url) {
  let { token } = user;
  let { id } = user.user;
  console.log(token);
  const reqOpt = {
    method: "PUT",
    url: "/api/users/changeAvatar",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    data: {
      id: id,
      url: url
    }
  };
  return axios(reqOpt)
    .then(d => {
      let userData = handleResponse(d);
      console.log(userData);
      return {
        token: token,
        user: userData
      };
    })
    .catch(e => Promise.reject("Couldn't change avatar."));
}
function handleResponse(response) {
  console.log(response);
  if (response.status === 200) {
    if (response.data.status === 11) {
      // this means no authentication data.
      return response.data.data;
    }
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
    return Promise.reject("Wrong Password.");
  }
}
