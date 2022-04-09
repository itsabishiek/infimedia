import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CreatePin, Feed, PinDetail, Search } from "../../container";
import Navbar from "../../components/navbar/Navbar";
import "./Pins.css";

const Pins = ({ user, toggleNavbar, alert, setAlert }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="pins-container">
      <div className="pins-navbar">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user && user}
          toggleNavbar={toggleNavbar}
        />
      </div>

      <div className="pins-inner">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin/:pinId"
            element={<PinDetail user={user && user} />}
          />
          <Route
            path="/create"
            element={
              <CreatePin
                user={user && user}
                alert={alert}
                setAlert={setAlert}
              />
            }
          />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
