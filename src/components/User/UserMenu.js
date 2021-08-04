import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { Link } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { username, signOut } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "#fff" }}
        endIcon={<ArrowDropDownIcon />}
      >
        {username}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/follow">
          followed
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/mypost">
          My post
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "10px" }}
            onClick={signOut}
          >
            sign out
          </Button>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
