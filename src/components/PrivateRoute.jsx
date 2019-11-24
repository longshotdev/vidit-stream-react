import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
export default ({ children, ...rest }) => {
  let [isLoggedin, setLoggedIn] = useState(false);
  useEffect(() => {
    console.log(localStorage.getItem("jwt"));
    // Try to login and get the shit
    axios({
      method: "GET",
      url: `/api/users/info/${localStorage.getItem("username")}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => {
        console.log(res.data.data);
        if (res.status === 200) {
          if (res.data) {
            setLoggedIn(true);
          }
        }
      })
      .catch(e => {
        console.error("couldnt login");
        setLoggedIn(false);
      });
  }, []);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isLoggedin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
