import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowForwardIos, HomeOutlined, Login } from "@mui/icons-material";
import logo from "../../assets/logo.svg";
import { fetchCategories } from "../../utils/data";
import { client } from "../../client";
import "./Sidebar.css";

const Sidebar = ({ closeToggle, user }) => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    client.fetch(fetchCategories).then((data) => {
      setCategories(data);
    });
  }, []);

  // console.log(categories);

  const handleSidebar = () => {
    if (closeToggle) {
      closeToggle(false);
    }
  };

  // console.log(user);

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
            style={{ marginTop: 10 }}
            onClick={handleSidebar}
          >
            <HomeOutlined />
            <span>Home</span>
          </NavLink>

          <h3
            style={{
              margin: "10px 0 0px 0",
              borderBottom: "1px solid #eee",
              paddingBottom: 10,
              paddingLeft: 10,
              color: "var(--primary-color)",
            }}
          >
            Discover Categories
          </h3>

          <div className="sidebar-categories">
            {categories?.map((category) => (
              <NavLink
                to={`/category/${category.title}`}
                className={({ isActive }) =>
                  isActive ? "isActive" : "isNotActive"
                }
                onClick={handleSidebar}
                key={category.title}
              >
                <img src={category.image.asset.url} alt="" />
                <span>{category.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {user ? (
        <Link
          to={`/user/${user?._id}`}
          className="sidebar-user"
          onClick={handleSidebar}
        >
          <div className="sidebar-user-info">
            <img src={user?.image} alt="" />
            <p>{user?.userName}</p>
          </div>
          <ArrowForwardIos fontSize="small" />
        </Link>
      ) : (
        <Link to="/auth">
          <div className="sidebar-userLogin">
            <Login />
            <h3>Login</h3>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
