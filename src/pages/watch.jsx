import React, { useState, useEffect } from "react";
import axios from "axios";
import Player from "react-player";
import {
  Typography,
  Container,
  CssBaseline,
  makeStyles,
  Grid,
  Paper,
  Divider,
  Input,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton
} from "@material-ui/core";
import ChatRoomIcon from "@material-ui/icons/MeetingRoom";
import AppBar from "../components/appBar";
import {
  subscribeToStream,
  sendTimeStamp,
  sendPauseState,
  sendPlayState,
  subscribeToChat,
  authenticate,
  _sendNewMsg,
  sendMessage,
  togglePlayState,
  akabr
} from "../components/socketIOLib";
// Redux
import { connect } from "react-redux";
import { userActions } from "../redux/actions/user";

const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    height: "100%",
    padding: theme.spacing(2)
  },
  listClass: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    height: 2,
    maxHeight: 23
  },
  FUCKOFFB: {
    maxHeight: "200px",
    height: "20px"
  }
}));
const Page = ({ ...props }) => {
  let [timestamp, setTS] = useState(0);
  let [chat, appendChat] = useState([]);
  let [isPlaying, setPS] = useState(false);
  let pp = React.useRef();
  let chatEndRef = React.useRef(null);

  useEffect(() => {
    authenticate(props.user.token);
    akabr(req => {
      console.log("GOT RESPONSE FROM SERVER FOR PLAY STATE");
      setPS(req);
      console.log(isPlaying);
    });
    subscribeToStream((method, ts) => {
      switch (method) {
        case "timestamp":
          pp.current.seekTo(parseFloat(ts));
          break;
        default:
          break;
      }
    });
    subscribeToChat(message => {
      console.group(message);
      appendChat(lastVal => lastVal.concat(message));
      scrollToBottom();
    });
  }, []);
  function togglePlayPause() {
    setPS(preVal => !preVal);
    togglePlayState(props.user.token, !isPlaying);
  }
  const scrollToBottom = () => {
    try {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (e) {
      return null;
    }
  };
  const classes = useStyles();
  function NIGAS(aaa) {
    setTS(aaa);
  }
  return (
    <>
      <CssBaseline />
      <AppBar style={{ zIndex: 2349 }} />
      <Grid
        container
        className={classes.root}
        direction="row"
        justify="space-between"
      >
        <Grid item>
          <ul>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a, i) => (
              <li key={i}>hi</li>
            ))}
          </ul>
        </Grid>
        <Grid item alignItems="center" alignContent="center">
          <Player
            playing={isPlaying}
            ref={pp}
            controls
            url="/assets/ouput/matrix/output.m3u8"
            width="1280px"
            height="720px"
            onProgress={e => NIGAS(e.playedSeconds)}
            config={{
              file: {
                forceHLS: true
              }
            }}
          />
          <Typography variant="h4" onClick={_sendNewMsg}>
            Playing: Matrix
          </Typography>
          <Typography>TIMESTAMP: {timestamp}</Typography>
        </Grid>
        <Grid item xs={3} alignItems="center">
          <ChatBox
            classes={classes}
            chat={chat}
            scrollToBottom={scrollToBottom}
            chatEndRef={chatEndRef}
            sendMessage={sendMessage}
            token={props.user.token}
            togglePlayPause={togglePlayPause}
            isPlaying={isPlaying}
          />
        </Grid>
      </Grid>
    </>
  );
};
/* 





*/
/*
<section className={classes.Video}>

      </section>
      <section className={classes.Chat}></section>
*/
function Dd({ ...props }) {
  const classes = { props };
  return props.chat.map((e, i) => (
    <>
      <ListItem key={`LS-${i}`} alignItems="flex-start">
        <ListItemAvatar key={`LSAA-${i}`}>
          <Avatar
            style={{ width: 32, height: 32 }}
            alt={e.username}
            src={e.avatar}
            key={`LSA-${i}`}
          />
        </ListItemAvatar>
        <ListItemText
          style={{ textOverflow: "ellipsis" }}
          key={`LSTT-${i}`}
          primary={TextAbstract(`${e.username} at ${e.ts}`, 40)}
          secondary={
            <React.Fragment key={`LSF-${i}`}>
              <Typography
                key={`LST-${i}`}
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {e.message}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider />
    </>
  ));
}
function ChatBox({ ...props }) {
  const [message, setMessage] = React.useState("");
  const {
    classes,
    chat,
    scrollToBottom,
    chatEndRef,
    sendMessage,
    token
  } = props;
  function _sendMsg(event) {
    if (event) event.preventDefault();
    if (!message) return;
    sendMessage(token, message);
    setMessage("");
  }
  function toggleGetUsers() {
    console.clear();
  }
  return (
    <>
      <Paper className={classes.paper} square>
        <Grid container direction="column">
          <Grid item container>
            <Typography variant="h4">Movie Chat</Typography>
            <IconButton
              edge="end"
              aria-label="room"
              color="primary"
              onClick={toggleGetUsers}
            >
              <ChatRoomIcon />
            </IconButton>
          </Grid>
          <Divider />
          <Grid
            item
            classes={classes.FUCKOFFB}
            style={{
              maxHeight: 600,
              maxWidth: "100%",
              height: 800,
              overflow: "auto",
              wordBreak: "break-all"
            }}
          >
            <List classes={classes.listClass}>
              <Dd
                chat={chat}
                scrollToBottom={scrollToBottom}
                classes={classes}
              />
              <div ref={chatEndRef} />
            </List>
          </Grid>
          <Divider />
          <Grid item xs>
            <Grid item xs container>
              <Grid item xs>
                <form onSubmit={e => _sendMsg(e)}>
                  <Input
                    placeholder="Send a message"
                    fullWidth={true}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </form>
              </Grid>
              <Button type="submit" onClick={_sendMsg}>
                Send
              </Button>
              <Button onClick={() => props.togglePlayPause()}>
                {props.isPlaying ? "Pause" : "Play"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
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

const connectedHomePage = connect(mapState, actionCreators)(Page);
export default connectedHomePage;
function TextAbstract(text, length) {
  if (text == null) {
    return "";
  }
  if (text.length <= length) {
    return text;
  }
  text = text.substring(0, length);
  let last = text.lastIndexOf(" ");
  text = text.substring(0, last);
  return text + "...";
}
