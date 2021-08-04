import React, { useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PostCard from "../Post/PostCard";
import { fetchPosts } from "../../actions";

const useStyle = makeStyles((theme) => ({
  loading: {
    display: "flex",
    justifyContent: "center",
  },
  createPost: {
    display: "flex",
    width: "30%",
    margin: "20px 0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  container: {
    padding: "20px",
  },
}));

function ForumPage(props) {
  const { fetchPosts, postList, isSignedIn, loading } = props;
  const classes = useStyle();

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPost = () => {
    if (loading)
      return (
        <Grid item xs={12} className={classes.loading}>
          <CircularProgress />
        </Grid>
      );

    return postList.map(
      ({ title, content, postId, createDate, authorId, authorName }) => {
        return (
          <PostCard
            title={title}
            content={content}
            postId={postId}
            createDate={createDate}
            authorId={authorId}
            authorName={authorName}
            key={postId}
          />
        );
      }
    );
  };

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <Card className={classes.createPost}>
          <CardContent style={{ marginRight: "auto" }}>
            create your post
          </CardContent>
          <CardActions>
            <Button color="primary" component={Link} to="/create">
              go
            </Button>
          </CardActions>
        </Card>
      );
    }

    return null;
  };

  return (
    <div>
      <Container maxWidth="md" className={classes.container}>
        {renderCreate()}
        <Grid container spacing={3}>
          {renderPost()}
        </Grid>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    postList: Object.values(state.post.postList),
    isSignedIn: state.auth.isSignedIn,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, { fetchPosts })(ForumPage);
