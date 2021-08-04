import _ from "lodash";

export default (
  state = {
    postList: {},
    myPost: {},
    followedPostId: {},
    followedPostList: {},
  },
  action
) => {
  switch (action.type) {
    case "CREATE_POST":
      return {
        ...state,
        postList: {
          ...state.postList,
          [action.payload.postId]: action.payload,
        },
      };
    case "EDIT_POST":
      return {
        ...state,
        postList: {
          ...state.postList,
          [action.payload.postId]: {
            ...state.postList[action.payload.postId],
            ...action.payload,
          },
        },
      };
    case "FETCH_POSTS":
      return { ...state, postList: action.payload };
    case "FETCH_POST":
      return {
        ...state,
        postList: {
          ...state.postList,
          [action.payload.postId]: action.payload,
        },
      };
    case "FETCH_MY_POST":
      return { ...state, myPost: { ...action.payload } };
    case "DELETE_POST":
      return { ...state, postList: _.omit(state.postList, action.payload) };
    case "FOLLOW_POST":
      return {
        ...state,
        followedPostId: { ...state.followedPostId, [action.payload]: true },
      };
    case "FETCH_FOLLOW_ID":
      return { ...state, followedPostId: { ...action.payload } };
    case "FETCH_FOLLOW_LIST":
      return { ...state, followedPostList: { ...action.payload } };
    case "REMOVE_FOLLOW":
      return {
        ...state,
        followedPostId: _.omit(state.followedPostId, action.payload),
      };
    default:
      return state;
  }
};
