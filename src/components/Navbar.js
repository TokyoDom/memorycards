import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "../firebase/firebase";
import "firebase/auth";
import SignUpModal from "./SignUpModal";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import HomeIcon from "@material-ui/icons/Home";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Navbar({ loggedIn, signedOut, userInfo }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [signUpModal, setSignUpModal] = useState(false);
  const matches = useMediaQuery("(min-width:500px)");

  const handleUserClick = target => {
    setAnchorEl(target);
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      alert(err.message);
    }
  };

  const renderRedirect = () => {
    if (signedOut && window.location.pathname !== "/") {
      return <Redirect to="/" />;
    } else {
      return null;
    }
  };

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
        {matches ? (
          <Button color="inherit" component={Link} to="/create">
            Create
          </Button>
        ) : (
          <IconButton color="inherit" component={Link} to="/create">
            <CreateIcon />
          </IconButton>
        )}
        {renderRedirect()}
        {loggedIn ? (
          <div>
            {matches ? (
              <Button color="inherit" component={Link} to="/practice">
                Practice
              </Button>
            ) : (
              <IconButton color="inherit" component={Link} to="/practice">
                <FilterNoneIcon />
              </IconButton>
            )}
            <Button
              startIcon={<AccountCircleIcon />}
              color="inherit"
              variant="outlined"
              onClick={e => handleUserClick(e.currentTarget)}
            >
              {userInfo.name ? userInfo.name : "..."}
            </Button>
            <Menu
              anchorEl={loggedIn ? anchorEl : null}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={e => setAnchorEl(null)}
            >
              <MenuItem
                component={Link}
                to="/settings"
                onClick={e => setAnchorEl(null)}
              >
                Settings
              </MenuItem>
              <MenuItem onClick={e => signOut()}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <ButtonGroup color="inherit" variant="outlined">
            <Button onClick={e => setSignUpModal(true)}>Sign Up</Button>
            <Button component={Link} to="/login">
              Login
            </Button>
            <SignUpModal
              isOpen={signUpModal}
              closeModal={setSignUpModal}
              loggedIn={loggedIn}
            />
          </ButtonGroup>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
