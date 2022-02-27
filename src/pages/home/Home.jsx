import { Menu, Close } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components";
import logo from "../../assets/logo.svg";
import profile from "../../assets/Abishiek.jpg";
import "./Home.css";
import { Link, Route, Routes } from "react-router-dom";
import { userQuery } from "../../utils/data";
import Pins from "../pins/Pins";
import UserProfile from "../../pages/userProfile/UserProfile";
import { client } from "../../client";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userInfo?.googleId]);

  // console.log(user);

  return (
    <div className="home">
      <div className="sidebar-wrapper">
        <Sidebar user={user && user} />
      </div>

      <div className="sidebar-mobile">
        <div className="sidebar-nav">
          <Menu
            fontSize="large"
            style={{ cursor: "pointer" }}
            onClick={() => setToggleSidebar(true)}
          />
          <div className="logo-wrapper">
            <img src={logo} alt="" height={45} />
            <p>InfiMedia</p>
          </div>
          <Link to={`/user-profile/${user?._id}`}>
            <img
              src={profile}
              alt=""
              style={{
                height: 40,
                width: 40,
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </Link>
        </div>

        {toggleSidebar && (
          <div className="sidebar-items">
            <div style={{ position: "absolute", right: 10, top: 10 }}>
              <Close
                style={{ fontSize: 30, cursor: "pointer" }}
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={user && user} />
          </div>
        )}
      </div>

      <div className="home-main">
        <Routes>
          <Route path="/*" element={<Pins />} />
          <Route path="/user-profile/:userId" element={<UserProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
