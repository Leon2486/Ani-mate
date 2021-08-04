import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import FirebaseAuth from "./Auth/FirebaseAuth";

export default function Navbar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ display: "flex" }}>
          <Typography
            variant="h6"
            style={{ marginRight: "auto", color: "white" }}
            component={Link}
            to="/"
          >
            Ani-mate
          </Typography>
          <FirebaseAuth />
        </Toolbar>
      </AppBar>
    </div>
  );
}
