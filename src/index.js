import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { BrowserRouter, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </BrowserRouter>
  );
};
ReactDOM.render(<Router />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
