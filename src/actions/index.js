import firebase from "../firebase";
import history from "../history";
import uniqid from "uniqid";

const loadingStart = () => {
  return {
    type: "LOADING_START",
  };
};

const loadingFinish = () => {
  return {
    type: "LOADING_FINISH",
  };
};

export const signIn = (uid, email, displayName) => (dispatch) => {
  dispatch(loadingStart());
  dispatch({
    type: "SIGN_IN_USER",
    payload: { uid, email, displayName },
  });
  dispatch(loadingFinish());
};

export const signOut = () => (dispatch) => {
  dispatch({
    type: "SIGN_OUT_USER",
  });
  history.push("/forum");
};

//////////////////////post

export const createPost = (formValues) => async (dispatch) => {
  dispatch(loadingStart());
  const postId = uniqid();
  await firebase
    .firestore()
    .collection("post")
    .doc(postId)
    .set({ ...formValues, postId }, { merge: true });

  dispatch({
    type: "CREATE_POST",
    payload: formValues,
  });
  dispatch(loadingFinish());
  history.push("/forum");
};

export const fetchPost = (id) => async (dispatch) => {
  dispatch(loadingStart());
  const postRef = await firebase.firestore().collection("post").doc(id);
  const post = await postRef.get();
  const foundPost = post.data();

  dispatch({
    type: "FETCH_POST",
    payload: foundPost,
  });
  dispatch(loadingFinish());
};

export const fetchPosts = () => async (dispatch) => {
  dispatch(loadingStart());
  let postList = {};
  const collectionRef = await firebase.firestore().collection("post");
  const collection = await collectionRef.get();
  collection.forEach((doc) => {
    postList[doc.data().postId] = doc.data();
  });

  dispatch({
    type: "FETCH_POSTS",
    payload: postList,
  });
  dispatch(loadingFinish());
};

export const fetchMyPost = (id) => async (dispatch) => {
  dispatch(loadingStart());

  let myPost = {};

  const querySnapshot = await firebase
    .firestore()
    .collection("post")
    .where("authorId", "==", id)
    .get();

  querySnapshot.forEach((doc) => {
    myPost[doc.data().postId] = doc.data();
  });

  dispatch({
    type: "FETCH_MY_POST",
    payload: myPost,
  });

  dispatch(loadingFinish());
};

export const updatePost = (formValues) => async (dispatch) => {
  dispatch(loadingStart());
  const { postId } = formValues;

  const postRef = await firebase.firestore().collection("post").doc(postId);
  await postRef.update({ ...formValues });

  dispatch({
    type: "EDIT_POST",
    payload: formValues,
  });

  dispatch(loadingFinish());

  history.push(`/show/${postId}`);
};

export const deletePost = (id) => async (dispatch) => {
  dispatch({
    type: "DELETE_POST",
    payload: id,
  });

  await firebase.firestore().collection("post").doc(id).delete();
  const querySnapshot = await firebase
    .firestore()
    .collection("comment")
    .where("postId", "==", id)
    .get();

  const batch = firebase.firestore().batch();

  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  batch.commit();
};

export const followPost = (postId, userId) => async (dispatch) => {
  dispatch({
    type: "FOLLOW_POST",
    payload: postId,
  });

  await firebase
    .firestore()
    .collection("user")
    .doc(userId)
    .set(
      {
        follow: { [postId]: true },
      },
      { merge: true }
    );
};

export const fetchFollowPost = (userId) => async (dispatch) => {
  const userRef = await firebase.firestore().collection("user").doc(userId);
  const user = await userRef.get();

  if (user.exists) {
    const { follow } = user.data();
    dispatch({
      type: "FETCH_FOLLOW_ID",
      payload: follow,
    });
  }
};

export const fetchFollowPostList = () => async (dispatch, getState) => {
  const followed = Object.keys(getState().post.followedPostId);

  if (followed.length) {
    const followRef = await firebase
      .firestore()
      .collection("post")
      .where("postId", "in", followed)
      .get();

    let payload = {};

    followRef.forEach((doc) => {
      payload[doc.data().postId] = doc.data();
    });

    dispatch({
      type: "FETCH_FOLLOW_LIST",
      payload,
    });
  } else if (!followed.length) {
    dispatch({
      type: "FETCH_FOLLOW_LIST",
      payload: {},
    });
  }
};

export const removeFollowPost =
  (postId, userId) => async (dispatch, getState) => {
    dispatch({
      type: "REMOVE_FOLLOW",
      payload: postId,
    });
    const follow = getState().post.followedPostId;
    await firebase.firestore().collection("user").doc(userId).set({
      follow,
    });
  };

///////////////////comment

export const createComment =
  (content, postId) => async (dispatch, getState) => {
    const commentId = uniqid();
    const { id, username } = getState().auth;
    dispatch({
      type: "CREATE_COMMENT",
      payload: { userId: id, content, postId, commentId, authorName: username },
    });

    const postRef = await firebase.firestore().collection("post").doc(postId);
    postRef.update({
      comments: firebase.firestore.FieldValue.arrayUnion(commentId),
    });

    await firebase
      .firestore()
      .collection("comment")
      .doc(commentId)
      .set(
        { userId: id, content, postId, commentId, authorName: username },
        { merge: true }
      );
  };

export const fetchComments = (postId) => async (dispatch) => {
  dispatch(loadingStart());
  let commentList = {};
  const comments = await firebase
    .firestore()
    .collection("comment")
    .where("postId", "==", postId)
    .get();

  comments.forEach((comment) => {
    commentList[comment.data().commentId] = comment.data();
  });

  dispatch({
    type: "FETCH_COMMENTS",
    payload: commentList,
  });
  dispatch(loadingFinish());
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  await firebase.firestore().collection("comment").doc(commentId).delete();
  const postRef = await firebase.firestore().collection("post").doc(postId);
  postRef.update({
    comments: firebase.firestore.FieldValue.arrayRemove(commentId),
  });

  dispatch({
    type: "DELETE_COMMENT",
    payload: commentId,
  });
};

export const editComment = (content, commentId) => async (dispatch) => {
  dispatch({
    type: "UPDATE_COMMENT",
    payload: { commentId, content },
  });

  const commentRef = await firebase
    .firestore()
    .collection("comment")
    .doc(commentId);
  await commentRef.update({ content });
};
