/*
  im too fucking lazy to do shit so thats why its a class component instead of a functional one

 */

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../redux/actions/user";
const PrivateRoute = ({ component: Component,...rest,}) => {
  return (
  <Route
    {...rest}
    component={props => rest.user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
)};
function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
  login: userActions.login,
  logout: userActions.logout
};

const connectedHomePage = connect(mapState, actionCreators)(PrivateRoute);
export default connectedHomePage;
