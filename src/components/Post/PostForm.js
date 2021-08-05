import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import history from "../../history";
import { createPost } from "../../actions";

const titleInput = ({ input, meta }) => {
  if (meta.error && meta.touched) {
    return (
      <TextField
        error
        id="standard-basic"
        label="title"
        style={{ marginBottom: "20px" }}
        helperText={meta.error}
        {...input}
      />
    );
  }
  return (
    <TextField
      id="standard-basic"
      label="title"
      style={{ marginBottom: "20px" }}
      {...input}
    />
  );
};

const contentInput = ({ input, meta }) => {
  if (meta.error && meta.touched) {
    return (
      <TextField
        error
        id="outlined-multiline-static"
        label="content"
        multiline
        rows={10}
        variant="outlined"
        placeholder="post content"
        helperText={meta.error}
        style={{ width: "100%", fontSize: "15px" }}
        {...input}
      />
    );
  }
  return (
    <TextField
      id="outlined-multiline-static"
      label="comment"
      multiline
      rows={10}
      variant="outlined"
      placeholder="post content"
      style={{ width: "100%", fontSize: "15px" }}
      {...input}
    />
  );
};

function PostForm(props) {
  const { handleSubmit, author, onSubmit, username, isSignedIn } = props;
  const { createDate, postId, editDate, title } = props;

  const onPostSubmit = (formValues) => {
    if (createDate) {
      onSubmit({
        ...formValues,
        authorId: author,
        postId,
        createDate,
        authorName: username,
      });
    } else if (editDate) {
      onSubmit({
        ...formValues,
        authorId: author,
        postId,
        editDate,
        authorName: username,
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Card style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4">{title}</Typography>
        <CardContent>
          <form action="" onSubmit={handleSubmit(onPostSubmit)}>
            <Field name="title" component={titleInput} />
            <Field name="content" component={contentInput} />

            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/forum"
              >
                cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
              >
                post
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

const validate = (formValues) => {
  const error = {};
  if (!formValues.title) {
    error.title = "a title is required";
  }
  if (!formValues.content) {
    error.content = "please write something";
  }

  return error;
};

const Post = reduxForm({
  form: "post",
  validate,
})(PostForm);

const mapStateToProps = (state) => {
  return {
    author: state.auth.id,
    username: state.auth.username,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { createPost })(Post);
