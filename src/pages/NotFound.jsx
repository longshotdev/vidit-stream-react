import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Typography, Container, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));
export default () => {
  const [seconds, setSeconds] = useState(10);
  useEffect(() => {
    setInterval(() => setSeconds(seconds - 1), 1000);
  }, [seconds]);
  if (seconds !== 0) {
    return (
      <Container>
        <Paper>
          <Typography variant="h1" align="center">
            404 Not Found.
          </Typography>
          <Typography variant="h2" align="center">
            Redirecting to Homepage in {seconds} seconds.
          </Typography>
        </Paper>
      </Container>
    );
  } else {
    return <Redirect to="/" />;
  }
};
