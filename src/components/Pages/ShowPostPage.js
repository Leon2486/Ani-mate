import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardActions,
  Container,
  CardContent,
  Typography,
  Button,
  Divider,
  TextField,
} from "@material-ui/core";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import { makeStyles } from "@material-ui/core/styles";

import {
  fetchPost,
  createComment,
  fetchComments,
  followPost,
  removeFollowPost,
} from "../../actions";
import Comment from "../Comment/CommentList";

const useStyle = makeStyles((theme) => ({
  createComment: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: "30px",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
  },
  container: {
    padding: "20px",
  },
  postContainer: {
    padding: "20px",
    marginBottom: "20px",
  },
  commentTextInput: {
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  commentButton: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
    },
  },
}));

function ShowPostPage(props) {
  const [comment, setComment] = useState("");
  const { id } = props.match.params;
  const {
    isSignedIn,
    post,
    follow,
    currentUser,
    fetchPost,
    createComment,
    fetchComments,
    followPost,
    removeFollowPost,
  } = props;
  const classes = useStyle();

  useEffect(() => {
    if (!post) fetchPost(id);
  }, []);

  const onCommentButtonClick = () => {
    createComment(comment, id);
    setComment("");
  };

  const renderContent = () => {
    if (post) {
      return (
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" component="pre">
            {post.content}
          </Typography>
        </CardContent>
      );
    }
    return <div className="">loading...</div>;
  };

  const renderCommentCreate = () => {
    if (!isSignedIn) return null;

    return (
      <>
        <Divider />
        <div className={classes.createComment}>
          <TextField
            id="outlined-multiline-static"
            label="comment"
            multiline
            rows={2}
            variant="outlined"
            className={classes.commentTextInput}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={onCommentButtonClick}
            className={classes.commentButton}
          >
            comment
          </Button>
        </div>
      </>
    );
  };

  const renderFollowButton = () => {
    if (!isSignedIn) return null;
    if (post && follow[post.postId]) {
      return (
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          startIcon={<LoyaltyIcon />}
          onClick={() => removeFollowPost(post.postId, currentUser)}
        >
          unfollow
        </Button>
      );
    }
    return (
      <Button
        variant="outlined"
        size="small"
        color="secondary"
        startIcon={<LoyaltyIcon />}
        onClick={() => followPost(post.postId, currentUser)}
      >
        follow
      </Button>
    );
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <Card className={classes.postContainer}>
        {renderContent()}
        <CardActions>{renderFollowButton()}</CardActions>
        {renderCommentCreate()}
      </Card>
      <Comment postId={id} fetchComments={fetchComments} />
    </Container>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.post.postList[ownProps.match.params.id],
    isSignedIn: state.auth.isSignedIn,
    currentUser: state.auth.id,
    follow: state.post.followedPostId,
  };
};

export default connect(mapStateToProps, {
  fetchPost,
  createComment,
  fetchComments,
  followPost,
  removeFollowPost,
})(ShowPostPage);
