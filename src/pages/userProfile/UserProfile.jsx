import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./UserProfile.css";

const UserProfile = ({ alert, setAlert }) => {
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth);

    navigate("/", { replace: true });

    setAlert({
      open: true,
      message: "Logout Successful",
      type: "success",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button variant="contained" onClick={logOut} style={{ color: "white" }}>
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;
