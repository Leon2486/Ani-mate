import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import loadingReducer from "./loadingReducer";

export default combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  form: formReducer,
  post: postReducer,
  comment: commentReducer,
});
