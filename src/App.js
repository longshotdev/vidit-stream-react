import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Router as BrowserRouter, Switch, Route } from "react-router-dom";
// Pages
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import App from "./pages/Index";
import Profile from "./pages/protected/Profile";
import Watch from "./pages/watch";
import NotFound from "./pages/NotFound";
// Redux
import history from "./redux/helpers/history";
import alertActions from "./redux/actions/alert";
const Router = ({ ...props }) => {
  useEffect(() => {
    history.listen((location, action) => {
      props.clearAlerts();
    });
  }, []);
  const { alert } = props;
  return (
    <>
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      <BrowserRouter history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" exact component={App} />
          <Route path="/d" component={Profile} />
          <Route path="/watch" component={Watch} />
          {/** NOTHING ELSE SHOULD GO BELOW THIS LINE.*/}
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(Router);
export default connectedApp;
