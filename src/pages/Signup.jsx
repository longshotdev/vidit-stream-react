import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../components/Copyright";
export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let [canBeLoggedin, FUCKFUCKFUCKTHSISHIT] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("jwt") || !localStorage.getItem("username")) {
      FUCKFUCKFUCKTHSISHIT(false);
    } else {
      axios({
        method: "GET",
        url: `/api/users/info/${localStorage.getItem("username")}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      })
        .then(res => {
          console.log(res.data.data);
          if (res.status === 200) {
            if (res.data) {
              FUCKFUCKFUCKTHSISHIT(true);
            }
          }
        })
        .catch(e => {
          console.error("couldnt login");
        });
    }
  }, []);
  const useStyles = makeStyles(theme => ({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));
  const handleSignUp = () => {
    axios({
      method: "POST",
      url: `/api/users/signup`,
      data: {
        username: username,
        password: password
      }
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          // TODO: Redirect to login
          window.location.href = "/login";
        }
      })
      .catch(e => {
        console.error("couldnt login");
      });
  };
  const classes = useStyles();
  if (canBeLoggedin === false) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="email"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => handleSignUp()}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Have an account? Sign In."}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  } else if (canBeLoggedin === true) {
    return <Redirect to="/" />;
  }
};
