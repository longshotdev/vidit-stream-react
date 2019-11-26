import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
export default ({ ...props }) => {
  const [text, setText] = useState("hello alien");
  useEffect(() => {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
      setText("Good morning");
    } else if (curHr < 18) {
      setText("Good afternoon");
    } else {
      setText("Good evening");
    }
  }, []);
  return (
    <Typography variant="h2" align="center">
      {text}, {props.children}
    </Typography>
  );
};
