import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
export default ({ component: Component, ...rest }) => {
  let [isLoggedin, setLoggedIn] = useState(false);
  let [user, setUser] = useState({});
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
            setUser(res.data.data);
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
      render={props =>
        localStorage.getItem("jwt") ? (
          <Component {...props} user={user} />
        ) : (
          <Redirect to={{ pathname: "/d", state: { from: props.location } }} />
        )
      }
    />
  );
};
