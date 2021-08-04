import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { reduxForm, Field } from "redux-form";
import { Link as RouteLink } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="primary" component={RouteLink} to="/">
        Ani-mate
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Input = (props) => {
  const { input, meta } = props;
  if (meta.error && meta.touched) {
    return (
      <TextField
        error
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label={input.name}
        autoComplete="text"
        helperText={meta.error}
        {...input}
      />
    );
  }
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={input.name}
      autoComplete="text"
      {...input}
    />
  );
};

function SignForm(props) {
  const { text, onSubmit, handleSubmit } = props;

  const classes = useStyles();

  const onFormSubmit = (formValues) => {
    const { email, password, username } = formValues;
    onSubmit(email, password, username);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {text}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onFormSubmit)}>
          <Field name="username" component={Input} autoFocus></Field>
          <Field name="email" component={Input}></Field>
          <Field name="password" component={Input}></Field>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {text}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const validate = (formValues) => {
  const error = {};
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!formValues.username) {
    error.username = "you need a name";
  }
  if (!formValues.password) {
    error.password = "password please";
  }
  if (formValues.password && formValues.password.length < 6) {
    error.password = "at least 6 characters for password";
  }
  if (!emailPattern.test(formValues.email)) {
    error.email = "I know this is not email";
  }
  return error;
};

export default reduxForm({ form: "signUp", validate })(SignForm);
