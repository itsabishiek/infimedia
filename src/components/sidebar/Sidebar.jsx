import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowForwardIos, HomeOutlined } from "@mui/icons-material";
import logo from "../../assets/logo.svg";
import "./Sidebar.css";

const Sidebar = ({ closeToggle, user }) => {
  const handleSidebar = () => {
    if (closeToggle) {
      closeToggle(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <Link to="/" className="sidebar-logo">
          <img src={logo} alt="" />
          <h1>InfiMedia</h1>
        </Link>

        <div className="sidebar-contents">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "isActive" : "isNotActive"
            }
          >
            <HomeOutlined />
            <span>Home</span>
          </NavLink>

          <h3
            style={{
              margin: "15px 0",
              borderBottom: "1px solid #eee",
              paddingBottom: 10,
              paddingLeft: 10,
              color: "var(--primary-color)",
            }}
          >
            Discover Categories
          </h3>

          <NavLink
            to="/photo1"
            className={({ isActive }) =>
              isActive ? "isActive" : "isNotActive"
            }
          >
            <span>Photography</span>
          </NavLink>
          <NavLink
            to="/photo2"
            className={({ isActive }) =>
              isActive ? "isActive" : "isNotActive"
            }
          >
            <span>Street Art</span>
          </NavLink>
          <NavLink
            to="/photo3"
            className={({ isActive }) =>
              isActive ? "isActive" : "isNotActive"
            }
          >
            <span>Coding</span>
          </NavLink>
        </div>
      </div>

      <Link
        to={`/user-profile/${user?._id}`}
        className="sidebar-user"
        onClick={handleSidebar}
      >
        <div className="sidebar-user-info">
          <img src={user?.image} alt="" />
          <p>{user?.userName}</p>
        </div>
        <ArrowForwardIos fontSize="small" />
      </Link>
    </div>
  );
};

export default Sidebar;
