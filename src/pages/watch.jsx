import React, { useState, useEffect } from "react";
import axios from "axios";
import Player from "react-player";
import {
  Typography,
  Container,
  CssBaseline,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  Video: {
    height: "calc(100% - 64px)",
    background: "red"
  }
}));
export default () => {
  //   let [userData, changeUserData] = useState({});
  //   let [isLoggedIn, changeLogin] = useState(true);
  //   useEffect(() => {
  //     console.log(localStorage.getItem("jwt"));
  //     // Try to login and get the shit
  //     axios({
  //       method: "GET",
  //       url: `/api/users/info/${localStorage.getItem("username")}`,
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("jwt")
  //       }
  //     })
  //       .then(res => {
  //         console.log(res.data.data);
  //         if (res.status === 200) {
  //           if (res.data) {
  //             changeLogin(true);
  //             changeUserData(res.data.data);
  //           }
  //         }
  //       })
  //       .catch(e => {
  //         console.error("couldnt login");
  //         changeLogin(false);
  //         changeUserData(false);
  //       });
  //   }, []);
  const classes = useStyles();
  return (
    <Container>
      <CssBaseline />
      <section className={classes.Video}>
        <Player
          controls
          url="/assets/ouput/output.m3u8"
          config={{
            file: {
              forceHLS: true
            }
          }}
        />
      </section>
      <section className={classes.Chat}></section>
    </Container>
  );
};
