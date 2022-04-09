import { Add, Search } from "@mui/icons-material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ searchTerm, setSearchTerm, user, toggleNavbar }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar-container display-none">
        <div className="navbar-search">
          <Search color="primary" />
          <input
            type="text"
            className="navbar-input"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => navigate("/search")}
          />
        </div>

        <div className="navbar-items">
          {user && (
            <Link to={`/user-profile/${user?._id}`} className="navbar-userImg">
              <img src={user?.image} alt="" />
            </Link>
          )}

          <Link to="/create">
            <button className="navbar-btn">
              <Add />
            </button>
          </Link>
        </div>
      </div>

      {toggleNavbar && (
        <div
          className="navbar-container nav-mobile"
          style={{ position: "fixed", top: "10vh" }}
        >
          <div className="navbar-search">
            <Search color="primary" />
            <input
              type="text"
              className="navbar-input"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => navigate("/search")}
            />
          </div>

          <div className="navbar-items">
            <Link to={`/user-profile/${user?._id}`} className="navbar-userImg">
              <img src={user?.image} alt="" />
            </Link>

            <Link to="/create">
              <button className="navbar-btn">
                <Add />
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
