import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "../firebase/firebase";
import "firebase/auth";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Navbar({ loggedIn, signedOut, userInfo }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserClick = target => {
    setAnchorEl(target);
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.log(err);
    }
  };

  const renderRedirect = () => {
    if(signedOut && window.location.pathname !== '/') {
      return <Redirect to="/"/>;
    } else {
      return null;
    }
  }

  return (
    <AppBar position="sticky">
      <Toolbar style={{ justifyContent: "flex-end" }}>
        <IconButton
          edge="start"
          color="inherit"
          component={Link}
          to="/"
          style={{ marginRight: "auto" }}
        >
          <HomeIcon />
        </IconButton>
        <Button color="inherit" component={Link} to="/create">
          Create
        </Button>
        {renderRedirect()}
        {loggedIn ? <div><Button color="inherit" component={Link} to="/practice">
          Practice
        </Button>
        <Button
          startIcon={<AccountCircleIcon />}
          color="inherit"
          variant="outlined"
          onClick={e => handleUserClick(e.currentTarget)}
        >
          {userInfo.name ? userInfo.name : "..."}
        </Button> 
        <Menu
          anchorEl={loggedIn ? anchorEl: null}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={e => setAnchorEl(null)}
        >
          <MenuItem component={Link} to="/profile">
            Profile
          </MenuItem>
          <MenuItem onClick={e => signOut()}>
            Logout
          </MenuItem>
        </Menu></div> : <Button color="inherit" variant="outlined" component={Link} to="/login">Login</Button>}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
