import { Menu, Close } from "@mui/icons-material";
import React, { useState } from "react";
import { Sidebar } from "../../components";
import logo from "../../assets/logo.svg";
import profile from "../../assets/Abishiek.jpg";
import "./Home.css";
import { Route, Routes } from "react-router-dom";
import Pins from "../pins/Pins";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div className="home">
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>

      <div className="sidebar-mobile">
        <div className="sidebar-nav">
          <Menu
            fontSize="large"
            style={{ cursor: "pointer" }}
            onClick={() => setToggleSidebar(!toggleSidebar)}
          />
          <div className="logo-wrapper">
            <img src={logo} alt="" height={45} />
            <p>InfiMedia</p>
          </div>
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
        </div>

        {toggleSidebar && (
          <div className="sidebar-items">
            <div style={{ position: "absolute", right: 10, top: 10 }}>
              <Close
                style={{ fontSize: 30, cursor: "pointer" }}
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      <div className="home-main">
        <Routes>
          <Route path="/*" element={<Pins />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
