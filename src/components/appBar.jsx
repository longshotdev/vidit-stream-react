import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  makeStyles,
  Avatar,
  ButtonBase,
  Menu,
  MenuItem,
  ClickAwayListener,
  MenuList,
  Popper,
  Grow,
  Paper
} from "@material-ui/core";

import { connect } from "react-redux";
import { userActions } from "../redux/actions/user";
import history from "../redux/helpers/history";
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
          onClick={() => history.push("/")}
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
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  const handleClose = (event, id) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    switch (id) {
      case 1:
        history.push("/profile");
        break;
      case 2:
        history.push("/account");
        break;
      case 3:
        lg();
        history.push("/logout");
        break;
      default:
        setOpen(false);
        break;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <React.Fragment>
      <ButtonBase
        style={{ borderRadius: "50%" }}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar src={user.avatar} alt="profilepic" />
      </ButtonBase>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        style={{ zIndex: 1000 }}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={e => handleClose(e, 1)}>Profile</MenuItem>
                  <MenuItem onClick={e => handleClose(e, 2)}>
                    My account
                  </MenuItem>
                  <MenuItem onClick={e => handleClose(e, 3)}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
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
