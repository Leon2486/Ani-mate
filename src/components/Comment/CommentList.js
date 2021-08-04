import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid, CircularProgress, Typography } from "@material-ui/core";

import Comment from "./Comment";

function CommentList(props) {
  const { comments, postId, loading, fetchComments } = props;

  useEffect(() => {
    fetchComments(postId);
  }, []);

  const renderComment = () => {
    if (loading)
      return (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <CircularProgress />
        </Grid>
      );

    return comments.map(({ content, userId, commentId, authorName }) => {
      return (
        <Comment
          content={content}
          userId={userId}
          commentId={commentId}
          postId={postId}
          authorName={authorName}
        />
      );
    });
  };

  return (
    <div className="comment">
      <Typography variant="h6" gutterBottom>
        {`${comments.length} comments`}
      </Typography>
      {renderComment()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    comments: Object.values(state.comment.comments),
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(CommentList);
