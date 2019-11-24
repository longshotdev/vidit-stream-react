import React from "react";
import { Typography, Link } from "@material-ui/core";
export default () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/longshotdev">
        Longshot Development
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
