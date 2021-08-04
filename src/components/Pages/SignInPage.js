import React, { useState } from "react";
import history from "../../history";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SignInForm from "../Auth/SignInForm";
import firebase from "../../firebase";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function SignInPage() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const onSubmit = (email, password) => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        history.goBack();
      })
      .catch((e) => {
        setLoading(false);
        alert("user not found");
      });
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <SignInForm text="Sign In" onSubmit={onSubmit} />
    </div>
  );
}
