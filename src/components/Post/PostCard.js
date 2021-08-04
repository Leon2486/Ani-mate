import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Avatar,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import { createTheme, ThemeProvider } from "@material-ui/core";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { deletePost } from "../../actions";

const useStyle = makeStyles({
  card: {
    transition: "all .2s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "10px 7px 15px rgb(0 0 0 / 15%)",
    },
  },

  cardContent: {
    height: "100px",
    whiteSpace: "pre-wrap",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "5",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
  },
  cardButtons: { justifyContent: "flex-end" },
});

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function PostCard(props) {
  const {
    title,
    content,
    postId,
    isSignedIn,
    createDate,
    currentUser,
    authorId,
    authorName,
  } = props;
  const { deletePost } = props;
  const { date } = createDate;
  const classes = useStyle();

  const renderIcon = () => {
    if (!isSignedIn || currentUser !== authorId) return null;

    return (
      <>
        <IconButton aria-label="delete" onClick={() => deletePost(postId)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="edit" component={Link} to={`/edit/${postId}`}>
          <CreateIcon fontSize="small" />
        </IconButton>
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid item sm={4} xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe">
                  {authorName[0].toUpperCase()}
                </Avatar>
              }
              title={title}
              subheader={`${date[0]} ${date[1]}, ${date[2]} by ${authorName}`}
            />
            <Typography
              variant="body2"
              component="pre"
              className={classes.cardContent}
            >
              {content}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardButtons}>
            {renderIcon()}
            <Button
              size="small"
              color="primary"
              component={Link}
              to={`/show/${postId}`}
              style={{ margin: "8px 0 8px auto" }}
            >
              read more
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUser: state.auth.id,
  };
};

export default connect(mapStateToProps, { deletePost })(PostCard);
