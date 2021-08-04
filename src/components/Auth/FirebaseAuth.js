import React, { useEffect } from "react";
import firebase from "../../firebase";
import { Button, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { signOut, signIn, fetchFollowPost } from "../../actions";
import UserMenu from "../User/UserMenu";

const useStyle = makeStyles({
  avatar: { marginRight: "5px" },
  signInButton: { marginLeft: "10px" },
  signButtonContainer: { display: "flex", alignItems: "flex-end" },
});

function FirebaseAuth({
  signOut,
  signIn,
  isSignedIn,
  username,
  fetchFollowPost,
  userId,
}) {
  const classes = useStyle();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const { uid, email, displayName } = user;
      signIn(uid, email, displayName);
    } else {
      signOut();
    }
  });

  useEffect(() => {
    if (userId) fetchFollowPost(userId);
  }, [userId]);

  const onSignOutClick = () => {
    firebase.auth().signOut();
  };

  const renderSignButton = () => {
    if (isSignedIn) {
      return (
        <>
          <Avatar src="/broken-image.jpg" className={classes.avatar} />
          <UserMenu username={username} signOut={onSignOutClick} />
        </>
      );
    }

    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/signup"
        >
          sign up
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/signin"
          className={classes.signInButton}
        >
          sign in
        </Button>
      </>
    );
  };

  return (
    <div className={classes.signButtonContainer}>{renderSignButton()}</div>
  );
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    username: state.auth.username,
    userId: state.auth.id,
  };
};

export default connect(mapStateToProps, { signOut, signIn, fetchFollowPost })(
  FirebaseAuth
);
