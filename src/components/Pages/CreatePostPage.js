import React from "react";
import { connect } from "react-redux";
import history from "../../history";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import PostForm from "../Post/PostForm";
import { createPost } from "../../actions";

const date = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const createDate = {
  date: [months[date.getMonth()], date.getDate(), date.getFullYear()],
  time: [date.getHours(), date.getMinutes(), date.getSeconds()],
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function CreatePostPage({ createPost, isSignedIn, loading }) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <PostForm onSubmit={createPost} createDate={createDate} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, loading: state.loading };
};

export default connect(mapStateToProps, { createPost })(CreatePostPage);
