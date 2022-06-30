import React, { useState } from "react";
import logo from "../images/logo.png";
import homeIcon from "../images/home-icon.svg";
import messageIcon from "../images/messenger-icon.svg";
import addIcon from "../images/add-post-icon.svg";
import discoverIcon from "../images/discover-icon.svg";
import likeIcon from "../images/like-outline-dark.svg";
import CreatePost from "./CreatePost";

const TopNav = ({ loggedUser }) => {
  const [postModalOpen, setPostModalOpen] = useState(false);

  const handlePostModal = () => {
    setPostModalOpen(!postModalOpen);
  };
  return (
    <div className="topnav">
      <nav className="navbar">
        <div className="navbar-brand">
          <img src={logo} alt="Instagram" />
        </div>
        <div className="navbar-menu">
          <div className="navbar-start"></div>
          <div className="navbar-end">
            <div className="navbar-item">
              <a>
                <img src={homeIcon} alt="" />
              </a>
            </div>
            <div className="navbar-item">
              <a onClick={handlePostModal}>
                <img src={addIcon} alt="" />
              </a>
            </div>
            <div className="navbar-item">
              <a>
                <img src={discoverIcon} alt="" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {postModalOpen && (
        <CreatePost
          setPostModalOpen={setPostModalOpen}
          loggedUser={loggedUser}
        />
      )}
    </div>
  );
};

export default TopNav;
