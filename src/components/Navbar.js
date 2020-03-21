import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Navbar({ userInfo }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserClick = target => {
    setAnchorEl(target);
  }

  return (
    <AppBar position="static">
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
        <Button color="inherit" component={Link} to="/practice">
          Practice
        </Button>
        <Button
          startIcon={<AccountCircleIcon />}
          color="inherit"
          variant="outlined"
          onClick={e => handleUserClick(e.currentTarget)}
        >
          {userInfo.name ? userInfo.name : '...'}
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={e => setAnchorEl(null)} >
          <MenuItem component={Link} to="/profile">Profile</MenuItem> 
          <MenuItem component={Link} to="/profile">Logout</MenuItem> 
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
