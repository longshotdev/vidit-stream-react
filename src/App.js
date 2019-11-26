import React, { useEffect, createRef } from "react";
import { connect } from "react-redux";
import {
  Router as BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Button } from "@material-ui/core";
import { SnackbarProvider, useSnackbar } from "notistack";
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
import PrivateRoute from "./components/PrivateRoute";
const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
};

const Router = ({ ...props }) => {
  useEffect(() => {
    history.listen((location, action) => {
      props.clearAlerts();
    });
  }, []);
  const { enqueueSnackbar } = useSnackbar();
  let { alert } = props;
  console.log(alert);
  if (alert.message) {
    enqueueSnackbar(alert.message, {
      variant: alert.type
    });
    props.clearAlerts();
  }
  return (
    <>
      <BrowserRouter history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" exact component={App} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/watch" component={Watch} />
          <Route path="/logout" render={() => <Redirect to="/" />} />
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

const ConnectedApp = connect(mapState, actionCreators, null, { pure: false })(
  Router
);
export default () => (
  <SnackbarProvider
    maxSnack={3}
    ref={notistackRef}
    action={key => (
      <Button color="primary" onClick={onClickDismiss(key)}>
        'Dismiss'
      </Button>
    )}
  >
    <ConnectedApp />
  </SnackbarProvider>
);
