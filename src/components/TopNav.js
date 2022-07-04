import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import homeIcon from "../images/home-icon.svg";
import addIcon from "../images/add-post-icon.svg";
import discoverIcon from "../images/discover-icon.svg";
import CreatePost from "./CreatePost";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import UserContext from "../userContext";

const TopNav = ({ logOut }) => {
  const [postModalOpen, setPostModalOpen] = useState(false);

  const handlePostModal = () => {
    setPostModalOpen(!postModalOpen);
  };
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user } = useContext(UserContext);

  return (
    <div className="topnav">
      <nav className="navbar">
        <div className="navbar-brand is-align-item-center is-justify-content-space-between">
          <img src={logo} alt="Instagram" />
          <div className="is-hidden-desktop is-flex">
            <div className="navbar-item">
              <img src={homeIcon} alt="" width={15} />
            </div>
            <div className="navbar-item" onClick={handlePostModal}>
              <img src={addIcon} alt="" width={15} />
            </div>
          </div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start"></div>
          <div className="navbar-end">
            <div
              className="navbar-item"
              onClick={() => {
                navigate("/home");
              }}
            >
              <img src={homeIcon} alt="" />
            </div>
            <div className="navbar-item" onClick={handlePostModal}>
              <img src={addIcon} alt="" />
            </div>
            <div className="navbar-item">
              <img src={discoverIcon} alt="" />
            </div>
            <div className="navbar-item is-clickable">
              <a
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                {user.photoURL ? (
                  <Avatar
                    className="avatar-img"
                    sx={{ width: 32, height: 32, objectFit: "cover" }}
                    src={user.photoURL}
                  />
                ) : (
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <i className="fas fa-user"></i>
                  </Avatar>
                )}
              </a>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={logOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </nav>

      {postModalOpen && <CreatePost setPostModalOpen={setPostModalOpen} />}
    </div>
  );
};

export default TopNav;
