import React from "react";
import Footer from "./components/Footer";
import {
  makeStyles,
  Container,
  Typography,
  AppBar,
  CssBaseline,
  Toolbar,
  Link,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    },
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  root: {
    height: "100vh",
    backgroundImage: "url('/assets/images/bg4k.jpg')",
    color: "white"
  },
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
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    background: "url('/assets/images/bg4k.jpg')"
  }
}));
export default () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
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
          <Button
            href="/login"
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Vidit Streaming
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          The worst shit u probably seen so far
        </Typography>
      </Container>
    </>
  );
};
