import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import PostCard from "../Post/PostCard";
import { fetchMyPost } from "../../actions";

const useStyles = makeStyles({
  loading: {
    display: "grid",
    justifyContent: "center",
  },
  title: {
    margin: "20px 0",
  },
});

function MyPostPage(props) {
  const { currentUser, myPost, loading, fetchMyPost } = props;
  const classes = useStyles();

  useEffect(() => {
    fetchMyPost(currentUser);
  }, [currentUser]);

  const renderMyPost = () => {
    if (loading)
      return (
        <Grid item xs={12} className={classes.loading}>
          <CircularProgress />
        </Grid>
      );

    return myPost.map(
      ({ title, content, postId, createDate, authorId, authorName }) => {
        return (
          <PostCard
            title={title}
            content={content}
            postId={postId}
            createDate={createDate}
            authorId={authorId}
            authorName={authorName}
          />
        );
      }
    );
  };

  const renderTitle = () => {
    if (!myPost.length) {
      return (
        <Typography variant="h4" className={classes.title}>
          don't have your post yet
        </Typography>
      );
    }
    return (
      <Typography variant="h4" className={classes.title}>
        my posts
      </Typography>
    );
  };

  return (
    <Container maxWidth="md">
      {renderTitle()}
      <Grid container spacing={3}>
        {renderMyPost()}
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.id,
    myPost: Object.values(state.post.myPost),
    loading: state.loading,
  };
};

export default connect(mapStateToProps, { fetchMyPost })(MyPostPage);
