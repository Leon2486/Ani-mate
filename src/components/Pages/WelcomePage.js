import React from "react";
import { Typography, Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  container: {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  text: {
    marginBottom: "20px",
  },
  title: {
    textAlign: "center",
  },
});

export default function WelcomePage() {
  const classes = useStyle();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h3" gutterBottom className={classes.title}>
        welcome animate lovers
      </Typography>
      <Typography variant="body1" className={classes.text}>
        a nice place to share your opinion with all animate fans, please be
        peace with other guys.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/forum">
        Get stared
      </Button>
    </Container>
  );
}
