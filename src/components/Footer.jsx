import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Copyright from "./Copyright";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: "white"
  }
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1" align="center">
            Contact us via{" "}
            <Link color="primary" href="https://github.com/longshotdev">
              Github
            </Link>{" "}
            <Link color="primary" href="https://twitter.com/andyiscool5463">
              Twitter
            </Link>{" "}
            <Link color="primary" href="https://discord.gg/WDjGe5D">
              Discord
            </Link>
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
