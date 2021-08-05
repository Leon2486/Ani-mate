import React from "react";
import history from "../../history";

import SignUpForm from "../Auth/SignUpForm";
import firebase from "../../firebase";

export default function SignUpPage() {
  const onSubmit = (email, password, username) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        userCredential.user.sendEmailVerification();
        firebase.auth().signOut();
        userCredential.user.updateProfile({
          displayName: username,
        });
      });
    alert("verification sent");
    history.push("/forum");
  };

  return (
    <div>
      <SignUpForm text="Sign Up" onSubmit={onSubmit} />
    </div>
  );
}
