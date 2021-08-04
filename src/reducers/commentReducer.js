import _ from "lodash";

export default (state = { comments: [] }, action) => {
  switch (action.type) {
    case "FETCH_COMMENTS":
      return { ...state, comments: { ...action.payload } };
    case "DELETE_COMMENT":
      return { ...state, comments: _.omit(state.comments, action.payload) };
    case "UPDATE_COMMENT":
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.commentId]: {
            ...state.comments[action.payload.commentId],
            content: action.payload.content,
          },
        },
      };
    case "CREATE_COMMENT":
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.commentId]: {
            ...action.payload,
          },
        },
      };
    default:
      return state;
  }
};
