import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Grid,
  Avatar,
  Typography,
  IconButton,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";

import { deleteComment, editComment } from "../../actions";

const useStyle = makeStyles({
  editComment: {
    width: "100%",
    fontSize: "15px",
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "70px",
  },
  commentContainer: {
    minWidth: "30%",
  },
});

function Comment(props) {
  const {
    userId,
    content,
    commentId,
    postId,
    currentUser,
    authorName,
    deleteComment,
    editComment,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(false);
  const [commentContent, setCommentContent] = useState(content);

  const classes = useStyle();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (commentId) => {
    deleteComment(postId, commentId);
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setAnchorEl(null);
    setEdit(true);
  };

  const handleCancelClick = () => {
    setAnchorEl(null);
    setEdit(false);
  };

  const onCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = () => {
    setAnchorEl(null);
    editComment(commentContent, commentId);
    setEdit(false);
  };

  const renderContent = () => {
    if (edit)
      return (
        <TextField
          id="outlined-multiline-static"
          label="comment"
          multiline
          rows={2}
          value={commentContent}
          variant="outlined"
          className={classes.editComment}
          onChange={onCommentChange}
        />
      );
    return (
      <>
        <Typography variant="subtitle1" gutterBottom>
          {authorName}
        </Typography>
        <Typography variant="body2" component="pre" gutterBottom>
          {content}
        </Typography>
      </>
    );
  };

  const renderControl = () => {
    if (currentUser !== userId) return null;
    if (edit)
      return (
        <Grid item xs={1}>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleCommentSubmit}>submit</MenuItem>
            <MenuItem onClick={handleCancelClick}>cancel</MenuItem>
          </Menu>
        </Grid>
      );

    return (
      <Grid item xs={1}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
          <MenuItem onClick={() => handleDeleteClick(commentId)}>
            Delete
          </MenuItem>
        </Menu>
      </Grid>
    );
  };

  return (
    <Grid container className={classes.commentContainer} key={commentId}>
      <Grid item xs={3} className={classes.avatarContainer}>
        <Avatar aria-label="recipe">{authorName[0].toUpperCase()}</Avatar>
      </Grid>
      <Grid item xs={8}>
        {renderContent()}
      </Grid>
      {renderControl()}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return { currentUser: state.auth.id };
};

export default connect(mapStateToProps, { deleteComment, editComment })(
  Comment
);
