import React, { useEffect } from "react";
import Footer from "../components/Footer";
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
import ABar from "../components/appBar";
import { connect } from "react-redux";
import { userActions } from "../redux/actions/user";
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
    background: "white",
    color: "white"
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    background: "url('/assets/images/bg4k.jpg')"
  }
}));
const Index = ({ ...props }) => {
  useEffect(() => {
    console.log(props.user);
  }, []);
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <ABar />
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
      <Footer />
    </>
  );
};
function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete
};

const connectedHomePage = connect(mapState, actionCreators)(Index);
export default connectedHomePage;
