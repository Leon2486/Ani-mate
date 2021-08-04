import React, { useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";

import { fetchFollowPostList } from "../../actions";
import PostCard from "../Post/PostCard";

function FollowPostPage(props) {
  const { fetchFollowPostList, follow, followId } = props;
  useEffect(() => {
    fetchFollowPostList();
  }, [followId]);

  const renderFollow = () => {
    return follow.map(
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
    if (!follow.length) {
      return (
        <Typography variant="h4" style={{ margin: "10px 0" }}>
          not following any post
        </Typography>
      );
    }

    return (
      <Typography variant="h4" style={{ margin: "10px 0" }}>
        Post followed
      </Typography>
    );
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      {renderTitle()}
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {renderFollow()}
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    follow: Object.values(state.post.followedPostList),
    followId: state.post.followedPostId,
  };
};

export default connect(mapStateToProps, { fetchFollowPostList })(
  FollowPostPage
);
