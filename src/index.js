import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Watch from "./pages/watch";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Profile from "./pages/Home";
const Router = () => {
  return (
    <BrowserRouter>
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
  );
};
ReactDOM.render(<Router />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
