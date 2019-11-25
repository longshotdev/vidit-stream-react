import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  makeStyles
} from "@material-ui/core";

import { connect } from "react-redux";
import { userActions } from "../redux/actions/user";
const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  }
}));
const Component = ({ ...props }) => {
  useEffect(() => {
    console.log(props.user);
  }, []);
  const { user } = props;
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolBar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Vidit Streaming
        </Typography>
        <nav>
          <Link
            variant="button"
            className={classes.link}
            color="textPrimary"
            href="/watch"
          >
            Watch
          </Link>
          <Link
            variant="button"
            className={classes.link}
            color="textPrimary"
            href="/stream"
          >
            Stream
          </Link>
          <Link
            variant="button"
            className={classes.link}
            color="textPrimary"
            href="/d"
          >
            Dashboard
          </Link>
        </nav>
        {!user ? (
          <Button
            href="/login"
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            Login
          </Button>
        ) : (
          <SignedIn user={user.user} lg={props.logout} />
        )}
      </Toolbar>
    </AppBar>
  );
};
const SignedIn = ({ ...props }) => {
  const { user, lg } = props;
  return (
    <React.Fragment>
      <img
        src={user.avatar}
        alt="profilepic"
        height={64}
        width={64}
        style={{ borderRadius: "50%" }}
      />
      )<Button onClick={() => lg()}>Logout</Button>
    </React.Fragment>
  );
};
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

const connectedHomePage = connect(mapState, actionCreators)(Component);
export default connectedHomePage;
