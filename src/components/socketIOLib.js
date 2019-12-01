import openSocket from "socket.io-client";
const chat = openSocket("http://localhost:6969/chat", {
  transports: ["websocket", "polling"]
});
const stream = openSocket("http://localhost:6969/stream");
function subscribeToChat(cb) {
  // Inside connect
  chat.on("message", cc => {
    console.log("LLL");
    cb(cc);
  });
}
function authenticate(user, cb) {
  console.log(user);
  chat.emit("authenticate", { token: user }, data => {
    // Verified....
  });
}
function sendMessage(token, message) {
  console.log(message);
  chat.emit("sendMsg", token, message);
}
function getUsersInChat(cb) {
  chat.emit("getAllUsers", data => cb(data));
}
function _sendNewMsg() {
  chat.emit("NIGGERS420");
}
// STREAM SHIT
function subscribeToStream(cb) {
  stream.on("getTS", timestamp => {
    return cb("timestamp", timestamp);
  });
  stream.on("pause", () => {
    console.log("Paused.");
    return cb("pause");
  });
  stream.on("play", () => {
    console.log("Play.");
    return cb("play");
  });
}
function sendTimeStamp(token, timestamp) {
  stream.emit("getTimeStamp", { token, timestamp });
}
function sendPauseState(token) {
  stream.emit("getPauseState", token);
}
function sendPlayState(token) {
  stream.emit("play", token);
}
function togglePlayState(token, state) {
  stream.emit("toggleSS", state, token);
}
function akabr(cc) {
  stream.on("playState", state => {
    return cc(state);
  });
}
export {
  subscribeToChat,
  sendMessage,
  getUsersInChat,
  authenticate,
  subscribeToStream,
  sendTimeStamp,
  sendPauseState,
  sendPlayState,
  _sendNewMsg,
  togglePlayState,
  akabr
};
