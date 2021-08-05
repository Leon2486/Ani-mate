import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "./history";
import Navbar from "./components/Navbar";
import SignInPage from "./components/Pages/SignInPage";
import SignUpPage from "./components/Pages/SignUpPage";
import ForumPage from "./components/Pages/ForumPage";
import CreatePostPage from "./components/Pages/CreatePostPage";
import ShowPostPage from "./components/Pages/ShowPostPage";
import EditPostPage from "./components/Pages/EditPostPage";
import MyPostPage from "./components/Pages/MyPostPage";
import FollowPostPage from "./components/Pages/FollowPostPage";
import WelcomePage from "./components/Pages/WelcomePage";

function App() {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/signin" exact component={SignInPage} />
        <Route path="/signup" exact component={SignUpPage} />
        <Route path="/forum" exact component={ForumPage} />
        <Route path="/" exact component={WelcomePage} />
        <Route path="/create" exact component={CreatePostPage} />
        <Route path="/show/:id" exact component={ShowPostPage} />
        <Route path="/edit/:id" exact component={EditPostPage} />
        <Route path="/mypost" exact component={MyPostPage} />
        <Route path="/follow" exact component={FollowPostPage} />
      </Switch>
    </Router>
  );
}

export default App;
