import React from "react";
import { connect } from "react-redux";
import { CircularProgress, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PostForm from "../Post/PostForm";
import { updatePost, fetchPost } from "../../actions";
import { useEffect } from "react";

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

const editDate = {
  date: [months[date.getMonth()], date.getDate(), date.getFullYear()],
  time: [date.getHours(), date.getMinutes(), date.getSeconds()],
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
}));

function EditPostPage(props) {
  const { updatePost, fetchPost, loading } = props;
  const { post } = props;
  const { id } = props.match.params;
  const classes = useStyles();

  useEffect(() => {
    fetchPost(id);
  }, []);

  if (!post)
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <PostForm
        postId={id}
        initialValues={{ title: post.title, content: post.content }}
        onSubmit={updatePost}
        editDate={editDate}
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.post.postList[ownProps.match.params.id],
    isSignedIn: state.auth.isSignedIn,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, { updatePost, fetchPost })(
  EditPostPage
);
