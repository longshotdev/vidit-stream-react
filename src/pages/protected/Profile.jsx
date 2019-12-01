import React, { useState, useEffect } from "react";
import {
  Typography,
  Avatar,
  makeStyles,
  Paper,
  Grid,
  CssBaseline,
  Button,
  Input,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";
import ShowDate from "../../components/showDate";
import { connect } from "react-redux";
import { userActions } from "../../redux/actions/user";
import AppBar from "../../components/appBar";
import Footer from "../../components/Footer";
import {
  subscribeToChat,
  getUsersInChat,
  sendMessage,
  authenticate
} from "../../components/socketIOLib";

const useStyles = makeStyles(theme => ({
  root: {},
  focusvisible: {},
  bigAvatar: {
    width: 256,
    height: 256
  },
  regularAvatar: {
    width: 128,
    height: 128,
    margin: "auto",
    display: "block",
    "&:hover, &$focusVisible": {
      zIndex: 4,
      "& $edit": {
        display: "block"
      },
      "& $regularAvatar": {
        opacity: "0.4",
        filter: "alpha(opacity=40)" /* msie */
      }
    }
  },
  inline: {
    display: "inline"
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "100%"
  },
  edit: {
    zIndex: 4,
    paddingTop: "7px",
    paddingRight: "7px",
    position: "absolute",
    right: 0,
    top: 0,
    display: "none"
  }
}));
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcklEIjoiNWRkOWJkNzVhZGQ2M2MzMTFjOGM3NDk1IiwiaWF0IjoxNTc0ODA0NzQyLCJleHAiOjE1NzQ4MDgzNDJ9.28uUPNncHUHG6pdoXRV9Cu2tHt9GlCiHoE6Tp155dJM"
function App({ ...props }) {
  let [aURL, setAURL] = useState("");
  let [avatarOpen, setAvatarOpen] = useState(false);
  let [urlErrorBool, setURLErrorBool] = useState(false);
  let [urlError, setURLError] = useState("");
  let { user } = props.user;

  // useEffect(() => {
  //   authenticate(props.user, data => {
  //     console.log(data);
  //     setwsData(data);
  //   });
  //   getUsersInChat(d => console.log(d));
  //   subscribeToChat(chatMessage => {
  //     let temp = catte;
  //     temp.push(chatMessage);
  //     setC(temp);
  //     console.log(catte);
  //   });
  // }, []);

  let updatedaURL = txt => {
    setAURL(txt);
    setURLErrorBool(false);
  };
  let setAvatar = () => {
    console.log("setting av");
    props.changeAvatar(props.user, aURL);
  };
  let avatarHandleClose = type => {
    // avt close / set
    // type = 1 cancel // type = 2 submit
    if (type === 1) {
      setAvatarOpen(false);
    } else {
      // Regex
      let regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
      if (regex.test(aURL)) {
        setAvatar();
        setAvatarOpen(false);
      } else {
        setURLErrorBool(true);
        setURLError("Input a correct URL (Make sure it ends in a .png / .jpg)");
      }
    }
  };
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar />
      <Grid container className={classes.root}>
        <Grid item xs={4}>
          <Avatar
            alt="Avatar"
            src={user.avatar}
            className={classes.bigAvatar}
          />
          <Typography>Username: {user.username}</Typography>
          <Typography>ID: {user.id}</Typography>
        </Grid>
        <Grid item xs={6}>
          <ShowDate>
            <strong onClick={() => sendMessage(props.user.token, "hi")}>
              {user.username}
            </strong>
            .
          </ShowDate>
          <ButtonBase
            focusRipple
            className={classes.regularAvatar}
            focusVisibleClassName={classes.focusVisible}
            style={{ borderRadius: "50%" }}
            onClick={() => setAvatarOpen(true)}
          >
            <Avatar src={user.avatar} className={classes.regularAvatar} />
            <Avatar
              src="/assets/resources/hoverEdit.jpg"
              className={classes.edit}
            />
          </ButtonBase>
          <AvatarInputDialog
            avatarOpen={avatarOpen}
            avatarHandleClose={avatarHandleClose}
            urlError={urlError}
            setURLError={setURLError}
            urlErrorBool={urlErrorBool}
            setURLErrorBool={setURLErrorBool}
            updatedURL={updatedaURL}
            URL={aURL}
          />
          <Paper className={classes.paper}>
            <Typography
              variant="h4"
              onClick={() => getUsersInChat(users => console.log(users))}
            >
              Posts
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
function AvatarInputDialog({ ...props }) {
  return (
    <Dialog
      open={props.avatarOpen}
      onClose={props.avatarHandleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Change Avatar</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To change your avatar, enter a valid URL (needs to end in .png / .jpg)
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="URL"
          placeholder="https://google.com/myPicture.png"
          type="url"
          fullWidth
          helperText={props.urlError}
          onChange={e => props.updatedURL(e.target.value)}
          error={props.urlErrorBool}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.avatarHandleClose(1)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => props.avatarHandleClose(2)} color="primary">
          Set
        </Button>
      </DialogActions>
    </Dialog>
  );
}
function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
  login: userActions.login,
  logout: userActions.logout,
  changeAvatar: userActions.changeAvatar
};

const connectedHomePage = connect(mapState, actionCreators)(App);
export default connectedHomePage;
