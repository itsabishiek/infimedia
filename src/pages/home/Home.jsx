import { Menu, Close, ArrowDropDown } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from "react";
import { Sidebar } from "../../components";
import logo from "../../assets/logo.svg";
// import profile from "../../assets/Abishiek.jpg";
import "./Home.css";
import { Link, Route, Routes } from "react-router-dom";
import { userQuery } from "../../utils/data";
import Pins from "../pins/Pins";
import UserProfile from "../../pages/userProfile/UserProfile";
import { client } from "../../client";
import { Button } from "@mui/material";
import { fetchUser } from "../../utils/fetchUser";

const Home = ({ alert, setAlert }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef();

  const userInfo = fetchUser();

  // console.log(userInfo);

  useEffect(() => {
    const query = userQuery(userInfo?.uid);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userInfo?.uid]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

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

          {user ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "0.5s",
              }}
            >
              <Link to={`/user-profile/${user?._id}`}>
                <img
                  src={user?.image}
                  alt=""
                  style={{
                    height: 40,
                    width: 40,
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </Link>

              <ArrowDropDown
                fontSize="large"
                style={{ cursor: "pointer", marginLeft: 10 }}
                onClick={() => setToggleNavbar(!toggleNavbar)}
              />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link to="/auth">
                <Button variant="contained">Login</Button>
              </Link>
              <ArrowDropDown
                fontSize="large"
                style={{ cursor: "pointer", marginLeft: 10 }}
                onClick={() => setToggleNavbar(!toggleNavbar)}
              />
            </div>
          )}
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

      <div
        className={`home-main ${toggleNavbar === true && "marTop"}`}
        ref={scrollRef}
      >
        <Routes>
          <Route
            path="/*"
            element={
              <Pins
                user={user && user}
                toggleNavbar={toggleNavbar}
                alert={alert}
                setAlert={setAlert}
              />
            }
          />
          <Route
            path="/user/:userId"
            element={<UserProfile alert={alert} setAlert={setAlert} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
