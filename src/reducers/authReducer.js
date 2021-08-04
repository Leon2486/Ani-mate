export default (
  state = { id: null, email: null, isSignedIn: false },
  action
) => {
  switch (action.type) {
    case "INIT_USER":
      return {
        ...state,
        id: action.payload.uid,
        email: action.payload.email,
        isSignedIn: true,
      };
    case "CREATE_USER":
      return {
        ...state,
        id: action.payload.uid,
        email: action.payload.email,
        isSignedIn: true,
      };
    case "SIGN_IN_USER":
      return {
        ...state,
        id: action.payload.uid,
        email: action.payload.email,
        isSignedIn: true,
        username: action.payload.displayName,
      };
    case "SIGN_OUT_USER":
      return { ...state, id: null, email: null, isSignedIn: false };
    default:
      return state;
  }
};
